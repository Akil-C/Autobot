export interface VehicleColor {
  id: string;
  name: string;
  hex: string;
  price: number;
  imageUrl: string;
  exteriorFinish?: 'metallic' | 'matte' | 'pearl' | 'gloss';
}

export interface VehicleVariant {
  id: string;
  name: string;
  badge: string;
  priceDelta: number;
  drivetrain: string;
  acceleration: string;
  topSpeed: string;
  rangeOrMileage: string;
  power: string;
  torque: string;
  features: string[];
}

export interface VehicleWheel {
  id: string;
  name: string;
  sizeInch: number;
  finish: string;
  price: number;
  imageUrl?: string;
}

export interface VehicleInterior {
  id: string;
  name: string;
  material: string;
  colorName: string;
  hex: string;
  price: number;
}

export interface VehiclePackage {
  id: string;
  name: string;
  description: string;
  price: number;
  highlightFeatures: string[];
}

export interface VehicleAccessory {
  id: string;
  name: string;
  category: 'Protection' | 'Lifestyle' | 'Tech' | 'Convenience';
  price: number;
  description: string;
}

export interface VehicleSpecification {
  category: string;
  specs: { label: string; value: string }[];
}

export interface Vehicle {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  category: 'Sedan' | 'SUV' | 'Electric SUV' | 'Electric Sedan' | 'Performance' | 'Luxury' | 'Compact SUV' | 'Hypercar';
  startingPrice: number;
  fuelType: 'Pure Electric' | 'Plug-in Hybrid' | 'Twin-Turbo V8' | 'Hydrogen-Electric';
  transmission: string;
  horsepower: number;
  torqueNm: number;
  rangeOrMileage: string;
  seatingCapacity: number;
  topSpeedKmh: number;
  acceleration0to100: number; // in seconds e.g. 2.8
  safetyRatingStars: number;
  batteryCapacityKwh?: number;
  chargingTimeMin?: number;
  dimensions: {
    lengthMm: number;
    widthMm: number;
    heightMm: number;
    wheelbaseMm: number;
    curbWeightKg: number;
  };
  heroImage: string;
  galleryImages: string[];
  colors: VehicleColor[];
  variants: VehicleVariant[];
  interiorOptions: VehicleInterior[];
  wheels: VehicleWheel[];
  packages: VehiclePackage[];
  accessories: VehicleAccessory[];
  keyFeatures: string[];
  detailedSpecifications: VehicleSpecification[];
  status: 'Available' | 'New Launch' | 'Limited Edition' | 'Pre-Order';
  launchDate: string;
  description: string;
}

export interface UserConfiguration {
  id?: string;
  vehicleId: string;
  variantId: string;
  colorId: string;
  interiorId: string;
  wheelId: string;
  packageIds: string[];
  accessoryIds: string[];
  pricingBreakdown: {
    basePrice: number;
    variantPrice: number;
    colorPrice: number;
    interiorPrice: number;
    wheelPrice: number;
    packagesPrice: number;
    accessoriesPrice: number;
    applicableDiscount: number;
    estimatedTaxesGst: number;
    estimatedTotal: number;
  };
  customerDetails?: {
    name: string;
    email: string;
    phone: string;
    city: string;
  };
}

export interface Quotation {
  id: string;
  quotationNumber: string;
  createdAt: string;
  validUntil: string;
  vehicle: Vehicle;
  configuration: UserConfiguration;
  status: 'DRAFT' | 'ISSUED' | 'CONVERTED' | 'EXPIRED';
}

export interface TestDriveBooking {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleId: string;
  vehicleName: string;
  preferredDate: string;
  preferredTimeSlot: string;
  showroomLocation: string;
  status: 'PENDING' | 'CONFIRMED' | 'COMPLETED' | 'CANCELLED';
  createdAt: string;
  notes?: string;
}

export interface CustomerEnquiry {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  city: string;
  vehicleId: string;
  vehicleName: string;
  preferredVariant?: string;
  preferredContactMethod: 'EMAIL' | 'PHONE' | 'WHATSAPP';
  message: string;
  status: 'NEW' | 'CONTACTED' | 'IN_PROGRESS' | 'CLOSED';
  assignedRep?: string;
  createdAt: string;
}

export interface Showroom {
  id: string;
  name: string;
  city: string;
  address: string;
  phone: string;
  email: string;
  operatingHours: string;
  coordinates: { lat: number; lng: number };
  amenities: string[];
}

export interface SpecialOffer {
  id: string;
  title: string;
  subtitle: string;
  discountPercentage?: number;
  discountAmount?: number;
  validUntil: string;
  applicableModels: string[];
  badge: string;
  terms: string;
}
