import React from 'react';
import { Sparkles, Clock, ArrowRight, X } from 'lucide-react';
import { ARTICLES } from '../data/articles';

interface ArticlesSectionProps {
  selectedArticleId: string | null;
  onClearSelectedArticle: () => void;
  onSelectArticle: (id: string) => void;
}

export const ArticlesSection: React.FC<ArticlesSectionProps> = ({
  selectedArticleId,
  onClearSelectedArticle,
  onSelectArticle,
}) => {
  const activeArticle = ARTICLES.find((a) => a.id === selectedArticleId);

  return (
    <section id="articles" className="py-16 sm:py-24 bg-[#FAF6ED] border-y border-[#EFE8DE]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C87D55]">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Editorial Journal</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#1C130E]">
              From Our Kitchen
            </h2>
            <p className="text-sm sm:text-base text-[#533D32] max-w-xl">
              Baking masterclasses, wild fermentation insights, and seasonal pairing guides penned by our master bakers.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {ARTICLES.map((article) => (
            <article
              key={article.id}
              onClick={() => onSelectArticle(article.id)}
              className="group bg-white rounded-3xl overflow-hidden border border-[#EFE8DE] shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col cursor-pointer"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-[#FAF6ED]">
                <img
                  src={article.image}
                  alt={article.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <span className="absolute top-3 left-3 bg-[#2A1D17]/80 backdrop-blur-sm text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full">
                  {article.category}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                <div className="space-y-2">
                  <div className="flex items-center gap-3 text-[11px] text-[#947665]">
                    <span>{article.date}</span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#C87D55]" />
                      {article.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif font-bold text-lg sm:text-xl text-[#1C130E] group-hover:text-[#C87D55] transition-colors leading-snug">
                    {article.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-[#533D32] line-clamp-2 leading-relaxed">
                    {article.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-[#EFE8DE] flex items-center justify-between text-xs font-bold text-[#8C4425]">
                  <span>Read Full Article</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeArticle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div
            className="fixed inset-0 bg-[#1C130E]/75 backdrop-blur-sm transition-opacity"
            onClick={onClearSelectedArticle}
          />

          <div className="relative w-full max-w-2xl bg-[#FDFBF7] rounded-3xl shadow-2xl border border-[#EFE8DE] overflow-hidden z-10 animate-fade-up max-h-[90vh] flex flex-col my-auto">
            <div className="relative aspect-[21/9] w-full overflow-hidden bg-black shrink-0">
              <img
                src={activeArticle.image}
                alt={activeArticle.title}
                className="w-full h-full object-cover opacity-90"
              />
              <button
                onClick={onClearSelectedArticle}
                aria-label="Close article"
                className="absolute top-4 right-4 p-2 bg-[#1C130E]/70 text-white hover:bg-[#1C130E] rounded-full transition-colors backdrop-blur-sm"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1">
              <div className="space-y-2 border-b border-[#EFE8DE] pb-4">
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#C87D55] bg-[#FBEDDE] px-2.5 py-1 rounded-full">
                  {activeArticle.category}
                </span>
                <h2 className="font-serif font-bold text-2xl sm:text-3xl text-[#1C130E] leading-tight">
                  {activeArticle.title}
                </h2>
                <div className="flex items-center gap-4 text-xs text-[#705446] pt-1">
                  <span>By {activeArticle.author} ({activeArticle.authorRole})</span>
                  <span>•</span>
                  <span>{activeArticle.date}</span>
                </div>
              </div>

              <div className="space-y-4 text-sm sm:text-base text-[#3D2B22] leading-relaxed font-sans">
                {activeArticle.content.map((paragraph, idx) => (
                  <p key={idx}>{paragraph}</p>
                ))}
              </div>
            </div>

            <div className="p-4 bg-white border-t border-[#EFE8DE] flex justify-end shrink-0">
              <button
                onClick={onClearSelectedArticle}
                className="px-6 py-2.5 bg-[#2A1D17] text-white rounded-full text-xs font-semibold hover:bg-[#150E0A] transition-colors"
              >
                Close Article
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
