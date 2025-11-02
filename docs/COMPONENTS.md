# COMPONENTS DOCUMENTATION

## 4.1 Component Hierarchy

```
App
├── QueryClientProvider (TanStack Query)
│   └── TooltipProvider
│       ├── Toaster (Global toast notifications)
│       └── Router
│           ├── Login (standalone, no layout)
│           └── Layout
│               ├── Header
│               │   ├── Menu (mobile toggle)
│               │   ├── Breadcrumb/Title
│               │   ├── Bell (notifications icon)
│               │   └── DropdownMenu (profile)
│               │       ├── User info display
│               │       └── Logout button
│               ├── Sidebar
│               │   ├── Logo & Company Name
│               │   ├── User Info Display
│               │   ├── Nav Items (direct links)
│               │   │   ├── Leaderboard
│               │   │   ├── Dealer Info
│               │   │   └── Dealer Notification
│               │   ├── Collapsible (My Profile)
│               │   │   └── Profile Items (5 links)
│               │   ├── Collapsible (Manager)
│               │   │   └── Manager Items (7 links)
│               │   ├── Collapsible (Admin)
│               │   │   └── Admin Items (9 links)
│               │   └── Collapsible (Settings)
│               │       └── Settings Items (2 links)
│               └── MainContent
│                   └── [Page Components]
│                       ├── Dashboard
│                       │   ├── Card (summary stats) × 8
│                       │   ├── Popover > Calendar (date pickers) × 7
│                       │   └── Table (agent/dealer stats) × 6
│                       ├── DealerNotification
│                       │   ├── RadioGroup (form type)
│                       │   ├── Select (dropdowns) × 10+
│                       │   ├── Input (text fields) × 15+
│                       │   ├── Textarea (comments)
│                       │   └── Button (submit/cancel)
│                       ├── DealerList
│                       │   ├── SearchInput (filter)
│                       │   ├── Select (entries per page)
│                       │   ├── Table (dealer data)
│                       │   ├── Switch (status toggle) × n
│                       │   └── DropdownMenu (actions) × n
│                       ├── AddDealer/EditDealer
│                       │   └── Form (30+ fields)
│                       ├── RoleList
│                       │   └── Table (roles)
│                       ├── EditRole
│                       │   ├── Input (role name)
│                       │   └── Checkbox (permissions) × 60+
│                       └── [Other Pages...]
```

## 4.2 Component Categories

### Layout Components

#### Sidebar
**File:** `client/src/components/layout/Sidebar.tsx`  
**Purpose:** Primary navigation menu with collapsible sections  
**Props:**
```typescript
interface SidebarProps {
  open: boolean;           // Controls sidebar visibility
  setOpen: (open: boolean) => void;  // Toggle function
}
```

**Features:**
- Responsive design (hidden on mobile, toggle via hamburger)
- Company logo and branding
- User greeting display
- Hierarchical navigation with collapsible sections
- Active route highlighting
- Auto-close on mobile when route changes

**Navigation Sections:**
- Main (always visible): 3 items
- My Profile (collapsible): 5 items
- Manager (collapsible): 7 items
- Admin (collapsible): 9 items
- Settings (collapsible): 2 items

#### Header
**File:** `client/src/components/layout/Header.tsx`  
**Purpose:** Top navigation bar with title, breadcrumbs, and user actions  

**Features:**
- Mobile menu toggle (hamburger icon)
- Page title and breadcrumb
- Notification bell icon
- User profile dropdown with logout

#### Layout
**File:** `client/src/components/layout/Layout.tsx`  
**Purpose:** Main layout wrapper combining header, sidebar, and content area  

**Structure:**
```typescript
<div className="flex h-screen overflow-hidden">
  <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />
  <div className="flex-1 flex flex-col overflow-hidden">
    <Header />
    <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
      {children}
    </main>
  </div>
</div>
```

### Form Components

While there are no dedicated form components in `/components/`, forms are built using shadcn/ui primitives throughout the pages:

**Common Form Patterns:**

