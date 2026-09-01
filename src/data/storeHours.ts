import type { StoreTimeSlot } from '../types';

export interface DaySchedule {
  dayName: string;
  shortCode: 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat' | 'sun';
  openTime: string;
  closeTime: string;
  isOpen: boolean;
}

export const STORE_SCHEDULE: Record<string, DaySchedule> = {
  mon: { dayName: 'Monday', shortCode: 'mon', openTime: '07:00', closeTime: '19:00', isOpen: true },
  tue: { dayName: 'Tuesday', shortCode: 'tue', openTime: '07:00', closeTime: '19:00', isOpen: true },
  wed: { dayName: 'Wednesday', shortCode: 'wed', openTime: '07:00', closeTime: '19:00', isOpen: true },
  thu: { dayName: 'Thursday', shortCode: 'thu', openTime: '07:00', closeTime: '19:00', isOpen: true },
  fri: { dayName: 'Friday', shortCode: 'fri', openTime: '07:00', closeTime: '19:00', isOpen: true },
  sat: { dayName: 'Saturday', shortCode: 'sat', openTime: '08:00', closeTime: '20:00', isOpen: true },
  sun: { dayName: 'Sunday', shortCode: 'sun', openTime: '08:00', closeTime: '17:00', isOpen: true },
};

export const STORE_CLOSURES = [
  '2026-10-20', // Annual Hearth Maintenance
  '2026-11-08', // Master Baker Guild Day
  '2026-12-25', // Christmas Holiday Closure
];

export const DEFAULT_TIME_SLOTS: StoreTimeSlot[] = [
  { time: '09:00 AM – 10:00 AM', period: 'Morning Bake', maxCapacity: 8, bookedCount: 5, isAvailable: true },
  { time: '10:00 AM – 11:00 AM', period: 'Morning Bake', maxCapacity: 8, bookedCount: 8, isAvailable: false },
  { time: '11:00 AM – 12:00 PM', period: 'Midday', maxCapacity: 8, bookedCount: 4, isAvailable: true },
  { time: '12:00 PM – 01:00 PM', period: 'Lunch Batch', maxCapacity: 8, bookedCount: 3, isAvailable: true },
  { time: '01:00 PM – 02:00 PM', period: 'Afternoon', maxCapacity: 8, bookedCount: 2, isAvailable: true },
  { time: '02:00 PM – 03:00 PM', period: 'Tea Time', maxCapacity: 8, bookedCount: 7, isAvailable: true },
  { time: '03:00 PM – 04:00 PM', period: 'Tea Time', maxCapacity: 8, bookedCount: 8, isAvailable: false },
  { time: '04:00 PM – 05:00 PM', period: 'Evening Fresh', maxCapacity: 8, bookedCount: 4, isAvailable: true },
  { time: '05:00 PM – 06:00 PM', period: 'Evening Fresh', maxCapacity: 8, bookedCount: 3, isAvailable: true },
  { time: '06:00 PM – 07:00 PM', period: 'Twilight Batch', maxCapacity: 8, bookedCount: 1, isAvailable: true },
];
