import React, { useState } from 'react';
import { Product } from '../types';
import { useShop } from '../context/ShopContext';
import { Heart, Eye, ShoppingBag, Star, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { navigateTo, addToCart, toggleWishlist, isInWishlist, setQuickViewProduct } = useShop();
  const [currentImgIndex, setCurrentImgIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const isFavorited = isInWishlist(product.id);

  return (
    <div
      className="group relative flex flex-col bg-[#FFFFFF] dark:bg-[#141414] border border-[#EBE6DC] dark:border-[#242424] rounded-xl overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onMouseEnter={() => {
        setIsHovered(true);
        if (product.images.length > 1) setCurrentImgIndex(1);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setCurrentImgIndex(0);
      }}
    >
      {/* Product Image Area */}
      <div className="relative aspect-square w-full overflow-hidden bg-[#F5F2EC] dark:bg-[#1C1C1C]">
        <img
          src={product.images[currentImgIndex] || product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges: New Arrival / Best Seller / Discount */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-10">
          {product.isNewArrival && (
            <span className="bg-[#151413] text-[#FAF8F5] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm shadow-sm">
              New Arrival
            </span>
          )}
          {product.isBestSeller && (
            <span className="bg-[#D4AF37] text-[#121110] text-[10px] uppercase tracking-widest font-semibold px-2.5 py-1 rounded-sm shadow-sm flex items-center gap-1">
              <Sparkles className="w-3 h-3" /> Best Seller
            </span>
          )}
          {product.discountPercentage > 0 && (
            <span className="bg-[#E63946] text-white text-[10px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-sm shadow-sm">
              {product.discountPercentage}% OFF
            </span>
          )}
        </div>

        {/* Wishlist Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-200 z-10 ${
            isFavorited
              ? 'bg-red-50 text-red-600 shadow-md'
              : 'bg-white/80 dark:bg-black/60 text-[#4A453E] dark:text-[#E8D8B0] hover:text-red-500 hover:scale-110 shadow-sm backdrop-blur-sm'
          }`}
          aria-label="Save to Wishlist"
        >
          <Heart className={`w-4 h-4 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
        </button>

        {/* Quick View Button on Hover */}
        <div className="absolute inset-x-0 bottom-3 flex justify-center px-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="w-full py-2 bg-white/95 dark:bg-[#1A1A1A]/95 text-[#1E1C1A] dark:text-[#F3EFEA] border border-[#D4AF37]/50 rounded-lg text-xs font-medium tracking-wider uppercase backdrop-blur-sm shadow-lg hover:bg-[#D4AF37] hover:text-[#121110] transition-all flex items-center justify-center gap-2"
          >
            <Eye className="w-4 h-4" />
            Quick View
          </button>
        </div>
      </div>

      {/* Details Area */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between">
        <div>
          <div className="flex items-center justify-between text-[11px] text-[#8C8476] dark:text-[#A8A196] uppercase tracking-wider mb-1">
            <span>{product.category}</span>
            <span className="text-[#D4AF37] font-medium">{product.metalPurity}</span>
          </div>

          <h3
            onClick={() => navigateTo('product-details', product.id)}
            className="font-serif text-base sm:text-lg font-medium text-[#1E1C1A] dark:text-[#F3EFEA] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] transition-colors cursor-pointer line-clamp-1 mb-1.5"
            title={product.name}
          >
            {product.name}
          </h3>

          {/* Rating */}
          <div className="flex items-center gap-1.5 mb-2.5">
            <div className="flex items-center text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-semibold text-[#1E1C1A] dark:text-[#FAF8F5]">
              {product.rating}
            </span>
            <span className="text-[11px] text-[#8C8476] dark:text-[#9A9386]">
              ({product.reviewCount} reviews)
            </span>
          </div>
        </div>

        <div>
          {/* Price */}
          <div className="flex items-baseline gap-2 mb-3.5">
            <span className="text-base sm:text-lg font-semibold text-[#1E1C1A] dark:text-[#F3EFEA]">
              ₹{product.price.toLocaleString('en-IN')}
            </span>
            {product.originalPrice > product.price && (
              <span className="text-xs text-[#8C8476] dark:text-[#888888] line-through">
                ₹{product.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          {/* Action button */}
          <button
            onClick={() => addToCart(product, 1)}
            className="w-full py-2.5 px-4 rounded-lg bg-[#FAF8F5] dark:bg-[#1E1E1E] border border-[#D4AF37]/40 hover:bg-[#D4AF37] hover:border-[#D4AF37] hover:text-[#121110] text-[#1E1C1A] dark:text-[#FAF8F5] text-xs font-semibold uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            Add to Bag
          </button>
        </div>
      </div>
    </div>
  );
};
