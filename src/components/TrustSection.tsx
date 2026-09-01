import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { REVIEWS } from '../data/reviews';

export const TrustSection: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);

  const prevReview = () => {
    setCurrentIdx((i) => (i === 0 ? REVIEWS.length - 1 : i - 1));
  };

  const nextReview = () => {
    setCurrentIdx((i) => (i === REVIEWS.length - 1 ? 0 : i + 1));
  };

  const activeReview = REVIEWS[currentIdx];

  return (
    <section id="reviews" className="py-16 sm:py-24 bg-[#FAF6ED] border-y border-[#EFE8DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C87D55]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Community Love & Social Proof</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C130E]">
            Loved by Over 1,200+ Foodies
          </h2>

          <div className="flex items-center justify-center gap-2 text-sm text-[#533D32]">
            <div className="flex text-amber-500">
              {'★'.repeat(5)}
            </div>
            <span className="font-bold text-[#1C130E]">4.95 out of 5</span>
            <span className="text-[#947665]">• Verified Google & Zomato Reviews</span>
          </div>
        </div>

        <div className="max-w-4xl mx-auto bg-white p-6 sm:p-10 rounded-3xl border border-[#EFE8DE] shadow-warm-lg relative">
          <div className="flex flex-col md:flex-row gap-8 items-center">
            <div className="flex flex-col items-center text-center shrink-0 w-44 space-y-2">
              <img
                src={activeReview.avatar}
                alt={activeReview.author}
                className="w-20 h-20 rounded-full object-cover border-2 border-[#E09F67] shadow-warm-sm"
              />
              <div>
                <h4 className="font-serif font-bold text-base text-[#1C130E]">
                  {activeReview.author}
                </h4>
                <p className="text-xs text-[#705446]">{activeReview.location}</p>
                <span className="inline-flex items-center gap-1 text-[10px] text-[#2E4A2E] bg-[#E5EDE5] px-2 py-0.5 rounded-full font-semibold mt-1">
                  <CheckCircle2 className="w-3 h-3" />
                  Verified Buyer
                </span>
              </div>
            </div>

            <div className="flex-1 space-y-3 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-1 text-amber-500 text-sm">
                {'★'.repeat(activeReview.rating)}
                <span className="text-xs text-[#947665] ml-2">({activeReview.date})</span>
              </div>

              <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C130E]">
                "{activeReview.title}"
              </h3>

              <p className="text-sm text-[#533D32] leading-relaxed italic">
                {activeReview.comment}
              </p>

              <div className="pt-2 text-xs text-[#8C4425] font-semibold">
                Favorite: {activeReview.favoriteProduct}
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between mt-8 pt-6 border-t border-[#EFE8DE]">
            <div className="flex items-center gap-1.5">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIdx(idx)}
                  className={`h-2 rounded-full transition-all ${
                    currentIdx === idx ? 'w-6 bg-[#C87D55]' : 'w-2 bg-[#DEC9B5]'
                  }`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={prevReview}
                aria-label="Previous review"
                className="p-2.5 rounded-full bg-[#FAF6ED] hover:bg-[#F4ECE0] text-[#533D32] border border-[#DEC9B5] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                onClick={nextReview}
                aria-label="Next review"
                className="p-2.5 rounded-full bg-[#FAF6ED] hover:bg-[#F4ECE0] text-[#533D32] border border-[#DEC9B5] transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mt-12">
          <div className="p-4 bg-white rounded-2xl border border-[#EFE8DE] text-center space-y-1">
            <span className="text-2xl">🌾</span>
            <p className="font-bold text-xs text-[#1C130E]">100% Heirloom Flour</p>
            <p className="text-[11px] text-[#705446]">Unbleached, stoneground wheat</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#EFE8DE] text-center space-y-1">
            <span className="text-2xl">🧈</span>
            <p className="font-bold text-xs text-[#1C130E]">AOP French Butter</p>
            <p className="text-[11px] text-[#705446]">No margarine or palm oil</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#EFE8DE] text-center space-y-1">
            <span className="text-2xl">🚚</span>
            <p className="font-bold text-xs text-[#1C130E]">Chilled Transit</p>
            <p className="text-[11px] text-[#705446]">Pristine cake safe-delivery</p>
          </div>

          <div className="p-4 bg-white rounded-2xl border border-[#EFE8DE] text-center space-y-1">
            <span className="text-2xl">❤️</span>
            <p className="font-bold text-xs text-[#1C130E]">100% Satisfaction</p>
            <p className="text-[11px] text-[#705446]">Freshness guaranteed</p>
          </div>
        </div>
      </div>
    </section>
  );
};
