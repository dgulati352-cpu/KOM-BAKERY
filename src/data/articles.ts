import type { Article } from '../types';

export const ARTICLES: Article[] = [
  {
    id: 'secrets-to-better-sourdough',
    title: '5 Secrets to Crafting Better Wild-Fermented Sourdough',
    category: 'Baking Tips',
    excerpt: 'Master baker Laurent shares our kitchen’s daily rituals for building blistered crusts, airy crumb structures, and balanced lactic acidity.',
    content: [
      'Great bread is a dialogue between time, temperature, and microbial life. Our 9-year-old starter, Levain, is fed twice daily with freshly milled organic rye and stoneground wheat.',
      '1. Hydration is not a trophy: Begin at 72% hydration before jumping to 85%. You will achieve superior gluten alignment and loaf tension.',
      '2. The Power of the Autolyse: Allowing flour and water to rest for 60 minutes before adding salt and starter hydrates proteins effortlessly.',
      '3. Temperature Control during Bulk Fermentation: Keep your dough between 24°C and 26°C for predictable yeast activity and optimal organic acid balance.',
      '4. Steam is Essential: The first 20 minutes in the oven require saturated steam to keep the crust supple, allowing maximum oven spring before caramelization begins.'
    ],
    readTime: '4 min read',
    date: 'Aug 24, 2026',
    author: 'Chef Laurent Mercier',
    authorRole: 'Head Baker & Co-Founder',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'making-signature-croissants',
    title: 'The 72-Hour Journey of Our Signature French Croissants',
    category: 'Behind the Scenes',
    excerpt: 'From 84% butterfat Normandy butter to 81 delicate laminated layers, here is how our early morning viennoiserie comes to life.',
    content: [
      'At 3:30 AM every morning, while the city sleeps, our laminated doughs are gently brought out of cold retardation.',
      'We use exclusively AOP Charentes-Poitou French cultured butter with 84% butterfat. Its high plasticity and deep hazelnut aromas cannot be matched by conventional commercial butter.',
      'The dough undergoes a classic three-fold lamination process across 36 hours. Every single layer of butter is chilled to precisely 4°C so it remains distinct from the dough rather than melting in.',
      'When baked in our stone-deck hearth, the trapped water in the butter evaporates rapidly, pushing apart the 81 microscopic layers into crisp, buttery honeycomb shards.'
    ],
    readTime: '6 min read',
    date: 'Aug 18, 2026',
    author: 'Sophie Dubois',
    authorRole: 'Master Pâtissière',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
  },
  {
    id: 'celebration-dessert-pairings',
    title: 'Curating the Perfect Dessert Table for Summer Celebrations',
    category: 'Seasonal',
    excerpt: 'How to harmonize flavors, textures, and dietary requirements when designing bespoke dessert spreads for intimate gatherings.',
    content: [
      'A memorable dessert table balances richness with acidity, and crunch with velvety textures.',
      'Pairing rich chocolate gateaux with bright citrus tarts and seasonal berry shortcakes ensures there is a dessert for every palate.',
      'Always calculate 1.5 portions per guest for cocktail receptions, and offer at least one certified gluten-conscious and vegan option so no guest feels excluded.'
    ],
    readTime: '3 min read',
    date: 'Jul 30, 2026',
    author: 'Elena Sharma',
    authorRole: 'Event & Wedding Stylist',
    image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
  },
];
