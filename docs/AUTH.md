# AUTHENTICATION & AUTHORIZATION

## 6.1 Authentication Flow

### Current Status: ⚠️ UI Complete, Logic Pending

The login page is fully designed and functional, but authentication logic is not yet implemented.

### Login Flow (Implemented UI)

```
1. User navigates to / (root)
   ↓
2. Redirect to /login
   ↓
3. User selects tab: Agent Login OR Dealership Login
   ↓
4. User enters credentials:
   - Email address
   - Password
   - [Agent only] Option for Google OAuth
   - Remember Me checkbox
   ↓
5. User clicks "Login" button
   ↓
6. Currently: Direct navigation to /dashboard
   ↓
7. TO BE IMPLEMENTED:
   - Validate credentials
   - Call authentication API
   - Store session token
   - Fetch user data
   - Redirect based on role
```

### Planned Authentication Flow

```
User enters credentials
    ↓
POST /api/auth/login
    ↓
Backend validates credentials
├── Check against database (users table)
├── Verify password hash (bcrypt)
└── Create session
    ↓
Success Response:
├── Session token/cookie
├── User data (id, username, role)
└── Permissions based on role
    ↓
Frontend stores:
├── Session token (httpOnly cookie)
├── User data (localStorage or Context)
└── Role/permissions (for UI rendering)
    ↓
Redirect to appropriate dashboard:
├── Admin → /dashboard (full stats)
├── Manager → /dashboard (team stats)
└── Agent → /leaderboard (performance view)
```

### Logout Flow (Implemented)

```
User clicks profile dropdown → Logout
    ↓
Currently: Navigate to /login
    ↓
TO BE IMPLEMENTED:
    ├── Call POST /api/auth/logout
    ├── Clear session token
    ├── Clear user data from storage
    └── Redirect to /login
```

## 6.2 Protected Routes

### Current Implementation

**Status:** ⚠️ No route protection active

All routes (except `/login`) are wrapped in `<Layout>` component but do not check authentication status.

**Current Routing Logic (`App.tsx`):**
```typescript
function Router() {
  const [location] = useLocation();
  
  if (location === "/login") {
    return <Login />;
  }
  
  return (
    <Layout>
      <Switch>
        {/* All routes render without auth check */}
      </Switch>
    </Layout>
  );
}
```

### Planned Route Protection

#### Implementation Strategy

**Option 1: Router-Level Guard**
```typescript
function Router() {
  const [location, setLocation] = useLocation();
  const { user, isAuthenticated } = useAuth(); // Custom hook
  
  if (location === "/login") {
    return <Login />;
  }
  
  if (!isAuthenticated && location !== "/login") {
    return <Redirect to="/login" />;
  }
  
  return (
    <Layout>
      <Switch>
        {/* Routes */}
      </Switch>
    </Layout>
  );
}
```

**Option 2: Protected Route Component**
```typescript
function ProtectedRoute({
  component: Component,
  requiredRole,
  ...rest
}) {
  const { user, isAuthenticated } = useAuth();
  
  if (!isAuthenticated) {
    return <Redirect to="/login" />;
  }
  
  if (requiredRole && !hasRole(user, requiredRole)) {
    return <NotAuthorized />;
  }
  
  return <Component {...rest} />;
}

// Usage
<Route path="/admin/dealers">
  <ProtectedRoute component={DealerList} requiredRole="admin" />
</Route>
```

### Route Access Matrix

