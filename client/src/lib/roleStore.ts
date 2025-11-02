export interface Permission {
  module: string;
  permissions: string[];
}

export interface Role {
  id: number;
  title: string;
  permissions: Permission[];
}

const STORAGE_KEY = 'truebdc_roles';

// Default permission structure for all modules
const DEFAULT_PERMISSIONS: Permission[] = [
  { module: 'User', permissions: [] },
  { module: 'Role', permissions: [] },
  { module: 'Department', permissions: [] },
  { module: 'Scenario', permissions: [] },
  { module: 'Lead Source', permissions: [] },
  { module: 'Dealer', permissions: [] },
  { module: 'Appointment', permissions: [] },
  { module: 'Dealership', permissions: [] },
  { module: 'Call Logs', permissions: [] },
  { module: 'Setting', permissions: [] },
  { module: 'Rc Agent Activity', permissions: [] },
];

// Initial roles with default permissions
const INITIAL_ROLES: Role[] = [
  {
    id: 1,
    title: 'Admin',
    permissions: [
      { module: 'User', permissions: ['Manage', 'Create', 'Edit', 'Delete', 'Schedule'] },
      { module: 'Role', permissions: ['Manage', 'Create', 'Edit', 'Delete'] },
      { module: 'Department', permissions: ['Manage', 'Create', 'Edit', 'Delete'] },
      { module: 'Scenario', permissions: ['Manage', 'Create', 'Edit', 'Delete'] },
      { module: 'Lead Source', permissions: ['Manage', 'Create', 'Edit', 'Delete'] },
      { module: 'Dealer', permissions: ['Manage', 'Info', 'Create', 'Edit', 'View', 'Delete', 'Schedule'] },
      { module: 'Appointment', permissions: ['Leaderboard', 'Hourly Metric', 'History', 'Export', 'Manage', 'Create', 'View', 'Delete'] },
      { module: 'Dealership', permissions: ['Manage', 'Create', 'Edit', 'Delete'] },
      { module: 'Call Logs', permissions: ['History', 'My', 'Listen Recording', 'Queue'] },
      { module: 'Setting', permissions: ['General', 'Smtp', 'Regcaptial'] },
      { module: 'Rc Agent Activity', permissions: ['Manage'] },
    ],
  },
  {
    id: 2,
    title: 'Manager',
    permissions: DEFAULT_PERMISSIONS,
  },
  {
    id: 3,
    title: 'Agent',
    permissions: DEFAULT_PERMISSIONS,
  },
];

export const roleStore = {
  getRoles(): Role[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default roles
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_ROLES));
    return INITIAL_ROLES;
  },

  getRole(id: number): Role | undefined {
    const roles = this.getRoles();
    return roles.find(r => r.id === id);
  },

  addRole(role: Omit<Role, 'id'>): Role {
    const roles = this.getRoles();
    const maxId = roles.length > 0 
      ? roles.reduce((max, r) => Math.max(max, r.id), 0)
      : 0;
    const newRole: Role = { 
      ...role, 
      id: maxId + 1,
      permissions: DEFAULT_PERMISSIONS 
    };
    roles.push(newRole);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
    return newRole;
  },

  updateRole(id: number, updates: Partial<Role>): boolean {
    const roles = this.getRoles();
    const index = roles.findIndex(r => r.id === id);
    if (index === -1) return false;
    
    roles[index] = { ...roles[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(roles));
    return true;
  },

  updatePermissions(id: number, permissions: Permission[]): boolean {
    return this.updateRole(id, { permissions });
  },

  deleteRole(id: number): boolean {
    const roles = this.getRoles();
    const filtered = roles.filter(r => r.id !== id);
    if (filtered.length === roles.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};

// Available permissions for each module
export const MODULE_PERMISSIONS: Record<string, string[]> = {
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
