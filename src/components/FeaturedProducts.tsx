import React from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from './ProductCard';

export const FeaturedProducts: React.FC = () => {
  // Show 6 signature bestsellers
  const featured = PRODUCTS.filter((p) => p.isBestseller).slice(0, 6);

  return (
    <section className="py-16 bg-[#FAF6ED] border-y border-[#EFE8DE] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#C87D55]">
              <Sparkles className="w-4 h-4" />
              <span>Artisan Selection</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C130E]">
              Made Fresh. Made With Love.
            </h2>
            <p className="text-sm sm:text-base text-[#533D32] max-w-xl">
              Our most coveted morning staples, hand-rolled croissants, and signature tiered cakes baked with heirloom recipes.
            </p>
          </div>

          <a
            href="#menu"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#8C4425] hover:text-[#2A1D17] group transition-colors self-start md:self-auto"
          >
            <span>View Full 28-Item Menu</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>

        {/* 6-Card Responsive Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featured.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};
