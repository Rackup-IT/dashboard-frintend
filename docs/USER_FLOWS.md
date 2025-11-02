# USER INTERACTION FLOWS

This document outlines complete user journeys for all major features in the BDC Professionals application.

---

## Flow 1: User Login

### Agent Login Flow

```
1. User navigates to application root (/)
   ↓
2. System redirects to /login
   ↓
3. Login page loads with "Agent Login" tab active
   ↓
4. User enters credentials:
   - Email address: agent@example.com
   - Password: ••••••••
   ↓
5. Optional: User checks "Remember Me"
   ↓
6. Optional: User toggles password visibility (eye icon)
   ↓
7. User clicks "Login" button (blue, full width)
   ↓
8. Current behavior:
   - Navigate to /dashboard
   ↓
9. Planned behavior:
   - Validate email format
   - Check if fields are not empty
   - POST /api/auth/login with credentials
   - If success:
     * Store session token (httpOnly cookie)
     * Store user data in context
     * Navigate to /dashboard (admin/manager) or /leaderboard (agent)
   - If error:
     * Display error message below form
     * Highlight invalid fields
     * Keep password field cleared for security
     * Keep email field filled
```

### Google OAuth Flow (Agent Only)

```
1. Agent Login tab active
   ↓
2. User sees "OR" divider
   ↓
3. User sees "Login with Google" button (with Google icon)
   ↓
4. User clicks Google button
   ↓
5. Current behavior:
   - Navigate to /dashboard
   ↓
6. Planned behavior:
   - Redirect to Google OAuth consent screen
   - User grants permissions
   - Redirect to /auth/google/callback
   - Backend processes OAuth token
   - Create or link user account
   - Store session
   - Navigate to appropriate dashboard
```

### Dealership Login Flow

```
1. User clicks "Dealership Login" tab
   ↓
2. Tab switches to Dealership Login
   - No Google OAuth option shown
   - Only email/password fields
   ↓
3. User enters dealership credentials
   ↓
4. User clicks "Login"
   ↓
5. Same authentication flow as Agent Login
   - Different user role (Dealership)
   - Different permissions
   - Possibly different default route
```

### Forgot Password Flow

```
1. User clicks "Forgot Password?" link
   ↓
2. Navigate to /forgot-password (to be created)
   ↓
3. User enters email address
   ↓
4. System sends password reset email
   ↓
5. User clicks link in email
   ↓
6. Navigate to /reset-password?token=...
   ↓
7. User enters new password (twice)
   ↓
8. Password updated, navigate to /login
   ↓
9. Success message: "Password reset successful"
```

---

## Flow 2: Create Appointment

```
1. User is authenticated (any role)
   ↓
2. User navigates to /dealer-notification via sidebar
   - Click "Dealer Notification" in main navigation
   ↓
3. Page loads: "Appointment / Follow Up" form
   ↓
4. User selects form type (radio buttons):
   - ○ Appointment (default selected)
   - ○ Follow Up
   ↓
5. User fills Dealership section:
   a. Select "Dealership" dropdown
      - List of 5+ dealerships appears
      - User types to search (if many dealers)
      - User clicks dealership name
   ↓
   b. Select "Department" dropdown
      - Options: Sales, Service, Parts, Finance
      - User selects department
   ↓
   c. Select "Scenario" dropdown
      - Options: New Vehicle Inquiry, Used Vehicle, Service, etc.
      - User selects scenario
   ↓
6. User fills "Name of Costomer" section:
   a. Enter "First Name"
   b. Enter "Last Name"
   c. Enter "Phone Number"
   ↓
   d. Select "Phone Number Type"
      - ○ Yes
      - ○ No
      (Purpose unclear - validation related?)
   ↓
   e. Enter "Email Address"
   ↓
7. User fills "Vehicle of Interest" section:
   a. Select "Vehicle of Interest"
      - ○ Yes (default)
      - ○ No
   ↓
   If "Yes" selected:
   b. Select "Year" dropdown (30 year range)
   c. Select "Make" dropdown (14 manufacturers)
   d. Select "Model" dropdown
   e. Enter "Stock Number" (optional)
   ↓
8. User fills "Trade In" section:
   a. Select "Trade in"
      - ○ Yes
      - ○ No (default)
   ↓
   If "Yes" selected:
   b. Select "Trade Year"
   c. Select "Trade Make"
   d. Select "Trade Model"
   e. Enter "Miles"
   ↓
9. User fills additional information:
   a. Select "Payment Preference"
      - Options: Cash, Finance, Lease, Trade-In
   ↓
   b. Enter "Comment" (textarea)
      - Notes, special requests, conversation summary
   ↓
   c. Select "Lead Source"
      - Options: Website, Phone Call, Walk-In, Referral, etc.
   ↓
   d. Select "Language"
      - ○ English (default)
      - ○ Spanish
   ↓
10. User selects appointment date and time:
    a. Click date picker (calendar icon)
    b. Select date from calendar
    c. Select time from dropdown/input
    ↓
11. User reviews all entered information
    ↓
12. User clicks "Submit" button (blue, bottom right)
    ↓
13. Frontend validation runs:
    - Required fields filled?
    - Valid email format?
    - Valid phone number?
    - Valid date (not in past)?
    ↓
14. If validation fails:
    - Highlight invalid fields in red
    - Show error messages below fields
    - Scroll to first error
    - Keep all data intact
    ↓
15. If validation passes:
    - Show loading spinner on button
    - Disable form inputs
    - POST /api/appointments with data
    ↓
16. Success response:
    - Show success toast: "Appointment created successfully"
    - Clear form (reset all fields)
    - Ask: "Create another appointment?" or "View appointment list"
    ↓
17. Error response:
    - Show error toast with message
    - Re-enable form
    - Remove loading spinner
    - Keep all data intact for retry
```

