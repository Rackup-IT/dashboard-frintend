# NAVIGATION DOCUMENTATION

## 8.1 Sidebar Menu Structure

**File:** `client/src/components/layout/Sidebar.tsx`

### Complete Sidebar Hierarchy

```
BDC Professionals Logo
│
├─ User Info: "Hi, Admin Admin!"
│
├─ MAIN NAVIGATION (Always Visible)
│  ├─ 🏆 Leaderboard → /leaderboard
│  ├─ ℹ️ Dealer Info → /dealer-info
│  └─ 🔔 Dealer Notification → /dealer-notification
│
├─ 👤 MY PROFILE (Collapsible)
│  ├─ Appointment History → /appointment/history
│  ├─ My Stats → /my-statistics
│  ├─ Call History → /call-history
│  ├─ Schedule & Shift → /schedule-shift
│  └─ RC - Agent Activity → /rc-agent-activity
│
├─ 👥 MANAGER (Collapsible)
│  ├─ Dashboard → /dashboard
│  ├─ Dealer List → /admin/dealer-list
│  ├─ User List → /admin/employee-list
│  ├─ Appointment History → /admin/appointment-history
│  ├─ Call History → /admin/call-history
│  ├─ Appointment Export → /admin/appointment-export
│  └─ RC - Agent Activity → /admin/rc-agent-activity
│
├─ ⚙️ ADMIN (Collapsible)
│  ├─ 🏢 Dealer List → /admin/dealer-list
│  ├─ ✓ User List → /admin/employee-list
│  ├─ 📋 Department List → /admin/department-list
│  ├─ 🎯 Scenario List → /admin/scenario-list
│  ├─ 💾 Lead Source → /admin/lead-source
│  ├─ 🔑 Dealership Logins → /admin/dealership-logins
│  ├─ 🔐 Role & Permission → /admin/roles
│  ├─ 💬 Sms & Logs → /admin/sms-logs
│  └─ ⏰ Pending Sms → /admin/pending-sms
│
└─ ⚙️ SETTINGS (Collapsible)
   ├─ General Settings → /settings/general
   └─ Ring Central Settings → /settings/ring-central
```

### Navigation Item Definitions

**navItems** (Main Navigation):
```typescript
const navItems = [
  { href: "/leaderboard", label: "Leaderboard", icon: Trophy },
  { href: "/dealer-info", label: "Dealer Info", icon: Info },
  { href: "/dealer-notification", label: "Dealer Notification", icon: Bell },
];
```

**profileItems** (My Profile Submenu):
```typescript
const profileItems = [
  { href: "/appointment/history", label: "Appointment History" },
  { href: "/my-statistics", label: "My Stats" },
  { href: "/call-history", label: "Call History" },
  { href: "/schedule-shift", label: "Schedule & Shift" },
  { href: "/rc-agent-activity", label: "RC - Agent Activity" },
];
```

**managerItems** (Manager Submenu):
```typescript
const managerItems = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/admin/dealer-list", label: "Dealer List" },
  { href: "/admin/employee-list", label: "User List" },
  { href: "/admin/appointment-history", label: "Appointment History" },
  { href: "/admin/call-history", label: "Call History" },
  { href: "/admin/appointment-export", label: "Appointment Export" },
  { href: "/admin/rc-agent-activity", label: "RC - Agent Activity" },
];
```

**adminItems** (Admin Submenu):
```typescript
const adminItems = [
  { href: "/admin/dealer-list", label: "Dealer List", icon: Building2 },
  { href: "/admin/employee-list", label: "User List", icon: UserCheck },
  { href: "/admin/department-list", label: "Department List", icon: List },
  { href: "/admin/scenario-list", label: "Scenario List", icon: Target },
  { href: "/admin/lead-source", label: "Lead Source", icon: Database },
  { href: "/admin/dealership-logins", label: "Dealership Logins", icon: KeyRound },
  { href: "/admin/roles", label: "Role & Permission", icon: KeyRound },
  { href: "/admin/sms-logs", label: "Sms & Logs", icon: MessageSquare },
  { href: "/admin/pending-sms", label: "Pending Sms", icon: Clock },
];
```

**settingsItems** (Settings Submenu):
```typescript
const settingsItems = [
  { href: "/settings/general", label: "General Settings" },
  { href: "/settings/ring-central", label: "Ring Central Settings" },
];
```

## 8.2 Nested Navigation

### Collapsible Sections

**Component:** Radix UI Collapsible

**State Management:**
```typescript
const [profileOpen, setProfileOpen] = useState(false);
const [managerOpen, setManagerOpen] = useState(true);  // Default open
const [adminOpen, setAdminOpen] = useState(true);     // Default open
const [settingsOpen, setSettingsOpen] = useState(false);
```

**Default State:**
- Main Navigation: Always visible (no collapse)
- My Profile: Collapsed
- Manager: Expanded
- Admin: Expanded
- Settings: Collapsed

