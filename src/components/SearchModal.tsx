import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, X, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/articles';
import { formatPrice } from '../utils/pricing';

interface SearchModalProps {
  onSelectArticle: (articleId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectArticle }) => {
  const navigate = useNavigate();
  const { isSearchOpen, setIsSearchOpen, openCustomizer, addToCart } = useCart();
  const [query, setQuery] = useState('');

  const filteredProducts = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return PRODUCTS.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.dietary.some((d) => d.toLowerCase().includes(q)) ||
        p.ingredients?.some((ing) => ing.toLowerCase().includes(q))
    );
  }, [query]);

  const filteredArticles = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return ARTICLES.filter(
      (a) =>
        a.title.toLowerCase().includes(q) ||
        a.excerpt.toLowerCase().includes(q) ||
        a.category.toLowerCase().includes(q)
    );
  }, [query]);

  if (!isSearchOpen) return null;

  const handleProductClick = (slug: string) => {
    setIsSearchOpen(false);
    navigate(`/product/${slug}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C1411]/75 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-3xl shadow-2xl border border-[#EFE3D3] overflow-hidden z-10 animate-fade-up">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EFE3D3] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#A86A4A] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sourdough, croissants, birthday cakes, vegan brownies..."
            className="w-full bg-transparent text-[#2D211D] placeholder-[#7D6A60] text-sm sm:text-base focus:outline-none font-sans"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#7D6A60] hover:text-[#2D211D] rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold bg-[#F8F1E7] text-[#5A3026] hover:bg-[#EFE3D3] rounded-md border border-[#EFE3D3]"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-6 space-y-4">
            <p className="text-xs uppercase tracking-wider font-bold text-[#7D6A60]">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {[
                'Butter Croissant',
                'Country Sourdough',
                'Belgian Chocolate Cake',
                'Red Velvet Cupcake',
                'Gluten-Free Brownie',
                'Focaccia',
                'Vegan Tart',
              ].map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="px-3.5 py-1.5 rounded-full bg-[#F8F1E7] hover:bg-[#EFE3D3] hover:text-[#2D211D] text-xs font-medium text-[#5A3026] border border-[#EFE3D3] transition-colors"
                >
                  {term}
                </button>
              ))}
            </div>

            <div className="mt-6 pt-4 border-t border-[#EFE3D3] text-xs text-[#7D6A60] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#A86A4A]" />
              <span>All our breads and pastries are freshly baked in small batches daily.</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {/* Products results */}
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EFE3D3]">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#7D6A60]">
                  Bakery Items ({filteredProducts.length})
                </h4>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-6 text-center text-sm text-[#7D6A60] flex flex-col items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-[#EFE3D3]" />
                  <p>No treats match "{query}". Try checking our categories or spelling.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex items-center justify-between p-3 rounded-2xl hover:bg-[#F8F1E7] border border-transparent hover:border-[#EFE3D3] transition-all cursor-pointer"
                      onClick={() => handleProductClick(product.slug)}
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-xl object-cover shadow-warm-sm group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h5 className="font-serif font-bold text-sm text-[#2D211D] group-hover:text-[#A86A4A] transition-colors">
                            {product.name}
                          </h5>
                          <p className="text-xs text-[#7D6A60] line-clamp-1">
                            {product.tagline}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-xs text-[#2D211D]">
                              {product.customizable
                                ? `From ${formatPrice(product.basePrice)}`
                                : formatPrice(product.basePrice)}
                            </span>
                            {product.dietary.map((d) => (
                              <span
                                key={d}
                                className="text-[10px] bg-emerald-50 text-emerald-800 px-1.5 py-0.5 rounded font-medium"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div onClick={(e) => e.stopPropagation()}>
                        {product.customizable ? (
                          <button
                            onClick={() => {
                              setIsSearchOpen(false);
                              openCustomizer(product);
                            }}
                            className="text-xs font-semibold bg-[#F8F1E7] hover:bg-[#EFE3D3] text-[#5A3026] px-3.5 py-1.5 rounded-full transition-colors border border-[#EFE3D3]"
                          >
                            Customize
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              addToCart(product, 1);
                              setIsSearchOpen(false);
                            }}
                            className="text-xs font-semibold bg-[#2D211D] hover:bg-[#1C1411] text-white px-3.5 py-1.5 rounded-full transition-colors"
                          >
                            + Quick Add
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Articles results */}
            {filteredArticles.length > 0 && (
              <div>
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EFE3D3]">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#7D6A60]">
                    Journal & Guides ({filteredArticles.length})
                  </h4>
                </div>

                <div className="space-y-2">
                  {filteredArticles.map((article) => (
                    <button
                      key={article.id}
                      onClick={() => {
                        setIsSearchOpen(false);
                        onSelectArticle(article.id);
                      }}
                      className="w-full text-left flex items-center justify-between p-3 rounded-2xl hover:bg-[#F8F1E7] border border-transparent hover:border-[#EFE3D3] transition-all"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#A86A4A]">
                          {article.category}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-[#2D211D]">
                          {article.title}
                        </h5>
                        <p className="text-xs text-[#7D6A60] line-clamp-1">{article.excerpt}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#7D6A60]" />
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
