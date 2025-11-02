# ROUTING DOCUMENTATION

## 2.1 Complete Route List

| Route Path | Component | Access Level | Description |
|------------|-----------|--------------|-------------|
| `/` | Redirect to /login | Public | Root - redirects to login |
| `/login` | Login | Public | Authentication page with Agent/Dealership tabs |
| `/dashboard` | Dashboard | Authenticated | Main dashboard with stats and metrics |
| `/leaderboard` | Leaderboard | Authenticated | Agent performance leaderboard |
| `/dealer-info` | DealerInfo | Authenticated | View dealer contact information |
| `/dealer-notification` | DealerNotification | Authenticated | Create appointment/notification |
| `/appointment/create` | AppointmentForm | Authenticated | Create new appointment |
| `/appointment/history` | AppointmentHistory | Authenticated | View personal appointment history |
| `/my-statistics` | MyStatistics | Authenticated | View personal performance statistics |
| `/call-history` | CallHistory | Authenticated | View personal call history |
| `/schedule-shift` | ScheduleShift | Authenticated | View/manage personal schedule |
| `/rc-agent-activity` | RCAgentActivity | Authenticated | View Ring Central agent activity |
| `/admin/dealer-list` | DealerList | Admin/Manager | Manage all dealers |
| `/admin/dealer-list/create` | AddDealer | Admin | Create new dealer |
| `/admin/dealers/:id/edit` | EditDealer | Admin | Edit specific dealer |
| `/admin/dealers/:id` | ViewDealer | Admin | View dealer details |
| `/admin/dealer/:id/schedule-shift` | DealerScheduleShift | Admin | Manage dealer schedule |
| `/admin/employee-list` | EmployeeList | Admin/Manager | Manage employees/users |
| `/admin/employee-list/create` | AddEmployee | Admin | Create new employee |
| `/admin/users/create` | AddEmployee | Admin | Create new user (alias route) |
| `/admin/appointment-history` | AdminAppointmentHistory | Admin/Manager | View all appointments |
| `/admin/call-history` | AdminCallHistory | Admin/Manager | View all call history |
| `/admin/appointment-export` | AppointmentExport | Admin/Manager | Export appointment data |
| `/admin/rc-agent-activity` | AdminRCAgentActivity | Admin/Manager | View all RC agent activity |
| `/admin/department-list` | DepartmentList | Admin | Manage departments |
| `/admin/scenario-list` | ScenarioList | Admin | Manage scenarios |
| `/admin/lead-source` | LeadSource | Admin | Manage lead sources |
| `/admin/dealership-logins` | DealershipLogins | Admin | Manage dealership credentials |
| `/admin/dealerships/create` | AddDealership | Admin | Create new dealership |
| `/admin/dealerships/:id/edit` | EditDealership | Admin | Edit specific dealership |
| `/admin/roles` | RoleList | Admin | View all roles |
| `/admin/roles/:id/edit` | EditRole | Admin | Edit role permissions |
| `/admin/role-permission` | RolePermission | Admin | Manage role permissions |
| `/admin/sms-logs` | SmsLogs | Admin | View SMS communication logs |
| `/admin/pending-sms` | PendingSms | Admin | View pending SMS queue |
| `/settings/general` | GeneralSettings | Admin | Configure general settings |
| `/settings/ring-central` | RingCentralSettings | Admin | Configure Ring Central integration |
| `*` (404) | NotFound | Public | Not found page for invalid routes |

## 2.2 Route Protection

### Current Implementation
**Status**: ⚠️ Route protection not yet enforced - authentication UI complete, logic pending

**Planned Protection Strategy**:
- All routes except `/` and `/login` should require authentication
- Admin routes (`/admin/*`) should require admin role
- Manager routes should require manager or admin role
- Settings routes (`/settings/*`) should require admin role

### Public Routes (No Authentication Required)
- `/` - Root (redirects to login)
- `/login` - Login page

### Protected Routes (Authentication Required)
**Agent Level**:
- `/leaderboard` - View performance rankings
- `/dealer-info` - Access dealer contact information
- `/dealer-notification` - Create appointments
- `/appointment/create` - Create appointments (alternate route)
- `/appointment/history` - Personal appointment history
- `/my-statistics` - Personal statistics
- `/call-history` - Personal call logs
- `/schedule-shift` - Personal schedule
- `/rc-agent-activity` - Personal RC activity

