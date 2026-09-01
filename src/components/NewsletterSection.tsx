import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Mail, ArrowRight, Gift } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const NewsletterSection: React.FC = () => {
  const { showToast, applyCoupon } = useCart();
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) {
      showToast('Invalid Email', 'Please enter a valid email address.', 'warning');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      applyCoupon('SWEET10');

      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.7 },
          colors: ['#C87D55', '#E09F67', '#2A1D17'],
        });
      } catch {
        // safe fallback
      }

      showToast(
        'Welcome to Maison Dorée Club!',
        'Use promo code SWEET10 for 10% off your first order.',
        'success'
      );
    }, 600);
  };

  return (
    <section className="py-16 sm:py-20 bg-[#2A1D17] text-[#FAF6ED] relative overflow-hidden">
      {/* Decorative Warm Background Glow */}
      <div className="absolute top-1/2 right-10 -translate-y-1/2 w-96 h-96 bg-[#E09F67]/15 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6 relative z-10">
        <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#E09F67] bg-[#3D2B22] px-3.5 py-1.5 rounded-full">
          <Gift className="w-3.5 h-3.5" />
          <span>Exclusive 10% First Order Welcome Gift</span>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white">
          Something Sweet Is Coming.
        </h2>

        <p className="text-sm sm:text-base text-[#DEC9B5] max-w-xl mx-auto leading-relaxed">
          Join our intimate bakery mailing list for secret seasonal menu drops, weekend specialty bakes, and 10% off your first online order.
        </p>

        {isSubscribed ? (
          <div className="p-6 bg-[#3D2B22] rounded-3xl border border-[#C87D55]/50 max-w-md mx-auto space-y-3 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-[#C87D55] text-white flex items-center justify-center mx-auto text-xl">
              ✓
            </div>
            <h3 className="font-serif font-bold text-lg text-white">
              You're on the VIP Baker's List!
            </h3>
            <p className="text-xs text-[#DEC9B5]">
              We’ve automatically applied promo code{' '}
              <span className="font-mono font-bold text-[#E09F67] bg-[#1C130E] px-2 py-0.5 rounded">
                SWEET10
              </span>{' '}
              to your active bakery bag for 10% off!
            </p>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row items-center justify-center gap-3 max-w-md mx-auto"
          >
            <div className="relative w-full">
              <Mail className="w-4 h-4 text-[#947665] absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email address..."
                className="w-full pl-11 pr-4 py-3.5 bg-[#1C130E] border border-[#533D32] rounded-full text-xs text-white placeholder-[#947665] focus:outline-none focus:ring-2 focus:ring-[#C87D55]"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#C87D55] hover:bg-[#AE5E36] text-white px-7 py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider whitespace-nowrap shadow-warm-md hover:shadow-warm-lg transition-all"
            >
              <span>{isSubmitting ? 'Unlocking...' : 'Get 10% Off'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <p className="text-[11px] text-[#947665]">
          No spam ever. Unsubscribe with 1 click at any time.
        </p>
      </div>
    </section>
  );
};
