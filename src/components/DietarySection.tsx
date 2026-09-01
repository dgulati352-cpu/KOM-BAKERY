import React, { useState } from 'react';
import { ChevronDown, AlertTriangle, ShieldCheck, Check, Sparkles } from 'lucide-react';

interface AllergenItem {
  id: string;
  category: string;
  badge: string;
  summary: string;
  items: string[];
  safePractice: string;
}

export const DietarySection: React.FC = () => {
  const [openAccordion, setOpenAccordion] = useState<string>('gluten-free');

  const allergenCategories: AllergenItem[] = [
    {
      id: 'gluten-free',
      category: 'Gluten-Conscious Baking',
      badge: 'Dedicated Prep Area',
      summary: 'Crafted with fine Californian almond meal, organic oat flour, and tapioca starches.',
      items: [
        'Flourless Salted Caramel Brownie',
        'Gluten-Free Cardamom Orange Almond Cake',
        'French Almond Macarons',
      ],
      safePractice:
        'Prepared using dedicated bowls, utensils, and stone decks. Please note our kitchen handles wheat flour daily; while we sanitize thoroughly, we are not a 100% certified celiac facility.',
    },
    {
      id: 'vegan',
      category: '100% Plant-Based & Eggless',
      badge: 'Zero Animal Products',
      summary: 'Pure plant indulgence using organic almond milk, cold-pressed coconut oil, and applesauce.',
      items: [
        'Velvet Vegan Chocolate Fudge Cake',
        'Caramelized Vegan Banana Walnut Loaf',
        'Heritage Country Sourdough',
        'Rosemary Garlic Focaccia',
      ],
      safePractice:
        'Strict separation of dairy and plant-based baking equipment to ensure zero animal cross-contact.',
    },
    {
      id: 'dairy-free',
      category: 'Dairy-Free Friendly',
      badge: 'Plant Milk & Olive Oil',
      summary: 'Naturally dairy-free options baked using extra virgin olive oil and unbleached grains.',
      items: [
        'Heritage Country Sourdough',
        'Ancient Grain & Seed Sourdough',
        'Ligurian Rosemary & Garlic Focaccia',
        'Kalamata Olive Focaccia',
      ],
      safePractice: 'Naturally dairy-free with zero butter or milk additives.',
    },
    {
      id: 'nut-free',
      category: 'Nut-Conscious Offerings',
      badge: 'Nut-Free Recipes',
      summary: 'Classic bakes prepared without any tree nuts or peanuts.',
      items: [
        'Traditional French Butter Croissant',
        'Classic Pain au Chocolat',
        'Country Sourdough',
        'Classic Vanilla Berry Cake',
      ],
      safePractice:
        'Made without nuts in the recipe. However, our pâtisserie works with almonds, walnuts, and pistachios on separate benches.',
    },
  ];

  return (
    <section id="allergens" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Section Header */}
        <div className="text-center space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C87D55]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Transparency & Kitchen Safety</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C130E]">
            Dietary & Allergen Guide
          </h2>

          <p className="text-sm sm:text-base text-[#533D32] max-w-2xl mx-auto">
            We believe you deserve total transparency about what goes into your food. Here is how we manage allergens, gluten alternatives, and plant-based recipes in our artisan kitchen.
          </p>
        </div>

        {/* Prominent Safety Disclaimer Alert */}
        <div className="p-4 sm:p-5 bg-amber-50 border border-amber-200 rounded-2xl flex items-start gap-3.5 text-xs text-amber-900 shadow-warm-sm">
          <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="font-bold text-sm text-amber-950">Important Allergen Notice</h4>
            <p className="leading-relaxed">
              Please contact us regarding specific allergies or dietary requirements before ordering. Our bakery kitchen handles common allergens including wheat, gluten, milk, eggs, tree nuts (almonds, walnuts, pistachios, hazelnuts), and sesame seeds.
            </p>
          </div>
        </div>

        {/* Interactive Accordion */}
        <div className="space-y-3">
          {allergenCategories.map((cat) => {
            const isOpen = openAccordion === cat.id;
            return (
              <div
                key={cat.id}
                className="bg-white rounded-2xl border border-[#EFE8DE] shadow-warm-sm overflow-hidden transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenAccordion(isOpen ? '' : cat.id)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-[#FAF6ED]/60 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-[#FBEDDE] flex items-center justify-center text-[#C87D55] text-xs font-bold shrink-0">
                      <ShieldCheck className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="font-serif font-bold text-base text-[#1C130E]">{cat.category}</h3>
                      <p className="text-xs text-[#705446]">{cat.summary}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider text-[#2E4A2E] bg-[#E5EDE5] px-2.5 py-1 rounded-full">
                      {cat.badge}
                    </span>
                    <ChevronDown
                      className={`w-5 h-5 text-[#947665] transition-transform duration-300 ${
                        isOpen ? 'rotate-180 text-[#C87D55]' : ''
                      }`}
                    />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-2 border-t border-[#EFE8DE] bg-[#FAF6ED]/40 space-y-4 animate-fade-in text-xs text-[#533D32]">
                    <div>
                      <p className="font-bold text-[#1C130E] mb-1.5 uppercase text-[11px] tracking-wider">
                        Available Menu Treats in this Category:
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {cat.items.map((item) => (
                          <div key={item} className="flex items-center gap-2 text-[#3D2B22]">
                            <Check className="w-3.5 h-3.5 text-[#C87D55]" />
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="p-3 bg-white rounded-xl border border-[#EFE8DE] space-y-1">
                      <strong className="text-[#1C130E] block text-[11px] uppercase tracking-wider">
                        Kitchen Safety Protocol:
                      </strong>
                      <p className="text-[#705446] leading-relaxed">{cat.safePractice}</p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
