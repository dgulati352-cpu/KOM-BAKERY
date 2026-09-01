import type {
  Product,
  CakeCustomizationSelection,
  CartItem,
  FulfillmentType,
} from '../types';
import {
  DELIVERY_ZONES,
  FREE_DELIVERY_THRESHOLD,
  MINIMUM_DELIVERY_ORDER,
  TAX_RATE,
} from '../data/deliveryZones';

export { FREE_DELIVERY_THRESHOLD, MINIMUM_DELIVERY_ORDER };

export const formatPrice = (amount: number): string => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
};

export const calculateProductPrice = (
  product: Product,
  customization?: CakeCustomizationSelection
): number => {
  if (!customization) {
    return product.basePrice;
  }

  let total = customization.size ? customization.size.price : product.basePrice;

  // Add flavor extra
  if (customization.flavor) {
    total += customization.flavor.priceAdd;
  }

  // Add filling extra
  if (customization.filling) {
    total += customization.filling.priceAdd;
  }

  // Premium lettering option
  if (customization.premiumLettering) {
    total += 250;
  }

  // Decorative upgrades
  if (customization.decoration) {
    total += customization.decoration.priceAdd;
  }

  // Addons (Candles, Greeting cards, etc.)
  if (customization.selectedAddons && customization.selectedAddons.length > 0) {
    const addonsTotal = customization.selectedAddons.reduce((sum, item) => sum + item.price, 0);
    total += addonsTotal;
  }

  return total;
};

export const calculateCartSubtotal = (items: CartItem[]): number => {
  return items.reduce((sum, item) => sum + item.lineTotal, 0);
};

export const calculateDeliveryFee = (
  subtotal: number,
  fulfillmentType: FulfillmentType,
  zoneId: string = 'zone-1'
): number => {
  if (fulfillmentType === 'pickup') {
    return 0;
  }

  if (subtotal >= FREE_DELIVERY_THRESHOLD) {
    return 0;
  }

  const zone = DELIVERY_ZONES.find((z) => z.id === zoneId) || DELIVERY_ZONES[0];
  return zone.fee;
};

export const calculateTax = (subtotal: number, deliveryFee: number = 0): number => {
  return Math.round((subtotal + deliveryFee) * TAX_RATE);
};

export const calculateOrderTotal = (
  subtotal: number,
  deliveryFee: number,
  discount: number = 0,
  tax: number = 0
): number => {
  return Math.max(0, subtotal + deliveryFee - discount + tax);
};
