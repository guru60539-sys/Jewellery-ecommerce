import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Award,
  Gem,
  Truck,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Star,
  Quote
} from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, navigateTo } = useShop();

  const heroSlides = [
    {
      title: "Timeless Elegance, Made for You",
      subtitle: "Haute Joaillerie Handcrafted with Certified Solitaire Diamonds & Pure Hallmarked Gold",
      image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1920&q=85",
      cta1: "Shop Collection",
      cta2: "Explore New Arrivals"
    },
    {
      title: "The Regal Bridal Odyssey",
      subtitle: "Unveiling Heritage Emerald Chokers & Uncut Polki Diamonds for Unforgettable Vows",
      image: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=85",
      cta1: "Bridal Suite",
      cta2: "Book Consultation"
    }
  ];

  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide(prev => (prev + 1) % heroSlides.length);
    }, 7000);
    return () => clearInterval(timer);
  }, [heroSlides.length]);

  const categories = [
    {
      name: 'Rings',
      image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
      description: 'Solitaire & Diamond Bands'
    },
    {
      name: 'Necklaces',
      image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=600&q=80',
      description: 'Chokers, Pendants & Collars'
    },
    {
      name: 'Earrings',
      image: 'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=600&q=80',
      description: 'Cascades, Drops & Solitaire Studs'
    },
    {
      name: 'Bracelets',
      image: 'https://images.unsplash.com/photo-1611591475870-07755b62b146?auto=format&fit=crop&w=600&q=80',
      description: 'Tennis Bracelets & Royal Kadas'
    },
    {
      name: 'Chains',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=600&q=80',
      description: '22K Figaro & Italian Box Weaves'
    },
    {
      name: 'Watches',
      image: 'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=600&q=80',
      description: 'Swiss Calibre Diamond Chronometers'
    }
  ];

  const newArrivals = products.filter(p => p.isNewArrival);
  const bestSellers = products.filter(p => p.isBestSeller);

  // Carousel scroll index for New Arrivals
  const [carouselIndex, setCarouselIndex] = useState(0);

  const instagramImages = [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1611591475870-07755b62b146?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=500&q=80',
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=500&q=80'
  ];

  return (
    <div className="space-y-20 sm:space-y-28">
      {/* 1. Large Luxury Hero Section */}
      <section className="relative h-[85vh] sm:h-[90vh] overflow-hidden bg-black text-white">
        {heroSlides.map((slide, idx) => (
          <div
            key={idx}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              activeSlide === idx ? 'opacity-100 z-10' : 'opacity-0 z-0 pointer-events-none'
            }`}
          >
            {/* Background image with cinematic luxury darkening */}
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover object-center transform scale-105 transition-transform duration-10000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/30 dark:from-black/90 dark:via-black/70" />

            {/* Hero Content */}
            <div className="absolute inset-0 flex items-center">
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="max-w-2xl space-y-6">
                  <div className="flex items-center gap-2">
                    <span className="w-8 h-[1px] bg-[#D4AF37]" />
                    <span className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold">
                      Haute Joaillerie Paris • Jaipur
                    </span>
                  </div>

                  <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-light tracking-wide leading-[1.1] text-[#FAF8F5]">
                    {slide.title}
                  </h1>

                  <p className="text-sm sm:text-base text-[#DCD6CA] font-light leading-relaxed max-w-lg">
                    {slide.subtitle}
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-4">
                    <button
                      onClick={() => navigateTo('shop')}
                      className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] text-xs font-semibold uppercase tracking-[0.2em] rounded-sm transition-all duration-300 shadow-xl hover:shadow-[#D4AF37]/20 hover:-translate-y-0.5"
                    >
                      {slide.cta1}
                    </button>
                    <button
                      onClick={() => navigateTo('shop')}
                      className="px-8 py-3.5 bg-transparent border border-white/40 hover:border-[#D4AF37] hover:text-[#D4AF37] text-white text-xs font-medium uppercase tracking-[0.2em] rounded-sm transition-all duration-300 backdrop-blur-sm"
                    >
                      {slide.cta2}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Slide navigation indicators */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActiveSlide(idx)}
              className={`h-1.5 transition-all duration-300 rounded-full ${
                activeSlide === idx ? 'w-8 bg-[#D4AF37]' : 'w-2 bg-white/40'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </section>

      {/* 2. Featured Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            Curated Expressions
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] dark:text-[#FAF8F5]">
            Featured Categories
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map(cat => (
            <div
              key={cat.name}
              onClick={() => navigateTo('shop')}
              className="group cursor-pointer flex flex-col items-center"
            >
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#EFEAE0] dark:bg-[#1E1E1E] border border-[#E2DBD0] dark:border-[#2C2C2C] mb-3 transition-transform duration-500 group-hover:scale-105 shadow-sm">
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/30 transition-colors" />
              </div>
              <h3 className="font-serif text-lg font-medium text-[#1E1C1A] dark:text-[#FAF8F5] group-hover:text-[#D4AF37] transition-colors">
                {cat.name}
              </h3>
              <p className="text-[11px] text-[#8C8476] dark:text-[#9A9386] text-center line-clamp-1">
                {cat.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 3. New Arrivals Carousel */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between mb-10 gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-1">
              Fresh From Our Ateliers
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] dark:text-[#FAF8F5]">
              New Arrivals
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setCarouselIndex(Math.max(0, carouselIndex - 1))}
              disabled={carouselIndex === 0}
              className="p-2.5 rounded-full border border-[#D4AF37]/50 disabled:opacity-30 hover:bg-[#D4AF37] hover:text-[#121110] transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={() => setCarouselIndex(Math.min(newArrivals.length - 4, carouselIndex + 1))}
              disabled={carouselIndex >= Math.max(0, newArrivals.length - 4)}
              className="p-2.5 rounded-full border border-[#D4AF37]/50 disabled:opacity-30 hover:bg-[#D4AF37] hover:text-[#121110] transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
            <button
              onClick={() => navigateTo('shop')}
              className="ml-2 text-xs font-semibold uppercase tracking-widest text-[#D4AF37] hover:underline flex items-center gap-1"
            >
              <span>View All</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {newArrivals.slice(carouselIndex, carouselIndex + 4).map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. Promotional Luxury Banner: "Celebrate Every Moment" */}
      <section className="relative overflow-hidden py-24 sm:py-32 bg-[#121110] text-white">
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1920&q=80"
            alt="Promotional Jewellery Banner"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent" />
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl space-y-6">
            <span className="px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-widest bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/40">
              Limited Festive Privé
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl md:text-6xl font-light text-[#FAF8F5] leading-tight">
              Celebrate Every Moment
            </h2>
            <p className="text-sm sm:text-base text-[#D4CEC2] font-light leading-relaxed">
              Every milestone is worth immortalizing. Enjoy an exclusive 20% privilege value on all master crafted bridal and solitaire sets with code <strong className="text-[#D4AF37]">ROYAL20</strong>.
            </p>
            <div className="pt-2 flex items-center gap-4">
              <button
                onClick={() => navigateTo('shop')}
                className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] text-xs font-semibold uppercase tracking-widest rounded-sm transition-all shadow-lg"
              >
                Claim Exclusive Offer
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Best Sellers Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            Most Adored By Patrons
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] dark:text-[#FAF8F5]">
            Best Sellers
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. Jewellery Collections Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            Themed Masterpieces
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] dark:text-[#FAF8F5]">
            Signature Collections
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            onClick={() => navigateTo('shop')}
            className="group cursor-pointer relative h-96 rounded-2xl overflow-hidden border border-[#E2DBD0] dark:border-[#2C2C2C] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80"
              alt="Bridal Royalty"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] mb-1">Couture</span>
              <h3 className="font-serif text-2xl font-light mb-2">Bridal Royalty</h3>
              <p className="text-xs text-[#D8D2C5] line-clamp-2 mb-4">
                Grand chokers, uncut Polki diamonds, and heritage Zambian emeralds.
              </p>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#D4AF37] flex items-center gap-1">
                Discover Collection <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div
            onClick={() => navigateTo('shop')}
            className="group cursor-pointer relative h-96 rounded-2xl overflow-hidden border border-[#E2DBD0] dark:border-[#2C2C2C] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=800&q=80"
              alt="Solitaire Luxe"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] mb-1">Eternity</span>
              <h3 className="font-serif text-2xl font-light mb-2">Solitaire Luxe</h3>
              <p className="text-xs text-[#D8D2C5] line-clamp-2 mb-4">
                Triple-excellent certified brilliant diamonds set in pristine 18K yellow gold and platinum.
              </p>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#D4AF37] flex items-center gap-1">
                Discover Collection <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>

          <div
            onClick={() => navigateTo('shop')}
            className="group cursor-pointer relative h-96 rounded-2xl overflow-hidden border border-[#E2DBD0] dark:border-[#2C2C2C] shadow-md"
          >
            <img
              src="https://images.unsplash.com/photo-1611591475870-07755b62b146?auto=format&fit=crop&w=800&q=80"
              alt="Modern Minimal"
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent flex flex-col justify-end p-8 text-white">
              <span className="text-xs uppercase tracking-widest text-[#D4AF37] mb-1">Prêt-à-Porter</span>
              <h3 className="font-serif text-2xl font-light mb-2">Modern Minimal</h3>
              <p className="text-xs text-[#D8D2C5] line-clamp-2 mb-4">
                Sleek tennis bracelets and architectural diamond studs for refined daily wear.
              </p>
              <span className="text-xs font-semibold tracking-wider uppercase text-[#D4AF37] flex items-center gap-1">
                Discover Collection <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 7. Why Choose Us */}
      <section className="bg-[#F6F2EA] dark:bg-[#141414] py-16 sm:py-20 border-y border-[#E8E2D5] dark:border-[#252525]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
              The Aurelia Standard
            </p>
            <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] dark:text-[#FAF8F5]">
              Why Patrons Trust Us
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="bg-white dark:bg-[#1C1C1C] p-6 rounded-2xl border border-[#E6E0D5] dark:border-[#2A2A2A] text-center shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] flex items-center justify-center mb-4">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">Certified Quality</h3>
              <p className="text-xs text-[#7A7366] dark:text-[#9E978B] leading-relaxed">
                Every diamond is authenticated by IGI or SGL, and every gram of gold is 100% BIS Hallmarked.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1C1C1C] p-6 rounded-2xl border border-[#E6E0D5] dark:border-[#2A2A2A] text-center shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] flex items-center justify-center mb-4">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">Secure Payments</h3>
              <p className="text-xs text-[#7A7366] dark:text-[#9E978B] leading-relaxed">
                Bank-grade 256-bit SSL encryption. We accept UPI, EMI, All Major Credit Cards & Net Banking.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1C1C1C] p-6 rounded-2xl border border-[#E6E0D5] dark:border-[#2A2A2A] text-center shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">Insured Delivery</h3>
              <p className="text-xs text-[#7A7366] dark:text-[#9E978B] leading-relaxed">
                Complimentary tamper-proof armoured courier with 100% full transit insurance to your doorstep.
              </p>
            </div>

            <div className="bg-white dark:bg-[#1C1C1C] p-6 rounded-2xl border border-[#E6E0D5] dark:border-[#2A2A2A] text-center shadow-sm">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] flex items-center justify-center mb-4">
                <RotateCcw className="w-6 h-6" />
              </div>
              <h3 className="font-serif text-xl font-medium mb-2">15-Day Easy Returns</h3>
              <p className="text-xs text-[#7A7366] dark:text-[#9E978B] leading-relaxed">
                Hassle-free 15-day return policy and lifelong exchange value on gold and natural diamonds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            Stories of Radiance
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] dark:text-[#FAF8F5]">
            What Our Patrons Say
          </h2>
          <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-4" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white dark:bg-[#161616] p-8 rounded-2xl border border-[#E8E2D5] dark:border-[#242424] shadow-sm relative">
            <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-6 right-6" />
            <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#524C43] dark:text-[#B0A99E] leading-relaxed italic mb-6">
              "The Celestia Solitaire ring exceeded every expectation. The clarity certificate matches the laser engraving under 10x loupe. An unforgettable engagement."
            </p>
            <div>
              <h4 className="font-serif text-base font-semibold">Princess Radhika Dev</h4>
              <p className="text-[11px] text-[#8C8476]">Mumbai • Verified Collector</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#161616] p-8 rounded-2xl border border-[#E8E2D5] dark:border-[#242424] shadow-sm relative">
            <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-6 right-6" />
            <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#524C43] dark:text-[#B0A99E] leading-relaxed italic mb-6">
              "The Empress Royal Choker was the centerpiece of my wedding day. Guests could not stop praising the lustre of the Zambian emeralds. Exceptional service."
            </p>
            <div>
              <h4 className="font-serif text-base font-semibold">Ananya Singhania</h4>
              <p className="text-[11px] text-[#8C8476]">New Delhi • Bridal Patron</p>
            </div>
          </div>

          <div className="bg-white dark:bg-[#161616] p-8 rounded-2xl border border-[#E8E2D5] dark:border-[#242424] shadow-sm relative">
            <Quote className="w-8 h-8 text-[#D4AF37]/20 absolute top-6 right-6" />
            <div className="flex items-center gap-1 text-[#D4AF37] mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-current" />
              ))}
            </div>
            <p className="text-xs text-[#524C43] dark:text-[#B0A99E] leading-relaxed italic mb-6">
              "Ordered the Eternity Tennis Bracelet online with express delivery. Came in a velvet presentation box with sealed seals and armoured courier. Supreme trust."
            </p>
            <div>
              <h4 className="font-serif text-base font-semibold">Karanveer Oberoi</h4>
              <p className="text-[11px] text-[#8C8476]">Bengaluru • Fine Watch Patron</p>
            </div>
          </div>
        </div>
      </section>

      {/* 9. Instagram Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-xl mx-auto mb-10">
          <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
            #AureliaMoments
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] dark:text-[#FAF8F5]">
            Follow The Atelier
          </h2>
          <p className="text-xs text-[#8C8476] mt-2">Tag @AureliaJewels to be featured in our seasonal lookbook</p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {instagramImages.map((img, idx) => (
            <div
              key={idx}
              className="relative aspect-square rounded-xl overflow-hidden group cursor-pointer"
            >
              <img
                src={img}
                alt="Instagram jewellery shot"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                <Sparkles className="w-6 h-6 text-[#D4AF37]" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