**User can:**
- Click section header to toggle expand/collapse
- Chevron icon indicates state:
  - ChevronDown (▼) - Expanded
  - ChevronRight (▶) - Collapsed

### Nesting Pattern

```tsx
<Collapsible open={managerOpen} onOpenChange={setManagerOpen}>
  <CollapsibleTrigger asChild>
    <Button variant="ghost" className="w-full justify-between">
      <div className="flex items-center">
        <User className="mr-3 h-4 w-4" />
        Manager
      </div>
      {managerOpen ? (
        <ChevronDown className="h-4 w-4" />
      ) : (
        <ChevronRight className="h-4 w-4" />
      )}
    </Button>
  </CollapsibleTrigger>
  <CollapsibleContent className="ml-8 space-y-1">
    {managerItems.map((item) => (
      <Link key={item.href} href={item.href}>
        <Button variant="ghost" size="sm">
          {item.label}
        </Button>
      </Link>
    ))}
  </CollapsibleContent>
</Collapsible>
```

## 8.3 Active Route Highlighting

### Detection Logic

```typescript
const isActive = (href: string) => {
  if (href === "/dashboard") return location === "/dashboard";
  return location.startsWith(href);
};
```

**Special Cases:**
- Dashboard: Exact match only (to avoid matching `/dashboard-xyz`)
- All others: Prefix match (e.g., `/admin/dealer-list` matches `/admin/dealer-list/*`)

### Visual Indication

**Active State Styling:**
```tsx
<Button
  className={cn(
    "w-full justify-start",
    isActive(item.href) && "bg-blue-50 text-blue-600"
  )}
>
```

**Active route gets:**
- Background: `bg-blue-50` (light blue)
- Text color: `text-blue-600` (blue)
- Font weight: Inherits button default (medium)

**Inactive routes:**
- Background: Transparent
- Text color: `text-gray-700`
- Hover: `hover:bg-gray-100`

## 8.4 Responsive Behavior

### Desktop (≥ 1024px)

```
┌─────────┬──────────────────┐
│         │                  │
│ Sidebar │   Main Content   │
│ (fixed) │   (scrollable)   │
│         │                  │
│         │                  │
└─────────┴──────────────────┘
```

- Sidebar always visible
- Width: 256px (w-64)
- Position: Fixed on left
- Content area: Flex-1 (remaining space)

### Mobile (< 1024px)

**Closed State:**
```
┌──────────────────────────┐
│ ☰  Main Content          │
│                          │
│   (full width)           │
└──────────────────────────┘
```

- Sidebar: Hidden off-screen (translate-x-full)
- Hamburger menu in header
- Content: Full width

**Open State:**
```
┌──────┬───────────────────┐
│      │ [Dark Overlay]    │
│ Side │                   │
│ bar  │  Content dimmed   │
│      │                   │
└──────┴───────────────────┘
```

- Sidebar: Slides in from left (translate-x-0)
- Dark overlay: `bg-black bg-opacity-50` covers content
- Clicking overlay closes sidebar
- z-index: Sidebar (50), Overlay (40)

### Transition

```tsx
className={cn(
  "w-64 bg-white shadow-lg flex flex-col fixed lg:relative z-50 h-full",
  "transition-transform duration-300 ease-in-out",
  open ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
)}
```

- Duration: 300ms
- Easing: ease-in-out
- Transform: translateX

## 8.5 Mobile Overlay

**Overlay Element:**
```tsx
{open && (
  <div
    className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
    onClick={() => setOpen(false)}
  />
)}
```

**Purpose:**
- Dim background content
- Indicate sidebar is modal on mobile
- Close sidebar when clicked

