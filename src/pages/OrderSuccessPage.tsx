import React from 'react';
import { Link } from 'react-router-dom';
import {
  CheckCircle2,
  MapPin,
  Calendar,
  Sparkles,
  Printer,
  ArrowRight,
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../utils/pricing';

export const OrderSuccessPage: React.FC = () => {
  const { latestOrder } = useCart();

  const handlePrint = () => {
    window.print();
  };

  const steps = [
    { label: 'Order Received', done: true, time: 'Just now' },
    { label: 'Master Baker Assigned', done: true, time: '3:30 AM' },
    { label: 'Oven Baking & Glazing', done: false, time: 'In progress' },
    { label: 'Ready / Dispatched', done: false, time: 'Scheduled window' },
  ];

  return (
    <div className="py-12 sm:py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Top Celebration Banner */}
      <div className="bg-[#FFFDF9] p-8 sm:p-12 rounded-3xl border border-[#EFE3D3] shadow-warm-lg text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center text-4xl mx-auto shadow-warm-sm animate-fade-in">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A86A4A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Order Confirmed & Scheduled</span>
          </div>

          <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D211D]">
            Thank You for Your Order!
          </h1>

          <p className="text-sm sm:text-base text-[#5A3026]/90 max-w-md mx-auto font-sans leading-relaxed">
            Our pastry chefs have received your baking schedule. We are handcrafting everything fresh using pure French butter.
          </p>
        </div>

        {latestOrder && (
          <div className="inline-block bg-[#F8F1E7] px-6 py-2.5 rounded-full border border-[#EFE3D3] font-mono text-xs font-bold text-[#2D211D]">
            Order #{latestOrder.orderNumber}
          </div>
        )}
      </div>

      {/* Live Order Timeline Progress */}
      <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm space-y-6">
        <h2 className="font-serif font-bold text-xl text-[#2D211D] border-b border-[#EFE3D3] pb-3">
          Live Bakery Preparation Status
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
          {steps.map((s, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-2xl border text-center space-y-1.5 transition-all ${
                s.done
                  ? 'border-emerald-300 bg-emerald-50/60'
                  : 'border-[#EFE3D3] bg-[#F8F1E7]/40 opacity-70'
              }`}
            >
              <div
                className={`w-7 h-7 rounded-full flex items-center justify-center mx-auto text-xs font-bold ${
                  s.done ? 'bg-emerald-600 text-white' : 'bg-[#EFE3D3] text-[#7D6A60]'
                }`}
              >
                {s.done ? '✓' : idx + 1}
              </div>
              <p className="font-serif font-bold text-xs text-[#2D211D]">{s.label}</p>
              <p className="text-[10px] text-[#7D6A60]">{s.time}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Order Summary Receipt Box */}
      {latestOrder && (
        <div className="bg-[#FFFDF9] p-6 sm:p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm space-y-6">
          <div className="flex items-center justify-between border-b border-[#EFE3D3] pb-4">
            <div>
              <h3 className="font-serif font-bold text-lg text-[#2D211D]">Scheduled Details</h3>
              <p className="text-xs text-[#7D6A60]">
                {latestOrder.fulfillmentType === 'pickup'
                  ? 'Counter Pickup at Bloom Quarter Hearth'
                  : `Chilled Courier Delivery to ${latestOrder.customer.pincode}`}
              </p>
            </div>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-[#F8F1E7] hover:bg-[#EFE3D3] text-[#2D211D] rounded-xl text-xs font-semibold border border-[#EFE3D3] transition-colors"
            >
              <Printer className="w-3.5 h-3.5 text-[#A86A4A]" />
              <span>Print Receipt</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-[#5A3026]">
            <div className="p-4 bg-[#F8F1E7] rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#A86A4A] flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                Scheduled Date & Time
              </span>
              <p className="font-bold text-[#2D211D] text-sm">
                {latestOrder.selectedDate} • {latestOrder.selectedTimeSlot}
              </p>
            </div>

            <div className="p-4 bg-[#F8F1E7] rounded-2xl space-y-1">
              <span className="text-[10px] uppercase font-bold text-[#A86A4A] flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5" />
                Contact Recipient
              </span>
              <p className="font-bold text-[#2D211D]">
                {latestOrder.customer.fullName} ({latestOrder.customer.phone})
              </p>
            </div>
          </div>

          <div className="pt-2 border-t border-[#EFE3D3] space-y-2 text-xs">
            <h4 className="font-serif font-bold text-sm text-[#2D211D]">Ordered Items</h4>
            {latestOrder.items.map((item) => (
              <div key={item.cartItemId} className="flex justify-between py-1">
                <span>
                  {item.quantity}x {item.product.name}
                  {item.customization ? ` (${item.customization.size.label})` : ''}
                </span>
                <span className="font-semibold text-[#2D211D]">
                  {formatPrice(item.lineTotal)}
                </span>
              </div>
            ))}
            <div className="border-t border-[#EFE3D3] pt-2 flex justify-between font-bold text-sm text-[#2D211D]">
              <span className="font-serif">Total Paid ({latestOrder.paymentMethod})</span>
              <span className="font-serif text-base">{formatPrice(latestOrder.total)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Return Home / Shop Actions */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
        <Link
          to="/"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2D211D] text-[#FFFDF9] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#1C1411] transition-all shadow-warm-sm"
        >
          <span>BACK TO HOME</span>
        </Link>

        <Link
          to="/menu"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFDF9] text-[#2D211D] border border-[#EFE3D3] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#F8F1E7] transition-all shadow-warm-sm"
        >
          <span>CONTINUE SHOPPING</span>
          <ArrowRight className="w-4 h-4 text-[#A86A4A]" />
        </Link>
      </div>
    </div>
  );
};
