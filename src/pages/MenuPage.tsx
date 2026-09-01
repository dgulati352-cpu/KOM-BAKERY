import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
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
import { ProductCard } from '../components/ProductCard';
import { PageHero } from '../components/PageHero';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const MenuPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryParam = (searchParams.get('category') as CategoryId) || 'all';

  const [activeCategory, setActiveCategory] = useState<CategoryId>(categoryParam);
  const [selectedDietary, setSelectedDietary] = useState<DietaryBadge[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'price-asc' | 'price-desc' | 'rating'>('popular');
  const [menuSearch, setMenuSearch] = useState('');

  const handleCategoryChange = (catId: CategoryId) => {
    setActiveCategory(catId);
    if (catId === 'all') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: catId });
    }
  };

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
    <div className="space-y-6">
      <Breadcrumbs items={[{ label: 'Our Menu' }]} />

      <PageHero
        eyebrow="HANDCRAFTED DAILY CATALOG"
        title="Our Complete Bakery Menu"
        subtitle="Freshly baked. Beautifully crafted. Made for every craving. Choose store pickup or local doorstep delivery."
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8 pb-16">
        {/* Category Filter Pills */}
        <div className="relative">
          <div className="flex items-center gap-2 overflow-x-auto pb-2 pt-1 no-scrollbar sm:justify-center">
            {CATEGORIES.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategoryChange(cat.id)}
                  className={`inline-flex items-center gap-2 px-4.5 py-2.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                    isActive
                      ? 'bg-[#2D211D] text-[#FFFDF9] shadow-warm-md scale-105'
                      : 'bg-[#FFFDF9] text-[#5A3026] hover:bg-[#F8F1E7] border border-[#EFE3D3]'
                  }`}
                >
                  <span className={isActive ? 'text-[#C9A36A]' : 'text-[#A86A4A]'}>
                    {getCategoryIcon(cat.iconName)}
                  </span>
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-[#FFFDF9] p-4 sm:p-5 rounded-2xl border border-[#EFE3D3] shadow-warm-sm space-y-4">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Dietary Tags */}
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-xs font-bold text-[#7D6A60] flex items-center gap-1.5 mr-1">
                <Filter className="w-3.5 h-3.5 text-[#A86A4A]" />
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
                        ? 'bg-[#5A3026] text-white shadow-sm'
                        : 'bg-[#F8F1E7] text-[#5A3026] hover:bg-[#EFE3D3] border border-[#EFE3D3]'
                    }`}
                  >
                    {isSelected ? `✓ ${diet}` : diet}
                  </button>
                );
              })}
              {selectedDietary.length > 0 && (
                <button
                  onClick={() => setSelectedDietary([])}
                  className="text-xs text-[#A86A4A] hover:underline font-semibold flex items-center gap-1 ml-1"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset</span>
                </button>
              )}
            </div>

            {/* Search & Sort Controls */}
            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-1 md:w-64">
                <Search className="w-4 h-4 text-[#7D6A60] absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={menuSearch}
                  onChange={(e) => setMenuSearch(e.target.value)}
                  placeholder="Filter products or ingredients..."
                  className="w-full pl-9 pr-3 py-2 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] placeholder-[#7D6A60] focus:outline-none focus:ring-1 focus:ring-[#A86A4A]"
                />
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[#F8F1E7] border border-[#EFE3D3] text-xs text-[#2D211D] rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-[#A86A4A] font-medium shrink-0"
              >
                <option value="popular">Most Popular</option>
                <option value="rating">Highest Rated (★)</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>

          {activeCategoryInfo && (
            <div className="pt-3 border-t border-[#EFE3D3] flex items-center justify-between text-xs text-[#7D6A60]">
              <p className="italic">{activeCategoryInfo.shortDesc}</p>
              <span className="font-semibold text-[#2D211D]">
                Showing {filteredProducts.length} items
              </span>
            </div>
          )}
        </div>

        {/* Product Grid / Empty State */}
        {filteredProducts.length === 0 ? (
          <div className="py-16 text-center bg-[#FFFDF9] rounded-3xl border border-[#EFE3D3] space-y-4">
            <div className="w-16 h-16 rounded-full bg-[#F8F1E7] border border-[#EFE3D3] flex items-center justify-center text-3xl mx-auto shadow-warm-sm">
              🥣
            </div>
            <h3 className="font-serif text-xl font-bold text-[#2D211D]">Nothing Found</h3>
            <p className="text-sm text-[#7D6A60] max-w-sm mx-auto">
              We couldn't find any items matching your active filters. Try clearing your search query or dietary tags.
            </p>
            <button
              onClick={() => {
                setActiveCategory('all');
                setSelectedDietary([]);
                setMenuSearch('');
              }}
              className="px-6 py-3 bg-[#2D211D] text-[#FFFDF9] rounded-full text-xs font-semibold hover:bg-[#1C1411] transition-colors"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
