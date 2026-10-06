import React from 'react';
import { useShop } from '../context/ShopContext';
import {
  ShieldCheck,
  Truck,
  RotateCcw,
  Lock,
  Mail,
  Phone,
  MapPin
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigateTo, showToast } = useShop();

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('email') as HTMLInputElement;
    if (input && input.value) {
      showToast('Thank you for subscribing to Aurelia Private Gazette', 'success');
      form.reset();
    }
  };

  return (
    <footer className="bg-[#121110] text-[#E5E0D8] pt-16 pb-24 lg:pb-12 border-t border-[#D4AF37]/20">
      {/* Trust Badges */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-14 border-b border-[#252422]">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-3 text-[#D4AF37]">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg tracking-wide text-white mb-1">100% Certified Purity</h4>
            <p className="text-xs text-[#9E978C] max-w-[200px]">BIS Hallmarked gold and IGI / SGL certified diamonds</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-3 text-[#D4AF37]">
              <Truck className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg tracking-wide text-white mb-1">Insured Express Shipping</h4>
            <p className="text-xs text-[#9E978C] max-w-[200px]">Tamper-evident armoured delivery across India</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-3 text-[#D4AF37]">
              <RotateCcw className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg tracking-wide text-white mb-1">15-Day Easy Returns</h4>
            <p className="text-xs text-[#9E978C] max-w-[200px]">100% money-back guarantee and lifetime exchange policy</p>
          </div>

          <div className="flex flex-col items-center">
            <div className="w-12 h-12 rounded-full border border-[#D4AF37]/40 flex items-center justify-center mb-3 text-[#D4AF37]">
              <Lock className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg tracking-wide text-white mb-1">Secure Payments</h4>
            <p className="text-xs text-[#9E978C] max-w-[200px]">256-bit encryption for UPI, Cards & Net Banking</p>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* Brand & Gazette */}
          <div className="lg:col-span-2">
            <h3 className="font-serif text-3xl tracking-[0.25em] text-white uppercase mb-3">
              AURELIA
            </h3>
            <p className="text-xs tracking-[0.3em] text-[#D4AF37] uppercase mb-4">
              Haute Joaillerie & Fine Diamonds
            </p>
            <p className="text-xs text-[#A8A196] leading-relaxed mb-6 max-w-sm">
              Conceived in the historic royal ateliers of Jaipur and perfected with contemporary Swiss metallurgy, Aurelia & Co. crafts enduring treasures for momentous milestones.
            </p>

            <form onSubmit={handleSubscribe} className="max-w-md">
              <label className="block text-xs uppercase tracking-wider text-[#D4AF37] mb-2 font-medium">
                Subscribe to The Privé Gazette
              </label>
              <div className="flex">
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your VIP email address..."
                  className="bg-[#1C1B19] border border-[#3A3834] px-4 py-2.5 text-xs text-white placeholder-[#6E685E] focus:outline-none focus:border-[#D4AF37] flex-1 rounded-l"
                />
                <button
                  type="submit"
                  className="bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] px-5 py-2.5 text-xs font-semibold tracking-widest uppercase transition-colors rounded-r"
                >
                  Join
                </button>
              </div>
            </form>
          </div>

          {/* Jewellery Categories */}
          <div>
            <h4 className="font-serif text-lg tracking-wider text-white mb-4">Fine Collections</h4>
            <ul className="space-y-2.5 text-xs text-[#A8A196]">
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#D4AF37] transition-colors">
                  Solitaire Rings
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#D4AF37] transition-colors">
                  Royal Bridal Chokers
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#D4AF37] transition-colors">
                  Waterfall Earrings
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#D4AF37] transition-colors">
                  Diamond Tennis Bracelets
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#D4AF37] transition-colors">
                  Pure Gold Chains
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('shop')} className="hover:text-[#D4AF37] transition-colors">
                  Chronometer Timepieces
                </button>
              </li>
            </ul>
          </div>

          {/* Client Concierge */}
          <div>
            <h4 className="font-serif text-lg tracking-wider text-white mb-4">Client Care</h4>
            <ul className="space-y-2.5 text-xs text-[#A8A196]">
              <li>
                <button onClick={() => navigateTo('about')} className="hover:text-[#D4AF37] transition-colors">
                  Our Atelier & Heritage
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('contact')} className="hover:text-[#D4AF37] transition-colors">
                  Book Diamond Consultation
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#D4AF37] transition-colors">
                  Track Your Armoured Order
                </button>
              </li>
              <li>
                <button onClick={() => navigateTo('account')} className="hover:text-[#D4AF37] transition-colors">
                  Certificate Verification
                </button>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#D4AF37]">Complimentary Ring Sizer</span>
              </li>
              <li>
                <span className="cursor-pointer hover:text-[#D4AF37]">Lifetime Care & Cleaning</span>
              </li>
            </ul>
          </div>

          {/* Boutique Contact */}
          <div>
            <h4 className="font-serif text-lg tracking-wider text-white mb-4">Flagship Boutique</h4>
            <div className="space-y-3 text-xs text-[#A8A196]">
              <p className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-[#D4AF37] shrink-0 mt-0.5" />
                <span>The Pavilion, 12 Dr. Annie Besant Road, Worli, Mumbai 400018</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>+91 (022) 8800-4400</span>
              </p>
              <p className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-[#D4AF37] shrink-0" />
                <span>concierge@aureliajewels.com</span>
              </p>
              <div className="pt-2 flex items-center gap-4 text-white">
                <a href="#instagram" className="hover:text-[#D4AF37] transition-colors" aria-label="Instagram">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                </a>
                <a href="#facebook" className="hover:text-[#D4AF37] transition-colors" aria-label="Facebook">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M9 8H6v4h3v12h5V12h3.642L18 8h-4V6.333C14 5.374 14.5 5 15.688 5H18V0h-3.808C10.595 0 9 1.583 9 4.615V8z"/></svg>
                </a>
                <a href="#youtube" className="hover:text-[#D4AF37] transition-colors" aria-label="YouTube">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 border-t border-[#201F1D] flex flex-col md:flex-row items-center justify-between text-xs text-[#736E65] gap-4">
        <p>© 2026 Aurelia & Co. Haute Joaillerie Private Limited. All Rights Reserved.</p>
        <div className="flex items-center gap-6 text-[11px]">
          <span className="hover:text-white cursor-pointer">Privacy Policy</span>
          <span className="hover:text-white cursor-pointer">Terms of Service</span>
          <span className="hover:text-white cursor-pointer">Conflict-Free Diamond Charter</span>
          <span className="hover:text-white cursor-pointer">Sitemap</span>
        </div>
      </div>
    </footer>
  );
};
