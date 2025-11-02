# PROJECT OVERVIEW

## 1.1 Application Purpose

**BDC Professionals** is a comprehensive dealership management system designed for automotive Business Development Centers (BDCs). The application enables dealerships to efficiently manage their operations including:

- **Appointment Scheduling** - Create, track, and manage customer appointments
- **Dealer Management** - Complete CRUD operations for dealerships with detailed CRM integrations
- **Employee Management** - Track employees, agents, and managers with role-based permissions
- **Communication Tracking** - SMS logs, call history, and Ring Central integration
- **Performance Analytics** - Leaderboards, statistics, and hourly metrics for agents and dealers
- **Administrative Controls** - Departments, scenarios, lead sources, and role/permission management

### Primary Users

1. **Admins** - Full system access to all dealer information, employee management, and system settings
2. **Managers** - Access to dashboards, dealer lists, appointment history, and team performance metrics
3. **Agents** - Access to create appointments, view dealer info, track personal statistics
4. **QA Analysts** - Review call history, agent activity, and appointment quality

### Main Business Objectives

- Centralize all dealership BDC operations in one platform
- Track and improve agent performance through metrics and leaderboards
- Manage customer appointments and follow-ups efficiently
- Integrate with CRM systems (Sales CRM, Data Mining, Service CRM, Dealer ID)
- Provide role-based access control for security and workflow management
- Monitor SMS communications and call logs for compliance

## 1.2 Technology Stack

### Frontend Framework
- **React** `18.3.1` - UI library with hooks and functional components
- **TypeScript** `5.6.3` - Type-safe JavaScript for enhanced developer experience
- **Vite** `5.4.19` - Fast build tool and development server

### Build & Development Tools
- **tsx** `4.19.1` - TypeScript execution for Node.js server
- **esbuild** `0.25.0` - Fast JavaScript/TypeScript bundler for production
- **PostCSS** `8.4.47` - CSS processing
- **Autoprefixer** `10.4.20` - Vendor prefix automation

### UI Libraries & Components
- **shadcn/ui** - Component library built on Radix UI primitives
- **Radix UI** - Comprehensive set of accessible component primitives:
  - Accordion, Alert Dialog, Avatar, Checkbox, Collapsible, Context Menu
  - Dialog, Dropdown Menu, Hover Card, Label, Menubar, Navigation Menu
  - Popover, Progress, Radio Group, Scroll Area, Select, Separator
  - Slider, Switch, Tabs, Toast, Toggle, Tooltip
- **Tailwind CSS** `3.4.17` - Utility-first CSS framework
- **Tailwind CSS Animate** `1.0.7` - Animation utilities
- **class-variance-authority** `0.7.1` - Type-safe component variants
- **tailwind-merge** `2.6.0` - Merge Tailwind classes efficiently
- **clsx** `2.1.1` - Conditional className utility

### Icons & Visual Elements
- **Lucide React** `0.453.0` - Icon library for consistent iconography
- **React Icons** `5.4.0` - Additional icons including company logos
- **cmdk** `1.1.1` - Command palette component

### Routing
- **wouter** `3.3.5` - Minimalist React router (~1.5KB)

### State Management & Data Fetching
- **TanStack Query (React Query)** `5.60.5` - Async state management, caching, and data synchronization
- **localStorage** - Client-side persistence via custom stores
- **Custom Stores**:
  - `dealerListStore` - Dealer CRUD operations
  - `dealershipStore` - Dealership management
  - `roleStore` - Role-based permissions
  - `smsLogStore` - SMS message tracking
  - `pendingSmsStore` - Pending SMS queue

### Form Handling & Validation
- **React Hook Form** `7.55.0` - Performant form state management
- **Zod** `3.24.2` - TypeScript-first schema validation
- **@hookform/resolvers** `3.10.0` - Integrates Zod with React Hook Form
- **zod-validation-error** `3.4.0` - Enhanced validation error messages

