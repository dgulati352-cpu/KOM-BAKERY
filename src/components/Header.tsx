import React, { useState, useEffect } from 'react';
import {
  ShoppingBag,
  Search,
  Menu as MenuIcon,
  X,
  Clock,
  Sparkles,
  ChevronRight,
  MapPin,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenStoreInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenStoreInfo }) => {
  const { cartCount, setIsCartOpen, setIsSearchOpen } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Menu', href: '#menu' },
    { name: 'Custom Cakes', href: '#custom-cakes' },
    { name: 'Our Story', href: '#story' },
    { name: 'Allergens', href: '#allergens' },
    { name: 'Journal', href: '#articles' },
    { name: 'Reviews', href: '#reviews' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FDFBF7]/95 backdrop-blur-md shadow-warm-sm border-b border-[#EFE8DE] py-3'
            : 'bg-[#FDFBF7] border-b border-[#EFE8DE]/60 py-4.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Brand Logo / Wordmark */}
          <a
            href="#"
            className="group flex items-center gap-3 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55] rounded-lg p-1"
          >
            <div className="w-10 h-10 rounded-full bg-[#FAF6ED] border border-[#E09F67]/40 flex items-center justify-center text-xl shadow-warm-sm group-hover:scale-105 transition-transform">
              🥐
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-[#1C130E] leading-none">
                Maison Dorée
              </span>
              <span className="text-[10px] tracking-[0.22em] uppercase text-[#C87D55] font-semibold mt-1">
                Artisan Pâtisserie & Hearth
              </span>
            </div>
          </a>

          {/* Desktop Center Navigation */}
          <nav className="hidden lg:flex items-center space-x-8 text-sm font-medium text-[#533D32]">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="hover:text-[#C87D55] transition-colors relative py-1 after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-0 after:h-[2px] after:bg-[#C87D55] hover:after:w-full after:transition-all"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onOpenStoreInfo}
              className="flex items-center gap-1 text-xs text-[#8C4425] bg-[#FBEDDE] hover:bg-[#F5D7BA] px-3 py-1.5 rounded-full font-semibold transition-colors"
            >
              <Clock className="w-3.5 h-3.5" />
              <span>Hours & Pickup</span>
            </button>
          </nav>

          {/* Right Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4">
            {/* Search Trigger Button */}
            <button
              onClick={() => setIsSearchOpen(true)}
              aria-label="Search treats"
              className="p-2.5 rounded-full text-[#533D32] hover:text-[#1C130E] hover:bg-[#F4ECE0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Cart Drawer Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label={`View cart with ${cartCount} items`}
              className="relative p-2.5 rounded-full text-[#533D32] hover:text-[#1C130E] hover:bg-[#F4ECE0] transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55] group"
            >
              <ShoppingBag className="w-5 h-5 group-hover:scale-105 transition-transform" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#C87D55] text-white text-[11px] font-bold w-5 h-5 rounded-full flex items-center justify-center shadow-warm-sm animate-pulse-subtle">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Primary Order Online CTA */}
            <a
              href="#menu"
              className="hidden sm:inline-flex items-center gap-2 bg-[#2A1D17] hover:bg-[#150E0A] text-[#FAF6ED] px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide uppercase shadow-warm-sm hover:shadow-warm-md hover:-translate-y-0.5 transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#E09F67]" />
              <span>Order Online</span>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open mobile navigation menu"
              className="lg:hidden p-2.5 rounded-full text-[#2A1D17] hover:bg-[#F4ECE0] transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C87D55]"
            >
              <MenuIcon className="w-6 h-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Over Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-[#1C130E]/60 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileMenuOpen(false)}
          />

          {/* Drawer Container */}
          <div className="relative ml-auto w-full max-w-xs sm:max-w-sm bg-[#FDFBF7] h-full shadow-2xl flex flex-col z-10 animate-fade-in overflow-y-auto">
            <div className="p-6 border-b border-[#EFE8DE] flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="text-2xl">🥐</span>
                <span className="font-serif text-xl font-bold text-[#1C130E]">Maison Dorée</span>
              </div>
              <button
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Close menu"
                className="p-2 rounded-full hover:bg-[#F4ECE0] text-[#533D32]"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-6 flex-1">
              <a
                href="#menu"
                onClick={() => setIsMobileMenuOpen(false)}
                className="w-full flex items-center justify-between bg-[#2A1D17] text-[#FAF6ED] px-5 py-3.5 rounded-xl font-semibold text-sm shadow-warm-sm"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[#E09F67]" />
                  <span>Order Online Now</span>
                </span>
                <ChevronRight className="w-4 h-4 text-[#E09F67]" />
              </a>

              <nav className="space-y-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center justify-between px-3 py-3 rounded-lg text-[#3D2B22] font-medium hover:bg-[#FAF6ED] hover:text-[#C87D55] transition-colors"
                  >
                    <span>{link.name}</span>
                    <ChevronRight className="w-4 h-4 text-[#DEC9B5]" />
                  </a>
                ))}
              </nav>

              <div className="pt-4 border-t border-[#EFE8DE] space-y-3 text-xs text-[#533D32]">
                <button
                  onClick={() => {
                    setIsMobileMenuOpen(false);
                    onOpenStoreInfo();
                  }}
                  className="w-full flex items-start gap-2.5 text-left p-3 rounded-lg bg-[#FAF6ED] border border-[#EFE8DE]"
                >
                  <Clock className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1C130E]">Store Hours</p>
                    <p className="text-[#705446]">Mon–Fri: 7 AM – 7 PM</p>
                    <p className="text-[#705446]">Sat–Sun: 8 AM – 8 PM</p>
                  </div>
                </button>

                <div className="flex items-start gap-2.5 p-3 rounded-lg bg-[#FAF6ED] border border-[#EFE8DE]">
                  <MapPin className="w-4 h-4 text-[#C87D55] shrink-0 mt-0.5" />
                  <div>
                    <p className="font-semibold text-[#1C130E]">Bakery Location</p>
                    <p className="text-[#705446]">14/A Artisan Lane, Bloom Quarter</p>
                    <p className="text-[#705446]">Bengaluru, KA 560034</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="p-6 bg-[#FAF6ED] border-t border-[#EFE8DE] text-center text-xs text-[#705446]">
              <p>Freshly baked from 4:00 AM daily.</p>
              <p className="mt-1 font-semibold text-[#C87D55]">+91 98765 43210</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
