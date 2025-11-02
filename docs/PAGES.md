# PAGES DOCUMENTATION

This document provides detailed information about every page component in the BDC Professionals application.

---

## Page: Login
**File Location:** `/client/src/pages/auth/Login.tsx`  
**Route:** `/login`  
**Access Level:** Public

**Purpose:**  
Authentication page with tabbed interface for Agent Login and Dealership Login. Provides email/password authentication and Google OAuth option for agents.

**Components Used:**
- Card, CardContent (`@/components/ui/card`)
- Button (`@/components/ui/button`)
- Input (`@/components/ui/input`)
- Checkbox (`@/components/ui/checkbox`)
- Eye, EyeOff icons (`lucide-react`)
- FcGoogle icon (`react-icons/fc`)

**State Management:**
- `activeTab`: "agent" | "dealership" - Controls which login tab is active
- `showPassword`: boolean - Toggle password visibility
- `email`: string - Email input value
- `password`: string - Password input value
- `rememberMe`: boolean - Remember me checkbox state

**User Actions:**
- **Switch tabs**: Toggle between Agent Login and Dealership Login
- **Login button**: Navigates to `/dashboard` (authentication to be implemented)
- **Google Login**: Agent tab only, navigates to `/dashboard`
- **Forgot Password**: Link (functionality to be implemented)
- **Show/Hide Password**: Eye icon toggle
- **Remember Me**: Checkbox option

**Props/Parameters:**  
None

---

## Page: Dashboard
**File Location:** `/client/src/pages/dashboard/Dashboard.tsx`  
**Route:** `/dashboard`  
**Access Level:** Authenticated (Manager/Admin)

**Purpose:**  
Main dashboard displaying comprehensive statistics, metrics, and performance data for agents and dealers. Shows real-time appointment counts, leaderboards, and Ring Central call statistics.

**Components Used:**
- Card, CardContent, CardHeader, CardTitle (`@/components/ui/card`)
- Button (`@/components/ui/button`)
- Popover, PopoverContent, PopoverTrigger (`@/components/ui/popover`)
- Calendar (`@/components/ui/calendar`)
- Table components (`@/components/ui/table`)
- Calendar icon (`lucide-react`)
- format from `date-fns`

**State Management:**
- Multiple date states for each table section (7 total)
- Calendar open states for each date picker (7 total)
- Sample data arrays for:
  - Summary statistics (8 cards)
  - Today's agent stats
  - Today's dealer stats
  - Agent department stats
  - Dealer department stats
  - MTD agent stats
  - MTD dealer stats
  - Ring Central call stats

**Data Loading:**
Currently uses static sample data. Ready for API integration.

**User Actions:**
- **Date pickers**: Each table has calendar picker to change date range
- **View metrics**: Tables display performance data for agents and dealers
- Tabs separate Today, MTD (Month to Date), and Ring Central data

**Metrics Displayed:**
- Total Employees, Total Dealers
- Today/Month appointments count
- Appointments for next 4 days
- Agent performance: appointments today, last appointment time, hourly average
- Dealer performance: by location, department
- Ring Central: today's calls, month calls, daily average

---

## Page: Leaderboard
**File Location:** `/client/src/pages/Leaderboard.tsx`  
**Route:** `/leaderboard`  
**Access Level:** Authenticated

**Purpose:**  
Display agent performance rankings and statistics to encourage healthy competition and track top performers.

**Props/Parameters:**  
None

---

## Page: Dealer Info
**File Location:** `/client/src/pages/dealer-info/DealerInfo.tsx`  
**Route:** `/dealer-info`  
**Access Level:** Authenticated

**Purpose:**  
View detailed dealer contact information, CRM links, phone numbers, addresses, and operational details. Agents use this to access dealer-specific information quickly.

**Data Source:**  
Loads dealer data from `dealerListStore`

---

