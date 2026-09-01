import React, { useState, useMemo } from 'react';
import {
  Sparkles,
  Filter,
  Cake,
  Wheat,
  Croissant,
  Cookie,
  Leaf,
  ShieldCheck,
  Search,
  RotateCcw,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { CATEGORIES } from '../data/categories';
import type { CategoryId, DietaryBadge } from '../types';
import { ProductCard } from './ProductCard';

export const InteractiveMenu: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryId>('all');
  const [selectedDietary, setSelectedDietary] = useState<DietaryBadge[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [menuSearch, setMenuSearch] = useState('');

  const dietaryOptions: DietaryBadge[] = [
    'Vegetarian',
    'Vegan',
    'Gluten-Free',
    'Dairy-Free',
    'Nut-Free',
    'Eggless',
  ];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'Cake':
        return <Cake className="w-4 h-4" />;
      case 'Wheat':
        return <Wheat className="w-4 h-4" />;
      case 'Croissant':
        return <Croissant className="w-4 h-4" />;
      case 'Cookie':
        return <Cookie className="w-4 h-4" />;
      case 'Leaf':
        return <Leaf className="w-4 h-4" />;
      case 'ShieldCheck':
        return <ShieldCheck className="w-4 h-4" />;
      default:
        return <Sparkles className="w-4 h-4" />;
    }
  };

  const toggleDietary = (badge: DietaryBadge) => {
    setSelectedDietary((prev) =>
      prev.includes(badge) ? prev.filter((d) => d !== badge) : [...prev, badge]
    );
  };

  const filteredProducts = useMemo(() => {
    return PRODUCTS.filter((product) => {
      if (activeCategory !== 'all') {
        if (activeCategory === 'vegan' && !product.dietary.includes('Vegan')) return false;
        if (activeCategory === 'gluten-free' && !product.dietary.includes('Gluten-Free')) return false;
        if (activeCategory !== 'vegan' && activeCategory !== 'gluten-free' && product.category !== activeCategory) return false;
      }

      if (selectedDietary.length > 0) {
        const matchesAllDietary = selectedDietary.every((d) => product.dietary.includes(d));
        if (!matchesAllDietary) return false;
      }

      if (menuSearch.trim()) {
        const q = menuSearch.toLowerCase();
        const matchesText =
          product.name.toLowerCase().includes(q) ||
          product.description.toLowerCase().includes(q) ||
          product.tagline.toLowerCase().includes(q) ||
          product.ingredients?.some((i) => i.toLowerCase().includes(q));
        if (!matchesText) return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.basePrice - b.basePrice;
      if (sortBy === 'price-desc') return b.basePrice - a.basePrice;
      if (sortBy === 'rating') return b.rating - a.rating;
      return (b.isBestseller ? 1 : 0) - (a.isBestseller ? 1 : 0);
    });
  }, [activeCategory, selectedDietary, menuSearch, sortBy]);

  const activeCategoryInfo = CATEGORIES.find((c) => c.id === activeCategory);

  return (
    <section id="menu" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="text-center max-w-3xl mx-auto mb-10 space-y-3">
        <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#C87D55]">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Handcrafted Daily Catalog</span>
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C130E]">
          The Complete Bakery Menu
        </h2>
        <p className="text-sm sm:text-base text-[#533D32]">
          Every item is baked using authentic time-honored techniques, French butter, and organic flours. Choose store pickup or local doorstep delivery.
        </p>
      </div>

      <div className="relative mb-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-3 pt-1 no-scrollbar sm:justify-center">
          {CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#2A1D17] text-[#FAF6ED] shadow-warm-md scale-105'
                    : 'bg-[#FAF6ED] text-[#533D32] hover:bg-[#F4ECE0] hover:text-[#1C130E] border border-[#EFE8DE]'
                }`}
              >
                <span className={isActive ? 'text-[#E09F67]' : 'text-[#8C4425]'}>
                  {getCategoryIcon(cat.iconName)}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="bg-[#FAF6ED] p-4 sm:p-5 rounded-2xl border border-[#EFE8DE] shadow-warm-sm mb-8 space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold text-[#705446] flex items-center gap-1.5 mr-1">
              <Filter className="w-3.5 h-3.5 text-[#C87D55]" />
              <span>Dietary:</span>
            </span>
            {dietaryOptions.map((diet) => {
              const isSelected = selectedDietary.includes(diet);
              return (
                <button
                  key={diet}
                  onClick={() => toggleDietary(diet)}
                  className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                    isSelected
                      ? 'bg-[#6F8C6F] text-white shadow-sm'
                      : 'bg-white text-[#533D32] hover:bg-[#F4ECE0] border border-[#DEC9B5]'
                  }`}
                >
                  {isSelected ? `✓ ${diet}` : diet}
                </button>
              );
            })}
            {selectedDietary.length > 0 && (
              <button
                onClick={() => setSelectedDietary([])}
                className="text-xs text-[#8C4425] hover:underline font-semibold flex items-center gap-1 ml-1"
              >
                <RotateCcw className="w-3 h-3" />
                <span>Reset</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-[#947665] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={menuSearch}
                onChange={(e) => setMenuSearch(e.target.value)}
                placeholder="Filter by name or ingredient..."
                className="w-full pl-9 pr-3 py-1.5 bg-white rounded-lg border border-[#DEC9B5] text-xs text-[#1C130E] placeholder-[#947665] focus:outline-none focus:ring-1 focus:ring-[#C87D55]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-white border border-[#DEC9B5] text-xs text-[#3D2B22] rounded-lg px-3 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#C87D55] font-medium"
            >
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated (★)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {activeCategoryInfo && (
          <div className="pt-3 border-t border-[#EFE8DE] flex items-center justify-between text-xs text-[#705446]">
            <p className="italic">{activeCategoryInfo.shortDesc}</p>
            <span className="font-semibold text-[#1C130E]">
              Showing {filteredProducts.length} items
            </span>
          </div>
        )}
      </div>

      {filteredProducts.length === 0 ? (
        <div className="py-16 text-center bg-[#FAF6ED] rounded-3xl border border-[#EFE8DE] space-y-4">
          <div className="w-16 h-16 rounded-full bg-white border border-[#EFE8DE] flex items-center justify-center text-3xl mx-auto shadow-warm-sm">
            🥣
          </div>
          <h3 className="font-serif text-xl font-bold text-[#1C130E]">No treats found</h3>
          <p className="text-sm text-[#705446] max-w-sm mx-auto">
            We couldn't find any products matching your active filters. Try clearing your search or dietary tags.
          </p>
          <button
            onClick={() => {
              setActiveCategory('all');
              setSelectedDietary([]);
              setMenuSearch('');
            }}
            className="px-5 py-2.5 bg-[#2A1D17] text-[#FAF6ED] rounded-full text-xs font-semibold hover:bg-[#1C130E] transition-colors"
          >
            View All Products
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};
