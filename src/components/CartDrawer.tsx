import React, { useState } from 'react';
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  ArrowRight,
  Sparkles,
  Tag,
  CheckCircle2,
  AlertCircle,
  Truck,
  Store,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import {
  formatPrice,
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateTax,
  calculateOrderTotal,
} from '../utils/pricing';
import { FREE_DELIVERY_THRESHOLD, MIN_DELIVERY_SUBTOTAL } from '../data/deliveryZones';

export const CartDrawer: React.FC = () => {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    couponCode,
    discountAmount,
    applyCoupon,
    removeCoupon,
    fulfillmentType,
    setFulfillmentType,
    selectedZoneId,
    openCheckout,
  } = useCart();

  const [promoInput, setPromoInput] = useState('');
  const [promoFeedback, setPromoFeedback] = useState<{ success?: boolean; message?: string } | null>(
    null
  );

  if (!isCartOpen) return null;

  const subtotal = calculateCartSubtotal(cart);
  const deliveryFee = calculateDeliveryFee(subtotal, fulfillmentType, selectedZoneId);
  const tax = calculateTax(subtotal, deliveryFee);
  const total = calculateOrderTotal(subtotal, deliveryFee, discountAmount, tax);

  const amountToFreeDelivery = Math.max(0, FREE_DELIVERY_THRESHOLD - subtotal);
  const freeDeliveryProgress = Math.min(100, Math.round((subtotal / FREE_DELIVERY_THRESHOLD) * 100));

  const isBelowMinDelivery = fulfillmentType === 'delivery' && subtotal < MIN_DELIVERY_SUBTOTAL;

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (!promoInput.trim()) return;
    const res = applyCoupon(promoInput);
    setPromoFeedback(res);
    if (res.success) {
      setPromoInput('');
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C130E]/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer Container */}
      <div className="relative w-full max-w-md bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 animate-fade-in">
        {/* Drawer Header */}
        <div className="p-5 border-b border-[#EFE8DE] flex items-center justify-between bg-white shrink-0">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-full bg-[#FAF6ED] border border-[#E09F67]/40 flex items-center justify-center text-[#C87D55]">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-serif font-bold text-lg text-[#1C130E]">Your Bakery Bag</h2>
              <p className="text-xs text-[#705446]">
                {cart.length} unique {cart.length === 1 ? 'item' : 'items'}
              </p>
            </div>
          </div>

          <button
            onClick={() => setIsCartOpen(false)}
            aria-label="Close cart"
            className="p-2 text-[#705446] hover:text-[#1C130E] hover:bg-[#F4ECE0] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Delivery Progress Bar (for delivery) */}
        {fulfillmentType === 'delivery' && (
          <div className="p-4 bg-[#FBEDDE] border-b border-[#F5D7BA] shrink-0">
            <div className="flex items-center justify-between text-xs font-semibold text-[#8C4425] mb-1.5">
              <span className="flex items-center gap-1.5">
                <Truck className="w-4 h-4" />
                {amountToFreeDelivery === 0 ? (
                  <span className="text-[#2E4A2E] font-bold">🎉 Free Doorstep Delivery Unlocked!</span>
                ) : (
                  <span>Add {formatPrice(amountToFreeDelivery)} more for Free Delivery</span>
                )}
              </span>
              <span>{freeDeliveryProgress}%</span>
            </div>
            <div className="w-full bg-[#F5D7BA] h-2 rounded-full overflow-hidden">
              <div
                className="bg-[#C87D55] h-full rounded-full transition-all duration-500"
                style={{ width: `${freeDeliveryProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Fulfillment Switcher in Cart */}
        <div className="p-3 bg-[#FAF6ED] border-b border-[#EFE8DE] flex gap-2 shrink-0">
          <button
            type="button"
            onClick={() => setFulfillmentType('pickup')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              fulfillmentType === 'pickup'
                ? 'bg-[#2A1D17] text-[#FAF6ED] shadow-warm-sm'
                : 'bg-white text-[#533D32] hover:bg-[#F4ECE0] border border-[#EFE8DE]'
            }`}
          >
            <Store className="w-3.5 h-3.5" />
            <span>Store Pickup (Free)</span>
          </button>

          <button
            type="button"
            onClick={() => setFulfillmentType('delivery')}
            className={`flex-1 py-2 px-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-1.5 transition-all ${
              fulfillmentType === 'delivery'
                ? 'bg-[#2A1D17] text-[#FAF6ED] shadow-warm-sm'
                : 'bg-white text-[#533D32] hover:bg-[#F4ECE0] border border-[#EFE8DE]'
            }`}
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Local Delivery</span>
          </button>
        </div>

        {/* Scrollable Cart Items */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cart.length === 0 ? (
            <div className="py-16 text-center space-y-4">
              <div className="w-20 h-20 rounded-full bg-[#FAF6ED] border border-[#EFE8DE] flex items-center justify-center text-4xl mx-auto shadow-warm-sm">
                🥐
              </div>
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1C130E]">
                  Your bag is waiting for something delicious
                </h3>
                <p className="text-xs text-[#705446] max-w-xs mx-auto">
                  Explore our morning bakes, rustic sourdoughs, and celebration gateaux.
                </p>
              </div>
              <button
                onClick={() => setIsCartOpen(false)}
                className="inline-flex items-center gap-2 bg-[#2A1D17] text-[#FAF6ED] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#150E0A] transition-colors"
              >
                <span>Explore Bakery Menu</span>
                <ArrowRight className="w-4 h-4 text-[#E09F67]" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {cart.map((item) => (
                <div
                  key={item.cartItemId}
                  className="bg-white p-3.5 rounded-2xl border border-[#EFE8DE] shadow-warm-sm flex gap-3 relative group"
                >
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-18 h-18 sm:w-20 sm:h-20 rounded-xl object-cover shrink-0"
                  />

                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="font-serif font-bold text-sm text-[#1C130E] leading-snug line-clamp-1">
                          {item.product.name}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.cartItemId)}
                          aria-label="Remove item"
                          className="text-[#947665] hover:text-red-600 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Customization Details Pills */}
                      {item.customization && (
                        <div className="mt-1 space-y-0.5 text-[11px] text-[#705446] bg-[#FAF6ED] p-2 rounded-lg border border-[#EFE8DE]">
                          <p>
                            <strong className="text-[#1C130E]">Size:</strong>{' '}
                            {item.customization.size.label} ({item.customization.size.servings})
                          </p>
                          <p>
                            <strong className="text-[#1C130E]">Flavor:</strong>{' '}
                            {item.customization.flavor.name}
                          </p>
                          <p>
                            <strong className="text-[#1C130E]">Filling:</strong>{' '}
                            {item.customization.filling.name}
                          </p>
                          {item.customization.customMessage && (
                            <p className="italic text-[#8C4425]">
                              "{item.customization.customMessage}"
                            </p>
                          )}
                          {item.customization.selectedAddons.length > 0 && (
                            <p>
                              <strong className="text-[#1C130E]">Add-ons:</strong>{' '}
                              {item.customization.selectedAddons.map((a) => a.name).join(', ')}
                            </p>
                          )}
                        </div>
                      )}

                      {item.specialInstructions && (
                        <p className="text-[10px] text-[#8C4425] italic mt-1">
                          Note: {item.specialInstructions}
                        </p>
                      )}
                    </div>

                    <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-[#EFE8DE]">
                      <span className="font-serif font-bold text-sm text-[#1C130E]">
                        {formatPrice(item.lineTotal)}
                      </span>

                      {/* Quantity Modifier */}
                      <div className="flex items-center border border-[#DEC9B5] rounded-full p-0.5 bg-[#FAF6ED]">
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity - 1)}
                          aria-label="Decrease quantity"
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#533D32] hover:bg-[#F4ECE0]"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center text-xs font-bold text-[#1C130E]">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.cartItemId, item.quantity + 1)}
                          aria-label="Increase quantity"
                          className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#533D32] hover:bg-[#F4ECE0]"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Drawer Bottom Checkout & Totals (if cart > 0) */}
        {cart.length > 0 && (
          <div className="p-4 sm:p-5 bg-white border-t border-[#EFE8DE] space-y-4 shrink-0 shadow-lg">
            {/* Promo Code Input */}
            <div>
              {couponCode ? (
                <div className="flex items-center justify-between p-2.5 bg-[#E5EDE5] text-[#2E4A2E] rounded-xl text-xs font-semibold">
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>Coupon "{couponCode}" applied (-{formatPrice(discountAmount)})</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-600 hover:underline font-bold"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyPromo} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 text-[#947665] absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder='Promo Code (e.g. "SWEET10")'
                      className="w-full pl-8 pr-3 py-2 text-xs rounded-xl border border-[#DEC9B5] text-[#1C130E] placeholder-[#947665] focus:outline-none focus:ring-1 focus:ring-[#C87D55]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#FAF6ED] hover:bg-[#F4ECE0] text-[#3D2B22] border border-[#DEC9B5] rounded-xl text-xs font-semibold"
                  >
                    Apply
                  </button>
                </form>
              )}
              {promoFeedback && !couponCode && (
                <p className="text-[11px] text-red-600 mt-1">{promoFeedback.message}</p>
              )}
            </div>

            {/* Price Calculations Breakdown */}
            <div className="space-y-1.5 text-xs text-[#533D32] border-t border-[#EFE8DE] pt-3">
              <div className="flex justify-between">
                <span>Items Subtotal</span>
                <span className="font-semibold text-[#1C130E]">{formatPrice(subtotal)}</span>
              </div>

              {discountAmount > 0 && (
                <div className="flex justify-between text-emerald-700 font-semibold">
                  <span>Welcome Discount</span>
                  <span>-{formatPrice(discountAmount)}</span>
                </div>
              )}

              <div className="flex justify-between">
                <span>
                  {fulfillmentType === 'pickup' ? 'Store Pickup Fee' : 'Local Delivery Fee'}
                </span>
                <span className="font-semibold text-[#1C130E]">
                  {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                </span>
              </div>

              <div className="flex justify-between text-[#705446]">
                <span>Configurable Bakery Tax (5% GST)</span>
                <span>{formatPrice(tax)}</span>
              </div>

              <div className="flex justify-between text-sm font-bold text-[#1C130E] pt-2 border-t border-[#EFE8DE]">
                <span>Estimated Total</span>
                <span className="font-serif text-lg text-[#1C130E]">{formatPrice(total)}</span>
              </div>
            </div>

            {/* Minimum Delivery Warning */}
            {isBelowMinDelivery && (
              <div className="p-3 bg-amber-50 border border-amber-200 rounded-xl text-xs text-amber-900 flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                <span>
                  Doorstep delivery requires a minimum order of {formatPrice(MIN_DELIVERY_SUBTOTAL)}.
                  Please add items or switch to Store Pickup.
                </span>
              </div>
            )}

            {/* Checkout Action Button */}
            <button
              onClick={openCheckout}
              disabled={isBelowMinDelivery}
              className={`w-full inline-flex items-center justify-center gap-2 py-4 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-warm-md ${
                isBelowMinDelivery
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] hover:shadow-warm-lg hover:-translate-y-0.5'
              }`}
            >
              <Sparkles className="w-4 h-4 text-[#E09F67]" />
              <span>Proceed to Delivery & Schedule</span>
              <ArrowRight className="w-4 h-4 text-[#E09F67]" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