### Database & ORM
- **Drizzle ORM** `0.39.1` - TypeScript ORM with type-safe queries
- **drizzle-zod** `0.7.0` - Zod schema generation from Drizzle schemas
- **drizzle-kit** `0.30.4` - Migration and schema management tools
- **@neondatabase/serverless** `0.10.4` - Serverless PostgreSQL driver
- **PostgreSQL** - Relational database (configured but not yet in use)

### Backend Framework
- **Express** `4.21.2` - Web framework for Node.js
- **express-session** `1.18.1` - Session middleware
- **memorystore** `1.6.7` - In-memory session store
- **connect-pg-simple** `10.0.0` - PostgreSQL session store (prepared)

### Authentication (Prepared)
- **Passport.js** `0.7.0` - Authentication middleware
- **passport-local** `1.0.0` - Local authentication strategy

### Date & Time Handling
- **date-fns** `3.6.0` - Date manipulation and formatting

### UI Enhancements
- **Framer Motion** `11.13.1` - Animation library
- **Recharts** `2.15.2` - Chart library for data visualization
- **embla-carousel-react** `8.6.0` - Carousel/slider component
- **react-day-picker** `8.10.1` - Date picker component
- **react-resizable-panels** `2.1.7` - Resizable panel layouts
- **input-otp** `1.4.2` - OTP input component
- **vaul** `1.1.2` - Drawer component
- **next-themes** `0.4.6` - Theme management (light/dark mode prepared)

### Utilities
- **nanoid** `5.1.5` - Unique ID generation
- **ws** `8.18.0` - WebSocket implementation
- **bufferutil** `4.0.8` (optional) - Buffer utilities for WebSocket performance

## 1.3 Project Structure

```
bdc-professionals/
├── client/                    # Frontend React application
│   └── src/
│       ├── components/        # React components
│       │   ├── common/       # Shared components (DataTable, SearchInput, StatusToggle)
│       │   ├── layout/       # Layout components (Header, Sidebar, Layout)
│       │   └── ui/           # shadcn/ui components (40+ components)
│       ├── hooks/            # Custom React hooks
│       │   ├── use-mobile.tsx      # Mobile breakpoint detection
│       │   ├── use-toast.ts        # Toast notification hook
│       │   └── useLocalStorage.ts  # localStorage abstraction
│       ├── lib/              # Utility functions and stores
│       │   ├── constants.ts         # App constants
│       │   ├── dealerListStore.ts   # Dealer data management
│       │   ├── dealershipStore.ts   # Dealership data management
│       │   ├── pendingSmsStore.ts   # Pending SMS queue
│       │   ├── queryClient.ts       # TanStack Query configuration
│       │   ├── roleStore.ts         # Role and permissions management
│       │   ├── smsLogStore.ts       # SMS log management
│       │   └── utils.ts             # Helper functions
│       ├── pages/            # Page components (route endpoints)
│       │   ├── admin/        # Admin-only pages (21 pages)
│       │   ├── auth/         # Authentication pages (Login)
│       │   ├── dashboard/    # Dashboard pages
│       │   ├── dealer-info/  # Dealer information page
│       │   ├── dealer-notification/ # Appointment creation
│       │   ├── settings/     # Settings pages (General, Ring Central)
│       │   ├── AppointmentForm.tsx
│       │   ├── AppointmentHistory.tsx
│       │   ├── CallHistory.tsx
│       │   ├── Leaderboard.tsx
│       │   ├── MyStatistics.tsx
│       │   ├── RCAgentActivity.tsx
│       │   ├── ScheduleShift.tsx
│       │   └── not-found.tsx
│       ├── App.tsx           # Main app component with routing
│       ├── index.css         # Global styles and Tailwind imports
│       └── main.tsx          # Entry point
├── server/                   # Backend Express application
│   ├── index.ts             # Server entry point
│   ├── routes.ts            # API routes (minimal, prepared for expansion)
│   ├── storage.ts           # Storage interface (in-memory implementation)
│   └── vite.ts              # Vite middleware configuration
├── shared/                   # Shared code between client and server
│   └── schema.ts            # Drizzle ORM schemas and Zod validation
├── docs/                     # Documentation (this directory)
├── attached_assets/          # Static assets (images, logos)
├── .vscode/                  # VS Code workspace settings
│   ├── settings.json
│   ├── extensions.json
│   └── launch.json
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
├── tailwind.config.ts       # Tailwind CSS configuration
├── vite.config.ts           # Vite build configuration
├── drizzle.config.ts        # Drizzle ORM configuration
├── .prettierrc              # Code formatting rules
├── .eslintrc.json           # Linting rules
├── .gitignore               # Git ignore patterns
├── PROJECT.md               # Technical architecture documentation
└── README.md                # Project readme

```

