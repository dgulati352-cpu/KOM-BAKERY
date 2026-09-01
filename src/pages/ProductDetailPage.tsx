import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  Star,
  Plus,
  Minus,
  ShoppingBag,
  Heart,
  Clock,
  ShieldCheck,
  Check,
  Truck,
  Users,
  AlertCircle,
  ArrowRight,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import {
  CAKE_SIZES,
  CAKE_FLAVORS,
  CAKE_FILLINGS,
  CAKE_DECORATIONS,
} from '../data/addons';
import type {
  CakeSizeOption,
  CustomizationFlavor,
  CustomizationFilling,
  CustomizationDecoration,
  AddonItem,
} from '../types';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { ProductCard } from '../components/ProductCard';

export const ProductDetailPage: React.FC = () => {
  const { slug, id } = useParams<{ slug?: string; id?: string }>();
  const navigate = useNavigate();
  const { addToCart, openCheckout, toggleWishlist, isInWishlist } = useCart();

  const param = slug || id;
  const product = PRODUCTS.find((p) => p.slug === param || p.id === param);

  // Gallery State
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // Customization States
  const [selectedSize, setSelectedSize] = useState<CakeSizeOption>(CAKE_SIZES[0]);
  const [selectedFlavor, setSelectedFlavor] = useState<CustomizationFlavor>(CAKE_FLAVORS[0]);
  const [selectedFilling] = useState<CustomizationFilling>(CAKE_FILLINGS[0]);
  const [selectedDecoration] = useState<CustomizationDecoration>(
    CAKE_DECORATIONS[0]
  );
  const [customMessage, setCustomMessage] = useState('');
  const [premiumLettering, setPremiumLettering] = useState(false);
  const [selectedAddons] = useState<AddonItem[]>([]);
  const [quantity, setQuantity] = useState(1);
  const [specialNote] = useState('');

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F8F1E7] flex items-center justify-center text-3xl mx-auto">
          🍰
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#2D211D]">Product Not Found</h1>
        <p className="text-sm text-[#7D6A60]">
          The item you are looking for might have been sold out or moved.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-[#2D211D] text-[#FFFDF9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Explore Our Menu
        </Link>
      </div>
    );
  }

  const gallery = product.gallery || [product.image, product.secondaryImage || product.image].filter(Boolean);
  const isFavorited = isInWishlist(product.id);
  const stock = product.availability.remainingStock;
  const isSoldOut = stock <= 0;
  const isLowStock = stock > 0 && stock <= 6;

  // Price Calculation
  const basePrice = product.customizable ? selectedSize.price : product.basePrice;
  const flavorAdd = product.customizable ? selectedFlavor.priceAdd : 0;
  const fillingAdd = product.customizable ? selectedFilling.priceAdd : 0;
  const decorationAdd = product.customizable ? selectedDecoration.priceAdd : 0;
  const letteringAdd = premiumLettering ? 250 : 0;
  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);

  const unitPrice = basePrice + flavorAdd + fillingAdd + decorationAdd + letteringAdd + addonsTotal;
  const lineTotal = unitPrice * quantity;

  const handleAddToCart = () => {
    if (product.customizable) {
      addToCart(
        product,
        quantity,
        {
          size: selectedSize,
          flavor: selectedFlavor,
          filling: selectedFilling,
          customMessage,
          premiumLettering,
          decoration: selectedDecoration,
          selectedAddons,
        },
        specialNote
      );
    } else {
      addToCart(product, quantity, undefined, specialNote);
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
    openCheckout();
  };

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);

  return (
    <div className="space-y-12 sm:space-y-16">
      <Breadcrumbs
        items={[
          { label: 'Menu', path: '/menu' },
          { label: product.category.toUpperCase(), path: `/menu?category=${product.category}` },
          { label: product.name },
        ]}
      />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
          {/* Left Column: Image Gallery */}
          <div className="lg:col-span-6 space-y-4">
            <div className="relative aspect-square sm:aspect-[4/3] rounded-3xl overflow-hidden bg-[#F8F1E7] border border-[#EFE3D3] shadow-warm-md">
              <img
                src={gallery[activeImageIndex] || product.image}
                alt={product.name}
                className="w-full h-full object-cover animate-fade-in"
              />

              <button
                onClick={() => toggleWishlist(product.id)}
                aria-label={isFavorited ? 'Remove from wishlist' : 'Save to wishlist'}
                className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center text-[#2D211D] shadow-warm-sm hover:scale-110 transition-transform"
              >
                <Heart
                  className={`w-5 h-5 ${
                    isFavorited ? 'fill-red-500 text-red-500' : 'text-[#7D6A60]'
                  }`}
                />
              </button>

              {product.isBestseller && (
                <div className="absolute top-4 left-4 bg-[#2D211D] text-[#FFFDF9] text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full shadow-warm-sm">
                  Bestseller
                </div>
              )}
            </div>

            {/* Thumbnail Rail */}
            {gallery.length > 1 && (
              <div className="flex items-center gap-3 overflow-x-auto pb-2">
                {gallery.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-20 h-20 rounded-2xl overflow-hidden border-2 transition-all shrink-0 ${
                      activeImageIndex === idx
                        ? 'border-[#A86A4A] ring-2 ring-[#A86A4A]/30 scale-105'
                        : 'border-[#EFE3D3] opacity-70 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Details & Customizer */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-2 border-b border-[#EFE3D3] pb-6">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#A86A4A] bg-[#F8F1E7] px-3 py-1 rounded-full border border-[#EFE3D3]">
                  {product.category}
                </span>

                <div className="flex items-center gap-1.5 text-xs">
                  <div className="flex text-amber-500">
                    <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                  </div>
                  <span className="font-bold text-[#2D211D]">{product.rating}</span>
                  <span className="text-[#7D6A60]">({product.reviewCount} reviews)</span>
                </div>
              </div>

              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D211D] leading-tight">
                {product.name}
              </h1>

              <p className="text-sm sm:text-base text-[#5A3026]/90 leading-relaxed font-sans">
                {product.description}
              </p>

              {/* Price & Stock Notice */}
              <div className="pt-3 flex items-center justify-between">
                <div>
                  <span className="text-xs text-[#7D6A60] uppercase block font-semibold">
                    {product.customizable ? 'Calculated Price' : 'Fresh Daily Price'}
                  </span>
                  <span className="font-serif text-3xl font-bold text-[#2D211D]">
                    {formatPrice(unitPrice)}
                  </span>
                </div>

                <div className="text-right">
                  {isSoldOut ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full border border-red-200">
                      <AlertCircle className="w-3.5 h-3.5" />
                      Sold Out Today
                    </span>
                  ) : isLowStock ? (
                    <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-700 bg-amber-50 px-3 py-1 rounded-full border border-amber-200 animate-pulse">
                      Only {stock} left in today's oven
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                      <Check className="w-3.5 h-3.5" />
                      Fresh In Stock
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Cake Customizer Studio Options */}
            {product.customizable && (
              <div className="space-y-6 bg-[#F8F1E7]/50 p-5 sm:p-6 rounded-3xl border border-[#EFE3D3]">
                {/* 1. Size & Servings */}
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase font-bold tracking-wider text-[#5A3026]">
                      1. Size & Servings <span className="text-red-500">*</span>
                    </label>
                    <span className="text-xs text-[#A86A4A] font-semibold flex items-center gap-1">
                      <Users className="w-3.5 h-3.5" />
                      {selectedSize.servings}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {CAKE_SIZES.map((size) => {
                      const isSelected = selectedSize.id === size.id;
                      return (
                        <button
                          key={size.id}
                          type="button"
                          onClick={() => setSelectedSize(size)}
                          className={`p-3 rounded-2xl border text-left transition-all ${
                            isSelected
                              ? 'border-[#A86A4A] bg-[#FFFDF9] ring-2 ring-[#A86A4A]/30 shadow-warm-sm'
                              : 'border-[#EFE3D3] bg-[#FFFDF9] hover:bg-[#F8F1E7]'
                          }`}
                        >
                          <span className="font-serif font-bold text-xs text-[#2D211D] block">
                            {size.label}
                          </span>
                          <span className="text-[10px] text-[#7D6A60] block">
                            {size.servings}
                          </span>
                          <span className="font-bold text-xs text-[#A86A4A] block mt-1">
                            {formatPrice(size.price)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 2. Flavor */}
                <div className="space-y-2">
                  <label className="text-xs uppercase font-bold tracking-wider text-[#5A3026] block">
                    2. Sponge Base Flavor <span className="text-red-500">*</span>
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {CAKE_FLAVORS.slice(0, 4).map((flavor) => (
                      <button
                        key={flavor.id}
                        type="button"
                        onClick={() => setSelectedFlavor(flavor)}
                        className={`p-2.5 rounded-xl border text-left text-xs flex justify-between items-center transition-all ${
                          selectedFlavor.id === flavor.id
                            ? 'border-[#A86A4A] bg-[#FFFDF9] ring-1 ring-[#A86A4A]'
                            : 'border-[#EFE3D3] bg-[#FFFDF9]'
                        }`}
                      >
                        <span className="font-semibold text-[#2D211D]">{flavor.name}</span>
                        <span className="text-[11px] text-[#7D6A60]">
                          {flavor.priceAdd > 0 ? `+${formatPrice(flavor.priceAdd)}` : 'Included'}
                        </span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* 3. Inscription Message */}
                <div className="space-y-2 bg-[#FFFDF9] p-4 rounded-2xl border border-[#EFE3D3]">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-bold tracking-wider text-[#5A3026]">
                      Custom Cake Inscription
                    </label>
                    <span className="text-[11px] text-[#7D6A60]">
                      {customMessage.length}/40
                    </span>
                  </div>
                  <input
                    type="text"
                    maxLength={40}
                    value={customMessage}
                    onChange={(e) => setCustomMessage(e.target.value)}
                    placeholder="e.g. Happy 30th Birthday Anya! 🎈"
                    className="w-full p-2.5 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] placeholder-[#7D6A60] focus:ring-1 focus:ring-[#A86A4A]"
                  />
                  <label className="flex items-center gap-2 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={premiumLettering}
                      onChange={(e) => setPremiumLettering(e.target.checked)}
                      className="rounded border-[#EFE3D3] text-[#A86A4A] focus:ring-[#A86A4A]"
                    />
                    <span className="text-[11px] text-[#5A3026]">
                      24k Gold Foil Lettering on Dark Chocolate Plaque (+₹250)
                    </span>
                  </label>
                </div>
              </div>
            )}

            {/* Quantity & CTA Row */}
            <div className="space-y-4 pt-2">
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-[#EFE3D3] rounded-full p-1 bg-[#F8F1E7]">
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2D211D] hover:bg-[#EFE3D3] shadow-sm"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="w-10 text-center text-xs font-bold text-[#2D211D]">
                    {quantity}
                  </span>
                  <button
                    type="button"
                    onClick={() => setQuantity((q) => q + 1)}
                    aria-label="Increase quantity"
                    className="w-8 h-8 rounded-full bg-white flex items-center justify-center text-[#2D211D] hover:bg-[#EFE3D3] shadow-sm"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={isSoldOut}
                  className="flex-1 inline-flex items-center justify-center gap-2 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg disabled:opacity-50 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C9A36A]" />
                  <span>Add to Bakery Bag • {formatPrice(lineTotal)}</span>
                </button>
              </div>

              <button
                onClick={handleBuyNow}
                disabled={isSoldOut}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#A86A4A] hover:bg-[#8C5437] text-white py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-sm disabled:opacity-50 transition-all"
              >
                <span>Instant Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Trust & Ingredients Details */}
            <div className="space-y-3 pt-4 border-t border-[#EFE3D3] text-xs text-[#5A3026]">
              {product.availability.preparationTimeHours >= 24 && (
                <div className="flex items-center gap-2 text-[#A86A4A] font-semibold">
                  <Clock className="w-4 h-4" />
                  <span>24-Hour Advance Notice Required for Handcrafted Baking</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>100% Real AOP French Butter & Unbleached Heirloom Flours</span>
              </div>
              <div className="flex items-center gap-2">
                <Truck className="w-4 h-4 text-[#A86A4A]" />
                <span>Free Temperature-Controlled Delivery on Orders Above ₹2,000</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* You May Also Like */}
      {relatedProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-6">
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#2D211D]">
            You May Also Love
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
