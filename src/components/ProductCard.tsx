import React from 'react';
import { Star, Plus, Sliders, Clock, AlertCircle } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openCustomizer } = useCart();
  const stock = product.availability.remainingStock;
  const isSoldOut = stock <= 0;
  const isLowStock = stock > 0 && stock <= 6;

  const handleAction = () => {
    if (product.customizable) {
      openCustomizer(product);
    } else {
      addToCart(product, 1);
    }
  };

  return (
    <div className="group relative bg-white rounded-2xl overflow-hidden border border-[#EFE8DE] shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#FAF6ED]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#2A1D17] text-[#FAF6ED] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-warm-sm">
              Bestseller
            </span>
          )}
          {product.isSeasonal && (
            <span className="bg-[#C87D55] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-warm-sm">
              Seasonal
            </span>
          )}
          {isLowStock && (
            <span className="bg-amber-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-warm-sm animate-pulse">
              Only {stock} left
            </span>
          )}
          {isSoldOut && (
            <span className="bg-red-700 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-warm-sm">
              Sold Out Today
            </span>
          )}
        </div>

        {/* Dietary Tag Pill (Top Right) */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1 z-10">
          {product.dietary.slice(0, 2).map((badge) => (
            <span
              key={badge}
              className="bg-white/90 backdrop-blur-md text-[#2A1D17] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#EFE8DE] shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Advance Lead Time Notice (Bottom overlay if > 0 hrs) */}
        {product.availability.preparationTimeHours >= 24 && (
          <div className="absolute bottom-2 left-2 bg-[#1C130E]/80 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#E09F67]" />
            <span>24h Advance Notice</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-4">
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <div className="flex text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-[#1C130E]">{product.rating}</span>
            <span className="text-[#947665]">({product.reviewCount})</span>
          </div>

          {/* Product Name */}
          <h3 className="font-serif font-bold text-base sm:text-lg text-[#1C130E] group-hover:text-[#C87D55] transition-colors leading-snug line-clamp-1">
            {product.name}
          </h3>

          {/* Tagline / Description */}
          <p className="text-xs text-[#533D32] line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Pricing & CTA Row */}
        <div className="pt-3 border-t border-[#EFE8DE] flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[10px] text-[#947665] block uppercase font-medium">
              {product.customizable ? 'Starting from' : 'Fresh Daily Price'}
            </span>
            <span className="font-serif text-lg font-bold text-[#1C130E]">
              {formatPrice(product.basePrice)}
            </span>
          </div>

          <div>
            {isSoldOut ? (
              <button
                disabled
                className="px-3.5 py-2 rounded-full text-xs font-semibold bg-[#EFE8DE] text-[#947665] cursor-not-allowed flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Sold Out</span>
              </button>
            ) : product.customizable ? (
              <button
                onClick={handleAction}
                aria-label={`Customize ${product.name}`}
                className="inline-flex items-center gap-1.5 bg-[#FBEDDE] hover:bg-[#F5D7BA] text-[#8C4425] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-warm-sm"
              >
                <Sliders className="w-3.5 h-3.5" />
                <span>Customize</span>
              </button>
            ) : (
              <button
                onClick={handleAction}
                aria-label={`Add ${product.name} to cart`}
                className="inline-flex items-center gap-1.5 bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-warm-sm"
              >
                <Plus className="w-3.5 h-3.5 text-[#E09F67]" />
                <span>Quick Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