### Folder Purpose Descriptions

**`client/src/components/`**
- **`common/`** - Reusable components used across multiple pages (data tables, search inputs, status toggles)
- **`layout/`** - Core layout components that wrap page content (sidebar navigation, header, main layout wrapper)
- **`ui/`** - shadcn/ui component library - accessible, customizable primitives

**`client/src/hooks/`**
- Custom React hooks for reusable logic (toast notifications, localStorage, responsive design)

**`client/src/lib/`**
- Utility functions, constants, and localStorage-based data stores
- TanStack Query client configuration

**`client/src/pages/`**
- Page components corresponding to routes
- Organized by feature area (admin, auth, dashboard, settings, etc.)

**`server/`**
- Express.js backend with minimal API implementation
- Prepared for database integration (currently using in-memory storage)

**`shared/`**
- Code shared between frontend and backend
- Database schemas and TypeScript types

**`docs/`**
- Comprehensive project documentation

**`.vscode/`**
- Professional VS Code workspace configuration
- Recommended extensions and debug configurations

## Current Data Architecture

### Storage Strategy
**Current**: localStorage-based persistence via custom stores
**Prepared**: PostgreSQL database with Drizzle ORM (schema defined, migrations ready)

### Data Models
- **Dealers** - 30+ fields including CRM integrations, contact info, and credentials
- **Employees** - User management with department assignments
- **Roles** - Granular permission system across 11 modules
- **Appointments** - Customer appointment tracking
- **SMS Logs** - Communication history
- **Departments** - Organizational structure
- **Scenarios** - Business process templates
- **Lead Sources** - Marketing attribution
- **Dealerships** - Multi-location management

### Migration Path
The application is designed to seamlessly migrate from localStorage to PostgreSQL:
1. All data models defined in `shared/schema.ts`
2. Insert/select types generated with `drizzle-zod`
3. Storage interface abstraction in `server/storage.ts`
4. API routes prepared in `server/routes.ts`

## Development Commands

```bash
npm install          # Install dependencies
npm run dev          # Start development server (port 5000)
npm run build        # Build for production
npm start            # Run production server
npm run check        # TypeScript type checking
npm run db:push      # Push schema to database
npm run db:generate  # Generate migration files
npm run db:studio    # Open Drizzle Studio
```

## Key Features

✅ **Complete Dealer Management** - Full CRUD with 30+ fields per dealer
✅ **Role-Based Access Control** - Granular permissions across 11 modules
✅ **localStorage Persistence** - Client-side data storage (development ready)
✅ **Database Ready** - PostgreSQL schema and migrations prepared
✅ **Modern UI** - shadcn/ui components with Tailwind CSS
✅ **Responsive Design** - Mobile-friendly sidebar and layouts
✅ **Type Safety** - End-to-end TypeScript with Zod validation
✅ **Professional Codebase** - VS Code workspace, ESLint, Prettier configured

## Authentication Status

🔨 **In Progress** - Login UI complete, authentication logic to be implemented
- Login page with Agent/Dealership tabs
- Google OAuth UI ready
- Passport.js dependency installed
- Session management infrastructure prepared

## External Integrations (Prepared)

📋 **Planned**:
- Ring Central (phone system)
- SMTP (email notifications)
- Multiple CRM systems (per dealer configuration)
- PostgreSQL database
