import React from 'react';
import { Sparkles, ArrowRight, Clock, Users } from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { PageHero } from '../components/PageHero';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { CustomCakeSection } from '../components/CustomCakeSection';
import { Link } from 'react-router-dom';

export const CakesPage: React.FC = () => {
  const cakeProducts = PRODUCTS.filter(
    (p) => p.category === 'cakes' || (p.availableSizes && p.availableSizes.length > 0)
  );
  const featuredCake = cakeProducts[0];

  return (
    <div className="space-y-12 sm:space-y-16">
      <Breadcrumbs items={[{ label: 'Cakes' }]} />

      <PageHero
        eyebrow="BESPOKE CELEBRATIONS"
        title="Cakes Made for Moments"
        subtitle="Layered with rich French creams, Valrhona chocolates, and seasonal berries. Available in 6, 8, 10, and 12-inch celebration sizes."
      />

      {/* Featured Cake Editorial Banner */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D211D] text-[#FFFDF9] rounded-3xl overflow-hidden shadow-warm-xl border border-[#5A3026]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden bg-[#1C1411]">
              <img
                src={featuredCake.image}
                alt={featuredCake.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#A86A4A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Chef's Masterpiece
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 space-y-5">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C9A36A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Featured Celebration Cake</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white leading-tight">
                {featuredCake.name}
              </h2>

              <p className="text-sm text-[#F8F1E7]/80 leading-relaxed font-sans">
                {featuredCake.description}
              </p>

              <div className="grid grid-cols-2 gap-4 py-2 border-y border-[#5A3026] text-xs">
                <div className="flex items-center gap-2 text-[#C9A36A]">
                  <Clock className="w-4 h-4" />
                  <span>24h Advance Notice</span>
                </div>
                <div className="flex items-center gap-2 text-[#C9A36A]">
                  <Users className="w-4 h-4" />
                  <span>Serves 6–30 Guests</span>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  to={`/product/${featuredCake.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A36A] hover:bg-[#B0884D] text-[#2D211D] font-bold px-8 py-3.5 rounded-full text-xs uppercase tracking-wider shadow-warm-md transition-all hover:scale-105"
                >
                  <span>Customize & Order ({featuredCake.name})</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cake Collection Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D211D]">
              Celebration Collection
            </h2>
            <p className="text-xs sm:text-sm text-[#7D6A60]">
              All cakes are customizable with size, flavor, filling, and personalized inscriptions.
            </p>
          </div>
          <span className="text-xs font-bold text-[#A86A4A] bg-[#F8F1E7] px-3 py-1.5 rounded-full border border-[#EFE3D3]">
            {cakeProducts.length} Cakes Available
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {cakeProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Custom Cake Studio Section */}
      <CustomCakeSection />
    </div>
  );
};