| Route Pattern | Public | Agent | Manager | Admin |
|--------------|--------|-------|---------|-------|
| `/login` | ✅ | ✅ | ✅ | ✅ |
| `/dashboard` | ❌ | ❌ | ✅ | ✅ |
| `/leaderboard` | ❌ | ✅ | ✅ | ✅ |
| `/dealer-info` | ❌ | ✅ | ✅ | ✅ |
| `/dealer-notification` | ❌ | ✅ | ✅ | ✅ |
| `/appointment/*` | ❌ | ✅ | ✅ | ✅ |
| `/my-*` | ❌ | ✅ | ✅ | ✅ |
| `/call-history` | ❌ | ✅ | ✅ | ✅ |
| `/admin/dealer-list` (view) | ❌ | ❌ | ✅ | ✅ |
| `/admin/dealer-list/create` | ❌ | ❌ | ❌ | ✅ |
| `/admin/dealers/:id/edit` | ❌ | ❌ | ❌ | ✅ |
| `/admin/employee-list` (view) | ❌ | ❌ | ✅ | ✅ |
| `/admin/employee-list/create` | ❌ | ❌ | ❌ | ✅ |
| `/admin/appointment-*` | ❌ | ❌ | ✅ | ✅ |
| `/admin/department-*` | ❌ | ❌ | ❌ | ✅ |
| `/admin/roles/*` | ❌ | ❌ | ❌ | ✅ |
| `/admin/sms-*` | ❌ | ❌ | ❌ | ✅ |
| `/settings/*` | ❌ | ❌ | ❌ | ✅ |

### Redirect Behavior

**Unauthenticated Users:**
- All routes except `/login` → Redirect to `/login`
- After successful login → Redirect to last attempted route or default dashboard

**Unauthorized Users (wrong role):**
- Display "Not Authorized" page OR
- Redirect to their default home page
- Log access attempt for security

## 6.3 Role-Based Access Control (RBAC)

### Roles in System

Defined in `roleStore.ts`:

#### 1. Admin
**Full Access** across all 11 modules:
- User: Manage, Create, Edit, Delete, Schedule
- Role: Manage, Create, Edit, Delete
- Department: Manage, Create, Edit, Delete
- Scenario: Manage, Create, Edit, Delete
- Lead Source: Manage, Create, Edit, Delete
- Dealer: Manage, Info, Create, Edit, View, Delete, Schedule
- Appointment: Leaderboard, Hourly Metric, History, Export, Manage, Create, View, Delete
- Dealership: Manage, Create, Edit, Delete
- Call Logs: History, My, Listen Recording, Queue
- Setting: General, Smtp, Regcaptial
- Rc Agent Activity: Manage

#### 2. Manager
**Default:** Empty permissions (customizable per installation)  
**Typical Access:**
- View dealer list
- View employee list
- View all appointments
- View all call history
- Export appointment data
- View Ring Central activity

#### 3. Agent
**Default:** Empty permissions (customizable per installation)  
**Typical Access:**
- Create appointments
- View own appointment history
- View own call history
- View own statistics
- Access dealer information
- View leaderboard

#### 4. QA Analyst (Can be created)
**Typical Access:**
- View appointment history
- View call history
- Listen to call recordings
- View agent activity
- Quality review permissions

### Permission Structure

**11 Modules with Granular Permissions:**

```typescript
const MODULE_PERMISSIONS = {
  'User': ['Manage', 'Create', 'Edit', 'Delete', 'Schedule'],
  'Role': ['Manage', 'Create', 'Edit', 'Delete'],
  'Department': ['Manage', 'Create', 'Edit', 'Delete'],
  'Scenario': ['Manage', 'Create', 'Edit', 'Delete'],
  'Lead Source': ['Manage', 'Create', 'Edit', 'Delete'],
  'Dealer': ['Manage', 'Info', 'Create', 'Edit', 'View', 'Delete', 'Schedule'],
  'Appointment': ['Leaderboard', 'Hourly Metric', 'History', 'Export', 'Manage', 'Create', 'View', 'Delete'],
  'Dealership': ['Manage', 'Create', 'Edit', 'Delete'],
  'Call Logs': ['History', 'My', 'Listen Recording', 'Queue'],
  'Setting': ['General', 'Smtp', 'Regcaptial'],
  'Rc Agent Activity': ['Manage'],
};
```

### Permission Checking (To Be Implemented)

#### Frontend Permission Check

