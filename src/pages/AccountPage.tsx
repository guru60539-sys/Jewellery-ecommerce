import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import {
  User as UserIcon,
  Package,
  Heart,
  MapPin,
  Clock,
  KeyRound,
  LogOut,
  ShieldCheck,
  ChevronRight,
  Truck
} from 'lucide-react';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    orders,
    wishlist,
    products,
    recentlyViewed,
    logout,
    loginAs,
    updateUserProfile,
    showToast,
    navigateTo
  } = useShop();

  const [activeTab, setActiveTab] = useState<'orders' | 'wishlist' | 'addresses' | 'profile' | 'recent' | 'password'>('orders');

  // Profile Edit form state
  const [profileName, setProfileName] = useState(currentUser?.name || '');
  const [profilePhone, setProfilePhone] = useState(currentUser?.phone || '');

  // Password state
  const [currentPw, setCurrentPw] = useState('');
  const [newPw, setNewPw] = useState('');

  if (!currentUser) {
    return (
      <div className="max-w-md mx-auto py-20 px-4 text-center">
        <div className="w-16 h-16 mx-auto rounded-full bg-[#D4AF37]/15 text-[#D4AF37] flex items-center justify-center mb-6">
          <UserIcon className="w-8 h-8" />
        </div>
        <h1 className="font-serif text-3xl font-light mb-2">Patron Sign In</h1>
        <p className="text-xs text-[#8C8476] mb-8 leading-relaxed">
          Access your insured jewellery orders, private wishlist, and certified valuation certificates.
        </p>
        <div className="space-y-3">
          <button
            onClick={() => loginAs('customer')}
            className="w-full py-3.5 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
          >
            Sign In with Demo Patron Account
          </button>
          <button
            onClick={() => loginAs('admin')}
            className="w-full py-3.5 border border-[#D4AF37] text-[#B38F24] dark:text-[#D4AF37] font-semibold text-xs uppercase tracking-widest rounded-xl hover:bg-[#D4AF37]/10 transition-colors"
          >
            Switch to Admin Console
          </button>
        </div>
      </div>
    );
  }

  const wishlistProducts = products.filter(p => wishlist.includes(p.id));

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    updateUserProfile({ name: profileName, phone: profilePhone });
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPw.length >= 6) {
      showToast('Patron account password updated successfully', 'success');
      setCurrentPw('');
      setNewPw('');
    } else {
      showToast('Password must be at least 6 characters', 'error');
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-8 border-b border-[#E8E2D5] dark:border-[#252525] mb-8">
        <div>
          <span className="text-[10px] uppercase tracking-widest bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] px-2.5 py-1 rounded-sm font-semibold">
            {currentUser.role === 'admin' ? 'Administrator' : 'Valued Patron Member'}
          </span>
          <h1 className="font-serif text-3xl sm:text-4xl font-light mt-2">{currentUser.name}</h1>
          <p className="text-xs text-[#8C8476]">{currentUser.email} • Member since {currentUser.joinedDate}</p>
        </div>

        <button
          onClick={logout}
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-red-200 dark:border-red-900/30 text-red-600 dark:text-red-400 text-xs font-semibold uppercase tracking-wider hover:bg-red-50 dark:hover:bg-red-950/20 transition-colors"
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Navigation Sidebar */}
        <aside className="space-y-1 text-xs">
          {[
            { id: 'orders', label: 'My Orders & Tracking', icon: Package, count: orders.length },
            { id: 'wishlist', label: 'Saved Wishlist', icon: Heart, count: wishlist.length },
            { id: 'addresses', label: 'Delivery Vault Addresses', icon: MapPin },
            { id: 'recent', label: 'Recently Viewed', icon: Clock },
            { id: 'profile', label: 'Patron Profile', icon: UserIcon },
            { id: 'password', label: 'Security & Password', icon: KeyRound },
          ].map(tab => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center justify-between p-3.5 rounded-xl font-medium transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-[#121110] font-semibold shadow-sm'
                    : 'text-[#6B6358] dark:text-[#A8A196] hover:bg-[#F2ECE1] dark:hover:bg-[#1E1E1E]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </div>
                {typeof tab.count === 'number' && (
                  <span className={`text-[10px] px-2 py-0.5 rounded-full ${isActive ? 'bg-[#121110]/20 text-[#121110]' : 'bg-[#EAE4D8] dark:bg-[#282828]'}`}>
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </aside>

        {/* Content Panel */}
        <main className="lg:col-span-3 bg-white dark:bg-[#141414] rounded-2xl border border-[#E8E2D5] dark:border-[#252525] p-6 sm:p-8 shadow-sm">
          {/* Tab 1: Orders */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center pb-4 border-b border-[#E8E2D5] dark:border-[#282828]">
                <h3 className="font-serif text-xl font-medium">Bespoke Orders & Live Courier Status</h3>
                <span className="text-xs text-[#8C8476]">{orders.length} order{orders.length > 1 ? 's' : ''} on record</span>
              </div>

              {orders.length > 0 ? (
                orders.map(order => (
                  <div
                    key={order.id}
                    className="p-5 rounded-xl border border-[#EAE4D8] dark:border-[#282828] bg-[#FAF8F5] dark:bg-[#1A1A1A] space-y-4"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E8E2D5] dark:border-[#282828] text-xs">
                      <div>
                        <span className="text-[#8C8476]">Order No:</span>
                        <strong className="ml-1 font-serif text-sm">{order.id}</strong>
                        <span className="ml-3 text-[#8C8476]">{order.date}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider ${
                          order.status === 'Delivered'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/40 dark:text-emerald-400'
                            : order.status === 'Shipped'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950/40 dark:text-blue-400'
                            : 'bg-amber-100 text-amber-800 dark:bg-amber-950/40 dark:text-amber-400'
                        }`}>
                          {order.status}
                        </span>
                        <span className="font-serif font-bold text-sm text-[#D4AF37]">
                          ₹{order.grandTotal.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Order Items */}
                    <div className="space-y-3">
                      {order.items.map((item, idx) => (
                        <div key={idx} className="flex items-center gap-4 text-xs">
                          <img
                            src={item.productImage}
                            alt={item.productName}
                            className="w-14 h-14 rounded-lg object-cover bg-white"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="font-serif font-medium truncate">{item.productName}</p>
                            <p className="text-[11px] text-[#8C8476]">Qty: {item.quantity} | Size: {item.selectedSize}</p>
                          </div>
                          <span className="font-medium">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                        </div>
                      ))}
                    </div>

                    {/* Tracking details */}
                    <div className="pt-3 border-t border-[#E8E2D5] dark:border-[#282828] flex flex-wrap items-center justify-between text-[11px] text-[#7A7366] dark:text-[#A8A196] gap-2">
                      <div className="flex items-center gap-1.5">
                        <Truck className="w-3.5 h-3.5 text-[#D4AF37]" />
                        <span>Armoured Escort: <strong className="font-mono text-[#1E1C1A] dark:text-white">{order.trackingNumber}</strong></span>
                      </div>
                      <span>Expected: {order.estimatedDelivery}</span>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-[#8C8476] italic">You have not placed any orders yet.</p>
              )}
            </div>
          )}

          {/* Tab 2: Wishlist */}
          {activeTab === 'wishlist' && (
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-[#E8E2D5] dark:border-[#282828] mb-6">
                <h3 className="font-serif text-xl font-medium">Your Private Wishlist</h3>
                <span className="text-xs text-[#8C8476]">{wishlistProducts.length} items</span>
              </div>

              {wishlistProducts.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistProducts.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <p className="text-xs text-[#8C8476] mb-4">Your wishlist is currently empty.</p>
                  <button
                    onClick={() => navigateTo('shop')}
                    className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#121110] text-xs font-semibold uppercase tracking-widest"
                  >
                    Discover Fine Jewellery
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tab 3: Saved Addresses */}
          {activeTab === 'addresses' && (
            <div className="space-y-4">
              <h3 className="font-serif text-xl font-medium pb-4 border-b border-[#E8E2D5] dark:border-[#282828]">
                Registered Delivery Residences
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {currentUser.addresses.map(addr => (
                  <div
                    key={addr.id}
                    className="p-5 rounded-xl border border-[#EAE4D8] dark:border-[#282828] bg-[#FAF8F5] dark:bg-[#1A1A1A] text-xs space-y-2 relative"
                  >
                    {addr.isDefault && (
                      <span className="absolute top-4 right-4 px-2 py-0.5 rounded text-[10px] bg-[#D4AF37]/20 text-[#B38F24] dark:text-[#D4AF37] font-semibold uppercase">
                        Primary Vault
                      </span>
                    )}
                    <h4 className="font-semibold text-sm">{addr.fullName}</h4>
                    <p className="text-[#6B6358] dark:text-[#A8A196] leading-relaxed">{addr.street}</p>
                    <p className="text-[#6B6358] dark:text-[#A8A196]">{addr.city}, {addr.state} - {addr.pincode}</p>
                    <p className="text-[#8C8476]">Mobile: {addr.phone}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 4: Recently Viewed */}
          {activeTab === 'recent' && (
            <div>
              <h3 className="font-serif text-xl font-medium pb-4 border-b border-[#E8E2D5] dark:border-[#282828] mb-6">
                Recently Viewed Jewels
              </h3>
              {recentlyViewed.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {recentlyViewed.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              ) : (
                <p className="text-xs text-[#8C8476] italic">Browse the boutique to view items here.</p>
              )}
            </div>
          )}

          {/* Tab 5: Patron Profile */}
          {activeTab === 'profile' && (
            <div className="max-w-md space-y-6">
              <h3 className="font-serif text-xl font-medium pb-4 border-b border-[#E8E2D5] dark:border-[#282828]">
                Patron Information
              </h3>
              <form onSubmit={handleSaveProfile} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Full Name</label>
                  <input
                    type="text"
                    value={profileName}
                    onChange={e => setProfileName(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profilePhone}
                    onChange={e => setProfilePhone(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Email (Immutable)</label>
                  <input
                    type="email"
                    disabled
                    value={currentUser.email}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-gray-100 dark:bg-[#202020] opacity-70"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-semibold uppercase tracking-wider"
                >
                  Save Profile
                </button>
              </form>
            </div>
          )}

          {/* Tab 6: Password */}
          {activeTab === 'password' && (
            <div className="max-w-md space-y-6">
              <h3 className="font-serif text-xl font-medium pb-4 border-b border-[#E8E2D5] dark:border-[#282828]">
                Change Vault Password
              </h3>
              <form onSubmit={handleChangePassword} className="space-y-4 text-xs">
                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Current Password</label>
                  <input
                    type="password"
                    required
                    value={currentPw}
                    onChange={e => setCurrentPw(e.target.value)}
                    placeholder="••••••••"
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">New Password</label>
                  <input
                    type="password"
                    required
                    value={newPw}
                    onChange={e => setNewPw(e.target.value)}
                    placeholder="At least 6 characters"
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-lg bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-semibold uppercase tracking-wider"
                >
                  Update Password
                </button>
              </form>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};