## Page: Dealer Notification
**File Location:** `/client/src/pages/dealer-notification/DealerNotification.tsx`  
**Route:** `/dealer-notification`  
**Access Level:** Authenticated

**Purpose:**  
Primary form for creating appointments and follow-ups. Comprehensive customer and vehicle information capture.

**Components Used:**
- Button, Input, Label (`@/components/ui/*`)
- Select, SelectContent, SelectItem, SelectTrigger, SelectValue (`@/components/ui/select`)
- Textarea (`@/components/ui/textarea`)
- RadioGroup, RadioGroupItem (`@/components/ui/radio-group`)

**State Management:**
- `formType`: "appointment" | "followup" - Radio selection
- `appointmentDate`: string - Selected appointment date
- `appointmentTime`: string - Selected appointment time
- `formData`: Comprehensive object with 20+ fields:
  - Dealership, department, scenario
  - Customer: firstName, lastName, phoneNumber, email
  - Vehicle of interest: year, make, model, stock number
  - Trade-in: year, make, model, miles
  - Payment preference, comments, lead source, language

**Data Loading:**
Dropdown options for:
- Dealerships (5 locations)
- Departments (Sales, Service, Parts, Finance)
- Scenarios (5 types)
- Vehicle years (30 years)
- Vehicle makes (14 manufacturers)
- Models, payment preferences, lead sources

**User Actions:**
- **Toggle form type**: Radio buttons for Appointment vs Follow-Up
- **Fill form**: 20+ input fields
- **Select date/time**: Appointment scheduling
- **Submit**: Save appointment (currently logs to console)

**Form Validation:**
Ready for Zod schema validation integration

---

## Page: Appointment Form
**File Location:** `/client/src/pages/AppointmentForm.tsx`  
**Route:** `/appointment/create`  
**Access Level:** Authenticated

**Purpose:**  
Alternative route for appointment creation (likely simplified version or alias).

---

## Page: Appointment History
**File Location:** `/client/src/pages/AppointmentHistory.tsx`  
**Route:** `/appointment/history`  
**Access Level:** Authenticated

**Purpose:**  
View personal appointment history for logged-in agent. Filter and search past appointments.

---

## Page: My Statistics
**File Location:** `/client/src/pages/MyStatistics.tsx`  
**Route:** `/my-statistics`  
**Access Level:** Authenticated

**Purpose:**  
Personal performance dashboard for agents showing their individual statistics, goals, and achievements.

---

## Page: Call History
**File Location:** `/client/src/pages/CallHistory.tsx`  
**Route:** `/call-history`  
**Access Level:** Authenticated

**Purpose:**  
View personal call logs with customer details, duration, and outcomes.

---

## Page: Schedule Shift
**File Location:** `/client/src/pages/ScheduleShift.tsx`  
**Route:** `/schedule-shift`  
**Access Level:** Authenticated

**Purpose:**  
View and manage personal work schedule and shift assignments.

---

## Page: RC Agent Activity
**File Location:** `/client/src/pages/RCAgentActivity.tsx`  
**Route:** `/rc-agent-activity`  
**Access Level:** Authenticated

**Purpose:**  
View personal Ring Central phone system activity and call metrics.

---

## ADMIN SECTION

## Page: Dealer List (Admin)
**File Location:** `/client/src/pages/admin/DealerList.tsx`  
**Route:** `/admin/dealer-list`  
**Access Level:** Admin/Manager

**Purpose:**  
Comprehensive dealer management interface. View all dealers, search, filter, and perform CRUD operations.

**Components Used:**
- Card, CardContent (`@/components/ui/card`)
- Button, Input, Table components (`@/components/ui/*`)
- Switch (`@/components/ui/switch`) - Status toggle
- Select (`@/components/ui/select`) - Entries per page
- DropdownMenu (`@/components/ui/dropdown-menu`) - Actions menu
- Icons: Plus, Eye, Edit, Calendar, Trash2, MoreHorizontal (`lucide-react`)

