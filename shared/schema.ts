import { pgTable, text, serial, integer, boolean, timestamp, date } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const dealers = pgTable("dealers", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  type: text("type").array(),
  website: text("website"),
  permasignupUrl: text("permasignup_url"),
  timezone: text("timezone"),
  crmEmail: text("crm_email"),
  crmSource: text("crm_source"),
  crmUrlType: text("crm_url_type"),
  crmEmailSubject: text("crm_email_subject"),
  phoneNumbers: text("phone_numbers").array(),
  salesCrmLink: text("sales_crm_link"),
  salesCrmUsername: text("sales_crm_username"),
  salesCrmPassword: text("sales_crm_password"),
  salesCrmEmailCode: text("sales_crm_email_code"),
  dataMiningLink: text("data_mining_link"),
  dataMiningUsername: text("data_mining_username"),
  dataMiningPassword: text("data_mining_password"),
  dataMiningEmailCode: text("data_mining_email_code"),
  dealerIdN: text("dealer_id_n"),
  dealerIdUsername: text("dealer_id_username"),
  dealerIdPassword: text("dealer_id_password"),
  dealerIdEmailCode: text("dealer_id_email_code"),
  serviceCrmLink: text("service_crm_link"),
  serviceCrmUsername: text("service_crm_username"),
  serviceCrmPassword: text("service_crm_password"),
  serviceCrmEmailCode: text("service_crm_email_code"),
  specialAttention: text("special_attention"),
  voManager: text("vo_manager"),
  salesTransfer: text("sales_transfer"),
  serviceTransfer: text("service_transfer"),
  faxTransfer: text("fax_transfer"),
  ringCentral: text("ring_central"),
  address: text("address"),
  hours: text("hours"),
  status: boolean("status").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const employees = pgTable("employees", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  phone: text("phone"),
  status: boolean("status").default(true),
  departmentId: integer("department_id"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const departments = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const scenarios = pgTable("scenarios", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  department: text("department").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leadSources = pgTable("lead_sources", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const roles = pgTable("roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const smsLogs = pgTable("sms_logs", {
  id: serial("id").primaryKey(),
  to: text("to").notNull(),
  message: text("message").notNull(),
  sentAt: timestamp("sent_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const pendingSms = pgTable("pending_sms", {
  id: serial("id").primaryKey(),
  to: text("to").notNull(),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const appointments = pgTable("appointments", {
  id: serial("id").primaryKey(),
  agentName: text("agent_name").notNull(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  dealer: text("dealer"),
  appointmentDate: date("appointment_date"),
  appointmentTime: text("appointment_time"),
  type: text("type").default("Appointment"),
  status: text("status").default("scheduled"),
  createdAt: timestamp("created_at").defaultNow(),
  lastAppointmentTime: timestamp("last_appointment_time"),
});

export const calls = pgTable("calls", {
  id: serial("id").primaryKey(),
  agentName: text("agent_name").notNull(),
  customerName: text("customer_name"),
  customerPhone: text("customer_phone"),
  dealer: text("dealer"),
  callDate: date("call_date"),
  callTime: text("call_time"),
  duration: text("duration"),
  result: text("result"),
  lastCallAt: timestamp("last_call_at"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertDealerSchema = createInsertSchema(dealers).omit({
  id: true,
  createdAt: true,
});

export const insertEmployeeSchema = createInsertSchema(employees).omit({
  id: true,
  createdAt: true,
});

export const insertDepartmentSchema = createInsertSchema(departments).omit({
  id: true,
  createdAt: true,
});

export const insertScenarioSchema = createInsertSchema(scenarios).omit({
  id: true,
  createdAt: true,
});

export const insertLeadSourceSchema = createInsertSchema(leadSources).omit({
  id: true,
  createdAt: true,
});

export const insertRoleSchema = createInsertSchema(roles).omit({
  id: true,
  createdAt: true,
});

export const insertAppointmentSchema = createInsertSchema(appointments).omit({
  id: true,
  createdAt: true,
});

export const insertCallSchema = createInsertSchema(calls).omit({
  id: true,
  createdAt: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Dealer = typeof dealers.$inferSelect;
export type InsertDealer = z.infer<typeof insertDealerSchema>;
export type Employee = typeof employees.$inferSelect;
export type InsertEmployee = z.infer<typeof insertEmployeeSchema>;
export type Department = typeof departments.$inferSelect;
export type InsertDepartment = z.infer<typeof insertDepartmentSchema>;
export type Scenario = typeof scenarios.$inferSelect;
export type InsertScenario = z.infer<typeof insertScenarioSchema>;
export type LeadSource = typeof leadSources.$inferSelect;
export type InsertLeadSource = z.infer<typeof insertLeadSourceSchema>;
export type Role = typeof roles.$inferSelect;
export type InsertRole = z.infer<typeof insertRoleSchema>;
export type SmsLog = typeof smsLogs.$inferSelect;
export type PendingSms = typeof pendingSms.$inferSelect;
export type Appointment = typeof appointments.$inferSelect;
export type InsertAppointment = z.infer<typeof insertAppointmentSchema>;
export type Call = typeof calls.$inferSelect;
export type InsertCall = z.infer<typeof insertCallSchema>;
