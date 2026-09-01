import React from 'react';
import { Sparkles, Award, Wheat, Clock, ArrowRight } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';

export const AboutPage: React.FC = () => {
  return (
    <div className="space-y-16 sm:space-y-24">
      <Breadcrumbs items={[{ label: 'Our Story' }]} />

      <PageHero
        eyebrow="OUR ARTISAN HERITAGE"
        title="Made with Passion. Served with Love."
        subtitle="Slow fermentation, French Normandy butter, and heirloom flours. Founded on the belief that everyday baking should be clean, nourishing, and unforgettable."
      />

      {/* Narrative Section with Visual Triad */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-6 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A86A4A]">
              <Sparkles className="w-3.5 h-3.5 text-[#C9A36A]" />
              <span>How KOM Bakery Began</span>
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D211D] leading-tight">
              Started with a single brick oven and a stubborn commitment to real ingredients.
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-[#5A3026]/90 leading-relaxed font-sans">
              <p>
                In 2017, master baker Laurent and pastry chef Sophie set out with a simple mission: bring genuine European hearth baking and Parisian viennoiserie to local neighborhood tables without artificial dough softeners, shortenings, or preservatives.
              </p>
              <p>
                Our baking begins every morning at 3:30 AM while the city sleeps. We hand-mix stoneground wheat, pure filtered water, and our proprietary 9-year-old sourdough starter ("Levain") to yield deep crusts and open, custardy crumbs.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-6 pt-4 border-t border-[#EFE3D3]">
              <div>
                <span className="font-serif text-3xl font-bold text-[#2D211D]">9 Years</span>
                <p className="text-xs text-[#7D6A60] mt-1">Wild Sourdough Mother Starter</p>
              </div>
              <div>
                <span className="font-serif text-3xl font-bold text-[#2D211D]">100%</span>
                <p className="text-xs text-[#7D6A60] mt-1">AOP Pure Butter (No Margarine)</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-3xl overflow-hidden shadow-warm-lg border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                  alt="Artisan baker shaping rustic loaves"
                  className="w-full h-60 object-cover"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-warm-lg border-2 border-white mt-6">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
                  alt="Freshly baked golden butter croissants"
                  className="w-full h-60 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Four Core Pillars */}
      <section className="bg-[#F8F1E7] py-16 sm:py-20 border-y border-[#EFE3D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A86A4A]">
              Our Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D211D]">
              Baking Without Compromise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center">
                <Wheat className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2D211D]">
                Heirloom Stoneground Flours
              </h3>
              <p className="text-xs sm:text-sm text-[#5A3026]/80 leading-relaxed">
                We mill unbleached non-GMO grains that retain the wholesome wheat germ, giving our breads complex aroma and higher natural nutritional density.
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2D211D]">
                Slow 48-Hour Cold Ferment
              </h3>
              <p className="text-xs sm:text-sm text-[#5A3026]/80 leading-relaxed">
                Time is our most valuable ingredient. Extended cold proofing breaks down complex starches, making our sourdoughs gentle on digestion and intensely flavorful.
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif font-bold text-lg text-[#2D211D]">
                Pure French Butter Lamination
              </h3>
              <p className="text-xs sm:text-sm text-[#5A3026]/80 leading-relaxed">
                Every croissant features 81 meticulously folded micro-layers of 84% butterfat Normandy butter, delivering an unmatched airy honeycomb.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Strip */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D211D]">
          Taste the Artisan Difference
        </h2>
        <p className="text-sm sm:text-base text-[#5A3026]/80 max-w-xl mx-auto">
          Explore today's freshly baked bread loaves, pastries, and celebration cakes.
        </p>
        <Link
          to="/menu"
          className="inline-flex items-center gap-2 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg transition-all"
        >
          <span>DISCOVER OUR MENU</span>
          <ArrowRight className="w-4 h-4 text-[#C9A36A]" />
        </Link>
      </section>
    </div>
  );
};
