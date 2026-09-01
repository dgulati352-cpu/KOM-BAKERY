import type { DeliveryZone } from '../types';

export const FREE_DELIVERY_THRESHOLD = 2000;
export const MIN_DELIVERY_SUBTOTAL = 500;
export const MINIMUM_DELIVERY_ORDER = 500;
export const TAX_RATE = 0.05;

export const DELIVERY_ZONES: DeliveryZone[] = [
  {
    id: 'zone-1',
    name: 'Neighborhood Central (0–5 km)',
    minKm: 0,
    maxKm: 5,
    fee: 80,
    estimatedTime: '30–45 mins',
    postcodes: ['560034', '560095', '560047', '560001'],
  },
  {
    id: 'zone-2',
    name: 'Metro City Radius (5–10 km)',
    minKm: 5,
    maxKm: 10,
    fee: 150,
    estimatedTime: '45–60 mins',
    postcodes: ['560025', '560038', '560008', '560076'],
  },
  {
    id: 'zone-3',
    name: 'Outer Metro Express (10–15 km)',
    minKm: 10,
    maxKm: 15,
    fee: 250,
    estimatedTime: '60–90 mins',
    postcodes: ['560066', '560100', '560068', '560037'],
  },
];
