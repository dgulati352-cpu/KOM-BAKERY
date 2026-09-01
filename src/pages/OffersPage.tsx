import React from 'react';
import { Gift, Copy, Check, Truck, Tag } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';

export const OffersPage: React.FC = () => {
  const { applyCoupon, couponCode } = useCart();
  const [copiedCode, setCopiedCode] = React.useState<string | null>(null);

  const handleApply = (code: string) => {
    applyCoupon(code);
    setCopiedCode(code);
    navigator.clipboard?.writeText(code);
    setTimeout(() => setCopiedCode(null), 3000);
  };

  const activeOffers = [
    {
      code: 'SWEET10',
      title: '10% Welcome First Order Discount',
      desc: 'Enjoy 10% off your entire first online bakery order across all cakes, breads, and viennoiserie.',
      badge: 'First Time Buyers',
      validity: 'Valid across all categories • No minimum order',
      icon: <Gift className="w-6 h-6 text-[#A86A4A]" />,
    },
    {
      code: 'FREESHIP',
      title: 'Complimentary Local Delivery',
      desc: 'Free temperature-controlled courier delivery within 15 km on any order above ₹2,000.',
      badge: 'Free Shipping',
      validity: 'Automatic on orders ₹2,000+ or apply code FREESHIP',
      icon: <Truck className="w-6 h-6 text-[#A86A4A]" />,
    },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      <Breadcrumbs items={[{ label: 'Special Offers' }]} />

      <PageHero
        eyebrow="COMMUNITY REWARDS"
        title="Current Bakery Offers & Perks"
        subtitle="Exclusive transparent discounts, welcome gifts, and complimentary delivery perks for our patrons."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {activeOffers.map((offer) => {
            const isApplied = couponCode === offer.code;
            return (
              <div
                key={offer.code}
                className={`bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 border shadow-warm-sm flex flex-col justify-between gap-6 transition-all ${
                  isApplied
                    ? 'border-[#A86A4A] ring-2 ring-[#A86A4A]/30 bg-[#F8F1E7]/40'
                    : 'border-[#EFE3D3] hover:shadow-warm-md'
                }`}
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-[#F8F1E7] flex items-center justify-center">
                      {offer.icon}
                    </div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A86A4A] bg-[#F8F1E7] px-3 py-1 rounded-full border border-[#EFE3D3]">
                      {offer.badge}
                    </span>
                  </div>

                  <div>
                    <h3 className="font-serif font-bold text-xl text-[#2D211D]">
                      {offer.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#5A3026]/80 mt-1 leading-relaxed">
                      {offer.desc}
                    </p>
                  </div>

                  <p className="text-[11px] text-[#7D6A60] italic">
                    {offer.validity}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE3D3] flex items-center justify-between gap-3">
                  <div className="bg-[#F8F1E7] border border-[#EFE3D3] rounded-xl px-3.5 py-2 font-mono font-bold text-xs text-[#2D211D] flex items-center gap-2">
                    <Tag className="w-3.5 h-3.5 text-[#A86A4A]" />
                    <span>{offer.code}</span>
                  </div>

                  <button
                    onClick={() => handleApply(offer.code)}
                    className={`inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all shadow-warm-sm ${
                      isApplied
                        ? 'bg-emerald-700 text-white'
                        : 'bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9]'
                    }`}
                  >
                    {isApplied ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Applied</span>
                      </>
                    ) : copiedCode === offer.code ? (
                      <>
                        <Check className="w-3.5 h-3.5" />
                        <span>Copied & Applied</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-[#C9A36A]" />
                        <span>Apply Code</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Informational Callout */}
        <div className="bg-[#F8F1E7] rounded-2xl p-6 border border-[#EFE3D3] text-center space-y-3">
          <h4 className="font-serif font-bold text-base text-[#2D211D]">
            Ordering for an Event or Large Gathering?
          </h4>
          <p className="text-xs text-[#5A3026]/80 max-w-lg mx-auto leading-relaxed">
            For orders exceeding 10 custom cakes or 50+ breakfast pastry boxes, contact our catering team directly for bespoke volume menu pricing.
          </p>
          <Link
            to="/contact"
            className="inline-block text-xs font-bold text-[#A86A4A] hover:underline uppercase tracking-wider"
          >
            Contact Catering Team →
          </Link>
        </div>
      </section>
    </div>
  );
};
