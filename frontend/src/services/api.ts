import axios from 'axios';
import { 
  Vehicle, 
  UserConfiguration, 
  Quotation, 
  TestDriveBooking, 
  CustomerEnquiry, 
  Showroom, 
  SpecialOffer 
} from '../types/vehicle';
import { VEHICLES_DATA, SHOWROOMS_DATA, SPECIAL_OFFERS_DATA } from '../data/vehiclesData';

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

// Attach JWT token from localStorage if present
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('autobot_token');
  if (token && config.headers) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// In-memory / localStorage fallback stores for seamless operation
const STORAGE_KEYS = {
  QUOTATIONS: 'autobot_quotations',
  BOOKINGS: 'autobot_bookings',
  ENQUIRIES: 'autobot_enquiries',
  VEHICLES_CUSTOM: 'autobot_vehicles_custom',
  USER: 'autobot_user',
};

const getStored = <T>(key: string, fallback: T): T => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

const setStored = (key: string, val: unknown) => {
  try {
    localStorage.setItem(key, JSON.stringify(val));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const VehicleService = {
  async getVehicles(params?: { category?: string; search?: string; sort?: string; page?: number; limit?: number }): Promise<{ vehicles: Vehicle[]; total: number }> {
    try {
      const res = await apiClient.get('/vehicles', { params });
      if (res.data && Array.isArray(res.data.vehicles)) {
        return res.data;
      }
    } catch {
      // Graceful fallback to rich built-in dataset
    }

    let list = [...VEHICLES_DATA];
    const custom = getStored<Vehicle[]>(STORAGE_KEYS.VEHICLES_CUSTOM, []);
    list = [...list, ...custom];

    if (params?.category && params.category !== 'All') {
      list = list.filter((v) => v.category.toLowerCase() === params.category?.toLowerCase());
    }

    if (params?.search) {
      const query = params.search.toLowerCase();
      list = list.filter((v) => 
        v.name.toLowerCase().includes(query) || 
        v.tagline.toLowerCase().includes(query) ||
        v.category.toLowerCase().includes(query)
      );
    }

    if (params?.sort) {
      switch (params.sort) {
        case 'price-asc':
          list.sort((a, b) => a.startingPrice - b.startingPrice);
          break;
        case 'price-desc':
          list.sort((a, b) => b.startingPrice - a.startingPrice);
          break;
        case 'performance':
          list.sort((a, b) => a.acceleration0to100 - b.acceleration0to100);
          break;
        case 'power':
          list.sort((a, b) => b.horsepower - a.horsepower);
          break;
        default:
          break;
      }
    }

    return { vehicles: list, total: list.length };
  },

  async getVehicleBySlug(slug: string): Promise<Vehicle> {
    try {
      const res = await apiClient.get(`/vehicles/slug/${slug}`);
      if (res.data) return res.data;
    } catch {
      // Fallback
    }
    const found = VEHICLES_DATA.find((v) => v.slug === slug || v.id === slug);
    if (found) return found;
    throw new Error('Vehicle not found');
  },

  async getVehicleById(id: string): Promise<Vehicle> {
    try {
      const res = await apiClient.get(`/vehicles/${id}`);
      if (res.data) return res.data;
    } catch {
      // Fallback
    }
    const found = VEHICLES_DATA.find((v) => v.id === id);
    if (found) return found;
    throw new Error('Vehicle not found');
  }
};

export const ConfiguratorService = {
  calculateQuotationPrice(
    vehicle: Vehicle,
    variantId: string,
    colorId: string,
    interiorId: string,
    wheelId: string,
    packageIds: string[],
    accessoryIds: string[]
  ) {
    const basePrice = vehicle.startingPrice;
    const variant = vehicle.variants.find((v) => v.id === variantId);
    const variantPrice = variant ? variant.priceDelta : 0;

    const color = vehicle.colors.find((c) => c.id === colorId);
    const colorPrice = color ? color.price : 0;

    const interior = vehicle.interiorOptions.find((i) => i.id === interiorId);
    const interiorPrice = interior ? interior.price : 0;

    const wheel = vehicle.wheels.find((w) => w.id === wheelId);
    const wheelPrice = wheel ? wheel.price : 0;

    const packagesPrice = packageIds.reduce((sum, pkgId) => {
      const p = vehicle.packages.find((pkg) => pkg.id === pkgId);
      return sum + (p ? p.price : 0);
    }, 0);

    const accessoriesPrice = accessoryIds.reduce((sum, accId) => {
      const a = vehicle.accessories.find((acc) => acc.id === accId);
      return sum + (a ? a.price : 0);
    }, 0);

    const subtotal = basePrice + variantPrice + colorPrice + interiorPrice + wheelPrice + packagesPrice + accessoriesPrice;
    // Promotional luxury discount: 2%
    const applicableDiscount = Math.round(subtotal * 0.02);
    // Estimated GST & Luxury Cess: 18%
    const taxableAmount = subtotal - applicableDiscount;
    const estimatedTaxesGst = Math.round(taxableAmount * 0.18);
    const estimatedTotal = taxableAmount + estimatedTaxesGst;

    return {
      basePrice,
      variantPrice,
      colorPrice,
      interiorPrice,
      wheelPrice,
      packagesPrice,
      accessoriesPrice,
      applicableDiscount,
      estimatedTaxesGst,
      estimatedTotal
    };
  },

  async createQuotation(config: UserConfiguration, vehicle: Vehicle): Promise<Quotation> {
    const pricing = this.calculateQuotationPrice(
      vehicle,
      config.variantId,
      config.colorId,
      config.interiorId,
      config.wheelId,
      config.packageIds,
      config.accessoryIds
    );

    const quotationNumber = `ATB-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`;
    const now = new Date();
    const validUntil = new Date(now.getTime() + 14 * 24 * 60 * 60 * 1000); // 14 days validity

    const newQuotation: Quotation = {
      id: `quote-${Date.now()}`,
      quotationNumber,
      createdAt: now.toISOString(),
      validUntil: validUntil.toISOString(),
      vehicle,
      configuration: {
        ...config,
        pricingBreakdown: pricing
      },
      status: 'ISSUED'
    };

    try {
      const res = await apiClient.post('/quotations', newQuotation);
      if (res.data) return res.data;
    } catch {
      // Local storage fallback
    }

    const quotes = getStored<Quotation[]>(STORAGE_KEYS.QUOTATIONS, []);
    quotes.unshift(newQuotation);
    setStored(STORAGE_KEYS.QUOTATIONS, quotes);

    return newQuotation;
  },

  async getQuotationById(id: string): Promise<Quotation> {
    try {
      const res = await apiClient.get(`/quotations/${id}`);
      if (res.data) return res.data;
    } catch {
      // Fallback
    }
    const quotes = getStored<Quotation[]>(STORAGE_KEYS.QUOTATIONS, []);
    const found = quotes.find((q) => q.id === id || q.quotationNumber === id);
    if (found) return found;
    throw new Error('Quotation not found');
  },

  async getRecentQuotations(): Promise<Quotation[]> {
    return getStored<Quotation[]>(STORAGE_KEYS.QUOTATIONS, []);
  }
};

export const BookingService = {
  async bookTestDrive(booking: Omit<TestDriveBooking, 'id' | 'createdAt' | 'status'>): Promise<TestDriveBooking> {
    const newBooking: TestDriveBooking = {
      ...booking,
      id: `td-${Date.now()}`,
      status: 'PENDING',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await apiClient.post('/test-drives', newBooking);
      if (res.data) return res.data;
    } catch {
      // Fallback
    }

    const list = getStored<TestDriveBooking[]>(STORAGE_KEYS.BOOKINGS, []);
    list.unshift(newBooking);
    setStored(STORAGE_KEYS.BOOKINGS, list);
    return newBooking;
  },

  async getBookings(): Promise<TestDriveBooking[]> {
    try {
      const res = await apiClient.get('/test-drives');
      if (res.data) return res.data;
    } catch {
      // Fallback
    }
    return getStored<TestDriveBooking[]>(STORAGE_KEYS.BOOKINGS, []);
  },

  async updateBookingStatus(id: string, status: TestDriveBooking['status']): Promise<TestDriveBooking> {
    const list = getStored<TestDriveBooking[]>(STORAGE_KEYS.BOOKINGS, []);
    const index = list.findIndex((b) => b.id === id);
    if (index !== -1) {
      list[index].status = status;
      setStored(STORAGE_KEYS.BOOKINGS, list);
      return list[index];
    }
    throw new Error('Booking not found');
  }
};

export const EnquiryService = {
  async submitEnquiry(enquiry: Omit<CustomerEnquiry, 'id' | 'createdAt' | 'status'>): Promise<CustomerEnquiry> {
    const newEnquiry: CustomerEnquiry = {
      ...enquiry,
      id: `enq-${Date.now()}`,
      status: 'NEW',
      createdAt: new Date().toISOString()
    };

    try {
      const res = await apiClient.post('/enquiries', newEnquiry);
      if (res.data) return res.data;
    } catch {
      // Fallback
    }

    const list = getStored<CustomerEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    list.unshift(newEnquiry);
    setStored(STORAGE_KEYS.ENQUIRIES, list);
    return newEnquiry;
  },

  async getEnquiries(): Promise<CustomerEnquiry[]> {
    try {
      const res = await apiClient.get('/enquiries');
      if (res.data) return res.data;
    } catch {
      // Fallback
    }
    return getStored<CustomerEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
  },

  async updateEnquiryStatus(id: string, status: CustomerEnquiry['status'], assignedRep?: string): Promise<CustomerEnquiry> {
    const list = getStored<CustomerEnquiry[]>(STORAGE_KEYS.ENQUIRIES, []);
    const index = list.findIndex((e) => e.id === id);
    if (index !== -1) {
      list[index].status = status;
      if (assignedRep) list[index].assignedRep = assignedRep;
      setStored(STORAGE_KEYS.ENQUIRIES, list);
      return list[index];
    }
    throw new Error('Enquiry not found');
  }
};

export const ShowroomService = {
  async getShowrooms(): Promise<Showroom[]> {
    return SHOWROOMS_DATA;
  }
};

export const OffersService = {
  async getOffers(): Promise<SpecialOffer[]> {
    return SPECIAL_OFFERS_DATA;
  }
};

export const CurrencyFormatter = {
  formatINR(amount: number): string {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  }
};