---

## Flow 3: Manage Dealers (Admin)

### View Dealer List

```
1. Admin user authenticated
   ↓
2. User expands "Admin" section in sidebar
   ↓
3. User clicks "Dealer List"
   ↓
4. Navigate to /admin/dealer-list
   ↓
5. Page loads:
   - Header: "Dealer List"
   - "Create Dealer" button (top right)
   - Table controls: entries per page, search
   - Dealer table
   ↓
6. Data loads:
   - Current: dealerListStore.getDealers()
   - Planned: GET /api/dealers
   - 10 dealers displayed by default
   ↓
7. Table shows:
   - Dealer name
   - Status toggle (Active/Inactive switch)
   - Actions dropdown (•••)
```

### Search Dealers

```
1. User in Dealer List page
   ↓
2. User types in search box (top right)
   - "Search:" label with input field
   ↓
3. Real-time filtering as user types
   - Filter by dealer name (case-insensitive)
   - Table updates instantly
   ↓
4. No results:
   - Show "No dealers found" message
   ↓
5. Clear search:
   - User deletes search text
   - Full list reappears
```

### Change Pagination

```
1. User clicks "Show [10] entries" dropdown
   ↓
2. Options appear: 10, 25, 50
   ↓
3. User selects 25
   ↓
4. Table updates to show 25 rows
   - If fewer dealers, shows all
   - Pagination controls update
```

### Toggle Dealer Status

```
1. User sees dealer row with status switch
   ↓
2. Switch shows current state:
   - Blue/checked = Active
   - Gray/unchecked = Inactive
   ↓
3. User clicks switch
   ↓
4. Immediate visual feedback (switch toggles)
   ↓
5. Update storage:
   - dealerListStore.toggleStatus(id)
   - Planned: PATCH /api/dealers/:id/status
   ↓
6. Success:
   - Switch remains in new position
   - No additional confirmation needed
   ↓
7. Error (API):
   - Revert switch to previous state
   - Show error toast
```

### View Dealer Details

```
1. User clicks "•••" actions menu on dealer row
   ↓
2. Dropdown menu appears:
   - 👁️ View
   - ✏️ Edit
   - 📅 Schedule & Shift
   - 🗑️ Delete
   ↓
3. User clicks "View"
   ↓
4. Navigate to /admin/dealers/:id
   ↓
5. View Dealer page loads:
   - All dealer information (read-only)
   - 30+ fields organized in sections:
     * Basic Information
     * Contact Details
     * CRM Integrations (4 systems)
     * Transfer Numbers
     * Special Notes
   ↓
6. User reviews information
   ↓
7. User clicks "Back" or "Edit" button
```

### Edit Dealer

```
1. User clicks "Edit" from actions menu
   ↓
2. Navigate to /admin/dealers/:id/edit
   ↓
3. Edit form loads:
   - Load dealer data: dealerListStore.getDealer(id)
   - Pre-populate all form fields with current values
   ↓
4. User modifies fields:
   - Change any of 30+ fields
   - Add/remove phone numbers
   - Update CRM credentials
   - Modify transfer numbers
   ↓
5. User clicks "Save" button
   ↓
6. Validation runs (same as create)
   ↓
7. If valid:
   - Show loading state
   - dealerListStore.updateDealer(id, formData)
   - Planned: PUT /api/dealers/:id
   ↓
8. Success:
   - Show success toast
   - Navigate back to /admin/dealer-list
   - Updated dealer appears in list
   ↓
9. Error:
   - Show error message
   - Stay on edit page
   - Keep modified data for retry
   ↓
10. User clicks "Cancel":
    - Confirm: "Discard changes?"
    - If yes: Navigate back to dealer list
    - If no: Stay on edit page
```

### Create New Dealer

