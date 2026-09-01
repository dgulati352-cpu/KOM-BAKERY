import type { CategoryId } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  shortDesc: string;
  iconName: string;
  itemCount: number;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    label: 'All Treats',
    shortDesc: 'Handcrafted artisan pastries, hearth breads & celebration cakes',
    iconName: 'Sparkles',
    itemCount: 28,
  },
  {
    id: 'cakes',
    label: 'Signature Cakes',
    shortDesc: 'Bespoke celebration & birthday cakes with customizable layers',
    iconName: 'Cake',
    itemCount: 6,
  },
  {
    id: 'breads',
    label: 'Artisan Breads',
    shortDesc: '48-hour slow-fermented wild sourdoughs & focaccias',
    iconName: 'Wheat',
    itemCount: 6,
  },
  {
    id: 'pastries',
    label: 'French Viennoiserie',
    shortDesc: 'Laminated with pure AOP French butter & baked at sunrise',
    iconName: 'Croissant',
    itemCount: 6,
  },
  {
    id: 'cookies',
    label: 'Cookies & Treats',
    shortDesc: 'Melt-in-mouth shortbreads, chewy cookies & delicate tarts',
    iconName: 'Cookie',
    itemCount: 6,
  },
  {
    id: 'vegan',
    label: 'Vegan Delights',
    shortDesc: '100% plant-based indulgence crafted with organic dairy alternatives',
    iconName: 'Leaf',
    itemCount: 4,
  },
  {
    id: 'gluten-free',
    label: 'Gluten-Conscious',
    shortDesc: 'Crafted with almond & oat flours in a dedicated sanitised area',
    iconName: 'ShieldCheck',
    itemCount: 3,
  },
];
