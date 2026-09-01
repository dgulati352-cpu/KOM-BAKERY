import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import {
  Clock,
  ChevronRight,
  ChevronLeft,
  Truck,
  Store,
  CreditCard,
  QrCode,
  Sparkles,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { DELIVERY_ZONES } from '../data/deliveryZones';
import { getAvailableDates, getAvailableTimeSlots } from '../utils/availability';
import {
  calculateDeliveryFee,
  formatPrice,
} from '../utils/pricing';
import type { CustomerDetails, PlacedOrder, StoreTimeSlot } from '../types';
import { Breadcrumbs } from '../components/Breadcrumbs';

export const CheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const {
    cart,
    clearCart,
    couponCode,
    discountAmount,
    fulfillmentType,
    setFulfillmentType,
    selectedZoneId,
    setSelectedZoneId,
    addPlacedOrder,
    showToast,
  } = useCart();

  const [step, setStep] = useState<1 | 2 | 3 | 4 | 5>(1);

  // Scheduling State
  const availableDates = getAvailableDates(cart);
  const [selectedDate, setSelectedDate] = useState<string>(
    availableDates[0]?.dateString || ''
  );
  const availableSlots = getAvailableTimeSlots(selectedDate);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>(
    availableSlots.find((s: StoreTimeSlot) => s.isAvailable)?.time || '10:00 - 11:00'
  );

  // Customer Form State
  const [customer, setCustomer] = useState<CustomerDetails>({
    fullName: '',
    email: '',
    phone: '',
    addressLine1: '',
    addressLine2: '',
    landmark: '',
    pincode: '',
    orderNotes: '',
    isGift: false,
    giftRecipientName: '',
    giftNote: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'counter'>('upi');

  const subtotal = cart.reduce((sum, item) => sum + item.lineTotal, 0);
  const deliveryZone = DELIVERY_ZONES.find((z) => z.id === selectedZoneId);
  const deliveryFee = calculateDeliveryFee(subtotal, fulfillmentType, selectedZoneId);
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal - discountAmount + deliveryFee + tax;

  const handlePlaceOrder = () => {
    if (!customer.fullName || !customer.phone) {
      showToast('Missing Details', 'Please provide your name and phone number.', 'warning');
      setStep(4);
      return;
    }

    if (fulfillmentType === 'delivery' && (!customer.addressLine1 || !customer.pincode)) {
      showToast('Missing Address', 'Please provide a valid delivery address and PIN code.', 'warning');
      setStep(4);
      return;
    }

    const newOrder: PlacedOrder = {
      orderId: `ORD-${Date.now().toString(36).toUpperCase()}`,
      orderNumber: `KD-${Math.floor(100000 + Math.random() * 900000)}`,
      createdAt: new Date().toISOString(),
      fulfillmentType,
      selectedDate,
      selectedTimeSlot,
      items: [...cart],
      subtotal,
      deliveryFee,
      discount: discountAmount,
      couponCode: couponCode || undefined,
      tax,
      total,
      customer: { ...customer },
      deliveryZone: fulfillmentType === 'delivery' ? deliveryZone : undefined,
      status: 'confirmed',
      paymentMethod:
        paymentMethod === 'upi'
          ? 'UPI Instant Pay (QR)'
          : paymentMethod === 'card'
          ? 'Credit / Debit Card'
          : 'Pay at Store Counter',
    };

    addPlacedOrder(newOrder);
    clearCart();

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#2D211D', '#A86A4A', '#C9A36A'],
      });
    } catch {
      // safe fallback
    }

    navigate('/order-success');
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-16 h-16 rounded-full bg-[#F8F1E7] flex items-center justify-center text-3xl mx-auto">
          🛍️
        </div>
        <h1 className="font-serif text-3xl font-bold text-[#2D211D]">Your Bag is Empty</h1>
        <p className="text-sm text-[#7D6A60]">
          Add your favorite bakes before proceeding to checkout.
        </p>
        <Link
          to="/menu"
          className="inline-block bg-[#2D211D] text-[#FFFDF9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider"
        >
          Explore Menu
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-8 pb-20">
      <Breadcrumbs items={[{ label: 'Bag', path: '/cart' }, { label: 'Checkout' }]} />

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Step Indicator Header */}
        <div className="mb-8 max-w-3xl mx-auto">
          <div className="flex items-center justify-between text-xs font-semibold text-[#7D6A60]">
            <span className={step >= 1 ? 'text-[#A86A4A] font-bold' : ''}>1. Fulfillment</span>
            <span>•</span>
            <span className={step >= 2 ? 'text-[#A86A4A] font-bold' : ''}>2. Date</span>
            <span>•</span>
            <span className={step >= 3 ? 'text-[#A86A4A] font-bold' : ''}>3. Slot</span>
            <span>•</span>
            <span className={step >= 4 ? 'text-[#A86A4A] font-bold' : ''}>4. Address</span>
            <span>•</span>
            <span className={step >= 5 ? 'text-[#A86A4A] font-bold' : ''}>5. Payment</span>
          </div>
          <div className="w-full h-1.5 bg-[#F8F1E7] rounded-full mt-2 overflow-hidden">
            <div
              className="h-full bg-[#A86A4A] transition-all duration-300 rounded-full"
              style={{ width: `${(step / 5) * 100}%` }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Checkout Step Form */}
          <div className="lg:col-span-7 bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-lg">
            {/* STEP 1: Fulfillment Type */}
            {step === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#2D211D]">
                    How would you like to receive your order?
                  </h2>
                  <p className="text-xs text-[#7D6A60] mt-1">
                    Select counter pickup at our flagship hearth or doorstep courier delivery.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div
                    onClick={() => setFulfillmentType('pickup')}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      fulfillmentType === 'pickup'
                        ? 'border-[#A86A4A] bg-[#F8F1E7] ring-2 ring-[#A86A4A]/30'
                        : 'border-[#EFE3D3] bg-[#FFFDF9] hover:bg-[#F8F1E7]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Store className="w-6 h-6 text-[#A86A4A]" />
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded">
                        FREE
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#2D211D]">
                      Store Counter Pickup
                    </h3>
                    <p className="text-xs text-[#7D6A60] mt-1">
                      Pick up directly at our Bloom Quarter hearth with 15-minute quick parking.
                    </p>
                  </div>

                  <div
                    onClick={() => setFulfillmentType('delivery')}
                    className={`p-5 rounded-2xl border cursor-pointer transition-all ${
                      fulfillmentType === 'delivery'
                        ? 'border-[#A86A4A] bg-[#F8F1E7] ring-2 ring-[#A86A4A]/30'
                        : 'border-[#EFE3D3] bg-[#FFFDF9] hover:bg-[#F8F1E7]/50'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Truck className="w-6 h-6 text-[#A86A4A]" />
                      <span className="text-xs font-bold text-[#A86A4A]">
                        {deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    <h3 className="font-serif font-bold text-base text-[#2D211D]">
                      Doorstep Courier Delivery
                    </h3>
                    <p className="text-xs text-[#7D6A60] mt-1">
                      Temperature-controlled chilled transit across Bengaluru (0–15 km).
                    </p>
                  </div>
                </div>

                {fulfillmentType === 'delivery' && (
                  <div className="space-y-3 pt-2">
                    <label className="text-xs uppercase font-bold tracking-wider text-[#5A3026] block">
                      Select Your Delivery Distance Tier
                    </label>
                    <div className="space-y-2">
                      {DELIVERY_ZONES.map((zone) => (
                        <div
                          key={zone.id}
                          onClick={() => setSelectedZoneId(zone.id)}
                          className={`p-3.5 rounded-xl border cursor-pointer flex items-center justify-between text-xs transition-all ${
                            selectedZoneId === zone.id
                              ? 'border-[#A86A4A] bg-[#F8F1E7] font-semibold'
                              : 'border-[#EFE3D3] bg-[#FFFDF9]'
                          }`}
                        >
                          <div>
                            <span className="text-[#2D211D]">{zone.name}</span>
                            <span className="text-[11px] text-[#7D6A60] ml-2">
                              ({zone.estimatedTime})
                            </span>
                          </div>
                          <span className="font-bold text-[#A86A4A]">
                            {subtotal >= 2000 ? 'FREE' : formatPrice(zone.fee)}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4 flex justify-end">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-2 bg-[#2D211D] text-[#FFFDF9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#1C1411] transition-colors"
                  >
                    <span>Next: Select Date</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: Date Picker */}
            {step === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#2D211D]">
                    Choose Scheduled Date
                  </h2>
                  <p className="text-xs text-[#7D6A60] mt-1">
                    Dates automatically respect 24-hour lead times for custom cakes and store schedule.
                  </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {availableDates.slice(0, 8).map((d) => {
                    const isSelected = selectedDate === d.dateString;
                    return (
                      <button
                        key={d.dateString}
                        disabled={!d.isAvailable}
                        onClick={() => setSelectedDate(d.dateString)}
                        className={`p-3.5 rounded-2xl border text-center transition-all ${
                          isSelected
                            ? 'border-[#A86A4A] bg-[#F8F1E7] ring-2 ring-[#A86A4A]/30'
                            : d.isAvailable
                            ? 'border-[#EFE3D3] bg-[#FFFDF9] hover:bg-[#F8F1E7]'
                            : 'border-[#EFE3D3] bg-gray-50 opacity-40 cursor-not-allowed'
                        }`}
                      >
                        <span className="text-[10px] uppercase font-bold text-[#7D6A60] block">
                          {d.dayOfWeek}
                        </span>
                        <span className="font-serif font-bold text-sm text-[#2D211D] block my-0.5">
                          {d.displayDate}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(1)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#7D6A60] hover:text-[#2D211D]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-2 bg-[#2D211D] text-[#FFFDF9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#1C1411] transition-colors"
                  >
                    <span>Next: Choose Time Slot</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: Time Slot */}
            {step === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#2D211D]">
                    Select 1-Hour Time Window
                  </h2>
                  <p className="text-xs text-[#7D6A60] mt-1">
                    Ensures our bakers dispatch your order fresh out of the ovens.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {availableSlots.map((slot: StoreTimeSlot) => {
                    const isSelected = selectedTimeSlot === slot.time;
                    return (
                      <button
                        key={slot.time}
                        disabled={!slot.isAvailable}
                        onClick={() => setSelectedTimeSlot(slot.time)}
                        className={`p-3.5 rounded-xl border flex items-center justify-between text-xs transition-all ${
                          isSelected
                            ? 'border-[#A86A4A] bg-[#F8F1E7] ring-1 ring-[#A86A4A] font-semibold'
                            : slot.isAvailable
                            ? 'border-[#EFE3D3] bg-[#FFFDF9] hover:bg-[#F8F1E7]'
                            : 'border-[#EFE3D3] bg-gray-50 opacity-40 cursor-not-allowed'
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <Clock className="w-4 h-4 text-[#A86A4A]" />
                          <span className="text-[#2D211D]">{slot.time}</span>
                        </div>
                        <span className="text-[10px] text-emerald-700 font-bold">
                          {slot.isAvailable ? 'Available' : 'Fully Booked'}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(2)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#7D6A60] hover:text-[#2D211D]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-2 bg-[#2D211D] text-[#FFFDF9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#1C1411] transition-colors"
                  >
                    <span>Next: Customer Details</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: Customer & Address Details */}
            {step === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#2D211D]">
                    Contact & Delivery Address
                  </h2>
                  <p className="text-xs text-[#7D6A60] mt-1">
                    We will send live status alerts to your phone and email.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2D211D]">Full Name *</label>
                    <input
                      type="text"
                      required
                      value={customer.fullName}
                      onChange={(e) => setCustomer({ ...customer, fullName: e.target.value })}
                      placeholder="e.g. Maya Iyer"
                      className="w-full p-2.5 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] focus:ring-1 focus:ring-[#A86A4A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-semibold text-[#2D211D]">Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={customer.phone}
                      onChange={(e) => setCustomer({ ...customer, phone: e.target.value })}
                      placeholder="e.g. 9876543210"
                      className="w-full p-2.5 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] focus:ring-1 focus:ring-[#A86A4A]"
                    />
                  </div>

                  <div className="sm:col-span-2 space-y-1">
                    <label className="text-xs font-semibold text-[#2D211D]">Email Address</label>
                    <input
                      type="email"
                      value={customer.email}
                      onChange={(e) => setCustomer({ ...customer, email: e.target.value })}
                      placeholder="e.g. maya@example.com"
                      className="w-full p-2.5 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] focus:ring-1 focus:ring-[#A86A4A]"
                    />
                  </div>

                  {fulfillmentType === 'delivery' && (
                    <>
                      <div className="sm:col-span-2 space-y-1">
                        <label className="text-xs font-semibold text-[#2D211D]">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          required
                          value={customer.addressLine1}
                          onChange={(e) =>
                            setCustomer({ ...customer, addressLine1: e.target.value })
                          }
                          placeholder="Flat / Building / House No., Street Name"
                          className="w-full p-2.5 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] focus:ring-1 focus:ring-[#A86A4A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#2D211D]">Landmark</label>
                        <input
                          type="text"
                          value={customer.landmark}
                          onChange={(e) => setCustomer({ ...customer, landmark: e.target.value })}
                          placeholder="e.g. Near Bloom Park"
                          className="w-full p-2.5 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] focus:ring-1 focus:ring-[#A86A4A]"
                        />
                      </div>

                      <div className="space-y-1">
                        <label className="text-xs font-semibold text-[#2D211D]">PIN Code *</label>
                        <input
                          type="text"
                          required
                          value={customer.pincode}
                          onChange={(e) => setCustomer({ ...customer, pincode: e.target.value })}
                          placeholder="e.g. 560034"
                          className="w-full p-2.5 bg-[#F8F1E7] rounded-xl border border-[#EFE3D3] text-xs text-[#2D211D] focus:ring-1 focus:ring-[#A86A4A]"
                        />
                      </div>
                    </>
                  )}
                </div>

                <div className="pt-4 flex justify-between">
                  <button
                    onClick={() => setStep(3)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#7D6A60] hover:text-[#2D211D]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>
                  <button
                    onClick={() => setStep(5)}
                    className="inline-flex items-center gap-2 bg-[#2D211D] text-[#FFFDF9] px-8 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#1C1411] transition-colors"
                  >
                    <span>Next: Payment</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: Payment Demo Selection */}
            {step === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div>
                  <h2 className="font-serif font-bold text-2xl text-[#2D211D]">
                    Choose Payment Method
                  </h2>
                  <p className="text-xs text-[#7D6A60] mt-1">
                    Select your preferred seamless checkout option.
                  </p>
                </div>

                <div className="space-y-3">
                  <div
                    onClick={() => setPaymentMethod('upi')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'upi'
                        ? 'border-[#A86A4A] bg-[#F8F1E7] ring-1 ring-[#A86A4A]'
                        : 'border-[#EFE3D3] bg-[#FFFDF9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <QrCode className="w-5 h-5 text-[#A86A4A]" />
                      <div>
                        <p className="text-xs font-bold text-[#2D211D]">
                          UPI Instant Pay (Google Pay / PhonePe / QR)
                        </p>
                        <p className="text-[11px] text-[#7D6A60]">
                          Zero transaction fee • Instant verification
                        </p>
                      </div>
                    </div>
                    <span className="text-xs font-bold text-emerald-700">Recommended</span>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('card')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'card'
                        ? 'border-[#A86A4A] bg-[#F8F1E7] ring-1 ring-[#A86A4A]'
                        : 'border-[#EFE3D3] bg-[#FFFDF9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#A86A4A]" />
                      <div>
                        <p className="text-xs font-bold text-[#2D211D]">
                          Credit / Debit Card (Visa, Master, RuPay)
                        </p>
                        <p className="text-[11px] text-[#7D6A60]">
                          Protected by 256-bit SSL encryption
                        </p>
                      </div>
                    </div>
                  </div>

                  <div
                    onClick={() => setPaymentMethod('counter')}
                    className={`p-4 rounded-2xl border cursor-pointer flex items-center justify-between transition-all ${
                      paymentMethod === 'counter'
                        ? 'border-[#A86A4A] bg-[#F8F1E7] ring-1 ring-[#A86A4A]'
                        : 'border-[#EFE3D3] bg-[#FFFDF9]'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Store className="w-5 h-5 text-[#A86A4A]" />
                      <div>
                        <p className="text-xs font-bold text-[#2D211D]">
                          Pay at Store Counter on Pickup
                        </p>
                        <p className="text-[11px] text-[#7D6A60]">
                          Cash, UPI, or Card accepted at pickup desk
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex justify-between items-center border-t border-[#EFE3D3]">
                  <button
                    onClick={() => setStep(4)}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-[#7D6A60] hover:text-[#2D211D]"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Back</span>
                  </button>

                  <button
                    onClick={handlePlaceOrder}
                    className="inline-flex items-center gap-2 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg transition-all"
                  >
                    <Sparkles className="w-4 h-4 text-[#C9A36A]" />
                    <span>Confirm & Place Order ({formatPrice(total)})</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Mini Order Summary Review */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[#FFFDF9] p-6 rounded-3xl border border-[#EFE3D3] shadow-warm-md space-y-4">
              <h3 className="font-serif font-bold text-lg text-[#2D211D] border-b border-[#EFE3D3] pb-3">
                Order Review ({cart.length} items)
              </h3>

              <div className="space-y-3 max-h-60 overflow-y-auto pr-1 text-xs divide-y divide-[#EFE3D3]">
                {cart.map((item) => (
                  <div key={item.cartItemId} className="pt-2 flex justify-between items-center">
                    <div>
                      <p className="font-bold text-[#2D211D]">
                        {item.quantity}x {item.product.name}
                      </p>
                      {item.customization && (
                        <p className="text-[10px] text-[#7D6A60]">
                          {item.customization.size.label} • {item.customization.flavor.name}
                        </p>
                      )}
                    </div>
                    <span className="font-semibold text-[#2D211D]">
                      {formatPrice(item.lineTotal)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="pt-3 border-t border-[#EFE3D3] space-y-2 text-xs text-[#5A3026]">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700 font-semibold">
                    <span>Discount</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>Delivery ({fulfillmentType})</span>
                  <span>{deliveryFee === 0 ? 'FREE' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex justify-between">
                  <span>5% GST Tax</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-[#EFE3D3] pt-2 flex justify-between font-bold text-sm text-[#2D211D]">
                  <span className="font-serif">Final Total</span>
                  <span className="font-serif text-lg">{formatPrice(total)}</span>
                </div>
              </div>

              <div className="p-3 bg-[#F8F1E7] rounded-xl text-[11px] text-[#7D6A60] space-y-1">
                <p>
                  <strong>Scheduled:</strong> {selectedDate || 'Today'} • {selectedTimeSlot}
                </p>
                <p>
                  <strong>Fulfillment:</strong>{' '}
                  {fulfillmentType === 'pickup' ? 'Store Pickup' : 'Chilled Delivery'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
