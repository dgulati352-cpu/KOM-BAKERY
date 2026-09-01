import React, { useState, useMemo } from 'react';
import confetti from 'canvas-confetti';
import {
  X,
  Store,
  Truck,
  CreditCard,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Printer,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_ZONES } from '../data/deliveryZones';
import { getAvailableDates, getAvailableTimeSlots } from '../utils/availability';
import {
  formatPrice,
  calculateCartSubtotal,
  calculateDeliveryFee,
  calculateTax,
  calculateOrderTotal,
} from '../utils/pricing';
import type { CustomerDetails, PlacedOrder } from '../types';

export const CheckoutModal: React.FC = () => {
  const {
    cart,
    isCheckoutOpen,
    closeCheckout,
    clearCart,
    fulfillmentType,
    setFulfillmentType,
    selectedZoneId,
    setSelectedZoneId,
    discountAmount,
    couponCode,
    addPlacedOrder,
    showToast,
  } = useCart();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Form states
  const availableDates = useMemo(() => getAvailableDates(cart), [cart]);
  const firstValidDate = availableDates.find((d) => d.isAvailable)?.dateString || '';
  const [selectedDate, setSelectedDate] = useState<string>(firstValidDate);

  const availableTimeSlots = useMemo(
    () => getAvailableTimeSlots(selectedDate, fulfillmentType),
    [selectedDate, fulfillmentType]
  );
  const firstValidSlot = availableTimeSlots.find((s) => s.isAvailable)?.time || '';
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(firstValidSlot);

  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    pincode: '560034',
    orderNotes: '',
    isGift: false,
    giftRecipientName: '',
    giftNote: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [formErrors, setFormErrors] = useState<Record<string, string>>({});
  const [confirmedOrder, setConfirmedOrder] = useState<PlacedOrder | null>(null);

  if (!isCheckoutOpen) return null;

  const subtotal = calculateCartSubtotal(cart);
  const deliveryFee = calculateDeliveryFee(subtotal, fulfillmentType, selectedZoneId);
  const tax = calculateTax(subtotal, deliveryFee);
  const total = calculateOrderTotal(subtotal, deliveryFee, discountAmount, tax);

  const validateCustomerStep = (): boolean => {
    const errors: Record<string, string> = {};
    if (!customer.fullName.trim()) errors.fullName = 'Full name is required';
    if (!customer.phone.trim() || customer.phone.length < 10)
      errors.phone = 'Enter a valid 10-digit phone number';
    if (!customer.email.trim() || !customer.email.includes('@'))
      errors.email = 'Valid email address is required';

    if (fulfillmentType === 'delivery') {
      if (!customer.addressLine1.trim()) errors.addressLine1 = 'Delivery address is required';
      if (!customer.pincode.trim() || customer.pincode.length !== 6)
        errors.pincode = 'Enter a valid 6-digit PIN code';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handlePlaceOrder = () => {
    const orderNumber = `MD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder: PlacedOrder = {
      orderId: `order-${Date.now()}`,
      orderNumber,
      createdAt: new Date().toLocaleDateString('en-IN', {
        dateStyle: 'medium',
        timeStyle: 'short',
      }),
      fulfillmentType,
      selectedDate,
      selectedTimeSlot,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: discountAmount,
      couponCode,
      tax,
      total,
      customer: { ...customer },
      deliveryZone: DELIVERY_ZONES.find((z) => z.id === selectedZoneId),
      status: 'confirmed',
      paymentMethod:
        paymentMethod === 'upi'
          ? 'Instant UPI / QR'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : 'Pay upon Store Pickup',
    };

    setConfirmedOrder(newOrder);
    addPlacedOrder(newOrder);
    clearCart();
    setCurrentStep(6);

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#C87D55', '#E09F67', '#2A1D17', '#F5D7BA'],
      });
    } catch {
      // safe fallback
    }

    showToast('Order Confirmed!', `Your order ${orderNumber} has been received fresh.`, 'success');
  };

  const steps = [
    { num: 1, label: 'Fulfillment' },
    { num: 2, label: 'Date' },
    { num: 3, label: 'Time' },
    { num: 4, label: 'Details' },
    { num: 5, label: 'Payment' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div
        className="fixed inset-0 bg-[#1C130E]/80 backdrop-blur-md transition-opacity"
        onClick={() => {
          if (currentStep === 6) closeCheckout();
        }}
      />

      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EFE8DE] overflow-hidden z-10 animate-fade-up max-h-[94vh] flex flex-col my-auto">
        <div className="p-5 sm:p-6 border-b border-[#EFE8DE] flex items-center justify-between bg-white shrink-0">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-widest text-[#C87D55]">
              Maison Dorée Checkout
            </span>
            <h2 className="font-serif font-bold text-lg sm:text-xl text-[#1C130E]">
              {currentStep === 6 ? 'Order Confirmation & Receipt' : 'Complete Your Bakery Order'}
            </h2>
          </div>

          <button
            onClick={closeCheckout}
            aria-label="Close checkout"
            className="p-2 text-[#705446] hover:text-[#1C130E] hover:bg-[#F4ECE0] rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {currentStep < 6 && (
          <div className="p-4 bg-[#FAF6ED] border-b border-[#EFE8DE] flex items-center justify-between overflow-x-auto no-scrollbar shrink-0">
            {steps.map((step, idx) => (
              <React.Fragment key={step.num}>
                <div className="flex items-center gap-2">
                  <div
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center transition-all ${
                      currentStep === step.num
                        ? 'bg-[#2A1D17] text-white shadow-warm-sm'
                        : currentStep > step.num
                        ? 'bg-[#6F8C6F] text-white'
                        : 'bg-[#DEC9B5] text-[#533D32]'
                    }`}
                  >
                    {currentStep > step.num ? '✓' : step.num}
                  </div>
                  <span
                    className={`text-xs font-semibold whitespace-nowrap ${
                      currentStep === step.num ? 'text-[#1C130E]' : 'text-[#705446]'
                    }`}
                  >
                    {step.label}
                  </span>
                </div>
                {idx < steps.length - 1 && (
                  <div className="w-6 sm:w-10 h-[1px] bg-[#DEC9B5] mx-1 shrink-0" />
                )}
              </React.Fragment>
            ))}
          </div>
        )}

        <div className="p-5 sm:p-7 overflow-y-auto flex-1 space-y-6">
          {currentStep === 1 && (
            <div className="space-y-6 animate-fade-in">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1C130E]">
                  How would you like to receive your treats?
                </h3>
                <p className="text-xs text-[#705446]">
                  Choose between fresh store collection at our bakery counter or express local courier delivery.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div
                  onClick={() => setFulfillmentType('pickup')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    fulfillmentType === 'pickup'
                      ? 'border-[#C87D55] bg-[#FBEDDE] ring-2 ring-[#C87D55] shadow-warm-sm'
                      : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EFE8DE] flex items-center justify-center text-[#C87D55]">
                      <Store className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#2E4A2E] bg-[#E5EDE5] px-2 py-0.5 rounded-full">
                      FREE
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#1C130E]">
                    Bakery Counter Pickup
                  </h4>
                  <p className="text-xs text-[#705446] mt-1">
                    Collect warm from our oven at 14/A Artisan Lane, Bloom Quarter. No queue wait.
                  </p>
                </div>

                <div
                  onClick={() => setFulfillmentType('delivery')}
                  className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                    fulfillmentType === 'delivery'
                      ? 'border-[#C87D55] bg-[#FBEDDE] ring-2 ring-[#C87D55] shadow-warm-sm'
                      : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                  }`}
                >
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-white border border-[#EFE8DE] flex items-center justify-center text-[#C87D55]">
                      <Truck className="w-5 h-5" />
                    </div>
                    <span className="text-xs font-bold text-[#8C4425]">
                      {deliveryFee === 0 ? 'FREE OVER ₹2,000' : `From ${formatPrice(80)}`}
                    </span>
                  </div>
                  <h4 className="font-serif font-bold text-base text-[#1C130E]">
                    Doorstep Local Delivery
                  </h4>
                  <p className="text-xs text-[#705446] mt-1">
                    Delivered in temperature-guarded cake boxes with real-time dispatch alerts.
                  </p>
                </div>
              </div>

              {fulfillmentType === 'delivery' && (
                <div className="p-4 bg-white rounded-2xl border border-[#EFE8DE] space-y-3">
                  <label className="text-xs font-bold uppercase tracking-wider text-[#705446] block">
                    Select Your Delivery Distance Radius
                  </label>
                  <div className="space-y-2">
                    {DELIVERY_ZONES.map((zone) => {
                      const isSelected = selectedZoneId === zone.id;
                      return (
                        <div
                          key={zone.id}
                          onClick={() => setSelectedZoneId(zone.id)}
                          className={`p-3 rounded-xl border cursor-pointer flex items-center justify-between transition-all ${
                            isSelected
                              ? 'border-[#C87D55] bg-[#FBEDDE]'
                              : 'border-[#EFE8DE] hover:bg-[#FAF6ED]'
                          }`}
                        >
                          <div>
                            <span className="text-xs font-semibold text-[#1C130E] block">
                              {zone.name}
                            </span>
                            <span className="text-[11px] text-[#705446]">
                              Typical transit: {zone.estimatedTime}
                            </span>
                          </div>
                          <span className="text-xs font-bold text-[#8C4425]">
                            {subtotal >= 2000 ? 'FREE' : formatPrice(zone.fee)}
                          </span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1C130E]">
                  Choose Preparation & Pickup Date
                </h3>
                <p className="text-xs text-[#705446]">
                  Standard cakes require 24 hours advance baking. Dates with holidays or exceeding capacity are disabled.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                {availableDates.map((dateObj) => {
                  const isSelected = selectedDate === dateObj.dateString;
                  return (
                    <button
                      key={dateObj.dateString}
                      type="button"
                      disabled={!dateObj.isAvailable}
                      onClick={() => setSelectedDate(dateObj.dateString)}
                      className={`p-3.5 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                        !dateObj.isAvailable
                          ? 'opacity-45 bg-[#F4ECE0] border-dashed border-[#DEC9B5] cursor-not-allowed'
                          : isSelected
                          ? 'border-[#C87D55] bg-[#FBEDDE] shadow-warm-sm ring-1 ring-[#C87D55]'
                          : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-xs text-[#1C130E]">
                          {dateObj.displayDate}
                        </span>
                        {dateObj.isToday && (
                          <span className="text-[10px] bg-[#E5EDE5] text-[#2E4A2E] px-2 py-0.5 rounded font-bold">
                            Today
                          </span>
                        )}
                        {isSelected && dateObj.isAvailable && (
                          <span className="text-xs text-[#C87D55] font-bold">Selected</span>
                        )}
                      </div>
                      <span className="text-[11px] text-[#705446]">
                        {dateObj.isAvailable
                          ? 'Slots Available'
                          : dateObj.reason || 'Not Available'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1C130E]">
                  Select 1-Hour Time Window
                </h3>
                <p className="text-xs text-[#705446]">
                  To guarantee oven-fresh quality, our bakery bakes in small batches throughout the day.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 max-h-[360px] overflow-y-auto pr-1">
                {availableTimeSlots.map((slot) => {
                  const isSelected = selectedTimeSlot === slot.time;
                  return (
                    <button
                      key={slot.time}
                      type="button"
                      disabled={!slot.isAvailable}
                      onClick={() => setSelectedTimeSlot(slot.time)}
                      className={`p-3.5 rounded-2xl border text-left flex items-center justify-between transition-all ${
                        !slot.isAvailable
                          ? 'opacity-40 bg-[#F4ECE0] border-[#DEC9B5] cursor-not-allowed'
                          : isSelected
                          ? 'border-[#C87D55] bg-[#FBEDDE] ring-1 ring-[#C87D55] shadow-warm-sm'
                          : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                      }`}
                    >
                      <div>
                        <span className="font-semibold text-xs text-[#1C130E] block">
                          {slot.time}
                        </span>
                        <span className="text-[10px] text-[#705446]">{slot.period}</span>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                          !slot.isAvailable
                            ? 'bg-red-100 text-red-700'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {slot.isAvailable ? 'Available' : 'Fully Booked'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {currentStep === 4 && (
            <div className="space-y-4 animate-fade-in">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1C130E]">
                  Contact & Delivery Details
                </h3>
                <p className="text-xs text-[#705446]">
                  We will send order confirmation and dispatch updates via SMS & Email.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3D2B22]">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={customer.fullName}
                    onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                    placeholder="e.g. Radhika Sen"
                    className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                  />
                  {formErrors.fullName && (
                    <p className="text-[10px] text-red-600">{formErrors.fullName}</p>
                  )}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-[#3D2B22]">
                    Phone Number (10 digits) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={customer.phone}
                    onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                    placeholder="e.g. 9876543210"
                    className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                  />
                  {formErrors.phone && (
                    <p className="text-[10px] text-red-600">{formErrors.phone}</p>
                  )}
                </div>

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#3D2B22]">
                    Email Address <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={customer.email}
                    onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                    placeholder="e.g. radhika@example.com"
                    className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                  />
                  {formErrors.email && (
                    <p className="text-[10px] text-red-600">{formErrors.email}</p>
                  )}
                </div>

                {fulfillmentType === 'delivery' && (
                  <>
                    <div className="sm:col-span-2 space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">
                        Delivery Address (Flat / House No., Street, Area){' '}
                        <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customer.addressLine1}
                        onChange={(e) => setCustomer({ ...customer, addressLine1: e.target.value })}
                        placeholder="e.g. Apt 402, Oakwood Manor, 12th Main Indiranagar"
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      />
                      {formErrors.addressLine1 && (
                        <p className="text-[10px] text-red-600">{formErrors.addressLine1}</p>
                      )}
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">Landmark</label>
                      <input
                        type="text"
                        value={customer.landmark}
                        onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                        placeholder="e.g. Near Defense Colony Park"
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-semibold text-[#3D2B22]">
                        PIN Code <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        value={customer.pincode}
                        onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                        placeholder="560034"
                        className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                      />
                      {formErrors.pincode && (
                        <p className="text-[10px] text-red-600">{formErrors.pincode}</p>
                      )}
                    </div>
                  </>
                )}

                <div className="sm:col-span-2 space-y-1">
                  <label className="text-xs font-semibold text-[#3D2B22]">
                    Delivery / Pickup Notes
                  </label>
                  <input
                    type="text"
                    value={customer.orderNotes}
                    onChange={(e) => setCustomer({ ...customer, orderNotes: e.target.value })}
                    placeholder="e.g. Call upon arrival at the gate, or leave with concierge..."
                    className="w-full p-2.5 rounded-xl border border-[#DEC9B5] text-xs text-[#1C130E] focus:ring-1 focus:ring-[#C87D55]"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 5 && (
            <div className="space-y-5 animate-fade-in">
              <div className="space-y-1">
                <h3 className="font-serif font-bold text-lg text-[#1C130E]">Payment Method</h3>
                <p className="text-xs text-[#705446]">
                  Select your preferred simulated payment channel. (Demo mode — no real charge is made).
                </p>
              </div>

              <div className="space-y-2.5">
                <div
                  onClick={() => setPaymentMethod('upi')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'upi'
                      ? 'border-[#C87D55] bg-[#FBEDDE] ring-1 ring-[#C87D55]'
                      : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#EFE8DE] flex items-center justify-center text-sm font-bold text-[#C87D55]">
                      ₹
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1C130E]">Instant UPI / QR Code</p>
                      <p className="text-[11px] text-[#705446]">
                        GPay, PhonePe, Paytm, BHIM & all bank UPIs
                      </p>
                    </div>
                  </div>
                  {paymentMethod === 'upi' && <CheckCircle2 className="w-4 h-4 text-[#C87D55]" />}
                </div>

                <div
                  onClick={() => setPaymentMethod('card')}
                  className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                    paymentMethod === 'card'
                      ? 'border-[#C87D55] bg-[#FBEDDE] ring-1 ring-[#C87D55]'
                      : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-white border border-[#EFE8DE] flex items-center justify-center text-[#C87D55]">
                      <CreditCard className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-xs font-bold text-[#1C130E]">Credit / Debit Card</p>
                      <p className="text-[11px] text-[#705446]">Visa, Mastercard, RuPay & Amex</p>
                    </div>
                  </div>
                  {paymentMethod === 'card' && <CheckCircle2 className="w-4 h-4 text-[#C87D55]" />}
                </div>

                {fulfillmentType === 'pickup' && (
                  <div
                    onClick={() => setPaymentMethod('cod')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'cod'
                        ? 'border-[#C87D55] bg-[#FBEDDE] ring-1 ring-[#C87D55]'
                        : 'border-[#EFE8DE] bg-white hover:bg-[#FAF6ED]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-white border border-[#EFE8DE] flex items-center justify-center text-[#C87D55]">
                        <Store className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-xs font-bold text-[#1C130E]">Pay at Bakery Counter</p>
                        <p className="text-[11px] text-[#705446]">
                          Cash, UPI or Card upon physical pickup
                        </p>
                      </div>
                    </div>
                    {paymentMethod === 'cod' && <CheckCircle2 className="w-4 h-4 text-[#C87D55]" />}
                  </div>
                )}
              </div>

              <div className="p-4 bg-white rounded-2xl border border-[#EFE8DE] space-y-2 text-xs">
                <div className="flex justify-between text-[#705446]">
                  <span>Fulfillment:</span>
                  <span className="font-semibold text-[#1C130E] capitalize">
                    {fulfillmentType} ({selectedDate} @ {selectedTimeSlot})
                  </span>
                </div>
                <div className="flex justify-between text-[#705446]">
                  <span>Total Payable:</span>
                  <span className="font-serif font-bold text-base text-[#1C130E]">
                    {formatPrice(total)}
                  </span>
                </div>
              </div>
            </div>
          )}

          {currentStep === 6 && confirmedOrder && (
            <div className="space-y-6 animate-fade-in text-center sm:text-left">
              <div className="p-6 bg-[#FBEDDE] border border-[#F5D7BA] rounded-3xl text-center space-y-2">
                <div className="w-14 h-14 rounded-full bg-[#C87D55] text-white flex items-center justify-center mx-auto shadow-warm-sm text-2xl">
                  ✓
                </div>
                <h3 className="font-serif font-bold text-2xl text-[#1C130E]">
                  Thank You, {confirmedOrder.customer.fullName}!
                </h3>
                <p className="text-xs text-[#705446]">
                  Order <span className="font-mono font-bold text-[#1C130E]">{confirmedOrder.orderNumber}</span> has been scheduled with our master bakers.
                </p>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EFE8DE] space-y-3">
                <div className="flex items-center justify-between text-xs font-bold text-[#1C130E]">
                  <span>Bakery Status Tracker</span>
                  <span className="text-[#C87D55] font-semibold">Step 2 of 4: Confirmed & Queued</span>
                </div>

                <div className="grid grid-cols-4 gap-2 text-center text-[10px]">
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-[#6F8C6F]" />
                    <span className="font-bold text-[#2E4A2E]">Received</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-[#C87D55] animate-pulse" />
                    <span className="font-bold text-[#8C4425]">Prepping</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-[#DEC9B5]" />
                    <span className="text-[#947665]">Stone Oven</span>
                  </div>
                  <div className="space-y-1">
                    <div className="h-2 rounded-full bg-[#DEC9B5]" />
                    <span className="text-[#947665]">
                      {confirmedOrder.fulfillmentType === 'pickup' ? 'Ready' : 'Out for Drop'}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white p-5 rounded-2xl border border-[#EFE8DE] space-y-3 text-xs text-[#533D32]">
                <div className="flex justify-between border-b border-[#EFE8DE] pb-2">
                  <span className="text-[#705446]">Fulfillment Schedule:</span>
                  <span className="font-bold text-[#1C130E]">
                    {confirmedOrder.selectedDate} • {confirmedOrder.selectedTimeSlot}
                  </span>
                </div>

                <div className="flex justify-between border-b border-[#EFE8DE] pb-2">
                  <span className="text-[#705446]">Method:</span>
                  <span className="font-semibold text-[#1C130E] capitalize">
                    {confirmedOrder.fulfillmentType === 'pickup'
                      ? 'Counter Pickup (14/A Artisan Lane)'
                      : `Local Delivery to ${confirmedOrder.customer.addressLine1}`}
                  </span>
                </div>

                <div className="space-y-1.5 pt-1">
                  <span className="font-bold text-[#1C130E] block">Ordered Items:</span>
                  {confirmedOrder.items.map((item) => (
                    <div key={item.cartItemId} className="flex justify-between text-[11px]">
                      <span>
                        {item.quantity}x {item.product.name}
                        {item.customization && ` (${item.customization.size.label})`}
                      </span>
                      <span className="font-medium text-[#1C130E]">
                        {formatPrice(item.lineTotal)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-[#EFE8DE] flex justify-between font-bold text-sm text-[#1C130E]">
                  <span>Total Amount:</span>
                  <span className="font-serif text-lg">{formatPrice(confirmedOrder.total)}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <button
                  onClick={() => window.print()}
                  className="flex-1 py-3 bg-[#FAF6ED] hover:bg-[#F4ECE0] text-[#3D2B22] border border-[#DEC9B5] rounded-full text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Printer className="w-4 h-4" />
                  <span>Print Receipt</span>
                </button>
                <button
                  onClick={closeCheckout}
                  className="flex-1 py-3 bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] rounded-full text-xs font-semibold uppercase tracking-wider transition-colors"
                >
                  Back to Bakery Home
                </button>
              </div>
            </div>
          )}
        </div>

        {currentStep < 6 && (
          <div className="p-4 sm:p-5 border-t border-[#EFE8DE] bg-white flex items-center justify-between gap-4 shrink-0 shadow-lg">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={() => setCurrentStep((s) => (s - 1) as any)}
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-full text-xs font-semibold bg-[#FAF6ED] text-[#533D32] hover:bg-[#F4ECE0] transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              <button
                type="button"
                onClick={() => {
                  if (currentStep === 4) {
                    if (!validateCustomerStep()) return;
                  }
                  setCurrentStep((s) => (s + 1) as any);
                }}
                className="inline-flex items-center gap-2 bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] px-7 py-3 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-sm hover:shadow-warm-md transition-all"
              >
                <span>Continue</span>
                <ChevronRight className="w-4 h-4 text-[#E09F67]" />
              </button>
            ) : (
              <button
                type="button"
                onClick={handlePlaceOrder}
                className="inline-flex items-center gap-2 bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg hover:-translate-y-0.5 transition-all"
              >
                <Sparkles className="w-4 h-4 text-[#E09F67]" />
                <span>Confirm & Place Order ({formatPrice(total)})</span>
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
