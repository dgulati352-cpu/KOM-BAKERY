import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { PageHero } from '../components/PageHero';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const BestSellersPage: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller);

  return (
    <div className="space-y-12 sm:space-y-16">
      <Breadcrumbs items={[{ label: 'Best Sellers' }]} />

      <PageHero
        eyebrow="COMMUNITY FAVORITES"
        title="The Ones Everyone Loves"
        subtitle="Our most ordered artisan sourdoughs, flaky butter croissants, and Belgian celebration cakes backed by over 1,200+ 5-star ratings."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D211D]">
              Verified Customer Favorites
            </h2>
            <p className="text-xs sm:text-sm text-[#7D6A60]">
              Baked daily in high demand — order before 2:00 PM for guaranteed same-day dispatch.
            </p>
          </div>
          <span className="text-xs font-bold text-[#A86A4A] bg-[#F8F1E7] px-3 py-1.5 rounded-full border border-[#EFE3D3]">
            {bestSellers.length} Bestsellers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
