import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  X,
} from 'lucide-react';

interface FooterProps {
  onOpenStoreInfo: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenStoreInfo }) => {
  const [legalModal, setLegalModal] = useState<'privacy' | 'terms' | 'allergens' | null>(null);

  return (
    <>
      <footer className="bg-[#1C1411] text-[#FFFDF9] pt-16 pb-12 border-t border-[#3F2F29]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-[#3F2F29]">
            {/* Col 1: Brand Wordmark & Story (4 cols) */}
            <div className="lg:col-span-4 space-y-4">
              <Link to="/" className="flex items-center gap-3 group">
                <div className="w-10 h-10 rounded-full bg-[#2D211D] border border-[#C9A36A]/40 flex items-center justify-center font-serif font-bold text-xl text-[#FFFDF9] group-hover:scale-105 transition-transform">
                  K
                </div>
                <div>
                  <span className="font-serif text-2xl font-bold tracking-tight text-white block">
                    KOM BAKERY
                  </span>
                  <span className="text-[10px] tracking-[0.2em] uppercase text-[#C9A36A] font-semibold block mt-0.5">
                    Artisan Pâtisserie & Hearth
                  </span>
                </div>
              </Link>

              <p className="text-xs text-[#F8F1E7]/70 leading-relaxed max-w-sm font-sans">
                Handcrafted specialty bakery preparing 48-hour stoneground wild sourdoughs, 81-layer French croissants, and custom celebration cakes with 100% natural butter in Bengaluru.
              </p>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="w-9 h-9 rounded-full bg-[#2D211D] hover:bg-[#A86A4A] text-white flex items-center justify-center transition-colors"
                >
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
              </div>
            </div>

            {/* Col 2: Shop & Categories (2 cols) */}
            <div className="lg:col-span-2 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C9A36A]">
                Shop Bakery
              </p>
              <ul className="space-y-2 text-xs text-[#F8F1E7]/70">
                <li>
                  <Link to="/menu" className="hover:text-white transition-colors">
                    Complete Menu
                  </Link>
                </li>
                <li>
                  <Link to="/cakes" className="hover:text-white transition-colors">
                    Signature Cakes
                  </Link>
                </li>
                <li>
                  <Link to="/pastries" className="hover:text-white transition-colors">
                    French Pastries
                  </Link>
                </li>
                <li>
                  <Link to="/cookies" className="hover:text-white transition-colors">
                    Artisan Cookies
                  </Link>
                </li>
                <li>
                  <Link to="/cupcakes" className="hover:text-white transition-colors">
                    Frosted Cupcakes
                  </Link>
                </li>
                <li>
                  <Link to="/best-sellers" className="hover:text-white transition-colors">
                    Best Sellers
                  </Link>
                </li>
              </ul>
            </div>

            {/* Col 3: Company & Information (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C9A36A]">
                Company & Help
              </p>
              <ul className="space-y-2 text-xs text-[#F8F1E7]/70">
                <li>
                  <Link to="/about" className="hover:text-white transition-colors">
                    Our Heritage Story
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="hover:text-white transition-colors">
                    Contact & Catering
                  </Link>
                </li>
                <li>
                  <Link to="/faq" className="hover:text-white transition-colors">
                    FAQ & Lead Times
                  </Link>
                </li>
                <li>
                  <Link to="/offers" className="hover:text-white transition-colors">
                    Special Offers & Codes
                  </Link>
                </li>
                <li>
                  <button
                    onClick={onOpenStoreInfo}
                    className="hover:text-white transition-colors text-left"
                  >
                    Counter Hours & Directions
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 4: Location & Contact (3 cols) */}
            <div className="lg:col-span-3 space-y-3">
              <p className="text-xs font-bold uppercase tracking-widest text-[#C9A36A]">
                Visit Our Hearth
              </p>
              <div className="space-y-2 text-xs text-[#F8F1E7]/70">
                <p className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-[#C9A36A] shrink-0 mt-0.5" />
                  <span>14/A, Artisan Lane, Bloom Quarter, Bengaluru, KA 560034</span>
                </p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-[#C9A36A] shrink-0" />
                  <a href="tel:+919876543210" className="hover:text-white">
                    +91 98765 43210
                  </a>
                </p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-[#C9A36A] shrink-0" />
                  <a href="mailto:hello@kombakery.com" className="hover:text-white">
                    hello@kombakery.com
                  </a>
                </p>
                <button
                  onClick={onOpenStoreInfo}
                  className="inline-flex items-center gap-1 text-[11px] text-[#C9A36A] hover:underline font-semibold pt-1"
                >
                  <span>View Map & Driving Directions</span>
                  <ExternalLink className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Bar & Legal Modals */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#7D6A60]">
            <p>© {new Date().getFullYear()} KOM BAKERY. All rights reserved.</p>

            <div className="flex items-center gap-6">
              <button
                onClick={() => setLegalModal('privacy')}
                className="hover:text-[#FFFDF9] transition-colors"
              >
                Privacy Policy
              </button>
              <button
                onClick={() => setLegalModal('terms')}
                className="hover:text-[#FFFDF9] transition-colors"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setLegalModal('allergens')}
                className="hover:text-[#FFFDF9] transition-colors"
              >
                Allergen Disclosure
              </button>
            </div>
          </div>
        </div>
      </footer>

      {legalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-[#1C1411]/75 backdrop-blur-sm"
            onClick={() => setLegalModal(null)}
          />
          <div className="relative w-full max-w-lg bg-[#FFFDF9] rounded-3xl p-6 sm:p-8 shadow-2xl border border-[#EFE3D3] z-10 animate-fade-up max-h-[85vh] overflow-y-auto space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-[#EFE3D3]">
              <h3 className="font-serif font-bold text-lg text-[#2D211D]">
                {legalModal === 'privacy' && 'Privacy Policy'}
                {legalModal === 'terms' && 'Terms of Service'}
                {legalModal === 'allergens' && 'Allergen & Kitchen Policy'}
              </h3>
              <button
                onClick={() => setLegalModal(null)}
                className="p-1.5 rounded-full hover:bg-[#F8F1E7] text-[#7D6A60]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="text-xs text-[#5A3026] space-y-3 leading-relaxed font-sans">
              {legalModal === 'privacy' && (
                <>
                  <p>
                    KOM Bakery respects your privacy. When you place an order with us, we collect your contact name, phone number, delivery address, and email solely to fulfill your bakery order and provide live tracking notifications.
                  </p>
                  <p>
                    We never sell or trade your private data. Payments are securely simulated for this demonstration.
                  </p>
                </>
              )}
              {legalModal === 'terms' && (
                <>
                  <p>
                    1. Fresh Bakery Fulfillment: Perishable items are prepared fresh to order. Same-day cancellations must be requested at least 3 hours prior to the scheduled pickup time slot.
                  </p>
                  <p>
                    2. Custom Cake Orders: Custom decorated cakes require at least 24 hours advance notice to allow proper baking, chilling, and artistic hand-finishing.
                  </p>
                  <p>
                    3. Delivery Liability: We package all cakes in custom reinforced insulated boxes. Please ensure a recipient is available at the delivery location during the chosen 1-hour time window.
                  </p>
                </>
              )}
              {legalModal === 'allergens' && (
                <>
                  <p>
                    Our bakery uses high-grade unbleached wheat flour, AOP Normandy butter, whole milk, eggs, almonds, walnuts, pistachios, hazelnuts, and sesame seeds.
                  </p>
                  <p>
                    While we maintain strict sanitary separation for our Gluten-Free and Vegan batches, flour dust is naturally present in our hearth environment. If you have severe anaphylactic allergies, please consult with our team directly.
                  </p>
                </>
              )}
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setLegalModal(null)}
                className="px-5 py-2 bg-[#2D211D] text-white rounded-full text-xs font-semibold hover:bg-[#1C1411]"
              >
                Understood
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
