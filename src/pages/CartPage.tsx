import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Trash2,
  Plus,
  Minus,
  ArrowRight,
  Truck,
  Tag,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice, FREE_DELIVERY_THRESHOLD } from '../utils/pricing';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CartPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    removeFromCart,
    updateQuantity,
    clearCart,
    applyCoupon,
    couponCode,
    discountAmount,
    removeCoupon,
    openCheckout,
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');

  const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const tax = Math.round(subtotal * 0.05);
  const finalTotal = subtotal - discountAmount + tax;
  const progressPercent = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));
  const amountNeeded = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (inputCoupon.trim()) {
      applyCoupon(inputCoupon);
      setInputCoupon('');
    }
  };

  const handleProceedCheckout = () => {
    navigate('/checkout');
    openCheckout();
  };

  if (cart.length === 0) {
    return (
      <div className="space-y-6">
        <Breadcrumbs items={[{ label: 'Your Bag' }]} />
        <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-[#F8F1E7] border border-[#EFE3D3] flex items-center justify-center text-4xl mx-auto shadow-warm-sm">
            🥐
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D211D]">
            Your Cart is Waiting for Something Delicious.
          </h1>
          <p className="text-sm sm:text-base text-[#5A3026]/80 max-w-md mx-auto">
            Discover our fresh morning croissants, artisan sourdoughs, and celebration cakes.
          </p>
          <div className="pt-2">
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg transition-all"
            >
              <span>EXPLORE BAKERY MENU</span>
              <ArrowRight className="w-4 h-4 text-[#C9A36A]" />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumbs items={[{ label: 'Your Bag' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between border-b border-[#EFE3D3] pb-4 mb-8">
          <div>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D211D]">
              Your Bakery Bag
            </h1>
            <p className="text-xs text-[#7D6A60] mt-1">
              Review your fresh items before choosing delivery date & time.
            </p>
          </div>

          <button
            onClick={clearCart}
            className="text-xs text-[#A86A4A] hover:underline font-semibold"
          >
            Clear Entire Bag
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Left Column: Cart Items List */}
          <div className="lg:col-span-7 space-y-4">
            {/* Free Delivery Progress Bar */}
            <div className="bg-[#FFFDF9] p-4 sm:p-5 rounded-2xl border border-[#EFE3D3] shadow-warm-sm space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold">
                <span className="flex items-center gap-1.5 text-[#2D211D]">
                  <Truck className="w-4 h-4 text-[#A86A4A]" />
                  {amountNeeded === 0
                    ? '🎉 You unlocked Complimentary Local Delivery!'
                    : `Add ${formatPrice(amountNeeded)} more for FREE local delivery`}
                </span>
                <span className="text-[#A86A4A]">{progressPercent}%</span>
              </div>
              <div className="w-full h-2 bg-[#F8F1E7] rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[#C9A36A] to-[#A86A4A] transition-all duration-500 rounded-full"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Items */}
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-[#FFFDF9] p-4 sm:p-5 rounded-2xl border border-[#EFE3D3] shadow-warm-sm flex gap-4 items-start"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl object-cover bg-[#F8F1E7] shrink-0 border border-[#EFE3D3]"
                  />

                  <div className="flex-1 min-w-0 space-y-1.5">
                    <div className="flex items-start justify-between gap-2">
                      <Link
                        to={`/product/${item.product.slug}`}
                        className="font-serif font-bold text-base sm:text-lg text-[#2D211D] hover:text-[#A86A4A] transition-colors truncate"
                      >
                        {item.product.name}
                      </Link>

                      <button
                        onClick={() => removeFromCart(item.cartItemId)}
                        aria-label="Remove item"
                        className="text-[#7D6A60] hover:text-red-600 p-1 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>

                    {/* Customization Details */}
                    {item.customization && (
                      <div className="text-[11px] text-[#5A3026]/90 bg-[#F8F1E7] p-2.5 rounded-xl space-y-1 border border-[#EFE3D3]">
                        <p>
                          <strong>Size:</strong> {item.customization.size.label} (
                          {item.customization.size.servings})
                        </p>
                        <p>
                          <strong>Flavor:</strong> {item.customization.flavor.name}
                        </p>
                        {item.customization.customMessage && (
                          <p className="italic text-[#A86A4A]">
                            "{item.customization.customMessage}"
                          </p>
                        )}
                      </div>
                    )}

                    {/* Quantity & Line Total */}
                    <div className="pt-2 flex items-center justify-between">
                      <div className="flex items-center border border-[#EFE3D3] rounded-full p-0.5 bg-[#F8F1E7]">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#2D211D] hover:bg-[#EFE3D3]"
                        >
                          <Minus className="w-3 3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#2D211D]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#2D211D] hover:bg-[#EFE3D3]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-serif font-bold text-base text-[#2D211D]">
                        {formatPrice(item.lineTotal)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Order Summary & Checkout Trigger */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-lg space-y-6">
              <h3 className="font-serif font-bold text-xl text-[#2D211D] pb-3 border-b border-[#EFE3D3]">
                Order Summary
              </h3>

              {/* Promo Code Input */}
              <div>
                {couponCode ? (
                  <div className="flex items-center justify-between p-3 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3]">
                    <div className="flex items-center gap-2">
                      <Tag className="w-4 h-4 text-[#A86A4A]" />
                      <span className="font-mono text-xs font-bold text-[#2D211D]">
                        {couponCode}
                      </span>
                    </div>
                    <button
                      onClick={removeCoupon}
                      className="text-xs text-red-600 hover:underline font-semibold"
                    >
                      Remove
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleApplyPromo} className="flex gap-2">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="Promo Code (e.g. SWEET10)"
                      className="flex-1 px-3.5 py-2.5 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] placeholder-[#7D6A60] focus:ring-1 focus:ring-[#A86A4A]"
                    />
                    <button
                      type="submit"
                      className="px-4 py-2.5 bg-[#2D211D] text-[#FFFDF9] rounded-xl text-xs font-semibold hover:bg-[#1C1411] transition-colors"
                    >
                      Apply
                    </button>
                  </form>
                )}
              </div>

              {/* Price Breakdown */}
              <div className="space-y-3 text-xs text-[#5A3026] border-t border-[#EFE3D3] pt-4">
                <div className="flex justify-between">
                  <span>Bag Subtotal</span>
                  <span className="font-semibold text-[#2D211D]">{formatPrice(subtotal)}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount ({couponCode})</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Estimated 5% GST</span>
                  <span className="font-semibold text-[#2D211D]">{formatPrice(tax)}</span>
                </div>

                <div className="flex justify-between">
                  <span>Fulfillment</span>
                  <span className="text-[#A86A4A] font-semibold">
                    Calculated at Next Step
                  </span>
                </div>

                <div className="border-t border-[#EFE3D3] pt-3 flex justify-between text-base font-bold text-[#2D211D]">
                  <span className="font-serif text-lg">Total Amount</span>
                  <span className="font-serif text-xl">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout CTA */}
              <button
                onClick={handleProceedCheckout}
                className="w-full inline-flex items-center justify-center gap-2 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg transition-all"
              >
                <span>Proceed to Delivery & Schedule</span>
                <ArrowRight className="w-4 h-4 text-[#C9A36A]" />
              </button>

              <p className="text-[11px] text-[#7D6A60] text-center">
                🔒 Secure checkout • 100% Freshness Guarantee
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