**State Management:**
- `search`: string - Search filter
- `entriesPerPage`: string - Pagination size ("10", "25", "50")
- `dealers`: DealerItem[] - List of all dealers

**Data Loading:**
- `useEffect` on mount: Loads dealers from `dealerListStore`
- Real-time filtering based on search input

**User Actions:**
- **Search**: Filter dealers by name
- **Pagination**: Select entries per page (10/25/50)
- **Create**: Navigate to `/admin/dealer-list/create`
- **Status Toggle**: Enable/disable dealer (Switch component)
- **Actions Dropdown** (per dealer):
  - 👁️ View: Navigate to `/admin/dealers/:id`
  - ✏️ Edit: Navigate to `/admin/dealers/:id/edit`
  - 📅 Schedule: Navigate to `/admin/dealer/:id/schedule-shift`
  - 🗑️ Delete: Confirm dialog, delete from store

**Table Columns:**
- Dealer name
- Status (Active/Inactive toggle)
- Actions dropdown

---

## Page: Add Dealer
**File Location:** `/client/src/pages/admin/AddDealer.tsx`  
**Route:** `/admin/dealer-list/create`  
**Access Level:** Admin

**Purpose:**  
Create new dealer with comprehensive details including CRM integrations, contact information, and credentials.

**Form Fields (30+ fields):**
- **Basic Info**: Name, Type (multi-select), Timezone, Website, Permasignup URL
- **Contact**: Phone numbers (multiple), Address, Hours
- **CRM Integration**: Email, Source, URL Type, Subject
- **Sales CRM**: Link, Username, Password, Email Code
- **Data Mining**: Link, Username, Password, Email Code
- **Dealer ID**: N, Username, Password, Email Code
- **Service CRM**: Link, Username, Password, Email Code
- **Transfers**: Sales, Service, Fax, Ring Central numbers
- **Additional**: Special Attention, VO Manager, Status

**User Actions:**
- **Fill comprehensive form**: 30+ fields
- **Submit**: Save to `dealerListStore`, navigate to dealer list
- **Cancel**: Navigate back to dealer list

---

## Page: Edit Dealer
**File Location:** `/client/src/pages/admin/EditDealer.tsx`  
**Route:** `/admin/dealers/:id/edit`  
**Access Level:** Admin

**Purpose:**  
Edit existing dealer information.

**Route Parameters:**
- `:id` - Dealer ID

**Data Loading:**
- Loads dealer by ID from `dealerListStore`
- Pre-populates form with existing values

**User Actions:**
- **Edit fields**: Modify any dealer information
- **Submit**: Update dealer in store
- **Cancel**: Navigate back

---

## Page: View Dealer
**File Location:** `/client/src/pages/admin/ViewDealer.tsx`  
**Route:** `/admin/dealers/:id`  
**Access Level:** Admin

**Purpose:**  
Read-only view of complete dealer details.

**Route Parameters:**
- `:id` - Dealer ID

**Display Sections:**
- Basic information
- Contact details
- CRM credentials
- Transfer numbers
- Special notes

---

## Page: Dealer Schedule Shift
**File Location:** `/client/src/pages/admin/ScheduleShift.tsx`  
**Route:** `/admin/dealer/:id/schedule-shift`  
**Access Level:** Admin

**Purpose:**  
Manage work schedules and shift assignments for specific dealer location.

**Route Parameters:**
- `:id` - Dealer ID

---

## Page: Employee List
**File Location:** `/client/src/pages/admin/EmployeeList.tsx`  
**Route:** `/admin/employee-list`  
**Access Level:** Admin/Manager

**Purpose:**  
Manage all employees/users in the system. View, search, and perform CRUD operations.

**Similar to Dealer List** with:
- User search and filtering
- Status toggles
- CRUD actions dropdown
- Create new employee button

---

## Page: Add Employee
**File Location:** `/client/src/pages/admin/AddEmployee.tsx`  
**Route:** `/admin/employee-list/create` and `/admin/users/create`  
**Access Level:** Admin

