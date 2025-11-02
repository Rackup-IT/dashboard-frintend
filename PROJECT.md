# True BDC - Dealership Management System

## Overview

True BDC is a full-stack dealership management application designed to help automotive dealerships manage their business development centers. The system handles appointments, follow-ups, employee management, call tracking, and dealer administration. Built with modern TypeScript across the entire stack, it provides a type-safe, scalable solution for dealership operations.

## Project Status

This document tracks the development progress, architecture decisions, and implementation details of the True BDC application.

## Recent Progress

### Completed Features (November 1, 2025)

**Dealer Management System**
- ✅ Dealer List page (`/admin/dealer-list`) with complete CRUD operations
  - Table view with columns: #, Name, Type, Timezone, Status, Action
  - 3-dot action menu with Edit, View, Schedule, Delete options
  - Status toggle switches (green=active, red=inactive)
  - Search and pagination functionality
  - Create Dealer button for adding new dealers
- ✅ Edit Dealer page (`/admin/dealers/:id/edit`) with comprehensive form
  - All dealer information fields (name, website, timezone, etc.)
  - Multi-select Type field with chip display (SALES, S2S, SERVICE) and individual delete buttons
  - Time Zone dropdown with 4 timezone options
  - Dynamic phone number management (Add New Number button + individual delete buttons)
  - Multiple CRM sections: Sales CRM, Data Mining/S2S CRM, Dealer Id, Service CRM
  - Transfer numbers configuration (Special Attention, VO-Manager, Sales, Service, Fax, Ring Central)
  - Address and Hours fields
  - Full localStorage persistence via dealerListStore
- ✅ View Dealer page (`/admin/dealers/:id`) with read-only display
  - Left column: All dealer details (website, type, address, hours, timezone, CRM info, transfer numbers)
  - Audio player for dealer pronunciation
  - Right column: Google Maps embed showing dealer location
  - Accessible from "View" button in 3-dot menu on Dealer List
- ✅ Schedule & Shift page (`/admin/dealer/:id/schedule-shift`) 
  - Schedule date picker with calendar popup
  - Shift configuration with Day, Start Time, End Time, Last Appointment Time
  - Last Appointment Time displayed with yellow/orange background
  - "No last appointment time" checkbox option
  - Copy button for shift details
  - "Change Schedule & Shift" submit button
  - Accessible from "Schedule" button in 3-dot menu on Dealer List
- ✅ dealerListStore implementation with localStorage persistence
  - Comprehensive dealer data model with 30+ fields
  - Seed data for 10 dealers
  - Full CRUD operations (Create, Read, Update, Delete, Toggle Status)
  - getDealerById method for retrieving single dealer

**Roles & Permissions System**
- ✅ Role List page with Add Role dialog
- ✅ Edit Role Permission page with 11 modules and granular permission checkboxes

**SMS Management**
- ✅ SMS & Logs page with View Message dialog and text wrapping fix
- ✅ Pending SMS page with View/Delete functionality
- ✅ Smart pagination across all list pages (handles empty results, auto-adjusts on deletion)

**Settings System**
- ✅ Ring Central Settings page (`/settings/ring-central`)
  - Left sidebar navigation with General Settings and Ring Central Settings options
  - Ring Central Settings highlighted with blue phone icon when active
  - Configuration form with 4 fields in 2-column grid:
    - Ring central client id
    - Ring central client secret
    - Ring central server url
    - Ring central jwt token
  - Allow Notifications dropdown (Yes/No options)
  - Yellow Clear Cache button (top-right)
  - Blue Update button for saving changes
  - Accessible from Settings section in main sidebar

**Authentication System**
- ✅ Login Page (`/login`) - Default landing page
  - TRUE BDC branding with logo and text at top
  - Two tab options: "Agent Login" and "Dealership Login"
  - Agent Login tab features:
    - Email and password input fields
    - "Remember Me" checkbox
    - "Forgot Password ?" link
    - Blue "Login" button
    - "OR" divider
    - Google login button option
  - Dealership Login tab features:
    - Email and password input fields
    - "Remember Me" checkbox
    - Blue "Login" button
    - No Google login option
    - No "Forgot Password" link
  - Password show/hide toggle (eye icon)
  - Login button navigates to dashboard without authentication (temporary)
  - Root path "/" redirects to "/login" by default