#### Input Fields
- Text inputs for names, emails, phone numbers
- Password inputs with show/hide toggle
- Number inputs for IDs and quantities
- Date/time pickers

#### Selection Components
- Select dropdowns (single selection)
- Multi-select checkboxes
- Radio groups for mutually exclusive options

#### Text Areas
- Comments and notes fields
- Multi-line descriptions

#### Validation
- Prepared for Zod schema validation via `@hookform/resolvers`
- React Hook Form integration ready

### Common/Shared Components

#### DataTable
**File:** `client/src/components/common/DataTable.tsx`  
**Purpose:** Reusable table component with sorting, filtering, and pagination  

**Where Used:**
- Dealer List
- Employee List
- Appointment History
- Call History
- Department/Scenario/Lead Source lists
- Role List

**Expected Props:**
```typescript
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;
  pagination?: boolean;
}
```

#### SearchInput
**File:** `client/src/components/common/SearchInput.tsx`  
**Purpose:** Standardized search input with icon and styling  

**Where Used:**
- All list/table pages
- Consistent search UX across application

#### StatusToggle
**File:** `client/src/components/common/StatusToggle.tsx`  
**Purpose:** Reusable status toggle switch (Active/Inactive)  

**Where Used:**
- Dealer List
- Employee List
- Any entity with enabled/disabled states

### UI Components (shadcn/ui)

The application uses 40+ shadcn/ui components. Key components include:

#### Accordion
**File:** `client/src/components/ui/accordion.tsx`  
**Usage:** Expandable content sections  
**Based on:** Radix UI Accordion

#### Alert Dialog
**File:** `client/src/components/ui/alert-dialog.tsx`  
**Usage:** Confirmation dialogs for destructive actions (e.g., delete confirmations)  
**Based on:** Radix UI Alert Dialog

#### Avatar
**File:** `client/src/components/ui/avatar.tsx`  
**Usage:** User profile pictures  
**Based on:** Radix UI Avatar

#### Button
**File:** `client/src/components/ui/button.tsx`  
**Usage:** Primary UI interaction element  
**Variants:** default, destructive, outline, secondary, ghost, link  
**Sizes:** default, sm, lg, icon

#### Calendar
**File:** `client/src/components/ui/calendar.tsx`  
**Usage:** Date picker in dashboard and appointment forms  
**Based on:** react-day-picker

#### Card
**File:** `client/src/components/ui/card.tsx`  
**Usage:** Container for grouped content (dashboard stats, forms, tables)  
**Sub-components:** CardHeader, CardTitle, CardDescription, CardContent, CardFooter

#### Checkbox
**File:** `client/src/components/ui/checkbox.tsx`  
**Usage:** Multi-select options, permission checkboxes  
**Based on:** Radix UI Checkbox

#### Collapsible
**File:** `client/src/components/ui/collapsible.tsx`  
**Usage:** Sidebar navigation sections  
**Based on:** Radix UI Collapsible

#### Dialog
**File:** `client/src/components/ui/dialog.tsx`  
**Usage:** Modal windows for forms and details  
**Based on:** Radix UI Dialog

#### Dropdown Menu
**File:** `client/src/components/ui/dropdown-menu.tsx`  
**Usage:** Action menus (dealer/employee actions, user profile menu)  
**Based on:** Radix UI Dropdown Menu

#### Form
**File:** `client/src/components/ui/form.tsx`  
**Usage:** Form validation and error handling wrapper  
**Based on:** React Hook Form + Zod

#### Input
**File:** `client/src/components/ui/input.tsx`  
**Usage:** Text input fields throughout application

#### Label
**File:** `client/src/components/ui/label.tsx`  
**Usage:** Form field labels  
**Based on:** Radix UI Label

#### Popover
**File:** `client/src/components/ui/popover.tsx`  
**Usage:** Calendar date pickers, contextual menus  
**Based on:** Radix UI Popover

#### Select
**File:** `client/src/components/ui/select.tsx`  
**Usage:** Dropdown selections (dealership, department, scenario, etc.)  
**Based on:** Radix UI Select