**Behavior:**
- Only rendered when `open === true`
- Only visible on mobile (`lg:hidden`)
- Click handler: `setOpen(false)`
- z-index: 40 (below sidebar's 50)

## 8.6 Logo and Branding

**Location:** Top of sidebar

```tsx
<div className="p-4 border-b border-gray-200">
  <div className="flex items-center space-x-3">
    <img 
      src={companyLogo} 
      alt="Company Logo" 
      className="h-10 w-auto object-contain"
    />
    <span className="font-semibold text-lg text-gray-800">
      BDC Professionals
    </span>
  </div>
</div>
```

**Logo:**
- Source: `@assets/WhatsApp Image...jpeg`
- Height: 40px (h-10)
- Width: Auto (maintains aspect ratio)
- Object-fit: Contain

**Company Name:**
- Text: "BDC Professionals"
- Size: text-lg (18px)
- Weight: font-semibold
- Color: text-gray-800

## 8.7 User Info Display

**Location:** Below logo, above navigation

```tsx
<div className="p-4 border-b border-gray-200">
  <div className="flex items-center space-x-2">
    <User className="text-gray-400 h-5 w-5" />
    <span className="text-sm text-gray-600">Hi, Admin Admin!</span>
  </div>
</div>
```

**Displayed:**
- User icon (Lucide React)
- Greeting: "Hi, [User Name]!"
- Currently hardcoded
- To be dynamic based on logged-in user

## 8.8 Header Navigation

**File:** `client/src/components/layout/Header.tsx`

### Header Structure

```
┌────────────────────────────────────────────┐
│ ☰  Dashboard / Current Page    🔔  👤▼    │
└────────────────────────────────────────────┘
```

**Components:**
1. **Hamburger Menu** (Mobile only)
   - Icon: Menu (three horizontal lines)
   - Action: Toggle sidebar open/closed
   - Visible: `lg:hidden`

2. **Page Title & Breadcrumb**
   - Format: "Dashboard / Current Page"
   - Dynamic based on current route
   - Font: Large, bold

3. **Notification Bell**
   - Icon: Bell
   - Action: Open notifications panel (to be implemented)
   - Badge: Unread count (to be implemented)

4. **Profile Dropdown**
   - Trigger: User icon with chevron
   - Dropdown menu:
     * User info display
     * Logout button

### Profile Dropdown Menu

```tsx
<DropdownMenu>
  <DropdownMenuTrigger>
    <Button variant="ghost" size="sm">
      <User className="h-5 w-5" />
      <ChevronDown className="h-4 w-4 ml-1" />
    </Button>
  </DropdownMenuTrigger>
  <DropdownMenuContent align="end">
    <DropdownMenuItem disabled>
      <div className="flex flex-col">
        <span className="font-medium">Admin Admin</span>
        <span className="text-sm text-gray-500">admin@truebdc.com</span>
      </div>
    </DropdownMenuItem>
    <DropdownMenuItem onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Logout
    </DropdownMenuItem>
  </DropdownMenuContent>
</DropdownMenu>
```

**Logout Action:**
```typescript
const handleLogout = () => {
  setLocation("/login");
  // To be implemented:
  // - Clear session
  // - Clear user data
  // - Call logout API
};
```

## 8.9 Breadcrumb Navigation

**Current Implementation:** Simple text display

**Format:** "Dashboard / [Current Page Name]"

**Examples:**
- Dashboard page: "Dashboard / Dashboard"
- Dealer List: "Dashboard / Dealer List"
- Create Dealer: "Dashboard / Dealer List / Create Dealer"

**Planned Enhancement:**
```tsx
<Breadcrumb>
  <BreadcrumbList>
    <BreadcrumbItem>
      <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbLink href="/admin/dealer-list">Dealer List</BreadcrumbLink>
    </BreadcrumbItem>
    <BreadcrumbSeparator />
    <BreadcrumbItem>
      <BreadcrumbPage>Create Dealer</BreadcrumbPage>
    </BreadcrumbItem>
  </BreadcrumbList>
</Breadcrumb>
```

**Features to add:**
- Clickable links for parent paths
- Dynamic generation based on route
- Icon support for visual hierarchy

## 8.10 Navigation Component Interactions

### Opening Sidebar (Mobile)

```
User clicks hamburger → Header calls setOpen(true) → 
Sidebar translates from left → Overlay appears → 
Content dimmed
```

### Closing Sidebar (Mobile)

**Three ways:**
1. Click overlay → `setOpen(false)`
2. Click nav link → Link `onClick={() => setOpen(false)}`
3. Click hamburger again → `setOpen(false)`

### Navigation Flow

```
User clicks nav item → 
wouter Link navigates → 
Route changes → 
Active highlighting updates → 
Sidebar closes (mobile) → 
Content area loads new page
```

## 8.11 Accessibility

**Keyboard Navigation:**
- Tab through navigation items
- Enter/Space to activate links
- Escape to close dropdown/overlay

**ARIA Labels:**
- Collapsible sections have `aria-expanded`
- Active links have `aria-current="page"`
- Mobile menu toggle has `aria-label="Toggle navigation"`

**Screen Readers:**
- Semantic HTML (`<nav>`, `<button>`, `<a>`)
- Descriptive link text
- Role attributes from Radix UI

## 8.12 Navigation Best Practices

1. **Consistent Structure** - Same navigation across all pages
2. **Visual Feedback** - Clear active state, hover effects
3. **Mobile-First** - Collapsible sidebar, touch-friendly
4. **Performance** - Icons lazy-loaded, no unnecessary re-renders
5. **Accessibility** - Keyboard navigation, screen reader support
6. **Flexibility** - Easy to add/remove items, role-based hiding

## 8.13 Future Navigation Enhancements

**Planned:**
- [ ] Role-based menu visibility (hide inaccessible items)
- [ ] Notification badge counts
- [ ] Recently visited pages quick access
- [ ] Keyboard shortcuts (Cmd+K command palette)
- [ ] Pin favorite pages
- [ ] Nested multi-level navigation (if needed)
- [ ] Notification dropdown panel
- [ ] User profile page from dropdown
- [ ] Dark mode toggle in sidebar
- [ ] Collapsible sidebar (desktop) for more content space

**Command Palette (Future):**
```
Cmd+K / Ctrl+K → Opens search palette →
User types "dealer" → Filters to dealer-related pages →
Arrow keys to select → Enter to navigate
```

Using `cmdk` package (already installed).
