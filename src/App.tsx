import { useState } from 'react';
import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { ScrollToTop } from './components/ScrollToTop';
import { SearchModal } from './components/SearchModal';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreInfoModal } from './components/StoreInfoModal';
import { ToastContainer } from './components/ToastContainer';

// Page Views
import { HomePage } from './pages/HomePage';
import { MenuPage } from './pages/MenuPage';
import { CakesPage } from './pages/CakesPage';
import { PastriesPage } from './pages/PastriesPage';
import { CookiesPage } from './pages/CookiesPage';
import { CupcakesPage } from './pages/CupcakesPage';
import { BestSellersPage } from './pages/BestSellersPage';
import { OffersPage } from './pages/OffersPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { FaqPage } from './pages/FaqPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { OrderSuccessPage } from './pages/OrderSuccessPage';
import { NotFoundPage } from './pages/NotFoundPage';

function AppLayout() {
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelectArticle = () => {
    navigate('/about');
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF9] text-[#2D211D]">
      <ScrollToTop />

      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header */}
      <Header onOpenStoreInfo={() => setIsStoreInfoOpen(true)} />

      {/* 3. Main Multi-Page Route View */}
      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/menu" element={<MenuPage />} />
          <Route path="/cakes" element={<CakesPage />} />
          <Route path="/pastries" element={<PastriesPage />} />
          <Route path="/cookies" element={<CookiesPage />} />
          <Route path="/cupcakes" element={<CupcakesPage />} />
          <Route path="/best-sellers" element={<BestSellersPage />} />
          <Route path="/offers" element={<OffersPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faq" element={<FaqPage />} />
          <Route path="/product/:slug" element={<ProductDetailPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </main>

      {/* 4. Luxury Footer */}
      <Footer onOpenStoreInfo={() => setIsStoreInfoOpen(true)} />

      {/* Overlays & Modals */}
      <SearchModal onSelectArticle={handleSelectArticle} />
      <ProductCustomizerModal />
      <CartDrawer />
      <CheckoutModal />
      <StoreInfoModal isOpen={isStoreInfoOpen} onClose={() => setIsStoreInfoOpen(false)} />
      <ToastContainer />
    </div>
  );
}

export default function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <AppLayout />
      </BrowserRouter>
    </CartProvider>
  );
}