```typescript
// Custom hook: usePermission
function usePermission() {
  const { user } = useAuth();
  
  const hasPermission = (module: string, action: string): boolean => {
    const role = roleStore.getRole(user.roleId);
    if (!role) return false;
    
    const modulePerms = role.permissions.find(p => p.module === module);
    if (!modulePerms) return false;
    
    return modulePerms.permissions.includes(action);
  };
  
  return { hasPermission };
}

// Usage in components
function DealerList() {
  const { hasPermission } = usePermission();
  
  const canCreate = hasPermission('Dealer', 'Create');
  const canEdit = hasPermission('Dealer', 'Edit');
  const canDelete = hasPermission('Dealer', 'Delete');
  
  return (
    <>
      {canCreate && <Button onClick={handleCreate}>Create</Button>}
      {canEdit && <Button onClick={handleEdit}>Edit</Button>}
      {canDelete && <Button onClick={handleDelete}>Delete</Button>}
    </>
  );
}
```

#### Backend Permission Check

```typescript
// Middleware: checkPermission
function checkPermission(module: string, action: string) {
  return async (req, res, next) => {
    const user = req.user; // From session
    const role = await db.query.roles.findFirst({
      where: eq(roles.id, user.roleId),
    });
    
    const modulePerms = role.permissions.find(p => p.module === module);
    if (!modulePerms || !modulePerms.permissions.includes(action)) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    
    next();
  };
}

// Usage in routes
app.post('/api/dealers',
  authenticate,
  checkPermission('Dealer', 'Create'),
  async (req, res) => {
    // Create dealer
  }
);
```

### Sidebar Navigation Based on Permissions

```typescript
// Sidebar.tsx (to be updated)
function Sidebar() {
  const { hasPermission } = usePermission();
  
  const showAdminSection = hasPermission('Dealer', 'Manage') ||
                           hasPermission('User', 'Manage');
  
  const showManagerSection = hasPermission('Appointment', 'History');
  
  return (
    <nav>
      {/* Basic navigation - all users */}
      
      {showManagerSection && (
        <Collapsible>
          <CollapsibleTrigger>Manager</CollapsibleTrigger>
          <CollapsibleContent>
            {/* Manager items */}
          </CollapsibleContent>
        </Collapsible>
      )}
      
      {showAdminSection && (
        <Collapsible>
          <CollapsibleTrigger>Admin</CollapsibleTrigger>
          <CollapsibleContent>
            {/* Admin items */}
          </CollapsibleContent>
        </Collapsible>
      )}
    </nav>
  );
}
```

## 6.4 Session Management

### Current Implementation

**Status:** ⚠️ Infrastructure prepared, not active

**Dependencies Installed:**
- `express-session` - Session middleware
- `memorystore` - In-memory session store (development)
- `connect-pg-simple` - PostgreSQL session store (production)
- `passport` - Authentication middleware
- `passport-local` - Local strategy

### Planned Session Configuration

```typescript
// server/index.ts
import session from 'express-session';
import pgSession from 'connect-pg-simple';
import { db } from './db';

const PgSession = pgSession(session);

app.use(session({
  store: new PgSession({
    pool: db, // PostgreSQL connection pool
    tableName: 'user_sessions',
  }),
  secret: process.env.SESSION_SECRET || 'dev-secret-key',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === 'production', // HTTPS only in prod
    httpOnly: true, // Prevent XSS
    maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    sameSite: 'strict', // CSRF protection
  },
}));
```

### Token Storage Strategy

**Recommended: httpOnly Cookies**
- ✅ Secure against XSS attacks
- ✅ Automatic sending with requests
- ✅ Server-side expiration control
- ❌ Not accessible from JavaScript

**Alternative: localStorage + JWT**
- ✅ Accessible for client logic
- ✅ Works with mobile apps
- ❌ Vulnerable to XSS
- ❌ Manual inclusion in requests

**Hybrid Approach:**
- Session token: httpOnly cookie
- User data: Context API (loaded from API on mount)
- Permissions: Computed from role on each request

### Session Expiration Handling

```typescript
// Axios interceptor (to be implemented)
axios.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Session expired
      clearUserData();
      setLocation('/login');
      toast({
        title: "Session Expired",
        description: "Please log in again.",
      });
    }
    return Promise.reject(error);
  }
);
```