**UI/UX Improvements**
- ✅ Company logo integration in sidebar (top-left corner)
- ✅ Consistent design pattern: Card-based layouts with manual table structures
- ✅ Action dialogs (Add/View) and separate edit pages pattern
- ✅ Color-coded buttons: Yellow (Edit), Red (Delete), Blue (Primary actions), Green (Add)

## Branding

- **Company Logo**: Custom logo integrated in sidebar header (top-left corner)
  - Display: Height 40px with auto width to maintain aspect ratio
  - Positioned next to "TrueBDC" text in sidebar

## System Architecture

### Frontend Architecture

**Framework & Build System**
- **React 18.3+ with TypeScript**: Component-based UI with full type safety
- **Vite**: Fast build tool providing instant HMR and optimized production builds
- **Routing**: Wouter for lightweight client-side routing without the overhead of React Router

**UI & Styling**
- **Tailwind CSS**: Utility-first CSS framework with custom design tokens defined in CSS variables
- **shadcn/ui**: High-quality, accessible React components built on Radix UI primitives
- **Component Library**: Extensive set of pre-built UI components (dialogs, dropdowns, forms, tables, etc.)
- **Theme System**: Light/dark mode support with CSS custom properties for consistent theming

**State Management**
- **TanStack Query (React Query)**: Server state management, caching, and synchronization
- **Local Storage Hook**: Custom `useLocalStorage` hook for persistent client-side state
- **Query Client Configuration**: Centralized configuration with custom error handling and 401 retry logic

**Path Aliases**
- `@/`: Maps to `client/src/` for frontend code
- `@shared/`: Maps to `shared/` for shared types and schemas

### Backend Architecture

**Server Framework**
- **Express.js**: Node.js web application framework
- **TypeScript**: Full type safety across server code
- **Custom Middleware**: Request logging, JSON parsing, and error handling

**Storage Layer**
- **In-Memory Storage**: Initial implementation using `MemStorage` class for development
- **Prepared for Database Migration**: Interface-based design (`IStorage`) allows easy swap to database-backed storage
- **Storage Interface**: Defines CRUD operations for users and other entities

**Database Schema (Planned)**
- **Drizzle ORM**: Type-safe database toolkit for PostgreSQL
- **Schema Definition**: Centralized in `shared/schema.ts` for use across frontend and backend
- **Tables Defined**:
  - Users (authentication)
  - Dealers (dealership information)
  - Employees (staff management)
  - Departments (organizational structure)
  - Scenarios (interaction templates)
  - Lead Sources (tracking customer origins)

**API Design**
- **RESTful Endpoints**: Prefixed with `/api` for clear separation
- **Logging**: Request/response logging with duration tracking
- **Error Handling**: Centralized error middleware with status code handling

**Development Tools**
- **Vite Middleware Mode**: Serves frontend during development with HMR
- **Static File Serving**: Production builds served from `dist/public`
- **Build Process**: Dual build system (Vite for frontend, esbuild for backend)

## External Dependencies

### Database & ORM
- **PostgreSQL**: Primary relational database (configured via `DATABASE_URL`)
- **Neon Database**: Serverless Postgres provider (`@neondatabase/serverless`)
- **Drizzle ORM**: Type-safe database toolkit with migration support
- **Connection Pooling**: `connect-pg-simple` for PostgreSQL session storage

### UI Libraries
- **Radix UI**: Comprehensive set of unstyled, accessible component primitives
- **Lucide React**: Icon library for consistent iconography
- **date-fns**: Date manipulation and formatting
- **cmdk**: Command palette component
- **vaul**: Drawer component library
- **embla-carousel-react**: Carousel/slider functionality
- **react-day-picker**: Date picker component

### Form & Validation
- **React Hook Form**: Performant form state management
- **Zod**: TypeScript-first schema validation
- **@hookform/resolvers**: Integrates Zod with React Hook Form

### Development Tools
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript/TypeScript bundler for production builds
- **TypeScript**: Full type safety across the stack
- **Drizzle Kit**: Database migration and studio tools

### Build & Deployment
- **Vite**: Development server and production build tool
- **PostCSS**: CSS processing with Tailwind CSS and Autoprefixer
- **Vercel**: Deployment platform (configured via `vercel.json`)

### Authentication (Prepared)
- **Passport.js**: Authentication middleware (dependency present, implementation pending)
- **Session Management**: PostgreSQL-backed sessions via `connect-pg-simple`