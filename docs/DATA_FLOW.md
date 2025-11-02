# DATA FLOW DOCUMENTATION

## 5.1 State Management Architecture

### Global State Solution

**Primary:** localStorage-based custom stores  
**Prepared:** TanStack Query for server state  
**Future:** PostgreSQL + Drizzle ORM

### Store Structure

The application uses **localStorage stores** for client-side data persistence with a consistent pattern:

#### Store Locations
- `client/src/lib/dealerListStore.ts`
- `client/src/lib/dealershipStore.ts`
- `client/src/lib/roleStore.ts`
- `client/src/lib/smsLogStore.ts`
- `client/src/lib/pendingSmsStore.ts`

#### Store Pattern

Each store follows this structure:

```typescript
// Define interface
export interface ItemType {
  id: number;
  // ... fields
}

// Storage key
const STORAGE_KEY = 'truebdc_entity_name';

// Seed/initial data
const INITIAL_DATA: ItemType[] = [...];

// Store object
export const storeName = {
  getAll(): ItemType[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
    return INITIAL_DATA;
  },

  getById(id: number): ItemType | undefined {
    return this.getAll().find(item => item.id === id);
  },

  add(item: Omit<ItemType, 'id'>): ItemType {
    const items = this.getAll();
    const maxId = items.length > 0 
      ? items.reduce((max, i) => Math.max(max, i.id), 0)
      : 0;
    const newItem = { ...item, id: maxId + 1 };
    items.push(newItem);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return newItem;
  },

  update(id: number, updates: Partial<ItemType>): boolean {
    const items = this.getAll();
    const index = items.findIndex(i => i.id === id);
    if (index === -1) return false;
    items[index] = { ...items[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    return true;
  },

  delete(id: number): boolean {
    const items = this.getAll();
    const filtered = items.filter(i => i.id !== id);
    if (filtered.length === items.length) return false;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};
```

### Store Details

#### dealerListStore
**Purpose:** Manage dealer CRUD operations  
**Storage Key:** `'truebdc_dealers'`  
**Data Model:** 30+ fields including:
- Basic: name, type, timezone, website
- Contact: phone numbers, address, hours
- CRM: Sales CRM, Data Mining, Dealer ID, Service CRM credentials
- Transfers: Sales, Service, Fax, Ring Central numbers
- Status: active/inactive boolean

**Seed Data:** 10 pre-populated dealers

**Methods:**
- `getDealers()` - Get all dealers
- `getDealer(id)` - Get single dealer
- `addDealer(dealer)` - Add new dealer
- `updateDealer(id, updates)` - Update dealer
- `deleteDealer(id)` - Delete dealer
- `toggleStatus(id)` - Toggle active/inactive

#### dealershipStore
**Purpose:** Manage dealership (multi-dealer groups)  
**Storage Key:** `'truebdc_dealerships'`  
**Data Model:**
- Dealership name
- Assigned dealer IDs
- Login credentials

#### roleStore
**Purpose:** Role-based permission management  
**Storage Key:** `'truebdc_roles'`  
**Data Model:**
```typescript
interface Permission {
  module: string;  // 'User', 'Role', 'Dealer', etc.
  permissions: string[];  // ['Manage', 'Create', 'Edit', etc.]
}

interface Role {
  id: number;
  title: string;  // 'Admin', 'Manager', 'Agent', 'QA Analyst'
  permissions: Permission[];  // Array of 11 modules
}
```

**Initial Roles:**
1. **Admin** - Full permissions across all 11 modules
2. **Manager** - Empty permissions (to be configured)
3. **Agent** - Empty permissions (to be configured)

**11 Permission Modules:**
1. User (5 permissions)
2. Role (4 permissions)
3. Department (4 permissions)
4. Scenario (4 permissions)
5. Lead Source (4 permissions)
6. Dealer (7 permissions)
7. Appointment (8 permissions)
8. Dealership (4 permissions)
9. Call Logs (4 permissions)
10. Setting (3 permissions)
11. Rc Agent Activity (1 permission)

**Methods:**
- `getRoles()` - Get all roles
- `getRole(id)` - Get single role
- `addRole(role)` - Create new role
- `updateRole(id, updates)` - Update role
- `updatePermissions(id, permissions)` - Update role permissions
- `deleteRole(id)` - Delete role

#### smsLogStore
**Purpose:** Track sent SMS messages  
**Data Model:**
- Recipient (to)
- Message content
- Sent timestamp

#### pendingSmsStore
**Purpose:** Queue SMS messages for sending  
**Data Model:**
- Recipient (to)
- Message content
- Created timestamp

### TanStack Query Configuration

**File:** `client/src/lib/queryClient.ts`

```typescript
import { QueryClient } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      queryFn: async ({ queryKey }) => {
        const response = await fetch(`${queryKey[0]}`);
        if (!response.ok) throw new Error('Network error');
        return response.json();
      },
      staleTime: 1000 * 60 * 5, // 5 minutes
    },
  },
});

export async function apiRequest(
  url: string,
  options?: RequestInit
) {
  const response = await fetch(url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options?.headers,
    },
  });
  if (!response.ok) throw new Error('API request failed');
  return response.json();
}
```

