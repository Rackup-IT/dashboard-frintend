export interface DealerItem {
  id: number;
  name: string;
  type: string[];
  website?: string;
  permasignupUrl?: string;
  timezone?: string;
  crmEmail?: string;
  crmSource?: string;
  crmUrlType?: string;
  crmEmailSubject?: string;
  phoneNumbers: string[];
  salesCrmLink?: string;
  salesCrmUsername?: string;
  salesCrmPassword?: string;
  salesCrmEmailCode?: string;
  dataMiningLink?: string;
  dataMiningUsername?: string;
  dataMiningPassword?: string;
  dataMiningEmailCode?: string;
  dealerIdN?: string;
  dealerIdUsername?: string;
  dealerIdPassword?: string;
  dealerIdEmailCode?: string;
  serviceCrmLink?: string;
  serviceCrmUsername?: string;
  serviceCrmPassword?: string;
  serviceCrmEmailCode?: string;
  specialAttention?: string;
  voManager?: string;
  salesTransfer?: string;
  serviceTransfer?: string;
  faxTransfer?: string;
  ringCentral?: string;
  address?: string;
  hours?: string;
  status: boolean;
  createdAt: string;
}

const STORAGE_KEY = 'truebdc_dealers';

const seedDealers: DealerItem[] = [
  {
    id: 1,
    name: "Downtown Toyota",
    type: ["SALES"],
    timezone: "Pacific Time Zone",
    website: "https://www.downtowntoyota.com",
    permasignupUrl: "https://bfbs.group.com/shop/login.asp?yLwbOGwluOlCdft039%nc_wWeeawRgbcsharing",
    crmEmail: "",
    crmSource: "",
    crmUrlType: "",
    phoneNumbers: ["+15615028819", "+19523368697", "+17207911859"],
    salesCrmLink: "https://www.ekadro.com",
    salesCrmUsername: "ot.4a0",
    salesCrmPassword: "Sales12314",
    salesCrmEmailCode: "manager@truebdc.com",
    dataMiningLink: "",
    dataMiningUsername: "",
    dataMiningPassword: "",
    dataMiningEmailCode: "",
    dealerIdN: "N",
    dealerIdUsername: "",
    dealerIdPassword: "",
    dealerIdEmailCode: "",
    serviceCrmLink: "",
    serviceCrmUsername: "",
    serviceCrmPassword: "",
    serviceCrmEmailCode: "",
    specialAttention: "N/A",
    voManager: "VIP Manager",
    salesTransfer: "888-360-2937",
    serviceTransfer: "888-360-2937",
    faxTransfer: "N/A",
    ringCentral: "410-987-7907",
    address: "4145 Broadway Oakland, CA 94611, USA",
    status: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 2,
    name: "Downtown Subaru",
    type: ["SALES", "S2S"],
    timezone: "Pacific Time Zone",
    phoneNumbers: [],
    status: true,
    createdAt: new Date().toISOString(),
  },
  {
    id: 3,
    name: "BMW MINI of Sterling",
    type: ["SALES"],
    timezone: "Eastern Time Zone",
    phoneNumbers: [],
    status: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 4,
    name: "Navarre Chevrolet & Cadillac",
    type: ["SALES", "S2S"],
    timezone: "Central Time Zone",
    phoneNumbers: [],
    status: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 5,
    name: "Navarre Honda",
    type: ["SALES", "S2S"],
    timezone: "Central Time Zone",
    phoneNumbers: [],
    status: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 6,
    name: "Navarre Hyundai",
    type: ["SALES", "S2S"],
    timezone: "Central Time Zone",
    phoneNumbers: [],
    status: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 7,
    name: "Navarre Jeep Ram Dodge Chrysler",
    type: ["SALES", "S2S"],
    timezone: "Central Time Zone",
    phoneNumbers: [],
    status: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 8,
    name: "Navarre Nissan",
    type: ["SALES", "S2S"],
    timezone: "Central Time Zone",
    phoneNumbers: [],
    status: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 9,
    name: "Glendale Nissan",
    type: ["SALES", "S2S"],
    timezone: "Pacific Time Zone",
    phoneNumbers: [],
    status: false,
    createdAt: new Date().toISOString(),
  },
  {
    id: 10,
    name: "Navarre GMC",
    type: ["SALES"],
    timezone: "Central Time Zone",
    phoneNumbers: [],
    status: false,
    createdAt: new Date().toISOString(),
  },
];

class DealerListStore {
  private dealers: DealerItem[] = [];

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      this.dealers = JSON.parse(stored);
    } else {
      this.dealers = seedDealers;
      this.saveToStorage();
    }
  }

  private saveToStorage() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(this.dealers));
  }

  getDealers(): DealerItem[] {
    return this.dealers;
  }

  getDealerById(id: number): DealerItem | undefined {
    return this.dealers.find(d => d.id === id);
  }

  addDealer(dealer: Omit<DealerItem, 'id' | 'createdAt'>): DealerItem {
    const newDealer: DealerItem = {
      ...dealer,
      id: this.dealers.length > 0 ? Math.max(...this.dealers.map(d => d.id)) + 1 : 1,
      createdAt: new Date().toISOString(),
    };
    this.dealers.push(newDealer);
    this.saveToStorage();
    return newDealer;
  }

  updateDealer(id: number, updates: Partial<DealerItem>): DealerItem | null {
    const index = this.dealers.findIndex(d => d.id === id);
    if (index === -1) return null;
    
    this.dealers[index] = { ...this.dealers[index], ...updates };
    this.saveToStorage();
    return this.dealers[index];
  }

  deleteDealer(id: number): boolean {
    const index = this.dealers.findIndex(d => d.id === id);
    if (index === -1) return false;
    
    this.dealers.splice(index, 1);
    this.saveToStorage();
    return true;
  }

  toggleStatus(id: number): boolean {
    const dealer = this.dealers.find(d => d.id === id);
    if (!dealer) return false;
    
    dealer.status = !dealer.status;
    this.saveToStorage();
    return true;
  }
}

export const dealerListStore = new DealerListStore();
