import React, { useEffect, useRef } from 'react';
import { useShop } from '../context/ShopContext';
import { Search, X, ArrowRight, Sparkles } from 'lucide-react';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, setIsSearchOpen, searchQuery, setSearchQuery, products, navigateTo } = useShop();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  if (!isSearchOpen) return null;

  const query = searchQuery.trim().toLowerCase();

  const filtered = query
    ? products.filter(
        p =>
          p.name.toLowerCase().includes(query) ||
          p.category.toLowerCase().includes(query) ||
          p.material.toLowerCase().includes(query) ||
          p.sku.toLowerCase().includes(query) ||
          p.stone.toLowerCase().includes(query) ||
          p.metal.toLowerCase().includes(query)
      )
    : [];

  const popularSearches = ['Diamond Ring', 'Emerald Choker', 'Tennis Bracelet', '22K Gold Chain', 'Solitaire', 'Sapphire'];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={() => setIsSearchOpen(false)}
      />

      <div className="relative bg-[#FAF8F5] dark:bg-[#141414] text-[#1E1C1A] dark:text-[#F3EFEA] rounded-2xl max-w-2xl w-full p-6 shadow-2xl border border-[#D4AF37]/40 z-10 animate-in fade-in slide-in-from-top-4 duration-200">
        <div className="flex items-center justify-between pb-4 border-b border-[#E8E2D5] dark:border-[#282828]">
          <div className="flex items-center gap-3 flex-1">
            <Search className="w-5 h-5 text-[#D4AF37]" />
            <input
              ref={inputRef}
              type="text"
              placeholder="Search by ring, necklace, diamond carat, metal purity or SKU..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-sm sm:text-base focus:outline-none placeholder-[#9E978B] font-light"
            />
          </div>
          <button
            onClick={() => setIsSearchOpen(false)}
            className="p-1.5 rounded-full hover:bg-[#EFEAE0] dark:hover:bg-[#252525] text-[#6B6358] dark:text-[#9A9386]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="py-3 flex flex-wrap items-center gap-2 border-b border-[#E8E2D5] dark:border-[#282828]">
          <span className="text-[11px] uppercase tracking-wider text-[#8A8376] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-[#D4AF37]" /> Trending:
          </span>
          {popularSearches.map(term => (
            <button
              key={term}
              onClick={() => setSearchQuery(term)}
              className="text-xs px-2.5 py-1 rounded-full bg-[#EFEAE0] dark:bg-[#222222] hover:bg-[#D4AF37]/20 hover:text-[#D4AF37] transition-colors"
            >
              {term}
            </button>
          ))}
        </div>

        {/* Search Results Area */}
        <div className="mt-4 max-h-80 overflow-y-auto space-y-3">
          {query && filtered.length > 0 && (
            <p className="text-xs text-[#8C8476] uppercase tracking-wider mb-2">
              Found {filtered.length} exquisite creation{filtered.length > 1 ? 's' : ''}:
            </p>
          )}

          {query && filtered.length > 0 && (
            filtered.map(product => (
              <div
                key={product.id}
                onClick={() => {
                  navigateTo('product-details', product.id);
                  setIsSearchOpen(false);
                }}
                className="flex items-center gap-4 p-2.5 rounded-xl hover:bg-[#F2ECE1] dark:hover:bg-[#1F1F1F] cursor-pointer transition-colors border border-transparent hover:border-[#D4AF37]/30"
              >
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-14 h-14 rounded-lg object-cover bg-white"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#D4AF37] font-semibold">
                      {product.category}
                    </span>
                    <span className="text-[10px] text-[#8C8476]">SKU: {product.sku}</span>
                  </div>
                  <h4 className="font-serif text-sm font-medium truncate">{product.name}</h4>
                  <p className="text-xs font-semibold text-[#1E1C1A] dark:text-[#E8D8B0]">
                    ₹{product.price.toLocaleString('en-IN')}
                  </p>
                </div>
                <ArrowRight className="w-4 h-4 text-[#8C8476]" />
              </div>
            ))
          )}

          {/* No Results Fallback */}
          {query && filtered.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm font-serif italic text-[#6B6358] dark:text-[#9E978B] mb-2">
                No bespoke jewellery found matching "{searchQuery}"
              </p>
              <p className="text-xs text-[#8C8476] mb-4">
                Explore our featured recommendations below:
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setIsSearchOpen(false);
                  navigateTo('shop');
                }}
                className="px-5 py-2 rounded-lg bg-[#D4AF37] text-[#121110] text-xs font-semibold uppercase tracking-wider hover:bg-[#B38F24] transition-colors"
              >
                Explore Full Boutique
              </button>
            </div>
          )}

          {!query && (
            <div className="text-center py-6 text-xs text-[#8C8476]">
              Type a jewel name, gemstone (Diamond, Emerald, Sapphire), or metal type to discover fine pieces.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