**Usage Pattern (Prepared for API Integration):**
```typescript
// Query
const { data, isLoading } = useQuery({
  queryKey: ['/api/dealers'],
});

// Mutation
const mutation = useMutation({
  mutationFn: (dealer) => apiRequest('/api/dealers', {
    method: 'POST',
    body: JSON.stringify(dealer),
  }),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['/api/dealers'] });
  },
});
```

## 5.2 Data Fetching

### Current Implementation: localStorage

Pages load data synchronously from localStorage stores:

```typescript
// Example: DealerList.tsx
useEffect(() => {
  loadDealers();
}, []);

const loadDealers = () => {
  setDealers(dealerListStore.getDealers());
};
```

### Prepared: API Integration

Backend routes are defined but minimal:

**File:** `server/routes.ts`

Currently returns empty arrays, ready for implementation:
```typescript
app.get('/api/dealers', async (req, res) => {
  // TODO: Fetch from database
  res.json([]);
});
```

### Data Fetching Locations

#### Dashboard Page
**Component:** `Dashboard.tsx`  
**Data:** Static sample data (hard-coded)  
**Needs:**
- API: `GET /api/dashboard/stats` - Summary statistics
- API: `GET /api/dashboard/agent-stats` - Today's agent performance
- API: `GET /api/dashboard/dealer-stats` - Today's dealer stats
- API: `GET /api/dashboard/mtd-stats` - Month-to-date statistics
- API: `GET /api/ringcentral/stats` - Call statistics

#### Dealer List
**Component:** `DealerList.tsx`  
**Data Source:** `dealerListStore.getDealers()`  
**Loading:** `useEffect` on mount  
**Prepared API:**
```typescript
const { data: dealers, isLoading } = useQuery({
  queryKey: ['/api/dealers'],
});
```

#### Dealer Form (Add/Edit)
**Components:** `AddDealer.tsx`, `EditDealer.tsx`  
**Load (Edit):** `dealerListStore.getDealer(id)` via route params  
**Save:** `dealerListStore.addDealer()` or `updateDealer()`  
**Prepared API:**
```typescript
// Load for edit
const { data: dealer } = useQuery({
  queryKey: ['/api/dealers', id],
});

// Save mutation
const mutation = useMutation({
  mutationFn: (dealer) => apiRequest(`/api/dealers/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dealer),
  }),
});
```

#### Role List
**Component:** `RoleList.tsx`  
**Data Source:** `roleStore.getRoles()`  
**Refetch:** After CRUD operations

#### Edit Role Permissions
**Component:** `EditRole.tsx`  
**Load:** `roleStore.getRole(id)` via route params  
**Save:** `roleStore.updatePermissions(id, permissions)`  

## 5.3 Form Data Flow

### Example: Create Appointment (DealerNotification)

```
User Action: Fill Form
├── Component: DealerNotification.tsx
├── State: formData (useState with 20+ fields)
│   ├── dealership: string
│   ├── department: string
│   ├── scenario: string
│   ├── Customer info: firstName, lastName, phone, email
│   ├── Vehicle: year, make, model, stockNumber
│   ├── Trade-in: tradeYear, tradeMake, tradeModel, miles
│   ├── paymentPreference: string
│   ├── comment: string
│   ├── leadSource: string
│   └── language: string
├── User fills fields -> setState updates
├── User clicks "Submit"
├── handleSubmit() triggered
├── Frontend validation (to be implemented with Zod)
├── Currently: console.log(formData)
└── Prepared:
    ├── POST /api/appointments
    ├── Body: formData
    ├── Success:
    │   ├── Show success toast
    │   ├── Clear form (reset state)
    │   ├── Invalidate appointments cache
    │   └── Option to redirect or create another
    └── Error:
        ├── Display error toast
        ├── Show field-level errors
        └── Retain form data
```

### Form Validation Flow (Prepared)

```typescript
// Zod schema from shared/schema.ts
import { insertAppointmentSchema } from '@shared/schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';

const form = useForm({
  resolver: zodResolver(insertAppointmentSchema),
  defaultValues: {
    dealership: '',
    department: '',
    // ... all fields
  },
});

const onSubmit = form.handleSubmit(async (data) => {
  // data is typed and validated
  await mutation.mutateAsync(data);
});
```

### Example: Update Dealer

```
User Action: Edit Dealer
├── Navigate to /admin/dealers/:id/edit
├── Component loads: EditDealer.tsx
├── Extract :id from route params
├── Load dealer: dealerListStore.getDealer(id)
├── Populate form with existing values
├── User modifies fields
├── User clicks "Save"
├── Validation runs
├── dealerListStore.updateDealer(id, formData)
├── Success:
│   ├── localStorage updated
│   ├── Show success toast
│   └── Navigate to /admin/dealer-list
└── Error:
    ├── Display error message
    └── Stay on edit page
