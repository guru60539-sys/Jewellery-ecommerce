import React, { useState, useEffect } from 'react';
import { useShop } from '../context/ShopContext';
import {
  Search,
  Heart,
  ShoppingBag,
  User,
  Sun,
  Moon,
  Menu,
  X,
  ShieldCheck,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const {
    isDark,
    toggleTheme,
    currentView,
    navigateTo,
    cartCount,
    wishlist,
    currentUser,
    loginAs,
    logout,
    setIsSearchOpen,
    isMobileMenuOpen,
    setIsMobileMenuOpen
  } = useShop();

  const [isScrolled, setIsScrolled] = useState(false);
  const [isAccountDropdownOpen, setIsAccountDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Announcement Bar */}
      <div className="bg-[#151413] dark:bg-[#000000] text-[#E8D8B0] text-xs font-medium py-2 px-4 border-b border-[#D4AF37]/20">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-center gap-1 sm:gap-4 tracking-widest uppercase">
          <div className="flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-[#D4AF37] animate-pulse" />
            <span>Complimentary Insured White-Glove Shipping on Orders Above ₹999</span>
          </div>
          <div className="hidden md:flex items-center gap-6 text-[11px] text-[#A69B82]">
            <span>100% Certified Natural Diamonds & Hallmarked Gold</span>
            <span>Lifetime Exchange & Buyback</span>
            <span className="text-[#D4AF37] font-semibold">Toll-Free: 1800-AURELIA</span>
          </div>
        </div>
      </div>

      {/* Main Luxury Header */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#FAF8F5]/90 dark:bg-[#0D0D0D]/90 backdrop-blur-md shadow-md py-3'
            : 'bg-[#FAF8F5] dark:bg-[#0D0D0D] py-4'
        } border-b border-[#E8E3D9] dark:border-[#222222]`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Mobile Menu Button */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="p-2 text-[#1E1C1A] dark:text-[#F3EFEA] hover:text-[#D4AF37] transition-colors"
                aria-label="Toggle navigation menu"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
              <button
                onClick={() => setIsSearchOpen(true)}
                className="p-2 text-[#1E1C1A] dark:text-[#F3EFEA] hover:text-[#D4AF37] transition-colors"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Desktop Left Nav Links */}
            <nav className="hidden lg:flex items-center gap-8 text-[13px] tracking-widest uppercase font-medium">
              <button
                onClick={() => navigateTo('home')}
                className={`transition-colors hover:text-[#D4AF37] relative py-1 ${
                  currentView === 'home'
                    ? 'text-[#D4AF37] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#D4AF37]'
                    : 'text-[#4A453E] dark:text-[#C5BFB5]'
                }`}
              >
                Home
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className={`transition-colors hover:text-[#D4AF37] relative py-1 ${
                  currentView === 'shop'
                    ? 'text-[#D4AF37] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#D4AF37]'
                    : 'text-[#4A453E] dark:text-[#C5BFB5]'
                }`}
              >
                Shop
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="transition-colors hover:text-[#D4AF37] text-[#4A453E] dark:text-[#C5BFB5]"
              >
                New Arrivals
              </button>
              <button
                onClick={() => navigateTo('shop')}
                className="transition-colors hover:text-[#D4AF37] text-[#4A453E] dark:text-[#C5BFB5]"
              >
                Collections
              </button>
              <button
                onClick={() => navigateTo('about')}
                className={`transition-colors hover:text-[#D4AF37] relative py-1 ${
                  currentView === 'about'
                    ? 'text-[#D4AF37] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#D4AF37]'
                    : 'text-[#4A453E] dark:text-[#C5BFB5]'
                }`}
              >
                About
              </button>
              <button
                onClick={() => navigateTo('contact')}
                className={`transition-colors hover:text-[#D4AF37] relative py-1 ${
                  currentView === 'contact'
                    ? 'text-[#D4AF37] font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px] after:bg-[#D4AF37]'
                    : 'text-[#4A453E] dark:text-[#C5BFB5]'
                }`}
              >
                Contact
              </button>
            </nav>

            {/* Brand Logo - Center */}
            <div className="text-center cursor-pointer" onClick={() => navigateTo('home')}>
              <h1 className="font-serif text-2xl sm:text-3xl md:text-4xl tracking-[0.25em] font-normal uppercase text-[#1E1C1A] dark:text-[#FAF8F5]">
                AURELIA
              </h1>
              <p className="text-[9px] tracking-[0.4em] uppercase text-[#D4AF37] font-light -mt-1">
                Haute Joaillerie
              </p>
            </div>

            {/* Right Icons: Search, Dark Mode, Wishlist, Account, Cart */}
            <div className="flex items-center gap-3 sm:gap-5">
              {/* Desktop Search Button */}
              <button
                onClick={() => setIsSearchOpen(true)}
                className="hidden lg:flex items-center gap-2 text-xs tracking-wider text-[#6B6358] dark:text-[#A8A196] hover:text-[#D4AF37] dark:hover:text-[#D4AF37] px-3 py-1.5 rounded-full border border-[#E0D9CD] dark:border-[#333333] transition-colors"
              >
                <Search className="w-4 h-4" />
                <span>Search Jewellery...</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark/Light Mode"
                className="p-2 rounded-full hover:bg-[#EFEAE1] dark:hover:bg-[#1E1E1E] text-[#4A453E] dark:text-[#E8D8B0] transition-colors"
                title={isDark ? "Switch to Ivory Light Mode" : "Switch to Luxury Dark Mode"}
              >
                {isDark ? <Sun className="w-5 h-5 text-[#D4AF37]" /> : <Moon className="w-5 h-5" />}
              </button>

              {/* Wishlist */}
              <button
                onClick={() => navigateTo('account')}
                className="relative p-2 text-[#4A453E] dark:text-[#E8D8B0] hover:text-[#D4AF37] transition-colors"
                aria-label="Wishlist"
              >
                <Heart className="w-5 h-5" />
                {wishlist.length > 0 && (
                  <span className="absolute top-1 right-1 bg-[#D4AF37] text-[#151413] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Cart */}
              <button
                onClick={() => navigateTo('cart')}
                className="relative p-2 text-[#4A453E] dark:text-[#E8D8B0] hover:text-[#D4AF37] transition-colors"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute top-1 right-1 bg-[#D4AF37] text-[#151413] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account Dropdown */}
              <div className="relative">
                <button
                  onClick={() => setIsAccountDropdownOpen(!isAccountDropdownOpen)}
                  className="flex items-center gap-1.5 p-2 rounded-full hover:bg-[#EFEAE1] dark:hover:bg-[#1E1E1E] text-[#4A453E] dark:text-[#E8D8B0] transition-colors"
                  aria-label="Account menu"
                >
                  <User className="w-5 h-5" />
                  <ChevronDown className="w-3.5 h-3.5 hidden sm:block opacity-60" />
                </button>

                {isAccountDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-xl shadow-2xl border border-[#E0D9CD] dark:border-[#333333] bg-[#FAF8F5] dark:bg-[#161616] p-3 text-xs z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {currentUser ? (
                      <div>
                        <div className="px-3 py-2 border-b border-[#E0D9CD] dark:border-[#282828] mb-2">
                          <p className="font-semibold text-sm text-[#1E1C1A] dark:text-[#F3EFEA] truncate">
                            {currentUser.name}
                          </p>
                          <p className="text-[11px] text-[#8C8476] dark:text-[#A0988A] truncate">
                            {currentUser.email}
                          </p>
                          <span className="inline-block mt-1 px-2 py-0.5 rounded text-[10px] font-medium uppercase tracking-wider bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37]">
                            {currentUser.role === 'admin' ? 'Master Administrator' : 'Privileged Patron'}
                          </span>
                        </div>

                        <button
                          onClick={() => {
                            navigateTo('account');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-[#F2ECE1] dark:hover:bg-[#222222] rounded-lg transition-colors flex items-center justify-between"
                        >
                          <span>Patron Dashboard & Orders</span>
                        </button>

                        <button
                          onClick={() => {
                            navigateTo('admin');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 hover:bg-[#F2ECE1] dark:hover:bg-[#222222] rounded-lg transition-colors text-[#B38F24] dark:text-[#D4AF37] flex items-center justify-between font-medium"
                        >
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-4 h-4" />
                            Admin Console
                          </span>
                        </button>

                        <div className="border-t border-[#E0D9CD] dark:border-[#282828] my-1" />

                        <button
                          onClick={() => {
                            logout();
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full text-left px-3 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-950/20 rounded-lg transition-colors"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-2 p-1">
                        <p className="text-[#6B6358] dark:text-[#A8A196] text-center mb-2">
                          Access your bespoke orders & luxury wishlist
                        </p>
                        <button
                          onClick={() => {
                            loginAs('customer');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full py-2 bg-[#1E1C1A] text-[#FAF8F5] dark:bg-[#FAF8F5] dark:text-[#1E1C1A] rounded-lg font-medium text-center tracking-wider hover:opacity-90 transition-opacity"
                        >
                          Sign In as Patron
                        </button>
                        <button
                          onClick={() => {
                            loginAs('admin');
                            setIsAccountDropdownOpen(false);
                          }}
                          className="w-full py-2 border border-[#D4AF37] text-[#B38F24] dark:text-[#D4AF37] rounded-lg font-medium text-center tracking-wider hover:bg-[#D4AF37]/10 transition-colors"
                        >
                          Access Admin Portal
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileMenuOpen(false)}
          />
          <div className="relative w-4/5 max-w-xs bg-[#FAF8F5] dark:bg-[#121212] h-full shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#E0D9CD] dark:border-[#252525]">
                <div>
                  <h2 className="font-serif text-2xl tracking-[0.2em] font-medium">AURELIA</h2>
                  <p className="text-[9px] tracking-widest text-[#D4AF37] uppercase">Fine Jewels</p>
                </div>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-1 text-[#4A453E] dark:text-[#C5BFB5]"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="flex flex-col gap-5 py-6 text-sm tracking-widest uppercase font-medium">
                <button
                  onClick={() => { navigateTo('home'); setIsMobileMenuOpen(false); }}
                  className="text-left hover:text-[#D4AF37] transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }}
                  className="text-left hover:text-[#D4AF37] transition-colors"
                >
                  All Jewellery
                </button>
                <button
                  onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }}
                  className="text-left hover:text-[#D4AF37] transition-colors"
                >
                  Solitaires & Rings
                </button>
                <button
                  onClick={() => { navigateTo('shop'); setIsMobileMenuOpen(false); }}
                  className="text-left hover:text-[#D4AF37] transition-colors"
                >
                  Bridal Chokers
                </button>
                <button
                  onClick={() => { navigateTo('about'); setIsMobileMenuOpen(false); }}
                  className="text-left hover:text-[#D4AF37] transition-colors"
                >
                  Atelier Heritage
                </button>
                <button
                  onClick={() => { navigateTo('contact'); setIsMobileMenuOpen(false); }}
                  className="text-left hover:text-[#D4AF37] transition-colors"
                >
                  Bespoke Appointments
                </button>
                <button
                  onClick={() => { navigateTo('admin'); setIsMobileMenuOpen(false); }}
                  className="text-left text-[#B38F24] dark:text-[#D4AF37] font-semibold"
                >
                  Admin Management
                </button>
              </div>
            </div>

            <div className="pt-6 border-t border-[#E0D9CD] dark:border-[#252525]">
              <div className="flex items-center justify-between text-xs text-[#7A7366] dark:text-[#9A9386] mb-4">
                <span>Theme</span>
                <button
                  onClick={toggleTheme}
                  className="px-3 py-1 rounded-full border border-[#D4AF37] text-[#D4AF37]"
                >
                  {isDark ? 'Light Mode' : 'Dark Mode'}
                </button>
              </div>
              <p className="text-[11px] text-center text-[#999] tracking-wider">
                © 2026 Aurelia & Co. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