#### Switch
**File:** `client/src/components/ui/switch.tsx`  
**Usage:** Status toggles (Active/Inactive)  
**Based on:** Radix UI Switch

#### Table
**File:** `client/src/components/ui/table.tsx`  
**Usage:** Data tables across all list pages  
**Sub-components:** Table, TableHeader, TableBody, TableHead, TableRow, TableCell

#### Tabs
**File:** `client/src/components/ui/tabs.tsx`  
**Usage:** Login page (Agent/Dealership tabs)  
**Based on:** Radix UI Tabs

#### Textarea
**File:** `client/src/components/ui/textarea.tsx`  
**Usage:** Multi-line text input (comments, notes)

#### Toast
**File:** `client/src/components/ui/toast.tsx`  
**Usage:** Success/error notifications  
**Based on:** Radix UI Toast

#### Tooltip
**File:** `client/src/components/ui/tooltip.tsx`  
**Usage:** Hover hints and explanations  
**Based on:** Radix UI Tooltip

**Full UI Component List (40+ components):**
accordion, alert-dialog, alert, aspect-ratio, avatar, badge, breadcrumb, button, calendar, card, carousel, chart, checkbox, collapsible, command, context-menu, dialog, drawer, dropdown-menu, form, hover-card, input-otp, input, label, menubar, navigation-menu, pagination, popover, progress, radio-group, resizable, scroll-area, select, separator, sheet, sidebar, skeleton, slider, switch, table, tabs, textarea, toast, toaster, toggle-group, toggle, tooltip

## 4.3 Reusable Components

### Highly Reused Components

#### Button
**Used in:** Every page  
**Variants used:** default (primary actions), ghost (navigation), outline (secondary)  
**Example usage:**
```tsx
<Button onClick={handleSubmit}>Save</Button>
<Button variant="outline" onClick={handleCancel}>Cancel</Button>
<Button variant="ghost">View Details</Button>
```

#### Card
**Used in:** Dashboard (stats), form pages (wrappers), list pages  
**Pattern:**
```tsx
<Card>
  <CardHeader>
    <CardTitle>Section Title</CardTitle>
  </CardHeader>
  <CardContent>
    {/* Content */}
  </CardContent>
</Card>
```

#### Table
**Used in:** All list and history pages (15+ pages)  
**Pattern:**
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Column 1</TableHead>
      <TableHead>Column 2</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map(item => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.value}</TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

#### Select
**Used in:** All forms (20+ instances)  
**Common selections:** Dealership, Department, Scenario, Lead Source  
**Pattern:**
```tsx
<Select value={value} onValueChange={setValue}>
  <SelectTrigger>
    <SelectValue placeholder="Select..." />
  </SelectTrigger>
  <SelectContent>
    <SelectItem value="option1">Option 1</SelectItem>
    <SelectItem value="option2">Option 2</SelectItem>
  </SelectContent>
</Select>
```

#### DropdownMenu
**Used in:** Dealer List, Employee List, Header (profile menu)  
**Pattern:**
```tsx
<DropdownMenu>
  <DropdownMenuTrigger asChild>
    <Button variant="ghost" size="sm">
      <MoreHorizontal className="h-4 w-4" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent>
    <DropdownMenuItem onClick={handleView}>
      <Eye className="mr-2 h-4 w-4" />
      View
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleEdit}>
      <Edit className="mr-2 h-4 w-4" />
      Edit
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleDelete}>
      <Trash2 className="mr-2 h-4 w-4" />
      Delete
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

## 4.4 Component Props Interfaces

### Layout Components

```typescript
// Sidebar
interface SidebarProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Header (no props - uses internal state and hooks)

// Layout
interface LayoutProps {
  children: React.ReactNode;
}
```

### Common Components

```typescript
// DataTable (expected structure)
interface DataTableProps<T> {
  data: T[];
  columns: ColumnDef<T>[];
  searchable?: boolean;
  searchPlaceholder?: string;
  pagination?: boolean;
  pageSize?: number;
}