### Automatic Logout Behavior

**Scenarios:**
1. **Token Expiration** - 7 days default
2. **Manual Logout** - User clicks logout
3. **Security Event** - Password change, role change
4. **Inactivity** - Optional: 30 minutes idle

```typescript
// Auto-logout on inactivity (optional)
let inactivityTimer;

const resetInactivityTimer = () => {
  clearTimeout(inactivityTimer);
  inactivityTimer = setTimeout(() => {
    logout();
    toast({ title: "Logged out due to inactivity" });
  }, 30 * 60 * 1000); // 30 minutes
};

// Reset on any user interaction
window.addEventListener('mousemove', resetInactivityTimer);
window.addEventListener('keypress', resetInactivityTimer);
```

## 6.5 Authentication Context (To Be Implemented)

```typescript
// contexts/AuthContext.tsx
interface User {
  id: number;
  username: string;
  roleId: number;
  roleName: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [, setLocation] = useLocation();
  
  const login = async (email: string, password: string) => {
    const response = await apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
    setUser(response.user);
    setLocation('/dashboard');
  };
  
  const logout = async () => {
    await apiRequest('/api/auth/logout', { method: 'POST' });
    setUser(null);
    setLocation('/login');
  };
  
  // Check session on mount
  useEffect(() => {
    apiRequest('/api/auth/me')
      .then(({ user }) => setUser(user))
      .catch(() => setUser(null));
  }, []);
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated: !!user,
      login,
      logout,
      // ...
    }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
}
```

## 6.6 Database Schema (users table)

**File:** `shared/schema.ts`

```typescript
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(), // Hashed with bcrypt
});
```

**To Add:**
- `email` field (unique)
- `roleId` foreign key → roles table
- `status` boolean (active/inactive)
- `createdAt`, `updatedAt` timestamps
- `lastLoginAt` timestamp
- `emailVerified` boolean
- `resetToken`, `resetTokenExpiry` for password reset

## 6.7 Security Best Practices

### Password Security
- ✅ Hash passwords with bcrypt (cost factor 10+)
- ✅ Never store plain-text passwords
- ✅ Implement password strength requirements
- ✅ Add "forgot password" flow with email verification

### Session Security
- ✅ Use httpOnly cookies
- ✅ Set secure flag in production (HTTPS)
- ✅ Implement CSRF protection (sameSite: strict)
- ✅ Rotate session IDs after login
- ✅ Invalidate old sessions on password change

### API Security
- ✅ Validate all inputs (Zod schemas)
- ✅ Rate limiting on login endpoint
- ✅ Log failed login attempts
- ✅ Implement account lockout after 5 failed attempts
- ✅ Use prepared statements (Drizzle ORM handles this)

### Frontend Security
- ✅ Never expose sensitive data in localStorage
- ✅ Validate user permissions before UI actions
- ✅ Re-validate permissions on backend
- ✅ Sanitize user inputs
- ✅ Use Content Security Policy headers

## 6.8 OAuth Integration (Google)

**Status:** ⚠️ UI complete (Google button), OAuth flow not implemented

**Dependencies Needed:**
- `passport-google-oauth20`

**Implementation Steps:**
1. Register app with Google Cloud Console
2. Obtain Client ID and Client Secret
3. Configure Passport Google Strategy
4. Add redirect URI (`/auth/google/callback`)
5. Link Google account to existing user OR create new user
6. Handle email verification

```typescript
// OAuth callback route
app.get('/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/dashboard');
  }
);
```

## 6.9 Future Enhancements

- [ ] Two-factor authentication (2FA)
- [ ] Magic link login (passwordless)
- [ ] Remember Me functionality (extended sessions)
- [ ] Social logins (Microsoft, Apple)
- [ ] Single Sign-On (SSO) for enterprise
- [ ] Role hierarchy (inherit permissions)
- [ ] Temporary access tokens for external integrations
- [ ] Audit log for permission changes