```

## 5.4 Props Drilling

### Sidebar State

**Pattern:** State lifted to Layout component

```
Layout
├── State: sidebarOpen (boolean)
├── setSidebarOpen (function)
├── Passed to:
│   ├── Sidebar (open, setOpen)
│   └── Header (setOpen for mobile toggle)
└── Avoids prop drilling via direct props
```

### Data Passing

**Current Approach:** Each page fetches its own data

No significant prop drilling issues because:
1. Pages are independent
2. Data fetching happens at page level
3. localStorage stores are imported directly where needed

**No Context Providers Currently Used For:**
- User authentication state (to be implemented)
- Selected dealership/dealer (to be implemented)
- Theme (dark mode prepared but not active)

## 5.5 Data Synchronization

### localStorage Synchronization

**Pattern:** Manual refresh after mutations

```typescript
const handleDelete = (id: number) => {
  dealerListStore.deleteDealer(id);
  loadDealers();  // Re-fetch from localStorage
  toast({ title: "Success", description: "Dealer deleted" });
};
```

### Future: Automatic Synchronization with TanStack Query

```typescript
const mutation = useMutation({
  mutationFn: deleteDealer,
  onSuccess: () => {
    // Automatically invalidates and refetches
    queryClient.invalidateQueries({ queryKey: ['/api/dealers'] });
  },
});
```

**Benefits:**
- Automatic background refetching
- Optimistic updates
- Cache synchronization across components
- Loading/error states built-in

## 5.6 Data Flow Diagrams

### Current Architecture

```
User Interaction
    ↓
React Component (useState)
    ↓
localStorage Store (CRUD methods)
    ↓
localStorage (browser storage)
    ↓
Re-render Component
```

### Prepared Architecture (with API)

```
User Interaction
    ↓
React Component
    ↓
TanStack Query (mutation/query)
    ↓
API Request (fetch)
    ↓
Express Routes
    ↓
Drizzle ORM
    ↓
PostgreSQL Database
    ↓
Response to Component
    ↓
Cache Update
    ↓
Re-render
```

## 5.7 Migration Path

### Phase 1: Current State ✅
- localStorage stores with seed data
- Direct CRUD operations
- Component-level state management

### Phase 2: API Integration (Prepared) 🔧
- Express routes implementation
- Drizzle ORM queries
- TanStack Query for client state
- Keep localStorage as fallback

### Phase 3: Full Database (Future) 📋
- PostgreSQL production database
- Session-based authentication
- Real-time updates via WebSocket (ws package installed)
- Remove localStorage dependency

## 5.8 Performance Considerations

### Current Optimizations
- localStorage is synchronous (fast reads)
- Component-level state prevents unnecessary re-renders
- Data loaded only when needed (no global state overhead)

### Planned Optimizations
- **TanStack Query caching** - Reduce API calls
- **Pagination** - Large data sets (dealers, appointments)
- **Debounced search** - Real-time filtering
- **Optimistic updates** - Instant UI feedback
- **Background refetching** - Keep data fresh
- **Prefetching** - Load related data ahead of time

## 5.9 Error Handling

### Current Pattern
```typescript
const handleDelete = (id: number) => {
  if (confirm("Are you sure?")) {
    const success = dealerListStore.deleteDealer(id);
    if (success) {
      loadDealers();
      toast({ title: "Success", description: "Deleted" });
    }
  }
};
```

### Prepared Pattern with TanStack Query
```typescript
const mutation = useMutation({
  mutationFn: deleteDealer,
  onSuccess: () => {
    toast({ title: "Success" });
    queryClient.invalidateQueries({ queryKey: ['/api/dealers'] });
  },
  onError: (error) => {
    toast({
      variant: "destructive",
      title: "Error",
      description: error.message,
    });
  },
});

// In component
if (mutation.isPending) return <Spinner />;
if (mutation.isError) return <ErrorMessage />;
```

## 5.10 Data Validation

### Client-Side Validation

**Prepared:** Zod schemas defined in `shared/schema.ts`

```typescript
// Example from schema.ts
export const insertDealerSchema = createInsertSchema(dealers).omit({
  id: true,
  createdAt: true,
});

export type InsertDealer = z.infer<typeof insertDealerSchema>;
```

**Usage in Forms:**
```typescript
const form = useForm<InsertDealer>({
  resolver: zodResolver(insertDealerSchema),
  defaultValues: { ... },
});
```

### Server-Side Validation (Prepared)

```typescript
// In Express route
app.post('/api/dealers', async (req, res) => {
  try {
    const validatedData = insertDealerSchema.parse(req.body);
    const dealer = await db.insert(dealers).values(validatedData);
    res.json(dealer);
  } catch (error) {
    if (error instanceof z.ZodError) {
      res.status(400).json({ errors: error.errors });
    }
  }
});
```