**Manager Level** (Manager + Admin):
- `/dashboard` - Dashboard with team metrics
- `/admin/dealer-list` - View dealer list
- `/admin/employee-list` - View employee list
- `/admin/appointment-history` - All appointments
- `/admin/call-history` - All call history
- `/admin/appointment-export` - Export data
- `/admin/rc-agent-activity` - All RC activity

**Admin Only**:
- `/admin/dealer-list/create` - Add dealers
- `/admin/dealers/:id/edit` - Edit dealers
- `/admin/dealers/:id` - View dealer details
- `/admin/dealer/:id/schedule-shift` - Manage dealer schedules
- `/admin/employee-list/create` - Add employees
- `/admin/users/create` - Add users
- `/admin/department-list` - Manage departments
- `/admin/scenario-list` - Manage scenarios
- `/admin/lead-source` - Manage lead sources
- `/admin/dealership-logins` - Manage dealership access
- `/admin/dealerships/create` - Add dealerships
- `/admin/dealerships/:id/edit` - Edit dealerships
- `/admin/roles` - View roles
- `/admin/roles/:id/edit` - Edit roles
- `/admin/role-permission` - Manage permissions
- `/admin/sms-logs` - View SMS logs
- `/admin/pending-sms` - View pending SMS
- `/settings/general` - General settings
- `/settings/ring-central` - RC settings

### Route Protection Mechanism (Prepared)
**File**: `client/src/App.tsx`
**Method**: Layout wrapper pattern

Current routing logic:
```typescript
function Router() {
  const [location] = useLocation();
  
  // Login page bypasses layout
  if (location === "/login") {
    return <Login />;
  }
  
  // All other routes wrapped in Layout
  return (
    <Layout>
      <Switch>
        {/* Routes */}
      </Switch>
    </Layout>
  );
}
```

**To Implement**:
- Authentication check in Router component
- Redirect to `/login` if not authenticated
- Role checking in Layout or individual routes
- Protected route wrapper component

## 2.3 Navigation Structure

### Sidebar Navigation (Primary)
**File**: `client/src/components/layout/Sidebar.tsx`

The sidebar provides hierarchical navigation organized by user role:

**Main Navigation** (Always Visible):
- Leaderboard (`/leaderboard`)
- Dealer Info (`/dealer-info`)
- Dealer Notification (`/dealer-notification`)

**My Profile** (Collapsible):
- Appointment History (`/appointment/history`)
- My Stats (`/my-statistics`)
- Call History (`/call-history`)
- Schedule & Shift (`/schedule-shift`)
- RC - Agent Activity (`/rc-agent-activity`)

**Manager** (Collapsible):
- Dashboard (`/dashboard`)
- Dealer List (`/admin/dealer-list`)
- User List (`/admin/employee-list`)
- Appointment History (`/admin/appointment-history`)
- Call History (`/admin/call-history`)
- Appointment Export (`/admin/appointment-export`)
- RC - Agent Activity (`/admin/rc-agent-activity`)

**Admin** (Collapsible):
- Dealer List (`/admin/dealer-list`)
- User List (`/admin/employee-list`)
- Department List (`/admin/department-list`)
- Scenario List (`/admin/scenario-list`)
- Lead Source (`/admin/lead-source`)
- Dealership Logins (`/admin/dealership-logins`)
- Role & Permission (`/admin/roles`)
- Sms & Logs (`/admin/sms-logs`)
- Pending Sms (`/admin/pending-sms`)

**Settings** (Collapsible):
- General Settings (`/settings/general`)
- Ring Central Settings (`/settings/ring-central`)

### Header Navigation
**File**: `client/src/components/layout/Header.tsx`

Header provides:
- Mobile menu toggle (hamburger icon)
- Page title and breadcrumb
- Notification bell icon
- User profile dropdown with logout option

### Breadcrumb Navigation
Currently shows: "Dashboard / [Current Page]"

Future enhancement: Dynamic breadcrumbs based on route hierarchy

