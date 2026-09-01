import React from 'react';
import { Sparkles } from 'lucide-react';

export const StorySection: React.FC = () => {
  return (
    <section id="story" className="py-16 sm:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Image Duo with Offset */}
        <div className="lg:col-span-6 relative">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-4">
              <div className="rounded-3xl overflow-hidden shadow-warm-lg border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80"
                  alt="Artisan baker shaping rustic sourdough loaves"
                  className="w-full h-56 sm:h-64 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="rounded-3xl overflow-hidden shadow-warm-lg border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=600&q=80"
                  alt="Freshly baked artisan hearth breads"
                  className="w-full h-44 sm:h-52 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            </div>

            <div className="space-y-4 pt-6 sm:pt-10">
              <div className="rounded-3xl overflow-hidden shadow-warm-lg border-2 border-white">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80"
                  alt="Golden French Butter Croissants fresh out of deck oven"
                  className="w-full h-64 sm:h-72 object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>

              {/* Artisan Heritage Badge */}
              <div className="p-4 bg-[#2A1D17] text-[#FAF6ED] rounded-3xl space-y-1 shadow-warm-md text-center">
                <span className="font-serif text-2xl font-bold text-[#E09F67]">9 Years</span>
                <p className="text-[11px] text-[#DEC9B5]">Old Wild Sourdough Mother Starter ("Levain")</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Editorial Narrative & Pillars */}
        <div className="lg:col-span-6 space-y-6">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C87D55]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Our Artisan Philosophy</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C130E] leading-tight">
            Started with one oven.{' '}
            <span className="italic font-normal font-display text-[#C87D55]">
              Built around real ingredients.
            </span>
          </h2>

          <div className="space-y-4 text-sm sm:text-base text-[#533D32] leading-relaxed">
            <p>
              In 2017, Chef Laurent Mercier and Sophie Dubois began baking in a modest brick kitchen with a singular conviction: that bread should be nourishing, slow-crafted, and free of commercial dough conditioners.
            </p>
            <p>
              Every morning at 3:30 AM, our bakers mix stoneground whole grains with filtered water and natural wild yeasts. Our sourdoughs undergo 48 hours of cold fermentation to break down complex gluten proteins, producing an airy custard crumb and deep caramel notes.
            </p>
          </div>

          {/* Key Milestones */}
          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-[#EFE8DE]">
            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-[#1C130E]">100%</span>
              <p className="text-xs font-semibold text-[#3D2B22]">Natural Butter & Flour</p>
              <p className="text-[11px] text-[#705446]">Zero artificial colors, preservatives, or shortening.</p>
            </div>

            <div className="space-y-1">
              <span className="font-serif text-2xl font-bold text-[#1C130E]">4:00 AM</span>
              <p className="text-xs font-semibold text-[#3D2B22]">Sunrise Hearth Baking</p>
              <p className="text-[11px] text-[#705446]">Small batches baked continuously throughout the day.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
