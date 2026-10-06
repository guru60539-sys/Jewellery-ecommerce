import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Trash2, Plus, Minus, ArrowRight, ShieldCheck, Tag, ShoppingBag, Sparkles } from 'lucide-react';

export const CartPage: React.FC = () => {
  const {
    cart,
    removeFromCart,
    updateCartQuantity,
    cartTotal,
    appliedCoupon,
    applyCoupon,
    removeCoupon,
    navigateTo,
    toggleWishlist
  } = useShop();

  const [couponInput, setCouponInput] = useState('');

  const discountAmount = appliedCoupon
    ? Math.min((cartTotal * appliedCoupon.discountPercentage) / 100, appliedCoupon.maxDiscount)
    : 0;

  const grandTotal = Math.max(0, cartTotal - discountAmount);

  const handleApplyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (couponInput) {
      applyCoupon(couponInput);
      setCouponInput('');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-6">
          <ShoppingBag className="w-10 h-10" />
        </div>
        <h1 className="font-serif text-3xl sm:text-4xl font-light mb-3">Your Shopping Bag is Empty</h1>
        <p className="text-xs text-[#8C8476] max-w-md mx-auto mb-8 leading-relaxed">
          Your luxury collection awaits. Discover timeless solitaire rings, bridal necklaces, and modern everyday diamond bracelets.
        </p>
        <button
          onClick={() => navigateTo('shop')}
          className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] text-xs font-semibold uppercase tracking-widest rounded-xl transition-all shadow-md"
        >
          Explore Haute Jewellery
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="text-center max-w-xl mx-auto mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-1">
          Review Your Selections
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-light">Your Shopping Bag</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map((item, idx) => (
            <div
              key={`${item.product.id}-${item.selectedSize}-${idx}`}
              className="bg-white dark:bg-[#141414] p-5 rounded-2xl border border-[#E8E2D5] dark:border-[#252525] flex flex-col sm:flex-row items-center gap-5 shadow-sm"
            >
              <img
                src={item.product.images[0]}
                alt={item.product.name}
                className="w-24 h-24 rounded-xl object-cover bg-[#F5F2EC] dark:bg-[#1E1E1E] shrink-0"
              />

              <div className="flex-1 min-w-0 text-center sm:text-left">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 mb-1">
                  <h3
                    onClick={() => navigateTo('product-details', item.product.id)}
                    className="font-serif text-lg font-medium hover:text-[#D4AF37] transition-colors cursor-pointer truncate"
                  >
                    {item.product.name}
                  </h3>
                  <span className="font-serif text-base font-semibold text-[#1E1C1A] dark:text-[#E8D8B0]">
                    ₹{(item.product.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>

                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 text-xs text-[#8C8476] mb-3">
                  <span>Size: <strong className="text-[#1E1C1A] dark:text-white">{item.selectedSize}</strong></span>
                  <span>•</span>
                  <span>{item.product.metalPurity}</span>
                  <span>•</span>
                  <span>₹{item.product.price.toLocaleString('en-IN')} each</span>
                </div>

                <div className="flex items-center justify-between">
                  {/* Quantity Controls */}
                  <div className="flex items-center border border-[#DDD7CC] dark:border-[#333333] rounded-lg">
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, -1)}
                      className="p-1.5 hover:bg-[#EFEAE0] dark:hover:bg-[#222222]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="px-3 text-xs font-semibold">{item.quantity}</span>
                    <button
                      onClick={() => updateCartQuantity(item.product.id, item.selectedSize, 1)}
                      className="p-1.5 hover:bg-[#EFEAE0] dark:hover:bg-[#222222]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  {/* Actions: Save for later / Wishlist & Remove */}
                  <div className="flex items-center gap-3 text-xs">
                    <button
                      onClick={() => {
                        toggleWishlist(item.product.id);
                        removeFromCart(item.product.id, item.selectedSize);
                      }}
                      className="text-[#8C8476] hover:text-[#D4AF37] transition-colors underline"
                    >
                      Save for Later
                    </button>
                    <button
                      onClick={() => removeFromCart(item.product.id, item.selectedSize)}
                      className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Complimentary Perks Banner */}
          <div className="p-4 rounded-xl bg-[#F6F2EA] dark:bg-[#181818] border border-[#E8E2D5] dark:border-[#282828] flex items-center gap-3 text-xs text-[#7A7366] dark:text-[#A8A196]">
            <Sparkles className="w-5 h-5 text-[#D4AF37] shrink-0" />
            <span>
              Your order qualifies for complimentary white-glove armoured delivery & velvet gift box packaging.
            </span>
          </div>
        </div>

        {/* Order Summary & Coupon Card */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#141414] p-6 rounded-2xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm space-y-4">
            <h3 className="font-serif text-xl font-medium pb-3 border-b border-[#E8E2D5] dark:border-[#282828]">
              Order Summary
            </h3>

            {/* Subtotal */}
            <div className="flex justify-between text-xs">
              <span className="text-[#8C8476]">Subtotal</span>
              <span className="font-semibold">₹{cartTotal.toLocaleString('en-IN')}</span>
            </div>

            {/* Shipping */}
            <div className="flex justify-between text-xs">
              <span className="text-[#8C8476]">Armoured Express Shipping</span>
              <span className="text-emerald-600 font-semibold uppercase">Complimentary</span>
            </div>

            {/* Promo Discount */}
            {appliedCoupon && (
              <div className="flex justify-between text-xs text-[#D4AF37]">
                <div className="flex items-center gap-1">
                  <Tag className="w-3.5 h-3.5" />
                  <span>Promo ({appliedCoupon.code})</span>
                </div>
                <span>- ₹{discountAmount.toLocaleString('en-IN')}</span>
              </div>
            )}

            <div className="border-t border-[#E8E2D5] dark:border-[#282828] pt-3 flex justify-between items-baseline">
              <div>
                <span className="font-serif text-lg font-semibold block">Grand Total</span>
                <span className="text-[10px] text-[#8C8476]">Inclusive of all 3% GST & Insured Transit</span>
              </div>
              <span className="font-serif text-2xl font-bold text-[#1E1C1A] dark:text-[#FAF8F5]">
                ₹{grandTotal.toLocaleString('en-IN')}
              </span>
            </div>

            {/* Coupon Box */}
            <div className="pt-2">
              {appliedCoupon ? (
                <div className="p-3 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-[#B38F24] dark:text-[#D4AF37] block">
                      Code {appliedCoupon.code} Applied
                    </span>
                    <span className="text-[11px] text-[#8C8476]">{appliedCoupon.description}</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-red-500 underline ml-2"
                  >
                    Remove
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (e.g. AURELIA10)"
                    value={couponInput}
                    onChange={e => setCouponInput(e.target.value)}
                    className="flex-1 px-3 py-2 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-[#1E1C1A] text-white dark:bg-[#FAF8F5] dark:text-[#121110] text-xs font-semibold rounded-xl uppercase tracking-wider"
                  >
                    Apply
                  </button>
                </form>
              )}
            </div>

            {/* Proceed to Checkout CTA */}
            <button
              onClick={() => navigateTo('checkout')}
              className="w-full py-4 rounded-xl bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold text-xs uppercase tracking-widest transition-all duration-300 shadow-md flex items-center justify-center gap-2"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="pt-2 flex items-center justify-center gap-2 text-[11px] text-[#8C8476]">
              <ShieldCheck className="w-4 h-4 text-[#D4AF37]" />
              <span>256-Bit Encrypted Bank Payment Gateway</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