**Purpose:**  
Create new employee/user account.

**Form Fields:**
- Name, Email, Phone
- Department assignment
- Role assignment
- Status (Active/Inactive)

---

## Page: Appointment History (Admin)
**File Location:** `/client/src/pages/admin/AppointmentHistory.tsx`  
**Route:** `/admin/appointment-history`  
**Access Level:** Admin/Manager

**Purpose:**  
View all appointments across all agents and dealers. Advanced filtering and export capabilities.

---

## Page: Call History (Admin)
**File Location:** `/client/src/pages/admin/CallHistory.tsx`  
**Route:** `/admin/call-history`  
**Access Level:** Admin/Manager

**Purpose:**  
View all call logs across the organization.

---

## Page: Appointment Export
**File Location:** `/client/src/pages/admin/AppointmentExport.tsx`  
**Route:** `/admin/appointment-export`  
**Access Level:** Admin/Manager

**Purpose:**  
Export appointment data to CSV/Excel with date range and filter options.

---

## Page: RC Agent Activity (Admin)
**File Location:** `/client/src/pages/admin/RCAgentActivity.tsx`  
**Route:** `/admin/rc-agent-activity`  
**Access Level:** Admin/Manager

**Purpose:**  
View Ring Central activity for all agents.

---

## Page: Department List
**File Location:** `/client/src/pages/admin/DepartmentList.tsx`  
**Route:** `/admin/department-list`  
**Access Level:** Admin

**Purpose:**  
Manage organizational departments (Sales, Service, Parts, Finance, etc.).

**Features:**
- List all departments
- Add new department
- Edit department name
- Delete department
- Simple table interface

---

## Page: Scenario List
**File Location:** `/client/src/pages/admin/ScenarioList.tsx`  
**Route:** `/admin/scenario-list`  
**Access Level:** Admin

**Purpose:**  
Manage appointment scenarios/types by department.

**Features:**
- List scenarios with department association
- Create new scenario
- Edit scenario
- Delete scenario

---

## Page: Lead Source
**File Location:** `/client/src/pages/admin/LeadSource.tsx`  
**Route:** `/admin/lead-source`  
**Access Level:** Admin

**Purpose:**  
Manage lead source tracking (Website, Phone, Walk-In, Referral, Social Media, etc.).

---

## Page: Dealership Logins
**File Location:** `/client/src/pages/admin/DealershipLogins.tsx`  
**Route:** `/admin/dealership-logins`  
**Access Level:** Admin

**Purpose:**  
Manage dealership-specific login credentials and access.

**Data Source:**  
`dealershipStore`

---

## Page: Add Dealership
**File Location:** `/client/src/pages/admin/AddDealership.tsx`  
**Route:** `/admin/dealerships/create`  
**Access Level:** Admin

**Purpose:**  
Create new dealership with assigned dealers.

---

## Page: Edit Dealership
**File Location:** `/client/src/pages/admin/EditDealership.tsx`  
**Route:** `/admin/dealerships/:id/edit`  
**Access Level:** Admin

**Purpose:**  
Edit existing dealership configuration.

**Route Parameters:**
- `:id` - Dealership ID

---

## Page: Role List
**File Location:** `/client/src/pages/admin/RoleList.tsx`  
**Route:** `/admin/roles`  
**Access Level:** Admin

**Purpose:**  
View and manage all user roles (Admin, Manager, Agent, QA Analyst).

**Data Source:**  
`roleStore` - localStorage-based role management

**Features:**
- List all roles with permission counts
- Navigate to edit role permissions
- Delete roles (with protection for default roles)

---

## Page: Edit Role
**File Location:** `/client/src/pages/admin/EditRole.tsx`  
**Route:** `/admin/roles/:id/edit`  
**Access Level:** Admin

**Purpose:**  
Edit role name and configure granular permissions across 11 modules.

