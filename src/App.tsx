import { useState } from 'react';
import { CartProvider } from './context/CartContext';
import { AnnouncementBar } from './components/AnnouncementBar';
import { Header } from './components/Header';
import { Hero } from './components/Hero';
import { FeaturedProducts } from './components/FeaturedProducts';
import { InteractiveMenu } from './components/InteractiveMenu';
import { CustomCakeSection } from './components/CustomCakeSection';
import { StorySection } from './components/StorySection';
import { TrustSection } from './components/TrustSection';
import { DietarySection } from './components/DietarySection';
import { ArticlesSection } from './components/ArticlesSection';
import { InstagramGrid } from './components/InstagramGrid';
import { NewsletterSection } from './components/NewsletterSection';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { ProductCustomizerModal } from './components/ProductCustomizerModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { StoreInfoModal } from './components/StoreInfoModal';
import { ToastContainer } from './components/ToastContainer';

export function AppContent() {
  const [isStoreInfoOpen, setIsStoreInfoOpen] = useState(false);
  const [selectedArticleId, setSelectedArticleId] = useState<string | null>(null);

  const handleSelectArticle = (id: string) => {
    setSelectedArticleId(id);
    const element = document.getElementById('articles');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFBF7] text-[#2A1D17]">
      {/* 1. Announcement Bar */}
      <AnnouncementBar />

      {/* 2. Sticky Header */}
      <Header onOpenStoreInfo={() => setIsStoreInfoOpen(true)} />

      {/* Main Page Flow */}
      <main className="flex-1">
        {/* 3. Hero Section */}
        <Hero />

        {/* 4. Featured Best-Selling Products */}
        <FeaturedProducts />

        {/* 5. Interactive Full Menu Catalog */}
        <InteractiveMenu />

        {/* 6. Custom Cake Studio Inquiry */}
        <CustomCakeSection />

        {/* 7. Brand Story & Heritage */}
        <StorySection />

        {/* 8. Trust & Customer Reviews Carousel */}
        <TrustSection />

        {/* 9. Dietary & Allergen Guide */}
        <DietarySection />

        {/* 10. Kitchen Journal & Articles */}
        <ArticlesSection
          selectedArticleId={selectedArticleId}
          onClearSelectedArticle={() => setSelectedArticleId(null)}
          onSelectArticle={handleSelectArticle}
        />

        {/* 11. Instagram Social Showcase */}
        <InstagramGrid />

        {/* 12. Newsletter 10% Off Section */}
        <NewsletterSection />
      </main>

      {/* 13. Detailed Footer */}
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
      <AppContent />
    </CartProvider>
  );
}
