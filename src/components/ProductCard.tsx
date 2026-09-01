import React from 'react';
import { Link } from 'react-router-dom';
import { Star, Plus, Sliders, Clock, AlertCircle, Heart } from 'lucide-react';
import type { Product } from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, openCustomizer, toggleWishlist, isInWishlist } = useCart();
  const stock = product.availability.remainingStock;
  const isSoldOut = stock <= 0;
  const isLowStock = stock > 0 && stock <= 6;
  const isFavorited = isInWishlist(product.id);

  const handleAction = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (product.customizable) {
      openCustomizer(product);
    } else {
      addToCart(product, 1);
    }
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div className="group relative bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#EFE3D3] shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col h-full">
      {/* Product Image Container */}
      <Link to={`/product/${product.slug}`} className="block relative aspect-[4/3] sm:aspect-[4/3] w-full overflow-hidden bg-[#F8F1E7]">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
        />

        {/* Top Left Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {product.isBestseller && (
            <span className="bg-[#2D211D] text-[#FFFDF9] text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-warm-sm">
              Bestseller
            </span>
          )}
          {product.isSeasonal && (
            <span className="bg-[#A86A4A] text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-warm-sm">
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
              Sold Out
            </span>
          )}
        </div>

        {/* Top Right Wishlist & Dietary Badges */}
        <div className="absolute top-3 right-3 flex flex-col items-end gap-1.5 z-10">
          <button
            onClick={handleWishlist}
            aria-label={isFavorited ? 'Remove from wishlist' : 'Add to wishlist'}
            className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#2D211D] hover:text-red-500 hover:scale-110 shadow-sm transition-all"
          >
            <Heart
              className={`w-4 h-4 transition-colors ${
                isFavorited ? 'fill-red-500 text-red-500' : 'text-[#7D6A60]'
              }`}
            />
          </button>

          {product.dietary.slice(0, 1).map((badge) => (
            <span
              key={badge}
              className="bg-white/90 backdrop-blur-md text-[#2D211D] text-[10px] font-semibold px-2 py-0.5 rounded-md border border-[#EFE3D3] shadow-sm"
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Advance Lead Time Notice (Bottom overlay if >= 24 hrs) */}
        {product.availability.preparationTimeHours >= 24 && (
          <div className="absolute bottom-2 left-2 bg-[#2D211D]/85 backdrop-blur-sm text-[#FFFDF9] text-[10px] font-medium px-2 py-0.5 rounded flex items-center gap-1">
            <Clock className="w-3 h-3 text-[#C9A36A]" />
            <span>24h Advance Notice</span>
          </div>
        )}
      </Link>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="space-y-1.5">
          {/* Rating */}
          <div className="flex items-center gap-1 text-xs">
            <div className="flex text-amber-500">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            </div>
            <span className="font-bold text-[#2D211D]">{product.rating}</span>
            <span className="text-[#7D6A60]">({product.reviewCount})</span>
          </div>

          {/* Product Name */}
          <Link to={`/product/${product.slug}`}>
            <h3 className="font-serif font-bold text-base sm:text-lg text-[#2D211D] group-hover:text-[#A86A4A] transition-colors leading-snug line-clamp-1">
              {product.name}
            </h3>
          </Link>

          {/* Tagline / Description */}
          <p className="text-xs text-[#5A3026]/80 line-clamp-2 leading-relaxed">
            {product.tagline || product.description}
          </p>
        </div>

        {/* Pricing & CTA Row */}
        <div className="pt-3 border-t border-[#EFE3D3] flex items-center justify-between gap-2 mt-auto">
          <div>
            <span className="text-[10px] text-[#7D6A60] block uppercase font-medium">
              {product.customizable ? 'Starting from' : 'Fresh Price'}
            </span>
            <span className="font-serif text-lg font-bold text-[#2D211D]">
              {formatPrice(product.basePrice)}
            </span>
          </div>

          <div>
            {isSoldOut ? (
              <button
                disabled
                className="px-3.5 py-2 rounded-full text-xs font-semibold bg-[#EFE3D3] text-[#7D6A60] cursor-not-allowed flex items-center gap-1"
              >
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Sold Out</span>
              </button>
            ) : product.customizable ? (
              <button
                onClick={handleAction}
                aria-label={`Customize ${product.name}`}
                className="inline-flex items-center gap-1.5 bg-[#F8F1E7] hover:bg-[#EFE3D3] text-[#5A3026] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-warm-sm border border-[#EFE3D3]"
              >
                <Sliders className="w-3.5 h-3.5 text-[#A86A4A]" />
                <span>Customize</span>
              </button>
            ) : (
              <button
                onClick={handleAction}
                aria-label={`Add ${product.name} to cart`}
                className="inline-flex items-center gap-1.5 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-warm-sm"
              >
                <Plus className="w-3.5 h-3.5 text-[#C9A36A]" />
                <span>Quick Add</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
