import React from 'react';
import { useShop } from '../context/ShopContext';
import { Gem, Award, Shield, Sparkles } from 'lucide-react';

export const AboutPage: React.FC = () => {
  const { navigateTo } = useShop();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20 space-y-20">
      <div className="text-center max-w-2xl mx-auto">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
          Heritage & Legacy
        </p>
        <h1 className="font-serif text-4xl sm:text-5xl font-light mb-4">The Aurelia Atelier</h1>
        <p className="text-xs text-[#7A7366] dark:text-[#A8A196] leading-relaxed">
          Tracing royal lineage through three generations of master goldsmiths and certified gemological artisans.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="relative rounded-2xl overflow-hidden shadow-2xl border border-[#D4AF37]/30">
          <img
            src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80"
            alt="Handcrafting fine jewellery in atelier"
            className="w-full h-[450px] object-cover"
          />
        </div>
        <div className="space-y-6">
          <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold flex items-center gap-1.5">
            <Sparkles className="w-4 h-4" /> Three Decades of Fine Metallurgy
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl font-light leading-snug">
            Where Ancient Royal Art Meets Swiss Precision
          </h2>
          <p className="text-xs text-[#6B6358] dark:text-[#B5AFA4] leading-relaxed">
            Founded with an uncompromising devotion to symmetry and purity, Aurelia & Co. crafts jewellery not merely as adornments, but as heirlooms destined to transcend generations.
          </p>
          <p className="text-xs text-[#6B6358] dark:text-[#B5AFA4] leading-relaxed">
            Every solitaire diamond is laser-engraved with an immutable microscopic identifier, verifying its zero-conflict origins and strict Kimberley Process compliance.
          </p>
          <div className="pt-2 flex gap-4">
            <button
              onClick={() => navigateTo('shop')}
              className="px-8 py-3.5 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-semibold text-xs uppercase tracking-widest rounded-xl transition-all shadow-md"
            >
              Explore Our Creations
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export const ContactPage: React.FC = () => {
  const { showToast } = useShop();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    showToast('Your private concierge appointment request has been scheduled.', 'success');
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
      <div className="text-center max-w-xl mx-auto mb-12">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
          Private Consultations
        </p>
        <h1 className="font-serif text-3xl sm:text-4xl font-light mb-3">Bespoke Diamond Concierge</h1>
        <p className="text-xs text-[#7A7366] dark:text-[#A8A196]">
          Reserve a private viewing suite at our Worli flagship salon or schedule a secure virtual high-jewellery preview.
        </p>
      </div>

      <div className="bg-white dark:bg-[#141414] p-8 sm:p-12 rounded-2xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-5 text-xs">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Your Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Maharani Gayatri"
                className="w-full px-3 py-2.5 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[#8C8476] mb-1">VIP Contact Number</label>
              <input
                type="text"
                required
                placeholder="+91 98765 43210"
                className="w-full px-3 py-2.5 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Email Address</label>
              <input
                type="email"
                required
                placeholder="patron@domain.com"
                className="w-full px-3 py-2.5 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
              />
            </div>
            <div>
              <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Interest Category</label>
              <select className="w-full px-3 py-2.5 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]">
                <option>Solitaire Engagement Ring</option>
                <option>Bridal Choker Suite</option>
                <option>Fine Chronometer Watch</option>
                <option>Custom Bespoke Commission</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Bespoke Specifications / Notes</label>
            <textarea
              rows={4}
              placeholder="Tell us your diamond cut preference, carat expectations, or wedding date..."
              className="w-full px-3 py-2.5 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent focus:outline-none focus:border-[#D4AF37]"
            />
          </div>

          <button
            type="submit"
            className="w-full py-4 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold uppercase tracking-widest rounded-xl transition-all shadow-md text-xs"
          >
            Confirm Concierge Appointment
          </button>
        </form>
      </div>
    </div>
  );
};
