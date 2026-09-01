import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, HeartHandshake, Award } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';

export const Hero: React.FC = () => {
  const { openCustomizer } = useCart();
  const signatureCake = PRODUCTS.find((p) => p.id === 'signature-chocolate-cake') || PRODUCTS[0];

  return (
    <section className="relative overflow-hidden pt-6 pb-16 lg:pt-12 lg:pb-24">
      {/* Subtle Warm Backdrop Lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-[#F5D7BA]/30 via-[#E09F67]/15 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Editorial Typography & CTAs */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-left">
            {/* Trust Pill / Badge */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#FBEDDE] border border-[#F5D7BA] shadow-warm-sm animate-fade-in">
              <span className="w-2 h-2 rounded-full bg-[#C87D55] animate-ping" />
              <span className="text-xs font-semibold uppercase tracking-wider text-[#8C4425]">
                Baking at 4:00 AM Daily in Bengaluru
              </span>
            </div>

            {/* Main Headline with clamp typography */}
            <div className="space-y-3">
              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-[#1C130E] leading-[1.1]">
                Freshly Baked Daily,{' '}
                <span className="italic font-normal text-[#C87D55] font-display">
                  Delivered to Your Door.
                </span>
              </h1>
              <p className="text-base sm:text-lg text-[#533D32] max-w-xl mx-auto lg:mx-0 font-normal leading-relaxed">
                Handcrafted wild-ferment sourdoughs, flaky 81-layer Parisian croissants, and bespoke celebration cakes. Made with 100% pure butter, stoneground flours, and zero artificial additives.
              </p>
            </div>

            {/* Action CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] px-8 py-4 rounded-full text-sm font-semibold tracking-wide uppercase shadow-warm-md hover:shadow-warm-lg hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55]"
              >
                <Sparkles className="w-4 h-4 text-[#E09F67]" />
                <span>Explore & Order Online</span>
              </a>

              <button
                onClick={() => openCustomizer(signatureCake)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FAF6ED] hover:bg-[#F4ECE0] text-[#3D2B22] border border-[#DEC9B5] px-7 py-4 rounded-full text-sm font-semibold tracking-wide transition-all hover:-translate-y-0.5 shadow-warm-sm"
              >
                <span>Design Custom Cake</span>
                <ArrowRight className="w-4 h-4 text-[#C87D55]" />
              </button>
            </div>

            {/* Key Micro Trust Pillars */}
            <div className="pt-6 border-t border-[#EFE8DE] grid grid-cols-3 gap-4 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#EFE8DE] flex items-center justify-center text-[#C87D55] shrink-0">
                  <Award className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C130E]">AOP French Butter</p>
                  <p className="text-[11px] text-[#705446]">84% pure butterfat</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#EFE8DE] flex items-center justify-center text-[#C87D55] shrink-0">
                  <ShieldCheck className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C130E]">48-Hr Slow Ferment</p>
                  <p className="text-[11px] text-[#705446]">Gentle on digestion</p>
                </div>
              </div>

              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#EFE8DE] flex items-center justify-center text-[#C87D55] shrink-0">
                  <HeartHandshake className="w-4 h-4" />
                </div>
                <div>
                  <p className="text-xs font-bold text-[#1C130E]">Local Same-Day</p>
                  <p className="text-[11px] text-[#705446]">Pickup & Express drop</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Editorial Visual Showcase & Floating Cards */}
          <div className="lg:col-span-5 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Main Visual Image Card */}
              <div className="relative rounded-3xl overflow-hidden shadow-warm-xl border-4 border-white bg-white group">
                <img
                  src="https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=1200&q=85"
                  alt="Golden French Butter Croissants and Artisan Sourdough at Maison Dorée"
                  className="w-full h-[420px] sm:h-[480px] object-cover group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1C130E]/80 via-transparent to-transparent opacity-80" />

                {/* Bottom Card Copy */}
                <div className="absolute bottom-0 left-0 right-0 p-6 text-white space-y-1">
                  <span className="text-[10px] font-bold tracking-widest uppercase text-[#E09F67] bg-[#1C130E]/60 px-2.5 py-1 rounded-full backdrop-blur-sm inline-block">
                    Today’s Morning Bake
                  </span>
                  <h3 className="font-serif text-xl sm:text-2xl font-bold">
                    Parisian Laminated Viennoiserie
                  </h3>
                  <p className="text-xs text-[#FAF6ED]/80">
                    Baked fresh at 4:30 AM • Limited 60 batch quantity
                  </p>
                </div>
              </div>

              {/* Floating Daily Special Pill Card (Top Left) */}
              <div className="absolute -top-4 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md p-3 sm:p-4 rounded-2xl shadow-warm-lg border border-[#EFE8DE] flex items-center gap-3 animate-float max-w-[220px]">
                <div className="w-10 h-10 rounded-xl overflow-hidden shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=200&q=80"
                    alt="Signature Cake"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold uppercase text-[#C87D55]">Speciality</span>
                  <p className="text-xs font-bold text-[#1C130E] leading-tight">
                    Valrhona 70% Dark Gateau
                  </p>
                  <p className="text-[11px] font-semibold text-[#8C4425]">From ₹1,850</p>
                </div>
              </div>

              {/* Floating Review Card (Bottom Right) */}
              <div className="absolute -bottom-6 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-warm-lg border border-[#EFE8DE] space-y-1 max-w-[240px] hidden sm:block">
                <div className="flex items-center gap-1 text-amber-500 text-xs">
                  {'★'.repeat(5)}
                  <span className="text-xs font-bold text-[#1C130E] ml-1">4.9 / 5.0</span>
                </div>
                <p className="text-xs text-[#533D32] italic">
                  "The flakiest croissants in town. Melt in mouth perfection!"
                </p>
                <p className="text-[10px] font-semibold text-[#947665]">
                  — 1,200+ Verified Local Customers
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
