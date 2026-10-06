import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { X, Star, ShoppingBag, Heart, ShieldCheck, ArrowRight } from 'lucide-react';

export const QuickViewModal: React.FC = () => {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isInWishlist, navigateTo } = useShop();
  const [selectedImg, setSelectedImg] = useState(0);
  const [selectedSize, setSelectedSize] = useState<string>('');

  if (!quickViewProduct) return null;

  const isFavorited = isInWishlist(quickViewProduct.id);
  const activeSize = selectedSize || quickViewProduct.sizes[0] || 'Standard';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
        onClick={() => setQuickViewProduct(null)}
      />

      {/* Modal Dialog */}
      <div className="relative bg-[#FAF8F5] dark:bg-[#151515] text-[#1E1C1A] dark:text-[#F3EFEA] rounded-2xl max-w-3xl w-full overflow-hidden shadow-2xl border border-[#D4AF37]/30 z-10 animate-in fade-in zoom-in-95 duration-200">
        <button
          onClick={() => setQuickViewProduct(null)}
          className="absolute top-4 right-4 p-2 rounded-full bg-white/80 dark:bg-[#202020] text-[#4A453E] dark:text-[#E8D8B0] hover:text-[#D4AF37] z-20 transition-colors shadow-sm"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Gallery */}
          <div className="p-6 bg-[#F5F1E8] dark:bg-[#1A1A1A] flex flex-col justify-between">
            <div className="relative aspect-square rounded-xl overflow-hidden shadow-inner mb-4">
              <img
                src={quickViewProduct.images[selectedImg] || quickViewProduct.images[0]}
                alt={quickViewProduct.name}
                className="w-full h-full object-cover"
              />
            </div>
            {quickViewProduct.images.length > 1 && (
              <div className="flex gap-2 justify-center">
                {quickViewProduct.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImg(idx)}
                    className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImg === idx ? 'border-[#D4AF37] scale-105' : 'border-transparent opacity-70'
                    }`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right: Info */}
          <div className="p-6 sm:p-8 flex flex-col justify-between overflow-y-auto max-h-[80vh]">
            <div>
              <div className="flex items-center justify-between text-xs text-[#8C8476] dark:text-[#A8A196] uppercase tracking-widest mb-1.5">
                <span>{quickViewProduct.category}</span>
                <span className="text-[#D4AF37] font-semibold">{quickViewProduct.metalPurity}</span>
              </div>

              <h2 className="font-serif text-2xl font-normal mb-2 leading-snug">
                {quickViewProduct.name}
              </h2>

              <div className="flex items-center gap-2 mb-4">
                <div className="flex items-center text-[#D4AF37]">
                  <Star className="w-4 h-4 fill-current" />
                </div>
                <span className="text-sm font-semibold">{quickViewProduct.rating}</span>
                <span className="text-xs text-[#8C8476]">({quickViewProduct.reviewCount} Patron Reviews)</span>
              </div>

              <div className="flex items-baseline gap-3 mb-4">
                <span className="text-2xl font-bold text-[#1E1C1A] dark:text-[#F3EFEA]">
                  ₹{quickViewProduct.price.toLocaleString('en-IN')}
                </span>
                {quickViewProduct.originalPrice > quickViewProduct.price && (
                  <span className="text-sm text-[#8C8476] line-through">
                    ₹{quickViewProduct.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
                {quickViewProduct.discountPercentage > 0 && (
                  <span className="text-xs text-[#E63946] font-semibold uppercase tracking-wider">
                    {quickViewProduct.discountPercentage}% OFF
                  </span>
                )}
              </div>

              <p className="text-xs text-[#6B6358] dark:text-[#B5AFA4] leading-relaxed mb-6">
                {quickViewProduct.description}
              </p>

              {/* Size Selector */}
              {quickViewProduct.sizes.length > 0 && (
                <div className="mb-6">
                  <div className="flex justify-between items-center text-xs mb-2">
                    <span className="font-semibold uppercase tracking-wider">Select Size / Fit</span>
                    <span className="text-[#8C8476] underline cursor-pointer">Size Guide</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {quickViewProduct.sizes.map(size => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-3.5 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                          activeSize === size
                            ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37]'
                            : 'border-[#DDD7CC] dark:border-[#333333] hover:border-[#D4AF37]'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="space-y-3 pt-4 border-t border-[#EAE4D8] dark:border-[#252525]">
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    addToCart(quickViewProduct, 1, activeSize);
                    setQuickViewProduct(null);
                  }}
                  className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart
                </button>
                <button
                  onClick={() => toggleWishlist(quickViewProduct.id)}
                  className={`p-3 rounded-xl border border-[#D4AF37]/40 transition-colors ${
                    isFavorited
                      ? 'bg-red-50 text-red-500'
                      : 'hover:bg-[#EFEAE1] dark:hover:bg-[#202020]'
                  }`}
                  aria-label="Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
              </div>

              <button
                onClick={() => {
                  const id = quickViewProduct.id;
                  setQuickViewProduct(null);
                  navigateTo('product-details', id);
                }}
                className="w-full text-center text-xs text-[#7A7366] dark:text-[#A8A196] hover:text-[#D4AF37] flex items-center justify-center gap-1.5 py-1 transition-colors"
              >
                <span>View Full Product Specifications & Certifications</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
