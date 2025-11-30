interface Dealership {
  id: number;
  name: string;
  email: string;
  password?: string;
  showCallLogs: boolean;
  status: boolean;
  assignedDealers?: string[];
}

const STORAGE_KEY = 'dealerships';

const initialDealerships: Dealership[] = [
  { id: 4, name: "Downtown Auto Center", email: "Fzalmy@downtownautocenter.com", showCallLogs: false, status: true, assignedDealers: ["Downtown Toyota", "Downtown Subaru"] },
  { id: 5, name: "BMW MINI of Sterling", email: "julius.green@bmwofsterling.com", showCallLogs: false, status: true },
  { id: 6, name: "Creative Automotive Mailing", email: "camus.zunelli@yahoo.com", showCallLogs: false, status: true },
  { id: 10, name: "Daytona Kia & Mitsubishi", email: "jerome@daytonakia.com", showCallLogs: false, status: true },
  { id: 11, name: "Sutherlin Nissan of Orlando", email: "BurkeAutomotiveMarketing@gmail.com", showCallLogs: false, status: true },
  { id: 12, name: "Koons Automotive of Woodbridge", email: "davidszky778@gmail.com", showCallLogs: false, status: true },
  { id: 13, name: "New Direct CDJR", email: "wefthomas2034@gmail.com", showCallLogs: false, status: true },
  { id: 14, name: "Gostel Toyota of Bradenton", email: "Sandra@theenlvd.com", showCallLogs: false, status: true },
  { id: 15, name: "MBI Direct Mail", email: "edimolasb@mbidirectmail.com", showCallLogs: false, status: true },
  { id: 16, name: "Garden State Honda", email: "n.delgadico@gardenstatenla.com", showCallLogs: false, status: true },
];

export const dealershipStore = {
  getDealerships(): Dealership[] {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialDealerships));
      return initialDealerships;
    }
    return JSON.parse(stored);
  },

  getDealership(id: number): Dealership | undefined {
    const dealerships = this.getDealerships();
    return dealerships.find(d => d.id === id);
  },

  addDealership(dealership: Omit<Dealership, 'id'>): Dealership {
    const dealerships = this.getDealerships();
    const maxId = dealerships.length > 0 
      ? dealerships.reduce((max, d) => Math.max(max, d.id), 0)
      : 0;
    const newDealership = { ...dealership, id: maxId + 1 };
    dealerships.push(newDealership);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dealerships));
    return newDealership;
  },

  updateDealership(id: number, updates: Partial<Dealership>): boolean {
    const dealerships = this.getDealerships();
    const index = dealerships.findIndex(d => d.id === id);
    if (index === -1) return false;
    
    dealerships[index] = { ...dealerships[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(dealerships));
    return true;
  },

  deleteDealership(id: number): boolean {
    const dealerships = this.getDealerships();
    const filtered = dealerships.filter(d => d.id !== id);
    if (filtered.length === dealerships.length) return false;
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
    return true;
  },

  toggleField(id: number, field: 'status' | 'showCallLogs'): boolean {
    const dealership = this.getDealership(id);
    if (!dealership) return false;
    
    return this.updateDealership(id, { [field]: !dealership[field] });
  }
};

export type { Dealership };
