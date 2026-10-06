import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  RotateCcw,
  ShieldCheck,
  Check,
  Share2,
  ChevronRight,
  ZoomIn,
  MapPin,
  Sparkles
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const {
    products,
    selectedProductId,
    addToCart,
    toggleWishlist,
    isInWishlist,
    navigateTo,
    showToast,
    addRecentlyViewed
  } = useShop();

  const product = products.find(p => p.id === selectedProductId) || products[0];

  useEffect(() => {
    if (product) {
      addRecentlyViewed(product);
    }
  }, [product?.id]);

  // Gallery state
  const [selectedImg, setSelectedImg] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  // Options state
  const [selectedSize, setSelectedSize] = useState<string>(product.sizes[0] || 'Standard');
  const [quantity, setQuantity] = useState(1);

  // Pincode checker state
  const [pincode, setPincode] = useState('');
  const [pincodeStatus, setPincodeStatus] = useState<string | null>(null);

  // Review form state
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [newReviewComment, setNewReviewComment] = useState('');

  const isFavorited = isInWishlist(product.id);

  // Zoom mouse movement
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePos({ x, y });
  };

  const handleCheckPincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (pincode.length === 6 && /^\d+$/.test(pincode)) {
      setPincodeStatus(`Armoured delivery available to ${pincode} by 2 business days`);
    } else {
      setPincodeStatus('Please enter a valid 6-digit Indian PIN code');
    }
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (newReviewAuthor && newReviewComment) {
      product.reviews.unshift({
        id: `rev-${Date.now()}`,
        userName: newReviewAuthor,
        rating: newReviewRating,
        date: new Date().toISOString().split('T')[0],
        comment: newReviewComment,
        verified: true
      });
      product.reviewCount += 1;
      showToast('Thank you! Your verified patron review has been posted.', 'success');
      setNewReviewAuthor('');
      setNewReviewComment('');
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Breadcrumbs */}
      <nav className="flex items-center gap-2 text-xs text-[#8C8476] dark:text-[#9A9386] uppercase tracking-wider mb-8">
        <button onClick={() => navigateTo('home')} className="hover:text-[#D4AF37]">Home</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <button onClick={() => navigateTo('shop')} className="hover:text-[#D4AF37]">Shop</button>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#D4AF37]">{product.category}</span>
        <ChevronRight className="w-3.5 h-3.5" />
        <span className="text-[#1E1C1A] dark:text-[#F3EFEA] truncate max-w-[200px]">{product.name}</span>
      </nav>

      {/* Main Product Info Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 mb-20">
        {/* Left: Interactive Image Gallery with Magnifier Zoom */}
        <div className="space-y-4">
          <div
            className="relative aspect-square rounded-2xl overflow-hidden bg-[#F5F1E8] dark:bg-[#1A1A1A] border border-[#E6E0D5] dark:border-[#282828] cursor-crosshair shadow-md"
            onMouseEnter={() => setIsZoomed(true)}
            onMouseLeave={() => setIsZoomed(false)}
            onMouseMove={handleMouseMove}
          >
            <img
              src={product.images[selectedImg] || product.images[0]}
              alt={product.name}
              className={`w-full h-full object-cover transition-transform duration-200 ${
                isZoomed ? 'scale-150' : 'scale-100'
              }`}
              style={
                isZoomed
                  ? {
                      transformOrigin: `${mousePos.x}% ${mousePos.y}%`,
                    }
                  : undefined
              }
            />

            {!isZoomed && (
              <div className="absolute bottom-4 right-4 bg-white/80 dark:bg-black/70 backdrop-blur-sm text-[10px] uppercase tracking-widest px-3 py-1.5 rounded-full flex items-center gap-1.5 text-[#555] dark:text-[#CCC]">
                <ZoomIn className="w-3.5 h-3.5" /> Hover to Zoom
              </div>
            )}
          </div>

          {/* Thumbnails Carousel */}
          {product.images.length > 1 && (
            <div className="flex gap-3">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImg(idx)}
                  className={`w-20 h-20 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImg === idx ? 'border-[#D4AF37] scale-105 shadow-md' : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Product Specifications, Pricing & Actions */}
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-xs text-[#8C8476] dark:text-[#A8A196] uppercase tracking-widest mb-2">
              <span className="flex items-center gap-1.5 text-[#D4AF37] font-semibold">
                <Sparkles className="w-3.5 h-3.5" /> {product.collection}
              </span>
              <span>SKU: {product.sku}</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl text-[#1E1C1A] dark:text-[#FAF8F5] font-light leading-snug mb-3">
              {product.name}
            </h1>

            {/* Rating & Review Counter */}
            <div className="flex items-center gap-3">
              <div className="flex items-center text-[#D4AF37]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-sm font-semibold">{product.rating}</span>
              <span className="text-xs text-[#8C8476]">
                ({product.reviewCount} Certified Patron Reviews)
              </span>
            </div>
          </div>

          {/* Price & Taxes */}
          <div className="p-4 rounded-xl bg-[#F6F2EA] dark:bg-[#161616] border border-[#E8E2D5] dark:border-[#282828]">
            <div className="flex items-baseline gap-3 mb-1">
              <span className="text-3xl font-serif font-semibold text-[#1E1C1A] dark:text-[#F3EFEA]">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-base text-[#8C8476] line-through">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discountPercentage > 0 && (
                <span className="px-2.5 py-0.5 rounded-sm bg-[#E63946] text-white text-xs font-semibold uppercase tracking-wider">
                  Save {product.discountPercentage}%
                </span>
              )}
            </div>
            <p className="text-[11px] text-[#8C8476]">
              Inclusive of all taxes & BIS Hallmarking charges. Insured delivery included.
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-[#5C5549] dark:text-[#B8B1A4] leading-relaxed">
            {product.description}
          </p>

          {/* Key Attributes Pills */}
          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-lg border border-[#E0D9CD] dark:border-[#262626]">
              <span className="text-[#8C8476] block text-[10px] uppercase tracking-wider">Metal & Purity</span>
              <span className="font-semibold text-[#1E1C1A] dark:text-white">{product.metalPurity}</span>
            </div>
            <div className="p-2.5 rounded-lg border border-[#E0D9CD] dark:border-[#262626]">
              <span className="text-[#8C8476] block text-[10px] uppercase tracking-wider">Approx Weight</span>
              <span className="font-semibold text-[#1E1C1A] dark:text-white">{product.weight}</span>
            </div>
            {product.stoneCarat && (
              <div className="p-2.5 rounded-lg border border-[#E0D9CD] dark:border-[#262626]">
                <span className="text-[#8C8476] block text-[10px] uppercase tracking-wider">Gemstone Details</span>
                <span className="font-semibold text-[#1E1C1A] dark:text-white">{product.stoneCarat}</span>
              </div>
            )}
            <div className="p-2.5 rounded-lg border border-[#E0D9CD] dark:border-[#262626]">
              <span className="text-[#8C8476] block text-[10px] uppercase tracking-wider">Availability</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                In Stock ({product.stockCount} units available)
              </span>
            </div>
          </div>

          {/* Size / Fit Selection */}
          {product.sizes.length > 0 && (
            <div>
              <div className="flex justify-between items-center text-xs mb-2">
                <span className="font-semibold uppercase tracking-wider">Select Size / Fit</span>
                <span className="text-[#8C8476] underline cursor-pointer hover:text-[#D4AF37]">
                  Ring & Bangle Sizing Chart
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map(size => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 rounded-xl text-xs font-medium border transition-all ${
                      selectedSize === size
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] font-semibold shadow-sm'
                        : 'border-[#DDD7CC] dark:border-[#333333] hover:border-[#D4AF37]'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="text-xs uppercase tracking-wider font-semibold">Quantity:</span>
            <div className="flex items-center border border-[#DDD7CC] dark:border-[#333333] rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-1.5 text-sm hover:bg-[#EFEAE0] dark:hover:bg-[#202020]"
              >
                -
              </button>
              <span className="px-4 text-xs font-semibold">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-1.5 text-sm hover:bg-[#EFEAE0] dark:hover:bg-[#202020]"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons: Add to Cart, Buy Now, Wishlist */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              onClick={() => addToCart(product, quantity, selectedSize)}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border-2 border-[#D4AF37] text-[#1E1C1A] dark:text-[#F3EFEA] hover:bg-[#D4AF37] hover:text-[#121110] font-semibold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
            >
              <ShoppingBag className="w-4 h-4" />
              Add to Bag
            </button>

            <button
              onClick={() => {
                addToCart(product, quantity, selectedSize);
                navigateTo('checkout');
              }}
              className="flex-1 py-3.5 px-6 rounded-xl bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              Instant Buy Now
            </button>

            <button
              onClick={() => toggleWishlist(product.id)}
              className={`p-3.5 rounded-xl border border-[#D4AF37]/50 flex items-center justify-center transition-colors ${
                isFavorited ? 'bg-red-50 text-red-500' : 'hover:bg-[#EFEAE0] dark:hover:bg-[#202020]'
              }`}
              aria-label="Wishlist"
            >
              <Heart className={`w-5 h-5 ${isFavorited ? 'fill-current text-red-500' : ''}`} />
            </button>
          </div>

          {/* Pincode & Delivery Checker */}
          <div className="p-4 rounded-xl border border-[#E0D9CD] dark:border-[#282828] bg-white/50 dark:bg-[#121212]/50">
            <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider mb-2">
              <MapPin className="w-4 h-4 text-[#D4AF37]" />
              <span>Check Delivery & Pincode Availability</span>
            </div>
            <form onSubmit={handleCheckPincode} className="flex gap-2">
              <input
                type="text"
                placeholder="Enter 6-digit Pincode (e.g. 400001)"
                value={pincode}
                onChange={e => setPincode(e.target.value)}
                maxLength={6}
                className="flex-1 px-3 py-2 text-xs rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-[#1E1C1A] text-white dark:bg-[#FAF8F5] dark:text-[#121110] text-xs font-semibold rounded-lg uppercase tracking-wider"
              >
                Verify
              </button>
            </form>
            {pincodeStatus && (
              <p className="text-xs text-[#B38F24] dark:text-[#D4AF37] mt-2 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5" /> {pincodeStatus}
              </p>
            )}
          </div>

          {/* Boutique Guarantees list */}
          <div className="pt-4 border-t border-[#E8E2D5] dark:border-[#282828] space-y-2 text-xs text-[#7A7366] dark:text-[#9A9386]">
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>100% Certified by IGI / SGL / BIS Hallmarked</span>
            </p>
            <p className="flex items-center gap-2">
              <Truck className="w-4 h-4 text-[#D4AF37]" />
              <span>Complimentary insured armoured shipping on all domestic orders</span>
            </p>
            <p className="flex items-center gap-2">
              <RotateCcw className="w-4 h-4 text-[#D4AF37]" />
              <span>15-Day hassle-free returns & lifetime exchange privilege</span>
            </p>
          </div>
        </div>
      </div>

      {/* Product Specifications & Certified Attributes Table */}
      <div className="mb-20 bg-white dark:bg-[#141414] rounded-2xl p-6 sm:p-10 border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
        <h2 className="font-serif text-2xl sm:text-3xl font-light mb-6">
          Detailed Specifications & Hallmarking
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {Object.entries(product.specifications).map(([key, val]) => (
            <div
              key={key}
              className="flex justify-between py-3 px-4 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE4D8] dark:border-[#282828] text-xs"
            >
              <span className="text-[#8C8476] font-medium">{key}</span>
              <span className="font-semibold text-[#1E1C1A] dark:text-white text-right">{val}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mb-20 bg-white dark:bg-[#141414] rounded-2xl p-6 sm:p-10 border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8 pb-6 border-b border-[#E8E2D5] dark:border-[#282828]">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-light">
              Patron Reviews ({product.reviews.length})
            </h2>
            <p className="text-xs text-[#8C8476] mt-1">Verified purchases by authenticated clients</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="font-serif text-3xl font-semibold">{product.rating}</span>
            <div className="text-[#D4AF37]">
              <div className="flex">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-[10px] text-[#8C8476] uppercase">Overall Quality Rating</span>
            </div>
          </div>
        </div>

        {/* Existing Reviews */}
        <div className="space-y-6 mb-12">
          {product.reviews.length > 0 ? (
            product.reviews.map(rev => (
              <div
                key={rev.id}
                className="p-5 rounded-xl bg-[#FAF8F5] dark:bg-[#1A1A1A] border border-[#EAE4D8] dark:border-[#282828] space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <span className="font-serif font-semibold text-sm">{rev.userName}</span>
                    {rev.verified && (
                      <span className="px-2 py-0.5 rounded text-[10px] bg-emerald-100 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 font-medium">
                        Verified Patron
                      </span>
                    )}
                  </div>
                  <span className="text-[11px] text-[#8C8476]">{rev.date}</span>
                </div>
                <div className="flex text-[#D4AF37]">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-current" />
                  ))}
                </div>
                <p className="text-xs text-[#524C43] dark:text-[#B0A99E] leading-relaxed">
                  "{rev.comment}"
                </p>
              </div>
            ))
          ) : (
            <p className="text-xs italic text-[#8C8476]">
              Be the first distinguished patron to share your experience with this jewel.
            </p>
          )}
        </div>

        {/* Write a Review Form */}
        <div className="p-6 rounded-xl border border-[#D4AF37]/30 bg-[#FAF8F5] dark:bg-[#181818]">
          <h3 className="font-serif text-lg font-medium mb-3">Add Your Patron Review</h3>
          <form onSubmit={handleAddReview} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                  Your Full Name
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Princess Gayatri Rao"
                  value={newReviewAuthor}
                  onChange={e => setNewReviewAuthor(e.target.value)}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                  Rating (1 to 5 Stars)
                </label>
                <select
                  value={newReviewRating}
                  onChange={e => setNewReviewRating(Number(e.target.value))}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                >
                  <option value={5}>5 Stars - Magnificent</option>
                  <option value={4}>4 Stars - Exquisite</option>
                  <option value={3}>3 Stars - Satisfactory</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                Your Review
              </label>
              <textarea
                required
                rows={3}
                placeholder="Share your thoughts on the craftsmanship, finish, and sparkle..."
                value={newReviewComment}
                onChange={e => setNewReviewComment(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
              />
            </div>

            <button
              type="submit"
              className="px-6 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] text-xs font-semibold uppercase tracking-widest transition-colors shadow-sm"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* Related Products Carousel */}
      {relatedProducts.length > 0 && (
        <div>
          <div className="text-center max-w-xl mx-auto mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-1">
              Harmonious Complements
            </p>
            <h2 className="font-serif text-3xl font-light">Related Creations</h2>
            <div className="w-16 h-[1.5px] bg-[#D4AF37] mx-auto mt-3" />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map(p => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      )}

      {/* Mobile Sticky Add-to-Cart Bar */}
      <div className="lg:hidden fixed bottom-14 left-0 right-0 z-40 bg-white/95 dark:bg-[#121212]/95 backdrop-blur-md p-3 border-t border-[#E8E2D5] dark:border-[#282828] flex items-center justify-between shadow-xl">
        <div>
          <p className="text-[10px] text-[#8C8476] uppercase">Instant Order</p>
          <p className="font-serif text-base font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => addToCart(product, quantity, selectedSize)}
            className="px-4 py-2 bg-[#FAF8F5] dark:bg-[#202020] border border-[#D4AF37] text-xs font-semibold uppercase tracking-wider rounded-lg"
          >
            Add to Bag
          </button>
          <button
            onClick={() => {
              addToCart(product, quantity, selectedSize);
              navigateTo('checkout');
            }}
            className="px-5 py-2 bg-[#D4AF37] text-[#121110] text-xs font-bold uppercase tracking-wider rounded-lg"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
