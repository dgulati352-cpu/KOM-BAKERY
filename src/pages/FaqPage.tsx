import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Package, Truck, ShieldCheck, CreditCard, Cake } from 'lucide-react';
import { PageHero } from '../components/PageHero';
import { Breadcrumbs } from '../components/Breadcrumbs';
import { Link } from 'react-router-dom';

interface FaqItem {
  question: string;
  answer: string;
  category: 'orders' | 'delivery' | 'products' | 'payments' | 'custom';
}

export const FaqPage: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'all' | 'orders' | 'delivery' | 'products' | 'payments' | 'custom'>('all');
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs: FaqItem[] = [
    {
      category: 'orders',
      question: 'How far in advance do I need to order standard celebration cakes?',
      answer: 'Standard celebration cakes require at least 24 hours advance notice to ensure our pastry team has sufficient time to bake, cool, frost, and chill your creation. For morning breads and viennoiserie, same-day ordering is available with a 2:00 PM cutoff.',
    },
    {
      category: 'orders',
      question: 'Can I cancel or modify my bakery order after placing it?',
      answer: 'Because all our bakes are handcrafted from scratch, cancellations or date modifications are accepted up to 18 hours prior to your scheduled pickup or delivery window. Please call our counter at +91 98765 43210 for urgent modifications.',
    },
    {
      category: 'delivery',
      question: 'What are your delivery radius zones and fees?',
      answer: 'We deliver within 15 km of our bakery: 0–5 km is ₹80, 5–10 km is ₹150, and 10–15 km is ₹250. Orders above ₹2,000 qualify for 100% complimentary delivery. There is a ₹500 minimum order subtotal for all delivery dispatches.',
    },
    {
      category: 'delivery',
      question: 'How are multi-layer cakes transported safely during transit?',
      answer: 'All our celebration cakes are anchored with food-grade internal dowels, packed in heavy-gauge insulated cake boxes with non-slip base pads, and transported in temperature-controlled air-conditioned vehicles to prevent melting or shifting.',
    },
    {
      category: 'products',
      question: 'What type of butter and flours do you use?',
      answer: 'We use 100% authentic AOP French Normandy butter (84% butterfat) for our lamination and cakes. We never use margarine, palm oil, or hydrogenated vegetable fats. Our flours are non-GMO and stoneground.',
    },
    {
      category: 'products',
      question: 'Do you offer vegan, eggless, or gluten-free options?',
      answer: 'Yes! We have a dedicated range of Vegan/Eggless chocolate cakes and banana loaves, as well as naturally gluten-free flourless almond and chocolate treats crafted with 100% almond meal in a sanitized prep station.',
    },
    {
      category: 'payments',
      question: 'Which payment methods are accepted online and in-store?',
      answer: 'We accept all major UPI apps (Google Pay, PhonePe, Paytm, BHIM), Visa, MasterCard, RuPay debit & credit cards, and cash or card payment at counter pickup.',
    },
    {
      category: 'custom',
      question: 'How do I commission a multi-tiered wedding or bespoke event cake?',
      answer: 'You can submit your event date, theme, guest count, and moodboard pictures via our Bespoke Cake Studio inquiry form. Our pastry chef will review your design and call you with a detailed quote within 4 business hours. We recommend booking weddings 2 to 4 weeks in advance.',
    },
  ];

  const filteredFaqs = activeCategory === 'all' ? faqs : faqs.filter((f) => f.category === activeCategory);

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'orders', label: 'Orders & Notice', icon: <Package className="w-4 h-4" /> },
    { id: 'delivery', label: 'Delivery & Transit', icon: <Truck className="w-4 h-4" /> },
    { id: 'products', label: 'Ingredients & Diet', icon: <ShieldCheck className="w-4 h-4" /> },
    { id: 'payments', label: 'Payment Options', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'custom', label: 'Custom Cakes', icon: <Cake className="w-4 h-4" /> },
  ];

  return (
    <div className="space-y-12 sm:space-y-16">
      <Breadcrumbs items={[{ label: 'FAQ' }]} />

      <PageHero
        eyebrow="FREQUENTLY ASKED QUESTIONS"
        title="Help & Ordering Guide"
        subtitle="Everything you need to know about lead times, delivery zones, ingredient sourcing, and custom orders."
      />

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 space-y-8">
        {/* Category Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar sm:justify-center">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id as any);
                  setOpenIndex(0);
                }}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all shrink-0 ${
                  isActive
                    ? 'bg-[#2D211D] text-[#FFFDF9] shadow-warm-sm'
                    : 'bg-[#FFFDF9] text-[#5A3026] hover:bg-[#F8F1E7] border border-[#EFE3D3]'
                }`}
              >
                <span className={isActive ? 'text-[#C9A36A]' : 'text-[#A86A4A]'}>
                  {cat.icon}
                </span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {filteredFaqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="bg-[#FFFDF9] rounded-2xl border border-[#EFE3D3] shadow-warm-sm overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4"
                >
                  <span className="font-serif font-bold text-base sm:text-lg text-[#2D211D]">
                    {faq.question}
                  </span>
                  <div
                    className={`w-7 h-7 rounded-full bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-180 bg-[#2D211D] text-[#FFFDF9]' : ''
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 border-t border-[#EFE3D3]/60 text-xs sm:text-sm text-[#5A3026]/90 leading-relaxed animate-fade-in font-sans">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Still Have Questions Box */}
        <div className="bg-[#F8F1E7] rounded-3xl p-8 border border-[#EFE3D3] text-center space-y-3">
          <h3 className="font-serif font-bold text-xl text-[#2D211D]">
            Have a Specific Question or Dietary Concern?
          </h3>
          <p className="text-xs sm:text-sm text-[#5A3026]/80 max-w-md mx-auto">
            Our pastry team is always happy to guide you with ingredient breakdowns or delivery schedules.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 bg-[#2D211D] text-[#FFFDF9] px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider hover:bg-[#1C1411] transition-colors"
            >
              <span>Contact Our Bakery Team</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