// SearchInput
interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

// StatusToggle
interface StatusToggleProps {
  checked: boolean;
  onCheckedChange: (checked: boolean) => void;
  disabled?: boolean;
}
```

### UI Components (Selected)

```typescript
// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
  size?: "default" | "sm" | "lg" | "icon";
  asChild?: boolean;
}

// Card
interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

// Select
interface SelectProps {
  value?: string;
  onValueChange?: (value: string) => void;
  defaultValue?: string;
  disabled?: boolean;
}

// Switch
interface SwitchProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

// Dialog
interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}
```

## 4.5 Icon Usage

**Library:** Lucide React (`lucide-react`)

**Common Icons:**
- `User`, `Users` - User-related features
- `Building2` - Dealers/Dealerships
- `Trophy` - Leaderboard
- `Bell` - Notifications
- `Calendar`, `CalendarIcon` - Dates and appointments
- `Settings`, `SettingsIcon` - Settings pages
- `Plus` - Create/Add actions
- `Edit`, `Trash2`, `Eye` - CRUD actions
- `ChevronRight`, `ChevronDown` - Collapsible indicators
- `MoreHorizontal` - Action menus
- `Info`, `Target`, `Database` - Feature indicators
- `MessageSquare`, `Clock` - Communication features
- `KeyRound` - Security/Access
- `Menu` - Mobile navigation

**Company Logos:** React Icons (`react-icons/si` or `/fc`)
- `FcGoogle` - Google OAuth

## 4.6 Styling Patterns

### Utility Classes (Tailwind CSS)

**Common Patterns:**

**Layout:**
- `flex`, `flex-col`, `flex-1` - Flexbox layouts
- `grid`, `grid-cols-2` - Grid layouts
- `space-x-*`, `space-y-*` - Spacing between children
- `gap-*` - Grid/flex gaps

**Colors:**
- `bg-blue-600`, `text-blue-600` - Primary blue
- `bg-white`, `text-gray-900` - Neutral palette
- `bg-gray-50` - Background color
- `hover:bg-blue-700` - Hover states

**Spacing:**
- `p-4`, `p-6` - Padding
- `m-*` - Margin
- `px-*`, `py-*` - Horizontal/vertical padding

**Typography:**
- `text-2xl`, `text-sm` - Font sizes
- `font-semibold`, `font-bold` - Font weights

**Borders & Shadows:**
- `border`, `border-gray-200` - Borders
- `rounded-lg` - Border radius
- `shadow-lg` - Drop shadows

**Responsive:**
- `lg:hidden`, `lg:translate-x-0` - Breakpoint-specific

### Component Composition

**Pattern:** Radix UI primitives + Tailwind CSS + class-variance-authority

Example from `button.tsx`:
```tsx
const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium",
  {
    variants: {
      variant: {
        default: "bg-blue-600 text-white hover:bg-blue-700",
        outline: "border border-gray-300 bg-white hover:bg-gray-50",
        ghost: "hover:bg-gray-100",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 px-3",
        lg: "h-11 px-8",
      },
    },
  }
);
```

## 4.7 Component Best Practices

1. **Use shadcn/ui components** - Leverage existing UI library before creating custom components
2. **Consistent spacing** - Use Tailwind's spacing scale
3. **Accessible by default** - Radix UI provides ARIA attributes
4. **Responsive design** - Mobile-first with `lg:` breakpoints
5. **Type safety** - All components use TypeScript
6. **Composition over configuration** - Compose smaller components
7. **Separation of concerns** - UI components in `/ui`, business logic in pages
8. **Reusable patterns** - Extract common patterns into shared components

## 4.8 Future Component Enhancements

**Planned:**
- [ ] Standardized DataTable component implementation
- [ ] Loading skeleton components for async states
- [ ] Error boundary components
- [ ] Confirmation dialog wrapper
- [ ] Form field wrappers with consistent validation display
- [ ] Pagination component
- [ ] Date range picker component
- [ ] File upload component
- [ ] Rich text editor component
