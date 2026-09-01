import React from 'react';
import { Sparkles } from 'lucide-react';

interface PageHeroProps {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  highlightText?: string;
  badge?: string;
  children?: React.ReactNode;
}

export const PageHero: React.FC<PageHeroProps> = ({
  eyebrow,
  title,
  subtitle,
  highlightText,
  badge,
  children,
}) => {
  return (
    <section className="relative py-12 sm:py-16 lg:py-20 bg-gradient-to-b from-[#F8F1E7] to-[#FFFDF9] border-b border-[#EFE3D3] overflow-hidden">
      {/* Subtle Warm Accent Background Blob */}
      <div className="absolute top-0 right-10 w-96 h-96 bg-[#C9A36A]/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-72 h-72 bg-[#A86A4A]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
        {eyebrow && (
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A86A4A] bg-[#FFFDF9] px-3.5 py-1.5 rounded-full border border-[#EFE3D3] shadow-warm-sm animate-fade-in">
            <Sparkles className="w-3.5 h-3.5 text-[#C9A36A]" />
            <span>{eyebrow}</span>
          </div>
        )}

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#2D211D] tracking-tight max-w-4xl mx-auto leading-tight animate-fade-up">
          {title}{' '}
          {highlightText && (
            <span className="italic font-display font-normal text-[#A86A4A]">
              {highlightText}
            </span>
          )}
        </h1>

        {subtitle && (
          <p className="text-sm sm:text-base md:text-lg text-[#5A3026]/90 max-w-2xl mx-auto leading-relaxed">
            {subtitle}
          </p>
        )}

        {badge && (
          <div className="pt-2">
            <span className="inline-block bg-[#2D211D] text-[#FFFDF9] text-xs font-semibold px-4 py-1.5 rounded-full shadow-warm-sm">
              {badge}
            </span>
          </div>
        )}

        {children}
      </div>
    </section>
  );
};
