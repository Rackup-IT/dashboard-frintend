export interface SmsLog {
  id: number;
  to: string;
  message: string;
  createdAt: string;
  sentAt: string;
}

const STORAGE_KEY = 'truebdc_sms_logs';

// Initial SMS logs with sample data
const INITIAL_SMS_LOGS: SmsLog[] = [
  {
    id: 1,
    to: '(734) 804-8063',
    message: 'I scheduled your VIP appointment for 07/03/2024 04:30 PM. The address is Priority Toyota Springfield @ 7801 Loisdale Rd, Springfield, VA 22150, USA. Please ask for the VIP Manager at the front desk.',
    createdAt: '2024-07-03 08:07:08',
    sentAt: '2024-07-03 08:08:03',
  },
  {
    id: 2,
    to: '+15618026819,+13023794283,+15713886193,+15712920024,+17575092523,+15716896106,+15408458511',
    message: 'Dealer - Priority Toyota Springfield Type : Type',
    createdAt: '2024-07-03 08:08:04',
    sentAt: '2024-07-03 08:08:08',
  },
  {
    id: 3,
    to: '+1 (904) 483 - 7265',
    message: 'I scheduled your VIP appointment for 07/04/2024 09:00 AM.',
    createdAt: '2024-07-03 08:14:04',
    sentAt: '2024-07-03 08:13:36',
  },
  {
    id: 4,
    to: '+19304769970,+19886482757,+15619268919',
    message: 'Dealer - Davis Nissan of Jacksonville Type : Type',
    createdAt: '2024-07-03 08:14:08',
    sentAt: '2024-07-03 08:13:36',
  },
  {
    id: 5,
    to: '703-338-6059',
    message: 'I scheduled your VIP appointment for 07/03/2024 07:00 PM.',
    createdAt: '2024-07-03 08:19:04',
    sentAt: '2024-07-03 08:18:17',
  },
  {
    id: 6,
    to: '+15618026819,+13023794283,+15713886193,+15712920024,+17575092523,+15716896106,+15408458511',
    message: 'Dealer - Priority Toyota Springfield Type : Type',
    createdAt: '2024-07-03 08:19:05',
    sentAt: '2024-07-03 08:18:17',
  },
  {
    id: 7,
    to: '(240) 751-3076',
    message: 'I scheduled your VIP appointment for 07/03/2024 02:00 PM.',
    createdAt: '2024-07-03 08:39:03',
    sentAt: '2024-07-03 08:38:07',
  },
  {
    id: 8,
    to: '+15403363798,+15179214853,+15619628819,+17038983334,+12023912614',
    message: 'Dealer - BMW MINI of Sterling Type : Type - Additional info',
    createdAt: '2024-07-03 08:39:04',
    sentAt: '2024-07-03 08:38:07',
  },
  {
    id: 9,
    to: '7817367-3536',
    message: 'I scheduled your VIP appointment for 07/02/2024 05:00 PM.',
    createdAt: '2024-07-03 08:47:03',
    sentAt: '2024-07-03 08:46:13',
  },
  {
    id: 10,
    to: '+15403363798,+15179214853,+15619628819,+17038983334,+12023912614',
    message: 'Dealer - BMW MINI of Sterling Type : Type',
    createdAt: '2024-07-03 08:47:04',
    sentAt: '2024-07-03 08:46:13',
  },
];

export const smsLogStore = {
  getSmsLogs(): SmsLog[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default logs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_SMS_LOGS));
    return INITIAL_SMS_LOGS;
  },

  getSmsLog(id: number): SmsLog | undefined {
    const logs = this.getSmsLogs();
    return logs.find(log => log.id === id);
  },

  addSmsLog(log: Omit<SmsLog, 'id'>): SmsLog {
    const logs = this.getSmsLogs();
    const maxId = logs.length > 0 
      ? logs.reduce((max, l) => Math.max(max, l.id), 0)
      : 0;
    const newLog: SmsLog = { ...log, id: maxId + 1 };
    logs.push(newLog);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    return newLog;
  },

  deleteSmsLog(id: number): boolean {
    const logs = this.getSmsLogs();
    const filtered = logs.filter(log => log.id !== id);
    if (filtered.length === logs.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};
