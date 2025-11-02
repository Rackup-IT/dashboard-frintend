export const ROUTES = {
  DASHBOARD: "/",
  DEALER_INFO: "/dealer-info",
  DEALER_NOTIFICATION: "/dealer-notification",
  ADMIN: {
    DEALER_LIST: "/admin/dealer-list",
    EMPLOYEE_LIST: "/admin/employee-list",
    DEPARTMENT_LIST: "/admin/department-list",
    SCENARIO_LIST: "/admin/scenario-list",
    LEAD_SOURCE: "/admin/lead-source",
    DEALERSHIP_LOGINS: "/admin/dealership-logins",
    ROLE_PERMISSION: "/admin/role-permission",
    SMS_LOGS: "/admin/sms-logs",
    PENDING_SMS: "/admin/pending-sms",
  },
  SETTINGS: {
    GENERAL: "/settings/general",
    RING_CENTRAL: "/settings/ring-central",
  },
} as const;

export const PAGE_SIZES = [10, 25, 50, 100] as const;

export const STATUS_COLORS = {
  ACTIVE: "text-green-600 bg-green-50",
  INACTIVE: "text-red-600 bg-red-50",
  PENDING: "text-yellow-600 bg-yellow-50",
} as const;
