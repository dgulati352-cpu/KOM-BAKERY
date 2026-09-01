export type CategoryId = 'all' | 'cakes' | 'pastries' | 'cookies' | 'cupcakes' | 'breads' | 'vegan' | 'gluten-free';

export type DietaryBadge = 'Vegetarian' | 'Vegan' | 'Gluten-Free' | 'Dairy-Free' | 'Nut-Free' | 'Eggless';

export interface ProductAvailability {
  daysAvailable: ('mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun')[];
  dailyStock: number;
  remainingStock: number;
  preparationTimeHours: number;
  sameDayEligible: boolean;
  preorderDays: number;
  cutoffTime?: string; // e.g. "14:00"
  seasonal?: {
    availableFrom: string; // e.g. "2026-03-01"
    availableUntil: string; // e.g. "2026-10-31"
    seasonName: string;
  };
}

export interface CakeSizeOption {
  id: '6inch' | '8inch' | '10inch' | '12inch';
  label: string;
  diameter: string;
  servings: string;
  price: number;
}

export interface CustomizationFlavor {
  id: string;
  name: string;
  priceAdd: number;
}

export interface CustomizationFilling {
  id: string;
  name: string;
  priceAdd: number;
}

export interface CustomizationDecoration {
  id: 'simple' | 'fruit' | 'floral' | 'fondant';
  name: string;
  description: string;
  priceAdd: number;
  note?: string;
}

export interface AddonItem {
  id: string;
  name: string;
  description: string;
  price: number;
  icon?: string;
}

export interface CakeCustomizationSelection {
  size: CakeSizeOption;
  flavor: CustomizationFlavor;
  filling: CustomizationFilling;
  customMessage: string;
  premiumLettering: boolean;
  decoration: CustomizationDecoration;
  selectedAddons: AddonItem[];
}

export interface Product {
  id: string;
  slug: string;
  name: string;
  tagline: string;
  description: string;
  category: CategoryId;
  basePrice: number;
  image: string;
  secondaryImage?: string;
  gallery?: string[];
  rating: number;
  reviewCount: number;
  dietary: DietaryBadge[];
  customizable: boolean;
  isBestseller?: boolean;
  isNew?: boolean;
  isSeasonal?: boolean;
  availability: ProductAvailability;
  availableSizes?: CakeSizeOption[];
  ingredients?: string[];
  allergens?: string[];
  storageAdvice?: string;
}

export interface CartItem {
  cartItemId: string;
  product: Product;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
  customization?: CakeCustomizationSelection;
  specialInstructions?: string;
}

export interface DeliveryZone {
  id: string;
  name: string;
  minKm: number;
  maxKm: number;
  fee: number;
  estimatedTime: string;
  postcodes: string[];
}

export type FulfillmentType = 'pickup' | 'delivery';

export interface CustomerDetails {
  fullName: string;
  email: string;
  phone: string;
  addressLine1: string;
  addressLine2: string;
  landmark: string;
  pincode: string;
  orderNotes: string;
  isGift: boolean;
  giftRecipientName?: string;
  giftNote?: string;
}

export type OrderStatus = 'received' | 'confirmed' | 'preparing' | 'ready' | 'out_for_delivery' | 'completed';

export interface PlacedOrder {
  orderId: string;
  orderNumber: string;
  createdAt: string;
  fulfillmentType: FulfillmentType;
  selectedDate: string;
  selectedTimeSlot: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee: number;
  discount: number;
  couponCode?: string;
  tax: number;
  total: number;
  customer: CustomerDetails;
  deliveryZone?: DeliveryZone;
  status: OrderStatus;
  paymentMethod: string;
}

export interface Article {
  id: string;
  title: string;
  category: 'Baking Tips' | 'Recipes' | 'Behind the Scenes' | 'Seasonal' | 'Heritage';
  excerpt: string;
  content: string[];
  readTime: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
}

export interface Review {
  id: string;
  author: string;
  location: string;
  rating: number;
  date: string;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  favoriteProduct: string;
  avatar: string;
}

export interface StoreTimeSlot {
  time: string;
  period: string;
  maxCapacity: number;
  bookedCount: number;
  isAvailable: boolean;
}
