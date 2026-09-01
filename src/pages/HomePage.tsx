import React from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Heart,
  Cake,
  Croissant,
  Cookie,
  Wheat,
  ShoppingBag,
} from 'lucide-react';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/ProductCard';
import { TrustSection } from '../components/TrustSection';
import { InstagramGrid } from '../components/InstagramGrid';
import { NewsletterSection } from '../components/NewsletterSection';

export const HomePage: React.FC = () => {
  const bestSellers = PRODUCTS.filter((p) => p.isBestseller).slice(0, 8);
  const signatureCake = PRODUCTS.find((p) => p.id === 'signature-chocolate-cake') || PRODUCTS[0];

  const categories = [
    {
      name: 'Signature Cakes',
      subtitle: 'Artisan Celebration Tiers',
      image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80',
      path: '/cakes',
      icon: <Cake className="w-5 h-5" />,
    },
    {
      name: 'French Pastries',
      subtitle: '81-Layer Butter Croissants',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      path: '/pastries',
      icon: <Croissant className="w-5 h-5" />,
    },
    {
      name: 'Artisan Cookies',
      subtitle: 'Brown Butter & Salted Caramel',
      image: 'https://images.unsplash.com/photo-1499636136210-6f4ee915583e?auto=format&fit=crop&w=600&q=80',
      path: '/cookies',
      icon: <Cookie className="w-5 h-5" />,
    },
    {
      name: 'Frosted Cupcakes',
      subtitle: 'Small Cakes. Big Joy.',
      image: 'https://images.unsplash.com/photo-1587668178277-295251f900ce?auto=format&fit=crop&w=600&q=80',
      path: '/cupcakes',
      icon: <Sparkles className="w-5 h-5" />,
    },
    {
      name: 'Hearth Sourdough',
      subtitle: '48-Hour Wild Fermentation',
      image: 'https://images.unsplash.com/photo-1589367920969-ab8e050bbb04?auto=format&fit=crop&w=600&q=80',
      path: '/menu?category=breads',
      icon: <Wheat className="w-5 h-5" />,
    },
    {
      name: 'Vegan & Gluten-Free',
      subtitle: 'Plant-Based & Flourless Treats',
      image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?auto=format&fit=crop&w=600&q=80',
      path: '/menu?category=vegan',
      icon: <ShieldCheck className="w-5 h-5" />,
    },
  ];

  const occasions = [
    {
      title: 'Milestone Birthdays',
      desc: 'Bespoke sculpted tiers & personalized chocolate plaques.',
      image: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=600&q=80',
      link: '/cakes',
    },
    {
      title: 'Weddings & Celebrations',
      desc: 'Botanical fresh floral decorations & multi-tiered luxury cakes.',
      image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=600&q=80',
      link: '/cakes',
    },
    {
      title: 'Corporate Tea & Gatherings',
      desc: 'Assorted mini pastry boxes and gourmet cookie platters.',
      image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
      link: '/menu',
    },
    {
      title: 'Everyday Indulgence',
      desc: 'Morning croissants, sourdough loaves & afternoon tarts.',
      image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=600&q=80',
      link: '/pastries',
    },
  ];

  return (
    <div className="space-y-16 sm:space-y-24">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#F8F1E7] to-[#FFFDF9] py-12 sm:py-20 lg:py-28 border-b border-[#EFE3D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Column: Hero Editorial Typography */}
            <div className="lg:col-span-6 space-y-6 sm:space-y-8 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#A86A4A] bg-[#FFFDF9] px-4 py-2 rounded-full border border-[#EFE3D3] shadow-warm-sm animate-fade-in">
                <Sparkles className="w-3.5 h-3.5 text-[#C9A36A]" />
                <span>FRESHLY BAKED • BEAUTIFULLY CRAFTED</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl xl:text-7xl font-bold text-[#2D211D] leading-[1.08] tracking-tight animate-fade-up">
                Baked with Love.{' '}
                <span className="italic font-display font-normal text-[#A86A4A] block sm:inline">
                  Crafted to Delight.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-[#5A3026]/90 max-w-xl mx-auto lg:mx-0 leading-relaxed font-sans">
                Discover cakes, pastries, and sweet creations made to turn everyday moments into something truly special. Handcrafted daily with French Normandy butter and organic stoneground flours.
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
                <Link
                  to="/menu"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#2D211D] hover:bg-[#1C1411] text-[#FFFDF9] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-md hover:shadow-warm-lg hover:-translate-y-0.5 transition-all"
                >
                  <ShoppingBag className="w-4 h-4 text-[#C9A36A]" />
                  <span>EXPLORE MENU</span>
                </Link>

                <Link
                  to="/cakes"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#FFFDF9] hover:bg-[#F8F1E7] text-[#2D211D] border border-[#EFE3D3] px-8 py-4 rounded-full text-xs font-semibold uppercase tracking-wider shadow-warm-sm transition-all hover:scale-105"
                >
                  <span>ORDER CUSTOM CAKE</span>
                  <ArrowRight className="w-4 h-4 text-[#A86A4A]" />
                </Link>
              </div>

              {/* Trust Indicators */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[#EFE3D3]/80 text-left">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D211D]">4.9★</span>
                  <p className="text-[11px] text-[#7D6A60] font-medium">1,200+ Reviews</p>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D211D]">100%</span>
                  <p className="text-[11px] text-[#7D6A60] font-medium">AOP French Butter</p>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-[#2D211D]">Daily</span>
                  <p className="text-[11px] text-[#7D6A60] font-medium">Sunrise Baking</p>
                </div>
              </div>
            </div>

            {/* Right Column: Hero Visual Showcase */}
            <div className="lg:col-span-6 relative">
              <div className="relative mx-auto max-w-lg lg:max-w-none">
                {/* Main Hero Photograph */}
                <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-warm-xl border-4 border-[#FFFDF9] bg-[#F8F1E7]">
                  <img
                    src="https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=1200&q=85"
                    alt="KOM Bakery Signature Belgian Chocolate Cake"
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Floating Daily Special Card (Top Right) */}
                <div className="absolute -top-4 -right-4 sm:-right-6 bg-[#FFFDF9] p-3.5 sm:p-4 rounded-2xl shadow-warm-lg border border-[#EFE3D3] animate-float max-w-[210px] hidden sm:block">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                    <span className="text-[10px] uppercase font-bold tracking-wider text-[#A86A4A]">
                      Fresh Out of Oven
                    </span>
                  </div>
                  <p className="font-serif font-bold text-xs text-[#2D211D] mt-1">
                    Valrhona 70% Dark Ganache
                  </p>
                  <p className="text-[10px] text-[#7D6A60]">Baked fresh at 4:30 AM</p>
                </div>

                {/* Floating Bestseller Pill (Bottom Left) */}
                <div className="absolute -bottom-4 -left-4 sm:-left-6 bg-[#2D211D] text-[#FFFDF9] p-3 sm:p-3.5 rounded-2xl shadow-warm-lg flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#A86A4A] flex items-center justify-center text-lg">
                    🥐
                  </div>
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-[#C9A36A] font-bold block">
                      Morning Special
                    </span>
                    <span className="font-serif font-bold text-xs text-white">
                      81-Layer Croissants
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. CATEGORY SHOWCASE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#A86A4A]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Discover Our Artisan Kitchen</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D211D]">
            What Are You Craving?
          </h2>
          <p className="text-sm sm:text-base text-[#5A3026]/80">
            Browse our hand-laminated pastries, bespoke celebration cakes, and stoneground hearth breads.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={cat.path}
              className="group relative bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#EFE3D3] shadow-warm-sm hover:shadow-warm-lg hover:-translate-y-1.5 transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-square overflow-hidden bg-[#F8F1E7]">
                <img
                  src={cat.image}
                  alt={cat.name}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2D211D]/80 via-transparent to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="w-7 h-7 rounded-full bg-[#FFFDF9]/20 backdrop-blur-md flex items-center justify-center text-[#C9A36A] mb-1">
                    {cat.icon}
                  </div>
                  <h3 className="font-serif font-bold text-sm text-white leading-tight">
                    {cat.name}
                  </h3>
                </div>
              </div>
              <div className="p-3 bg-[#FFFDF9] flex items-center justify-between text-[11px] text-[#A86A4A] font-semibold border-t border-[#EFE3D3]">
                <span>Explore</span>
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 3. BEST SELLERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#A86A4A]">
              <Award className="w-3.5 h-3.5 text-[#C9A36A]" />
              <span>Customer Favorites</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D211D]">
              The Ones You'll Come Back For
            </h2>
          </div>

          <Link
            to="/best-sellers"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#A86A4A] hover:text-[#2D211D] transition-colors"
          >
            <span>View All Best Sellers</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. SIGNATURE CAKE SPOTLIGHT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#2D211D] text-[#FFFDF9] rounded-3xl overflow-hidden shadow-warm-xl border border-[#5A3026]">
          <div className="grid grid-cols-1 lg:grid-cols-12 items-center">
            <div className="lg:col-span-6 relative aspect-[4/3] lg:aspect-auto lg:h-full overflow-hidden">
              <img
                src={signatureCake.image}
                alt={signatureCake.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-[#A86A4A] text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                Signature Collection
              </div>
            </div>

            <div className="lg:col-span-6 p-8 sm:p-12 lg:p-16 space-y-6">
              <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-[#C9A36A]">
                <Sparkles className="w-3.5 h-3.5" />
                <span>The Signature Collection</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-white leading-tight">
                The Art of the Perfect Cake
              </h2>

              <p className="text-sm sm:text-base text-[#F8F1E7]/80 leading-relaxed font-sans">
                Each cake is crafted with 70% dark Valrhona chocolate, slow-whipped chocolate ganache, and edible 24k gold leaf. Available in customizable 6", 8", 10", and 12" celebration sizes.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
                <Link
                  to={`/product/${signatureCake.slug}`}
                  className="inline-flex items-center justify-center gap-2 bg-[#C9A36A] hover:bg-[#B0884D] text-[#2D211D] font-bold px-8 py-4 rounded-full text-xs uppercase tracking-wider shadow-warm-md transition-all hover:scale-105"
                >
                  <span>Customize This Cake</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link
                  to="/cakes"
                  className="inline-flex items-center justify-center gap-2 text-[#FFFDF9] hover:text-[#C9A36A] text-xs font-semibold uppercase tracking-wider px-6 py-4"
                >
                  <span>Discover All Cakes →</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. OCCASIONS SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10 sm:mb-12 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-bold text-[#A86A4A]">
            <Heart className="w-3.5 h-3.5" />
            <span>Celebrations & Gatherings</span>
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-[#2D211D]">
            Made for Your Moments
          </h2>
          <p className="text-sm sm:text-base text-[#5A3026]/80">
            Whether it's an intimate birthday milestone or a morning gathering with friends, our treats elevate every occasion.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {occasions.map((occ) => (
            <Link
              key={occ.title}
              to={occ.link}
              className="group relative bg-[#FFFDF9] rounded-2xl overflow-hidden border border-[#EFE3D3] shadow-warm-sm hover:shadow-warm-lg transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[#F8F1E7]">
                <img
                  src={occ.image}
                  alt={occ.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-5 flex flex-col flex-1 justify-between gap-3">
                <div>
                  <h3 className="font-serif font-bold text-lg text-[#2D211D] group-hover:text-[#A86A4A] transition-colors">
                    {occ.title}
                  </h3>
                  <p className="text-xs text-[#5A3026]/80 mt-1 leading-relaxed">
                    {occ.desc}
                  </p>
                </div>
                <div className="inline-flex items-center gap-1 text-xs font-bold text-[#A86A4A] pt-2 border-t border-[#EFE3D3]">
                  <span>Explore Options</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 6. WHY KOM BAKERY */}
      <section className="bg-[#F8F1E7] py-16 sm:py-20 border-y border-[#EFE3D3]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <span className="text-xs uppercase font-bold tracking-widest text-[#A86A4A]">
              The KOM Promise
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D211D]">
              Why You'll Love Every Bite
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#EFE3D3] shadow-warm-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center font-serif font-bold text-lg">
                🔥
              </div>
              <h3 className="font-serif font-bold text-base text-[#2D211D]">Freshly Baked</h3>
              <p className="text-xs text-[#5A3026]/80 leading-relaxed">
                Small batches baked continuously starting at 3:30 AM daily for maximum fragrance and crispness.
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#EFE3D3] shadow-warm-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center font-serif font-bold text-lg">
                🧈
              </div>
              <h3 className="font-serif font-bold text-base text-[#2D211D]">Quality Ingredients</h3>
              <p className="text-xs text-[#5A3026]/80 leading-relaxed">
                Pure AOP Normandy butter, organic stoneground grains, and zero artificial shortening or additives.
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#EFE3D3] shadow-warm-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center font-serif font-bold text-lg">
                ✨
              </div>
              <h3 className="font-serif font-bold text-base text-[#2D211D]">Crafted with Care</h3>
              <p className="text-xs text-[#5A3026]/80 leading-relaxed">
                48-hour cold fermentation and traditional French pastry techniques overseen by master bakers.
              </p>
            </div>

            <div className="bg-[#FFFDF9] p-6 rounded-2xl border border-[#EFE3D3] shadow-warm-sm space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#F8F1E7] text-[#A86A4A] flex items-center justify-center font-serif font-bold text-lg">
                🚚
              </div>
              <h3 className="font-serif font-bold text-base text-[#2D211D]">Made for Every Moment</h3>
              <p className="text-xs text-[#5A3026]/80 leading-relaxed">
                Same-day store counter pickup or temperature-controlled direct doorstep delivery.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 7. ORDER PROCESS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
          <span className="text-xs uppercase font-bold tracking-widest text-[#A86A4A]">
            Simple & Seamless
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-[#2D211D]">
            From Our Oven to Your Door
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#2D211D] text-[#C9A36A] flex items-center justify-center font-serif font-bold text-lg mx-auto">
              01
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D211D]">Choose Your Treat</h3>
            <p className="text-xs text-[#5A3026]/80 leading-relaxed">
              Explore our 32-item fresh catalog. Customize size, sponge flavor, and inscription message.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#2D211D] text-[#C9A36A] flex items-center justify-center font-serif font-bold text-lg mx-auto">
              02
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D211D]">Place Your Order</h3>
            <p className="text-xs text-[#5A3026]/80 leading-relaxed">
              Select convenient counter pickup or doorstep delivery with capacity-checked 1-hour time slots.
            </p>
          </div>

          <div className="bg-[#FFFDF9] p-8 rounded-3xl border border-[#EFE3D3] shadow-warm-sm text-center space-y-3 relative">
            <div className="w-12 h-12 rounded-full bg-[#2D211D] text-[#C9A36A] flex items-center justify-center font-serif font-bold text-lg mx-auto">
              03
            </div>
            <h3 className="font-serif font-bold text-lg text-[#2D211D]">Enjoy It Fresh</h3>
            <p className="text-xs text-[#5A3026]/80 leading-relaxed">
              Receive your order packed in our insulated luxury bakery boxes, baked just hours before arrival.
            </p>
          </div>
        </div>
      </section>

      {/* 8. TESTIMONIALS */}
      <TrustSection />

      {/* 9. VISUAL GALLERY */}
      <InstagramGrid />

      {/* 10. NEWSLETTER */}
      <NewsletterSection />
    </div>
  );
};
