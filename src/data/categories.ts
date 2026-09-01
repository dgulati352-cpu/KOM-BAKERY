import type { CategoryId } from '../types';

export interface CategoryInfo {
  id: CategoryId;
  label: string;
  shortDesc: string;
  iconName: string;
  itemCount: number;
  slug: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'all',
    label: 'All Treats',
    shortDesc: 'Handcrafted artisan pastries, hearth breads, cupcakes & celebration cakes',
    iconName: 'Sparkles',
    itemCount: 32,
    slug: '/menu',
  },
  {
    id: 'cakes',
    label: 'Cakes',
    shortDesc: 'Bespoke celebration & birthday cakes with customizable layers',
    iconName: 'Cake',
    itemCount: 6,
    slug: '/cakes',
  },
  {
    id: 'pastries',
    label: 'Pastries',
    shortDesc: 'Laminated with pure AOP French butter & baked at sunrise',
    iconName: 'Croissant',
    itemCount: 6,
    slug: '/pastries',
  },
  {
    id: 'cookies',
    label: 'Cookies',
    shortDesc: 'Melt-in-mouth shortbreads, chewy cookies & delicate tarts',
    iconName: 'Cookie',
    itemCount: 6,
    slug: '/cookies',
  },
  {
    id: 'cupcakes',
    label: 'Cupcakes',
    shortDesc: 'Artisanal individual frosted cupcakes for everyday joy',
    iconName: 'Sparkles',
    itemCount: 4,
    slug: '/cupcakes',
  },
  {
    id: 'breads',
    label: 'Breads',
    shortDesc: '48-hour slow-fermented wild sourdoughs & focaccias',
    iconName: 'Wheat',
    itemCount: 6,
    slug: '/menu?category=breads',
  },
  {
    id: 'vegan',
    label: 'Vegan',
    shortDesc: '100% plant-based indulgence crafted with organic dairy alternatives',
    iconName: 'Leaf',
    itemCount: 4,
    slug: '/menu?category=vegan',
  },
  {
    id: 'gluten-free',
    label: 'Gluten-Conscious',
    shortDesc: 'Crafted with almond & oat flours in a dedicated sanitised area',
    iconName: 'ShieldCheck',
    itemCount: 4,
    slug: '/menu?category=gluten-free',
  },
];
