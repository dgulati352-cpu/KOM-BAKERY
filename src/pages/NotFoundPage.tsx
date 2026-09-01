import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Home, ShoppingBag } from 'lucide-react';

export const NotFoundPage: React.FC = () => {
  return (
    <div className="py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
      <div className="w-24 h-24 rounded-full bg-[#F8F1E7] border border-[#EFE3D3] flex items-center justify-center text-5xl mx-auto shadow-warm-sm animate-float">
        🧁
      </div>

      <div className="space-y-2">
        <span className="font-serif text-6xl font-bold text-[#A86A4A]">404</span>
        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-[#2D211D]">
          Sorry, this page isn't on the menu.
        </h1>
        <p className="text-sm sm:text-base text-[#5A3026]/80 max-w-md mx-auto leading-relaxed">
          The treat you're looking for may have been moved, baked, or eaten! Let's get you back to our fresh daily selection.
        </p>
      </div>

      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg transition-all"
        >
          <Home className="w-4 h-4 text-[#C9A36A]" />
          <span>BACK TO HOME</span>
        </Link>

        <Link
          to="/menu"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFDF9] hover:bg-[#F8F1E7] text-[#2D211D] border border-[#EFE3D3] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-sm transition-all hover:scale-105"
        >
          <ShoppingBag className="w-4 h-4 text-[#A86A4A]" />
          <span>EXPLORE MENU</span>
          <ArrowRight className="w-4 h-4 text-[#A86A4A]" />
        </Link>
      </div>
    </div>
  );
};
