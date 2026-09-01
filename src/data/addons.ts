import type {
  CakeSizeOption,
  CustomizationFlavor,
  CustomizationFilling,
  CustomizationDecoration,
  AddonItem,
} from '../types';

export const CAKE_SIZES: CakeSizeOption[] = [
  {
    id: '6inch',
    label: '6" Petite',
    diameter: '6 inch (15 cm)',
    servings: 'Serves 6–8 guests',
    price: 1850,
  },
  {
    id: '8inch',
    label: '8" Classic',
    diameter: '8 inch (20 cm)',
    servings: 'Serves 10–14 guests',
    price: 2650,
  },
  {
    id: '10inch',
    label: '10" Grand',
    diameter: '10 inch (25 cm)',
    servings: 'Serves 18–22 guests',
    price: 3650,
  },
  {
    id: '12inch',
    label: '12" Celebration',
    diameter: '12 inch (30 cm)',
    servings: 'Serves 25–30 guests',
    price: 4850,
  },
];

export const CAKE_FLAVORS: CustomizationFlavor[] = [
  { id: 'vanilla', name: 'Madagascar Bourbon Vanilla', priceAdd: 0 },
  { id: 'chocolate', name: 'Belgian Dark Cocoa (54%)', priceAdd: 0 },
  { id: 'red-velvet', name: 'Classic Red Velvet with Buttermilk', priceAdd: 150 },
  { id: 'carrot-walnut', name: 'Spiced Carrot with Toasted Walnuts', priceAdd: 150 },
  { id: 'salted-caramel', name: 'Guerande Salted Caramel Fudge', priceAdd: 250 },
];

export const CAKE_FILLINGS: CustomizationFilling[] = [
  { id: 'vanilla-cream', name: 'Whipped Vanilla Mascarpone Cream', priceAdd: 0 },
  { id: 'chocolate-ganache', name: 'Silky 70% Dark Chocolate Ganache', priceAdd: 150 },
  { id: 'strawberry-cream', name: 'Fresh Strawberry & Rose Compote Cream', priceAdd: 200 },
  { id: 'salted-caramel-filling', name: 'Slow-Cooked Caramel Buttercream', priceAdd: 200 },
  { id: 'pistachio-cream', name: 'Sicilian Roasted Pistachio Cream', priceAdd: 300 },
];

export const CAKE_DECORATIONS: CustomizationDecoration[] = [
  {
    id: 'simple',
    name: 'Artisan Textured Cream',
    description: 'Rustic hand-piped whipped frosting with chocolate crisp pearls',
    priceAdd: 0,
  },
  {
    id: 'fruit',
    name: 'Fresh Seasonal Berries & Gold Leaf',
    description: 'Strawberries, blueberries, raspberries dusted with edible 24k gold leaf',
    priceAdd: 350,
  },
  {
    id: 'floral',
    name: 'Organic Edible Florals & Macarons',
    description: 'Pesticide-free edible botanicals, French macarons, and delicate piping',
    priceAdd: 650,
  },
  {
    id: 'fondant',
    name: 'Bespoke Theme / Fondant Accents',
    description: 'Custom sculpted elements tailored to your celebration theme',
    priceAdd: 800,
    note: 'Starting at +₹800; final custom design confirmed after review',
  },
];

export const ADDON_ITEMS: AddonItem[] = [
  {
    id: 'birthday-candles',
    name: 'Artisan Spiral Candles (Set of 6)',
    description: 'Metallic champagne & rose gold celebratory birthday candles',
    price: 80,
    icon: 'Flame',
  },
  {
    id: 'premium-candle-set',
    name: 'Luxury Number / Sparkle Candle Set',
    description: 'Glitter dipped smokeless celebration candles',
    price: 180,
    icon: 'Sparkles',
  },
  {
    id: 'greeting-card',
    name: 'Hand-Lettered Botanical Greeting Card',
    description: 'Thick linen card with your personalized message handwritten in gold ink',
    price: 120,
    icon: 'Mail',
  },
  {
    id: 'cake-knife-set',
    name: 'Gold Stainless Cake Knife & Server',
    description: 'Reusable polished brass-finish server set with ribbon',
    price: 100,
    icon: 'Utensils',
  },
  {
    id: 'gift-packaging',
    name: 'Maison Dorée Luxury Hatbox Packaging',
    description: 'Rigid embossed keepsake box tied with satin grosgrain ribbon',
    price: 250,
    icon: 'Gift',
  },
];
