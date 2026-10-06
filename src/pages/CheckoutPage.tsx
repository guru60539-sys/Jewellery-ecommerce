import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Address, Order } from '../types';
import { CheckCircle2, ShieldCheck, CreditCard, Smartphone, Building, Truck, Sparkles, ChevronRight, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CheckoutPage: React.FC = () => {
  const { cart, cartTotal, appliedCoupon, placeOrder, navigateTo, currentUser } = useShop();

  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4 | 5 | 6>(1);

  // Step 1: Customer Type
  const [checkoutMode, setCheckoutMode] = useState<'guest' | 'login'>('login');
  const [guestEmail, setGuestEmail] = useState('');

  // Step 2: Shipping Address
  const [shippingAddress, setShippingAddress] = useState<Address>(
    currentUser?.addresses[0] || {
      id: 'addr-new',
      fullName: 'Mira Rajput',
      phone: '+91 98765 43210',
      street: 'Penthouse 4B, The Oberoi Sky Heights, Worli Sea Face',
      city: 'Mumbai',
      state: 'Maharashtra',
      pincode: '400018',
      isDefault: true
    }
  );

  // Step 3: Delivery Method
  const [deliveryMethod, setDeliveryMethod] = useState<string>('Armoured Insured Express (2 Days)');

  // Step 4: Payment Method
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery'>('UPI');
  const [upiId, setUpiId] = useState('patron@okhdfcbank');
  const [cardNumber, setCardNumber] = useState('•••• •••• •••• 4242');

  // Step 5 & 6: Order Placed State
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const discountAmount = appliedCoupon
    ? Math.min((cartTotal * appliedCoupon.discountPercentage) / 100, appliedCoupon.maxDiscount)
    : 0;

  const grandTotal = Math.max(0, cartTotal - discountAmount);

  const handleCompleteOrder = () => {
    const newOrder = placeOrder({
      status: 'Processing',
      items: cart.map(item => ({
        productId: item.product.id,
        productName: item.product.name,
        productImage: item.product.images[0],
        price: item.product.price,
        quantity: item.quantity,
        selectedSize: item.selectedSize
      })),
      shippingAddress,
      deliveryMethod,
      paymentMethod,
      paymentStatus: 'Paid',
      subtotal: cartTotal,
      discount: discountAmount,
      shipping: 0,
      grandTotal,
      trackingNumber: `AUR-SEC-${Math.floor(100000 + Math.random() * 900000)}`,
      estimatedDelivery: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
    });

    setConfirmedOrder(newOrder);
    setCurrentStep(6);

    // Trigger celebration confetti
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#D4AF37', '#FAF8F5', '#121110']
      });
    } catch (e) {
      // safe fallback
    }
  };

  const steps = [
    { num: 1, label: 'Patron' },
    { num: 2, label: 'Address' },
    { num: 3, label: 'Delivery' },
    { num: 4, label: 'Payment' },
    { num: 5, label: 'Review' },
    { num: 6, label: 'Confirmed' }
  ];

  if (cart.length === 0 && currentStep !== 6) {
    return (
      <div className="max-w-2xl mx-auto py-20 px-4 text-center">
        <h2 className="font-serif text-3xl font-light mb-4">No items to checkout</h2>
        <button
          onClick={() => navigateTo('shop')}
          className="px-6 py-3 bg-[#D4AF37] text-[#121110] font-semibold text-xs uppercase tracking-wider rounded-xl"
        >
          Return to Boutique
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Progress Steps Header */}
      <div className="mb-12">
        <div className="flex items-center justify-between max-w-2xl mx-auto">
          {steps.map((s, idx) => (
            <React.Fragment key={s.num}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-semibold transition-all ${
                    currentStep === s.num
                      ? 'bg-[#D4AF37] text-[#121110] ring-4 ring-[#D4AF37]/20 shadow-md'
                      : currentStep > s.num
                      ? 'bg-[#1E1C1A] text-white dark:bg-white dark:text-[#121110]'
                      : 'bg-[#EAE4D8] dark:bg-[#252525] text-[#8C8476]'
                  }`}
                >
                  {currentStep > s.num ? <Check className="w-4 h-4" /> : s.num}
                </div>
                <span className="text-[11px] font-medium tracking-wider uppercase mt-2 hidden sm:block text-[#6B6358] dark:text-[#A8A196]">
                  {s.label}
                </span>
              </div>
              {idx < steps.length - 1 && (
                <div
                  className={`flex-1 h-[2px] mx-2 transition-colors ${
                    currentStep > idx + 1 ? 'bg-[#D4AF37]' : 'bg-[#E0D9CD] dark:border-[#2C2C2C]'
                  }`}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>

      {/* Step Contents */}
      <div className="bg-white dark:bg-[#141414] rounded-2xl border border-[#E8E2D5] dark:border-[#252525] p-6 sm:p-10 shadow-sm">
        {/* Step 1: Login / Guest */}
        {currentStep === 1 && (
          <div className="max-w-md mx-auto space-y-6">
            <h2 className="font-serif text-2xl font-light text-center">1. Patron Verification</h2>
            <div className="flex rounded-xl p-1 bg-[#F5F1E8] dark:bg-[#1E1E1E]">
              <button
                onClick={() => setCheckoutMode('login')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors ${
                  checkoutMode === 'login'
                    ? 'bg-white dark:bg-[#2A2A2A] text-[#1E1C1A] dark:text-white shadow-sm'
                    : 'text-[#8C8476]'
                }`}
              >
                Privileged Patron
              </button>
              <button
                onClick={() => setCheckoutMode('guest')}
                className={`flex-1 py-2 text-xs font-semibold rounded-lg uppercase tracking-wider transition-colors ${
                  checkoutMode === 'guest'
                    ? 'bg-white dark:bg-[#2A2A2A] text-[#1E1C1A] dark:text-white shadow-sm'
                    : 'text-[#8C8476]'
                }`}
              >
                Guest Checkout
              </button>
            </div>

            {checkoutMode === 'login' ? (
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF8F5] dark:bg-[#181818] space-y-3">
                <p className="text-xs text-[#6B6358] dark:text-[#A8A196]">Signed in as:</p>
                <p className="font-semibold text-sm">{currentUser?.name || 'Mira Rajput'}</p>
                <p className="text-xs text-[#8C8476]">{currentUser?.email || 'mira.rajput@luxury.com'}</p>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full mt-4 py-3 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
                >
                  Continue to Address
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                    Email for Armoured Tracking
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="patron@domain.com"
                    value={guestEmail}
                    onChange={e => setGuestEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#DDD7CC] dark:border-[#333333] text-xs bg-transparent focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  onClick={() => setCurrentStep(2)}
                  className="w-full py-3 bg-[#D4AF37] text-[#121110] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
                >
                  Continue as Guest
                </button>
              </div>
            )}
          </div>
        )}

        {/* Step 2: Shipping Address */}
        {currentStep === 2 && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="font-serif text-2xl font-light text-center">2. Insured Shipping Address</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                  Recipient Full Name
                </label>
                <input
                  type="text"
                  value={shippingAddress.fullName}
                  onChange={e => setShippingAddress({ ...shippingAddress, fullName: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                  Contact Mobile Number
                </label>
                <input
                  type="text"
                  value={shippingAddress.phone}
                  onChange={e => setShippingAddress({ ...shippingAddress, phone: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                  Delivery Address / Residence
                </label>
                <input
                  type="text"
                  value={shippingAddress.street}
                  onChange={e => setShippingAddress({ ...shippingAddress, street: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={shippingAddress.city}
                  onChange={e => setShippingAddress({ ...shippingAddress, city: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                  State
                </label>
                <input
                  type="text"
                  value={shippingAddress.state}
                  onChange={e => setShippingAddress({ ...shippingAddress, state: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase tracking-wider text-[#8C8476] mb-1">
                  Pincode
                </label>
                <input
                  type="text"
                  value={shippingAddress.pincode}
                  onChange={e => setShippingAddress({ ...shippingAddress, pincode: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-xl border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setCurrentStep(1)}
                className="px-6 py-3 rounded-xl border border-[#DDD7CC] text-xs font-semibold uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(3)}
                className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
              >
                Continue to Delivery Option
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Delivery Method */}
        {currentStep === 3 && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="font-serif text-2xl font-light text-center">3. Delivery Method</h2>

            <div className="space-y-3">
              {[
                {
                  id: 'Armoured Insured Express (2 Days)',
                  name: 'White-Glove Armoured Express',
                  time: 'Delivered in 2 business days',
                  price: 'Complimentary'
                },
                {
                  id: 'Same-Day Atelier Hand Delivery (Mumbai & Delhi NCR)',
                  name: 'Same-Day Atelier Hand Courier',
                  time: 'Delivered today by 8:00 PM with armed escort',
                  price: '₹1,500'
                }
              ].map(opt => (
                <div
                  key={opt.id}
                  onClick={() => setDeliveryMethod(opt.id)}
                  className={`p-4 rounded-xl border cursor-pointer transition-all flex items-center justify-between ${
                    deliveryMethod === opt.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/10'
                      : 'border-[#DDD7CC] dark:border-[#333333]'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Truck className="w-5 h-5 text-[#D4AF37]" />
                    <div>
                      <p className="font-semibold text-xs">{opt.name}</p>
                      <p className="text-[11px] text-[#8C8476]">{opt.time}</p>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-[#D4AF37]">{opt.price}</span>
                </div>
              ))}
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setCurrentStep(2)}
                className="px-6 py-3 rounded-xl border border-[#DDD7CC] text-xs font-semibold uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
              >
                Continue to Payment
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Payment */}
        {currentStep === 4 && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="font-serif text-2xl font-light text-center">4. Secure Luxury Payment</h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              {[
                { id: 'UPI', label: 'UPI', icon: Smartphone },
                { id: 'Credit/Debit Card', label: 'Cards', icon: CreditCard },
                { id: 'Net Banking', label: 'Net Banking', icon: Building },
                { id: 'Cash on Delivery', label: 'COD', icon: ShieldCheck }
              ].map(method => {
                const Icon = method.icon;
                return (
                  <button
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id as any)}
                    className={`p-3 rounded-xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                      paymentMethod === method.id
                        ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] font-semibold'
                        : 'border-[#DDD7CC] dark:border-[#333333]'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-xs">{method.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Payment Method Details */}
            {paymentMethod === 'UPI' && (
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF8F5] dark:bg-[#181818] space-y-3">
                <label className="block text-xs uppercase tracking-wider text-[#8C8476]">
                  Enter UPI ID / VPA
                </label>
                <input
                  type="text"
                  value={upiId}
                  onChange={e => setUpiId(e.target.value)}
                  placeholder="username@okhdfcbank"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
                <p className="text-[11px] text-[#8C8476]">Instant approval via Google Pay, PhonePe, Paytm or BHIM</p>
              </div>
            )}

            {paymentMethod === 'Credit/Debit Card' && (
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF8F5] dark:bg-[#181818] space-y-3">
                <label className="block text-xs uppercase tracking-wider text-[#8C8476]">
                  Card Details (Visa, Mastercard, Amex)
                </label>
                <input
                  type="text"
                  value={cardNumber}
                  onChange={e => setCardNumber(e.target.value)}
                  placeholder="16 Digit Card Number"
                  className="w-full px-3 py-2 text-xs rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                />
                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    defaultValue="12/28"
                    className="px-3 py-2 text-xs rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                  <input
                    type="password"
                    placeholder="CVV"
                    defaultValue="982"
                    maxLength={4}
                    className="px-3 py-2 text-xs rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                </div>
              </div>
            )}

            {paymentMethod === 'Cash on Delivery' && (
              <div className="p-4 rounded-xl border border-[#D4AF37]/30 bg-[#FAF8F5] dark:bg-[#181818]">
                <p className="text-xs text-[#524C43] dark:text-[#B0A99E]">
                  Available for orders up to ₹50,000. OTP verification will be conducted upon delivery by our armoured agent.
                </p>
              </div>
            )}

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setCurrentStep(3)}
                className="px-6 py-3 rounded-xl border border-[#DDD7CC] text-xs font-semibold uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="flex-1 py-3 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
              >
                Review Order & Pay ₹{grandTotal.toLocaleString('en-IN')}
              </button>
            </div>
          </div>
        )}

        {/* Step 5: Order Review */}
        {currentStep === 5 && (
          <div className="max-w-xl mx-auto space-y-6">
            <h2 className="font-serif text-2xl font-light text-center">5. Review & Authenticate Order</h2>

            <div className="p-4 rounded-xl border border-[#E8E2D5] dark:border-[#282828] space-y-3">
              <h4 className="font-semibold text-xs uppercase tracking-wider text-[#D4AF37]">
                Selected Jewels ({cart.length})
              </h4>
              <div className="divide-y divide-[#EAE4D8] dark:divide-[#252525]">
                {cart.map(item => (
                  <div key={item.product.id} className="py-2 flex justify-between items-center text-xs">
                    <div>
                      <p className="font-serif font-medium">{item.product.name} (x{item.quantity})</p>
                      <p className="text-[11px] text-[#8C8476]">Fit: {item.selectedSize}</p>
                    </div>
                    <span className="font-semibold">₹{(item.product.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="p-4 rounded-xl border border-[#E8E2D5] dark:border-[#282828] text-xs space-y-2">
              <div className="flex justify-between">
                <span className="text-[#8C8476]">Delivery Destination:</span>
                <span className="font-medium">{shippingAddress.street}, {shippingAddress.city} - {shippingAddress.pincode}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8476]">Payment Choice:</span>
                <span className="font-medium">{paymentMethod}</span>
              </div>
              <div className="flex justify-between text-sm font-serif font-semibold pt-2 border-t border-[#EAE4D8] dark:border-[#252525]">
                <span>Total Amount:</span>
                <span className="text-[#D4AF37]">₹{grandTotal.toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4">
              <button
                onClick={() => setCurrentStep(4)}
                className="px-6 py-3 rounded-xl border border-[#DDD7CC] text-xs font-semibold uppercase tracking-wider"
              >
                Back
              </button>
              <button
                onClick={handleCompleteOrder}
                className="flex-1 py-4 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-xl flex items-center justify-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                Authorize & Place Order
              </button>
            </div>
          </div>
        )}

        {/* Step 6: Order Confirmation */}
        {currentStep === 6 && confirmedOrder && (
          <div className="max-w-xl mx-auto text-center space-y-6 py-6">
            <div className="w-20 h-20 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-lg">
              <CheckCircle2 className="w-12 h-12" />
            </div>

            <h2 className="font-serif text-3xl sm:text-4xl font-light">Order Authenticated & Confirmed</h2>
            <p className="text-xs text-[#7A7366] dark:text-[#A8A196] leading-relaxed max-w-md mx-auto">
              Your bespoke jewellery piece is now being prepared in our private atelier vault. An insured armoured courier will be dispatched with your IGI certificates.
            </p>

            <div className="p-6 rounded-2xl bg-[#FAF8F5] dark:bg-[#181818] border border-[#D4AF37]/30 text-left text-xs space-y-3">
              <div className="flex justify-between pb-2 border-b border-[#EAE4D8] dark:border-[#252525]">
                <span className="text-[#8C8476]">Order Reference:</span>
                <span className="font-serif font-semibold text-sm text-[#D4AF37]">{confirmedOrder.id}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8476]">Armoured Tracking:</span>
                <span className="font-mono">{confirmedOrder.trackingNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8476]">Estimated Delivery:</span>
                <span>{confirmedOrder.estimatedDelivery}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#8C8476]">Payment Mode:</span>
                <span>{confirmedOrder.paymentMethod} (Verified)</span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-[#EAE4D8] dark:border-[#252525]">
                <span>Total Settled:</span>
                <span className="text-[#1E1C1A] dark:text-white font-serif text-sm">
                  ₹{confirmedOrder.grandTotal.toLocaleString('en-IN')}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 justify-center pt-4">
              <button
                onClick={() => navigateTo('account')}
                className="px-6 py-3 bg-[#D4AF37] text-[#121110] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#B38F24] transition-colors"
              >
                Track Order in Account
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="px-6 py-3 border border-[#DDD7CC] dark:border-[#333333] text-xs font-semibold uppercase tracking-widest rounded-xl hover:bg-[#EFEAE0] dark:hover:bg-[#202020] transition-colors"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