### Navigation Behavior
- **Desktop** (>= 1024px): Sidebar always visible
- **Mobile** (< 1024px): Sidebar hidden by default, toggle via hamburger
- **Active Route Highlighting**: Blue background (`bg-blue-50 text-blue-600`)
- **Collapsible Sections**: Expand/collapse with chevron icons
- **Auto-close**: Mobile sidebar closes when route changes

## 2.4 Route Parameters

### Dynamic Routes with Parameters

#### Dealer Routes
```typescript
/admin/dealers/:id/edit
```
- **Parameter**: `:id` - Dealer ID (number)
- **Usage**: Edit dealer with specific ID
- **Component**: EditDealer
- **Example**: `/admin/dealers/5/edit` - Edit dealer #5

```typescript
/admin/dealers/:id
```
- **Parameter**: `:id` - Dealer ID (number)
- **Usage**: View dealer details
- **Component**: ViewDealer
- **Example**: `/admin/dealers/5` - View dealer #5

```typescript
/admin/dealer/:id/schedule-shift
```
- **Parameter**: `:id` - Dealer ID (number)
- **Usage**: Manage schedule for specific dealer
- **Component**: DealerScheduleShift
- **Example**: `/admin/dealer/5/schedule-shift` - Manage dealer #5 schedule

#### Dealership Routes
```typescript
/admin/dealerships/:id/edit
```
- **Parameter**: `:id` - Dealership ID (number)
- **Usage**: Edit dealership configuration
- **Component**: EditDealership
- **Example**: `/admin/dealerships/3/edit` - Edit dealership #3

#### Role Routes
```typescript
/admin/roles/:id/edit
```
- **Parameter**: `:id` - Role ID (number)
- **Usage**: Edit role permissions
- **Component**: EditRole
- **Example**: `/admin/roles/2/edit` - Edit role #2 (Manager)

### Parameter Access Pattern

Components access route parameters using wouter's `useRoute` hook:

```typescript
import { useRoute } from "wouter";

function EditDealer() {
  const [, params] = useRoute("/admin/dealers/:id/edit");
  const dealerId = params?.id;
  
  // Fetch dealer data using dealerId
}
```

### Query Parameters

No query parameters are currently implemented in routing, but they can be added using standard URL search parameters:

```typescript
const [location, setLocation] = useLocation();
const searchParams = new URLSearchParams(window.location.search);
const filter = searchParams.get('filter');
```

## 2.5 Routing Configuration

### Router Library
**wouter** `3.3.5` - Minimalist routing solution

**Why wouter**:
- Tiny bundle size (~1.5KB vs React Router's ~8KB)
- Hooks-based API similar to React Router
- Sufficient for single-page applications
- No feature bloat

### Route Matching
- **Exact Match**: Root route (`/`) handled separately
- **Prefix Match**: Used for nested routes with `startsWith()`
- **Parameter Match**: Dynamic segments with `:param` syntax
- **Catch-all**: `component={NotFound}` as last route

### Special Routing Logic

**Root Redirect**:
```typescript
<Route path="/">
  {() => <Redirect to="/login" />}
</Route>
```

**Login Bypass**:
Login page renders outside the Layout component to avoid sidebar/header:
```typescript
if (location === "/login") {
  return <Login />;
}
```

## 2.6 Navigation Utilities

### Programmatic Navigation
```typescript
import { useLocation } from "wouter";

function Component() {
  const [, setLocation] = useLocation();
  
  const navigateToDashboard = () => {
    setLocation("/dashboard");
  };
}
```

### Link Component
```typescript
import { Link } from "wouter";

<Link href="/dealer-info">
  <Button>View Dealers</Button>
</Link>
```

### Active Route Detection
```typescript
const isActive = (href: string) => {
  if (href === "/dashboard") return location === "/dashboard";
  return location.startsWith(href);
};
```

## 2.7 Future Enhancements

### Planned Improvements
- [ ] Implement authentication middleware
- [ ] Add role-based route guards
- [ ] Dynamic breadcrumb generation
- [ ] Route transitions/animations
- [ ] Query parameter utilities
- [ ] Route-based code splitting
- [ ] Protected route wrapper component
- [ ] Redirect to last visited page after login
