import type { CartItem, StoreTimeSlot } from '../types';
import { STORE_CLOSURES, DEFAULT_TIME_SLOTS } from '../data/storeHours';

export interface DateAvailability {
  dateString: string; // YYYY-MM-DD
  displayDate: string; // e.g. "Tomorrow, Aug 25"
  dayOfWeek: string; // e.g. "Tuesday"
  isAvailable: boolean;
  reason?: string;
  isToday: boolean;
  minLeadTimeRequiredHours: number;
}

export const getMinLeadTimeHours = (items: CartItem[]): number => {
  if (!items || items.length === 0) return 0;
  return Math.max(...items.map((i) => i.product.availability.preparationTimeHours));
};

export const getAvailableDates = (items: CartItem[] = []): DateAvailability[] => {
  const dates: DateAvailability[] = [];
  const now = new Date();
  const currentHour = now.getHours();
  const isPastSameDayCutoff = currentHour >= 14; // 2:00 PM cutoff

  const maxLeadTimeHours = getMinLeadTimeHours(items);

  // Generate next 14 days
  for (let i = 0; i < 14; i++) {
    const targetDate = new Date();
    targetDate.setDate(now.getDate() + i);

    const year = targetDate.getFullYear();
    const month = String(targetDate.getMonth() + 1).padStart(2, '0');
    const day = String(targetDate.getDate()).padStart(2, '0');
    const dateString = `${year}-${month}-${day}`;

    const dayName = targetDate.toLocaleDateString('en-US', { weekday: 'long' });
    const formattedShort = targetDate.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
    });

    let displayDate = `${dayName}, ${formattedShort}`;
    if (i === 0) displayDate = `Today (${formattedShort})`;
    if (i === 1) displayDate = `Tomorrow (${formattedShort})`;

    let isAvailable = true;
    let reason: string | undefined = undefined;

    // Check store holiday closure
    if (STORE_CLOSURES.includes(dateString)) {
      isAvailable = false;
      reason = 'Bakery closed for scheduled hearth maintenance';
    }

    // Check Lead Time Requirements
    if (i === 0) {
      if (maxLeadTimeHours >= 24) {
        isAvailable = false;
        reason = 'Cakes require 24 hours advance baking notice';
      } else if (isPastSameDayCutoff) {
        isAvailable = false;
        reason = 'Same-day ordering closed at 2:00 PM';
      }
    } else if (i === 1 && maxLeadTimeHours >= 48) {
      isAvailable = false;
      reason = 'Custom tiers require 48 hours notice';
    }

    dates.push({
      dateString,
      displayDate,
      dayOfWeek: dayName,
      isAvailable,
      reason,
      isToday: i === 0,
      minLeadTimeRequiredHours: maxLeadTimeHours,
    });
  }

  return dates;
};

export const getAvailableTimeSlots = (
  dateString: string,
  _fulfillmentType: 'pickup' | 'delivery' = 'pickup'
): StoreTimeSlot[] => {
  const now = new Date();
  const todayString = now.toISOString().split('T')[0];
  const isToday = dateString === todayString;
  const currentHour = now.getHours();

  return DEFAULT_TIME_SLOTS.map((slot) => {
    let slotAvailable = slot.isAvailable;
    let startHour = parseInt(slot.time.split(':')[0], 10);
    const isPM = slot.time.includes('PM') && startHour !== 12;
    if (isPM) startHour += 12;

    if (isToday && startHour <= currentHour + 1) {
      slotAvailable = false;
    }

    return {
      ...slot,
      isAvailable: slotAvailable,
    };
  });
};

export const validateCartForCheckout = (items: CartItem[]): { isValid: boolean; error?: string } => {
  if (items.length === 0) {
    return { isValid: false, error: 'Your cart is empty.' };
  }

  for (const item of items) {
    if (item.quantity > item.product.availability.remainingStock) {
      return {
        isValid: false,
        error: `Only ${item.product.availability.remainingStock} units of "${item.product.name}" are available in today's fresh batch.`,
      };
    }
  }

  return { isValid: true };
};