**Route Parameters:**
- `:id` - Role ID

**Permission Modules (11 total):**
1. **User**: Manage, Create, Edit, Delete, Schedule
2. **Role**: Manage, Create, Edit, Delete
3. **Department**: Manage, Create, Edit, Delete
4. **Scenario**: Manage, Create, Edit, Delete
5. **Lead Source**: Manage, Create, Edit, Delete
6. **Dealer**: Manage, Info, Create, Edit, View, Delete, Schedule
7. **Appointment**: Leaderboard, Hourly Metric, History, Export, Manage, Create, View, Delete
8. **Dealership**: Manage, Create, Edit, Delete
9. **Call Logs**: History, My, Listen Recording, Queue
10. **Setting**: General, Smtp, Regcaptial
11. **Rc Agent Activity**: Manage

**User Actions:**
- Edit role title
- Check/uncheck permissions for each module
- Save changes to `roleStore`

---

## Page: Role Permission
**File Location:** `/client/src/pages/admin/RolePermission.tsx`  
**Route:** `/admin/role-permission`  
**Access Level:** Admin

**Purpose:**  
Matrix view of all roles and their permissions across all modules.

---

## Page: SMS Logs
**File Location:** `/client/src/pages/admin/SmsLogs.tsx`  
**Route:** `/admin/sms-logs`  
**Access Level:** Admin

**Purpose:**  
View sent SMS message history.

**Data Source:**  
`smsLogStore`

**Table Columns:**
- Recipient phone number
- Message content
- Sent timestamp
- Status

---

## Page: Pending SMS
**File Location:** `/client/src/pages/admin/PendingSms.tsx`  
**Route:** `/admin/pending-sms`  
**Access Level:** Admin

**Purpose:**  
View and manage SMS messages queued for sending.

**Data Source:**  
`pendingSmsStore`

**Features:**
- List pending messages
- Retry failed messages
- Delete pending messages

---

## SETTINGS SECTION

## Page: General Settings
**File Location:** `/client/src/pages/settings/GeneralSettings.tsx`  
**Route:** `/settings/general`  
**Access Level:** Admin

**Purpose:**  
Configure system-wide settings including SMTP email and general application preferences.

**Form Sections:**
- **SMTP Settings**: Email server configuration
- **Application Settings**: General preferences

---

## Page: Ring Central Settings
**File Location:** `/client/src/pages/settings/RingCentralSettings.tsx`  
**Route:** `/settings/ring-central`  
**Access Level:** Admin

**Purpose:**  
Configure Ring Central phone system integration.

**Layout:**
- Left sidebar navigation (General Settings, Ring Central Settings)
- Form with Ring Central API credentials
- Test connection button

**Form Fields:**
- API Key
- API Secret
- Server URL
- Phone number
- Extension

---

## Page: Not Found
**File Location:** `/client/src/pages/not-found.tsx`  
**Route:** `*` (catch-all)  
**Access Level:** Public

**Purpose:**  
404 error page for invalid routes.

**Features:**
- Friendly error message
- Link back to dashboard
- Simple centered layout

---

## Summary Statistics

**Total Pages:** 41  
**Public Pages:** 2 (Login, Not Found)  
**Authenticated Pages:** 10 (Agent-level access)  
**Admin/Manager Pages:** 29 (Administrative functions)  

**Page Categories:**
- Authentication: 1
- Dashboard/Analytics: 2
- Agent Tools: 8
- Admin - Dealer Management: 5
- Admin - Employee Management: 2
- Admin - Appointment/Call Management: 4
- Admin - Configuration: 4
- Admin - Access Control: 3
- Admin - Communication: 2
- Settings: 2
- Error Pages: 1

**Data Persistence:**
- localStorage stores: dealerListStore, dealershipStore, roleStore, smsLogStore, pendingSmsStore
- Database schema defined but not yet connected
- All CRUD operations currently use localStorage
