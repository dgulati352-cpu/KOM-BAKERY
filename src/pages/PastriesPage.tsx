import React from 'react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { PageHero } from '../components/PageHero';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const PastriesPage: React.FC = () => {
  const pastries = PRODUCTS.filter((p) => p.category === 'pastries');

  return (
    <div className="space-y-12 sm:space-y-16">
      <Breadcrumbs items={[{ label: 'Pastries' }]} />

      <PageHero
        eyebrow="FRENCH VIENNOISERIE"
        title="Buttery. Flaky. Fresh."
        subtitle="Crafted over 72 hours with 100% AOP Normandy butter. Baked in small sunrise batches for an open, airy honeycomb."
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D211D]">
              Morning Viennoiserie
            </h2>
            <p className="text-xs sm:text-sm text-[#7D6A60]">
              Available for same-day delivery & morning counter pickup.
            </p>
          </div>
          <span className="text-xs font-bold text-[#A86A4A] bg-[#F8F1E7] px-3 py-1.5 rounded-full border border-[#EFE3D3]">
            {pastries.length} Pastries
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {pastries.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>
    </div>
  );
};
