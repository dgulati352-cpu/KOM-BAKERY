import React, { useState, useMemo } from 'react';
import { Search, X, ArrowRight, Sparkles, AlertCircle } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { PRODUCTS } from '../data/products';
import { ARTICLES } from '../data/articles';
import { formatPrice } from '../utils/pricing';

interface SearchModalProps {
  onSelectArticle: (articleId: string) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ onSelectArticle }) => {
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

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-[#1C130E]/70 backdrop-blur-sm transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-2xl shadow-2xl border border-[#EFE8DE] overflow-hidden z-10 animate-fade-up">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[#EFE8DE] flex items-center gap-3 bg-white">
          <Search className="w-5 h-5 text-[#C87D55] shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search sourdough, croissants, birthday cakes, vegan brownies..."
            className="w-full bg-transparent text-[#1C130E] placeholder-[#947665] text-base focus:outline-none"
            autoFocus
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 text-[#947665] hover:text-[#1C130E] rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={() => setIsSearchOpen(false)}
            className="px-2.5 py-1 text-xs font-semibold bg-[#FAF6ED] text-[#533D32] hover:bg-[#F4ECE0] rounded-md border border-[#EFE8DE]"
          >
            ESC
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        {!query && (
          <div className="p-6 space-y-4">
            <p className="text-xs uppercase tracking-wider font-bold text-[#947665]">
              Popular Searches
            </p>
            <div className="flex flex-wrap gap-2">
              {['Butter Croissant', 'Country Sourdough', 'Chocolate Cake', 'Gluten-Free Brownie', 'Focaccia', 'Brioche', 'Vegan Tart'].map(
                (term) => (
                  <button
                    key={term}
                    onClick={() => setQuery(term)}
                    className="px-3 py-1.5 rounded-full bg-[#FAF6ED] hover:bg-[#FBEDDE] hover:text-[#8C4425] text-xs font-medium text-[#533D32] border border-[#EFE8DE] transition-colors"
                  >
                    {term}
                  </button>
                )
              )}
            </div>

            <div className="mt-6 pt-4 border-t border-[#EFE8DE] text-xs text-[#705446] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#C87D55]" />
              <span>All our breads and pastries are freshly baked in small batches daily.</span>
            </div>
          </div>
        )}

        {/* Search Results */}
        {query && (
          <div className="max-h-[60vh] overflow-y-auto p-4 space-y-6">
            {/* Products results */}
            <div>
              <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EFE8DE]">
                <h4 className="text-xs uppercase font-bold tracking-wider text-[#947665]">
                  Bakery Items ({filteredProducts.length})
                </h4>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="py-6 text-center text-sm text-[#705446] flex flex-col items-center gap-2">
                  <AlertCircle className="w-6 h-6 text-[#DEC9B5]" />
                  <p>No treats match "{query}". Try checking our categories or spelling.</p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredProducts.map((product) => (
                    <div
                      key={product.id}
                      className="group flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF6ED] border border-transparent hover:border-[#EFE8DE] transition-all"
                    >
                      <div className="flex items-center gap-3.5">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-14 h-14 rounded-lg object-cover shadow-warm-sm group-hover:scale-105 transition-transform"
                        />
                        <div>
                          <h5 className="font-serif font-bold text-sm text-[#1C130E] group-hover:text-[#C87D55] transition-colors">
                            {product.name}
                          </h5>
                          <p className="text-xs text-[#705446] line-clamp-1">
                            {product.tagline}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="font-semibold text-xs text-[#2A1D17]">
                              {product.customizable ? `From ${formatPrice(product.basePrice)}` : formatPrice(product.basePrice)}
                            </span>
                            {product.dietary.map((d) => (
                              <span
                                key={d}
                                className="text-[10px] bg-[#E5EDE5] text-[#2E4A2E] px-1.5 py-0.5 rounded font-medium"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div>
                        {product.customizable ? (
                          <button
                            onClick={() => {
                              setIsSearchOpen(false);
                              openCustomizer(product);
                            }}
                            className="text-xs font-semibold bg-[#FBEDDE] hover:bg-[#F5D7BA] text-[#8C4425] px-3 py-1.5 rounded-full transition-colors"
                          >
                            Customize
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              addToCart(product, 1);
                              setIsSearchOpen(false);
                            }}
                            className="text-xs font-semibold bg-[#2A1D17] hover:bg-[#1C130E] text-white px-3 py-1.5 rounded-full transition-colors"
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
                <div className="flex items-center justify-between pb-2 mb-2 border-b border-[#EFE8DE]">
                  <h4 className="text-xs uppercase font-bold tracking-wider text-[#947665]">
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
                      className="w-full text-left flex items-center justify-between p-3 rounded-xl hover:bg-[#FAF6ED] border border-transparent hover:border-[#EFE8DE] transition-all"
                    >
                      <div>
                        <span className="text-[10px] uppercase tracking-wider font-semibold text-[#C87D55]">
                          {article.category}
                        </span>
                        <h5 className="font-serif font-bold text-sm text-[#1C130E]">
                          {article.title}
                        </h5>
                        <p className="text-xs text-[#705446] line-clamp-1">{article.excerpt}</p>
                      </div>
                      <ArrowRight className="w-4 h-4 text-[#947665]" />
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
