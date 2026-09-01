import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  ShoppingBag,
  Search,
  Menu as MenuIcon,
  X,
  Heart,
  Clock,
  ChevronDown,
} from 'lucide-react';
import { useCart } from '../context/CartContext';

interface HeaderProps {
  onOpenStoreInfo: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onOpenStoreInfo }) => {
  const { cartCount, setIsCartOpen, setIsSearchOpen, wishlist } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesDropdown, setCategoriesDropdown] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setCategoriesDropdown(false);
  }, [location.pathname]);

  const navLinks = [
    { label: 'Home', path: '/' },
    { label: 'Menu', path: '/menu' },
    { label: 'Cakes', path: '/cakes' },
    { label: 'Pastries', path: '/pastries' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const shopSubLinks = [
    { label: 'All Menu Items', path: '/menu' },
    { label: 'Signature Cakes', path: '/cakes' },
    { label: 'French Pastries', path: '/pastries' },
    { label: 'Artisan Cookies', path: '/cookies' },
    { label: 'Frosted Cupcakes', path: '/cupcakes' },
    { label: 'Best Sellers', path: '/best-sellers' },
    { label: 'Special Offers', path: '/offers' },
  ];

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FFFDF9]/95 backdrop-blur-md shadow-warm-md border-b border-[#EFE3D3] py-3'
            : 'bg-[#FFFDF9] border-b border-[#EFE3D3] py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                aria-label="Open mobile navigation menu"
                className="p-2 text-[#2D211D] hover:bg-[#F8F1E7] rounded-full transition-colors"
              >
                <MenuIcon className="w-6 h-6" />
              </button>
            </div>

            {/* Brand Logo & Editorial Typography */}
            <Link to="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-full bg-[#2D211D] text-[#FFFDF9] flex items-center justify-center font-serif font-bold text-xl shadow-warm-sm group-hover:scale-105 transition-transform">
                K
              </div>
              <div>
                <span className="font-serif text-xl sm:text-2xl font-bold tracking-tight text-[#2D211D] block leading-none">
                  KOM BAKERY
                </span>
                <span className="text-[10px] uppercase tracking-widest text-[#A86A4A] font-semibold block mt-0.5">
                  Artisan Pâtisserie & Hearth
                </span>
              </div>
            </Link>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center space-x-1 xl:space-x-2">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider transition-all ${
                      isActive
                        ? 'text-[#A86A4A] bg-[#F8F1E7] font-bold'
                        : 'text-[#5A3026] hover:text-[#2D211D] hover:bg-[#F8F1E7]/70'
                    }`}
                  >
                    {link.label}
                  </Link>
                );
              })}

              {/* More Shop Dropdown */}
              <div className="relative group">
                <button
                  onClick={() => setCategoriesDropdown(!categoriesDropdown)}
                  className="px-3.5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-[#5A3026] hover:text-[#2D211D] hover:bg-[#F8F1E7]/70 transition-all flex items-center gap-1"
                >
                  <span>More</span>
                  <ChevronDown className="w-3.5 h-3.5" />
                </button>

                <div className="absolute top-full right-0 mt-1 w-52 bg-[#FFFDF9] rounded-2xl shadow-warm-lg border border-[#EFE3D3] p-2 opacity-0 group-hover:opacity-100 group-hover:translate-y-0 translate-y-2 pointer-events-none group-hover:pointer-events-auto transition-all duration-200 z-50">
                  {shopSubLinks.map((sub) => (
                    <Link
                      key={sub.path}
                      to={sub.path}
                      className="block px-3 py-2 text-xs font-semibold text-[#5A3026] hover:text-[#2D211D] hover:bg-[#F8F1E7] rounded-xl transition-colors"
                    >
                      {sub.label}
                    </Link>
                  ))}
                  <div className="my-1 border-t border-[#EFE3D3]" />
                  <Link
                    to="/faq"
                    className="block px-3 py-2 text-xs font-semibold text-[#5A3026] hover:text-[#2D211D] hover:bg-[#F8F1E7] rounded-xl transition-colors"
                  >
                    Frequently Asked Questions
                  </Link>
                </div>
              </div>
            </nav>

            {/* Right Action Icons & Bag Trigger */}
            <div className="flex items-center gap-2 sm:gap-3">
              {/* Store Hours Trigger */}
              <button
                onClick={onOpenStoreInfo}
                aria-label="View store hours and location"
                className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold text-[#5A3026] hover:bg-[#F8F1E7] border border-[#EFE3D3] transition-colors"
              >
                <Clock className="w-3.5 h-3.5 text-[#A86A4A]" />
                <span>Hours & Info</span>
              </button>

              {/* Search Modal Trigger */}
              <button
                onClick={() => setIsSearchOpen(true)}
                aria-label="Search bakery menu"
                className="p-2 text-[#5A3026] hover:text-[#2D211D] hover:bg-[#F8F1E7] rounded-full transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Wishlist Link */}
              <Link
                to="/menu"
                aria-label="View favorite items"
                className="p-2 text-[#5A3026] hover:text-[#2D211D] hover:bg-[#F8F1E7] rounded-full transition-colors relative"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#A86A4A] text-white text-[10px] font-bold rounded-full flex items-center justify-center animate-pulse">
                    {wishlist.length}
                  </span>
                )}
              </Link>

              {/* Cart Drawer Trigger */}
              <button
                onClick={() => setIsCartOpen(true)}
                aria-label="Open bakery bag"
                className="relative flex items-center gap-2 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] px-4 py-2 rounded-full text-xs font-semibold transition-all hover:scale-105 active:scale-95 shadow-warm-sm"
              >
                <ShoppingBag className="w-4 h-4 text-[#C9A36A]" />
                <span className="hidden sm:inline">Bag</span>
                {cartCount > 0 && (
                  <span className="bg-[#A86A4A] text-white text-[11px] font-bold px-2 py-0.5 rounded-full ml-0.5">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Navigation Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#FFFDF9] animate-fade-in overflow-y-auto">
          <div className="p-4 border-b border-[#EFE3D3] flex items-center justify-between">
            <Link to="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-[#2D211D] text-[#FFFDF9] flex items-center justify-center font-serif font-bold text-lg">
                K
              </div>
              <div>
                <span className="font-serif font-bold text-lg text-[#2D211D]">KOM BAKERY</span>
                <span className="text-[10px] uppercase tracking-wider text-[#A86A4A] block">
                  Artisan Pâtisserie
                </span>
              </div>
            </Link>

            <button
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close mobile menu"
              className="p-2 text-[#2D211D] hover:bg-[#F8F1E7] rounded-full"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6 space-y-6 flex-1">
            <div className="space-y-1">
              <span className="text-[10px] uppercase tracking-widest font-bold text-[#A86A4A] block mb-2">
                Main Pages
              </span>
              {[
                { label: 'Home', path: '/' },
                { label: 'Complete Menu', path: '/menu' },
                { label: 'Signature Cakes', path: '/cakes' },
                { label: 'French Pastries', path: '/pastries' },
                { label: 'Artisan Cookies', path: '/cookies' },
                { label: 'Cupcakes', path: '/cupcakes' },
                { label: 'Best Sellers', path: '/best-sellers' },
                { label: 'Special Offers', path: '/offers' },
                { label: 'Our Heritage Story', path: '/about' },
                { label: 'Contact & Location', path: '/contact' },
                { label: 'FAQ & Ordering Help', path: '/faq' },
              ].map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`block py-3 px-4 rounded-xl font-serif text-lg font-bold transition-colors ${
                    location.pathname === item.path
                      ? 'bg-[#F8F1E7] text-[#A86A4A]'
                      : 'text-[#2D211D] hover:bg-[#F8F1E7]/60'
                  }`}
                >
                  {item.label}
                </Link>
              ))}
            </div>

            <div className="pt-4 border-t border-[#EFE3D3] space-y-3">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenStoreInfo();
                }}
                className="w-full flex items-center justify-between p-3.5 bg-[#F8F1E7] rounded-xl text-xs font-semibold text-[#2D211D]"
              >
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#A86A4A]" />
                  <span>Store Hours & Location</span>
                </div>
                <span>7:00 AM – 7:00 PM</span>
              </button>

              <Link
                to="/cart"
                className="w-full flex items-center justify-center gap-2 bg-[#2D211D] text-[#FFFDF9] py-3.5 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md"
              >
                <ShoppingBag className="w-4 h-4 text-[#C9A36A]" />
                <span>View Bag ({cartCount} items)</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
