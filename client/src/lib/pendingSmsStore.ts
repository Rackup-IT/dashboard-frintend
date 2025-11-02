export interface PendingSms {
  id: number;
  to: string;
  message: string;
  createdAt: string;
  sentAt: string; // "Not Sent" for pending SMS
}

const STORAGE_KEY = 'truebdc_pending_sms';

// Initial pending SMS with sample data
const INITIAL_PENDING_SMS: PendingSms[] = [
  {
    id: 7,
    to: '(904) 722-0248',
    message: 'I scheduled your VIP appointment for 11/01/2025 01:00 PM. The address is Xtreme Nissan is 13501 I-10 Service Rd, New Orleans, LA 70128, USA. Please ask for the VIP Manager John at the front desk.',
    createdAt: '2025-10-29 15:47:24',
    sentAt: 'Not Sent',
  },
  {
    id: 8,
    to: '+15618028819,+17312174305,+12252701384,+15047717713,+18046318423,+15049134297,+15049434673,+13876069334,+15045076081',
    message: 'Dealer - Xtreme Nissan Type : Type - Appointment',
    createdAt: '2025-10-29 15:47:24',
    sentAt: 'Not Sent',
  },
];

export const pendingSmsStore = {
  getPendingSms(): PendingSms[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    // Initialize with default pending SMS
    localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_PENDING_SMS));
    return INITIAL_PENDING_SMS;
  },

  getSms(id: number): PendingSms | undefined {
    const sms = this.getPendingSms();
    return sms.find(s => s.id === id);
  },

  addPendingSms(sms: Omit<PendingSms, 'id'>): PendingSms {
    const smsList = this.getPendingSms();
    const maxId = smsList.length > 0 
      ? smsList.reduce((max, s) => Math.max(max, s.id), 0)
      : 0;
    const newSms: PendingSms = { ...sms, id: maxId + 1 };
    smsList.push(newSms);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(smsList));
    return newSms;
  },

  deletePendingSms(id: number): boolean {
    const smsList = this.getPendingSms();
    const filtered = smsList.filter(sms => sms.id !== id);
    if (filtered.length === smsList.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },
};