```
1. User clicks "Create Dealer" button (top right)
   ↓
2. Navigate to /admin/dealer-list/create
   ↓
3. Empty form loads with 30+ fields:
   
   BASIC INFORMATION:
   - Dealer Name (required)
   - Type (multi-select: SALES, S2S, SERVICE)
   - Timezone dropdown
   - Website URL
   - Permasignup URL
   
   CONTACT:
   - Phone Numbers (array, can add multiple)
   - Address
   - Hours of operation
   
   CRM INTEGRATION:
   - CRM Email
   - CRM Source
   - CRM URL Type
   - CRM Email Subject
   
   SALES CRM:
   - Link
   - Username
   - Password
   - Email Code
   
   DATA MINING:
   - Link
   - Username
   - Password
   - Email Code
   
   DEALER ID:
   - N (?)
   - Username
   - Password
   - Email Code
   
   SERVICE CRM:
   - Link
   - Username
   - Password
   - Email Code
   
   TRANSFERS:
   - Sales Transfer Number
   - Service Transfer Number
   - Fax Transfer Number
   - Ring Central Number
   
   ADDITIONAL:
   - Special Attention (textarea)
   - VO Manager
   - Status (Active checkbox)
   ↓
4. User fills required fields (minimum):
   - Dealer Name
   - Type (at least one)
   ↓
5. User fills optional fields as needed
   ↓
6. User clicks "Add Phone Number" to add multiple
   - Dynamic field appears
   - User can remove individual numbers
   ↓
7. User clicks "Submit"
   ↓
8. Validation:
   - Required fields present?
   - Valid URLs?
   - Valid phone numbers?
   ↓
9. If valid:
   - dealerListStore.addDealer(formData)
   - Planned: POST /api/dealers
   - Auto-generate ID
   - Set createdAt timestamp
   ↓
10. Success:
    - Show success toast
    - Navigate to /admin/dealer-list
    - New dealer appears in list
    ↓
11. Error:
    - Show error toast
    - Highlight invalid fields
    - Keep data for correction
```

### Delete Dealer

```
1. User clicks "Delete" from actions menu
   ↓
2. Confirmation dialog appears:
   - "Are you sure you want to delete this dealer?"
   - "This action cannot be undone."
   - [Cancel] [Delete] buttons
   ↓
3. User clicks "Cancel":
   - Dialog closes
   - No action taken
   ↓
4. User clicks "Delete":
   - Dialog closes
   - Show loading state
   - dealerListStore.deleteDealer(id)
   - Planned: DELETE /api/dealers/:id
   ↓
5. Success:
   - Remove dealer from list (instant)
   - Show success toast
   - Table re-renders
   ↓
6. Error:
   - Show error toast
   - Dealer remains in list
   - Explain why deletion failed
```

---

## Flow 4: Manage Roles & Permissions (Admin)

### View Roles

```
1. Admin user navigates to /admin/roles
   ↓
2. Role List page loads:
   - GET all roles from roleStore
   - Display in table:
     * Role ID
     * Role Name
     * Number of permissions
     * Actions (Edit, Delete)
   ↓
3. Shows 3 default roles:
   - Admin (full permissions)
   - Manager (customizable)
   - Agent (customizable)
   ↓
4. User can:
   - Create new role
   - Edit existing role
   - Delete custom role (not default roles)
```

### Edit Role Permissions

```
1. User clicks "Edit" on a role
   ↓
2. Navigate to /admin/roles/:id/edit
   ↓
3. Edit Role page loads:
   - Load role: roleStore.getRole(id)
   - Display role title (editable)
   - Show all 11 permission modules
   ↓
4. Permission matrix displays:
   
   MODULE: User
   ☑ Manage    ☑ Create    ☑ Edit    ☑ Delete    ☑ Schedule
   
   MODULE: Role
   ☑ Manage    ☑ Create    ☑ Edit    ☑ Delete
   
   MODULE: Department
   ☐ Manage    ☐ Create    ☐ Edit    ☐ Delete
   
   ... (11 modules total with 40+ permissions)
   ↓
5. User modifies role:
   a. Change role title (text input)
   b. Check/uncheck permissions
      - Click checkbox to toggle
      - Visual feedback immediate
   ↓
6. User clicks "Save Permissions"
   ↓
7. Validation:
   - Role title not empty?
   - At least one permission selected? (optional)
   ↓
8. Save to storage:
   - roleStore.updateRole(id, { title })
   - roleStore.updatePermissions(id, permissions)
   - localStorage updated
   ↓
9. Success:
   - Show success toast
   - Navigate to /admin/roles
   - Updated role in list
   ↓
10. Cancel:
    - User clicks "Cancel"
    - Confirm: "Discard changes?"
    - Navigate back without saving
```

### Permission Inheritance Example

```
Admin creates "Team Lead" role:
├── Inherits base Agent permissions
├── Plus Manager view permissions
├── Minus admin edit permissions
└── Custom: Can view but not edit dealers
```

---

## Flow 5: View Dashboard (Manager/Admin)

```
1. Manager or Admin user logs in
   ↓
2. Redirects to /dashboard
   ↓
3. Dashboard loads with 6 sections:
   
   SUMMARY CARDS (top):
   - 8 stat cards in 4x2 grid:
     * Total Employees: 76
     * Total Dealers: 51
     * Today Appointments: 174
     * Month Appointments: 6,998
     * Appt for Today: 62
     * Appt for Tomorrow: 105
     * Appt for 3rd day: 8
     * Appt for 4th day: 10
   ↓
   TODAY - AGENT STATS:
   - Calendar date picker (defaults to today)
   - Table columns:
     * Agent Name
     * Apts. Today
     * Last Apt.
     * Hourly Avg. Apts
   - Shows all agents with today's activity
   ↓
   TODAY - DEALER STATS:
   - Calendar date picker (defaults to today)
   - Table columns:
     * Dealer Name
     * Apts. Today
     * Last Apt.
     * Hourly Avg. Apts
   - Shows all dealers with today's activity
   ↓
   TODAY - AGENT STATS BY DEPT:
   - Calendar date picker (defaults to today)
   - Table columns:
     * Agent
     * Apts.
     * Campaigns
     * Confirmations
     * Data Mining
     * Follow Up
     * SMS
     * Sales
   - Shows department breakdown
   ↓
   TODAY - DEALER STATS BY DEPT:
   - Same structure as agent dept stats
   - Dealer-level breakdown
   ↓
   MTD (MONTH TO DATE) AGENT STATS:
   - Calendar date picker (defaults to current month)
   - Table columns:
     * Agent
     * Total Apts
     * MID Avg
     * Campaigns
     * Confirmations
     * Data Mining
     * Follow Up
     * SMS
     * Sales
   - Cumulative monthly data
   ↓
   MTD DEALER STATS:
   - Same structure as MTD agent
   - Dealer-level monthly data
   ↓
   RING CENTRAL STATS:
   - Calendar date picker
   - Table columns:
     * Agent Name
     * Today Calls
     * Month Calls
     * Avg Daily Calls
   - Phone activity metrics
   ↓
4. User interactions:
   a. Click any date picker:
      - Calendar popover opens
      - User selects date
      - Table refreshes with new date data
      - Planned: GET /api/dashboard/stats?date=YYYY-MM-DD
   
   b. Scroll to view all sections
      - Fixed header stays in place
      - Sidebar accessible
   
   c. Click agent/dealer name:
      - Planned: Drill down to detail view
      - Show individual performance
   ↓
5. Auto-refresh (planned):
   - Every 5 minutes, refresh stats
   - Background refetch via TanStack Query
   - Update numbers without reload
```

---

## Flow 6: View Personal Statistics (Agent)

```
1. Agent user logged in
   ↓
2. User expands "My Profile" in sidebar
   ↓
3. User clicks "My Stats"
   ↓
4. Navigate to /my-statistics
   ↓
5. Personal dashboard loads:
   - Today's appointments (count)
   - This week's appointments
   - This month's appointments
   - Conversion rate
   - Average appointments per day
   - Personal goals vs. actual
   - Recent appointments list
   ↓
6. Charts display:
   - Appointments trend (last 30 days)
   - Department breakdown (pie chart)
   - Hour-by-hour performance
   ↓
7. User can:
   - Filter by date range
   - Compare to team average
   - View detailed appointment list
```

---

## Flow 7: Logout

```
1. User clicks profile dropdown (top right)
   - Shows user name and role
   ↓
2. Dropdown menu appears:
   - Profile info display
   - Logout button
   ↓
3. User clicks "Logout"
   ↓
4. Current behavior:
   - Navigate to /login
   ↓
5. Planned behavior:
   - POST /api/auth/logout
   - Clear session cookie
   - Clear user data from memory
   - Navigate to /login
   - Show toast: "Logged out successfully"
```

---

## Summary of User Flows

**Implemented Flows:**
- ✅ Login UI (logic pending)
- ✅ Logout UI (logic pending)
- ✅ Navigate between pages
- ✅ View dealer list
- ✅ Search dealers
- ✅ Toggle dealer status
- ✅ View/Edit/Delete dealer
- ✅ Create appointment (UI)
- ✅ View role list
- ✅ Edit role permissions
- ✅ View dashboard

**Pending API Integration:**
- 🔧 Authentication and session management
- 🔧 API-backed CRUD operations
- 🔧 Real-time data refresh
- 🔧 Form validation with Zod
- 🔧 Error handling and retry logic
- 🔧 Permission checking
- 🔧 Optimistic UI updates


