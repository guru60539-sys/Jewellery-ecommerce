import React, { useState, useMemo } from 'react';
import { useShop } from '../context/ShopContext';
import { ProductCard } from '../components/ProductCard';
import { Filter, SlidersHorizontal, X, ChevronDown, Check } from 'lucide-react';

export const ShopPage: React.FC = () => {
  const { products } = useShop();

  // Filters state
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [priceRange, setPriceRange] = useState<number>(300000);
  const [selectedMetal, setSelectedMetal] = useState<string>('All');
  const [selectedStone, setSelectedStone] = useState<string>('All');
  const [selectedCollection, setSelectedCollection] = useState<string>('All');
  const [minRating, setMinRating] = useState<number>(0);
  const [sortBy, setSortBy] = useState<string>('featured');
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  const categories = ['All', 'Rings', 'Necklaces', 'Earrings', 'Bracelets', 'Chains', 'Watches'];
  const metals = ['All', 'Yellow Gold', 'Rose Gold', 'White Gold', 'Platinum'];
  const stones = ['All', 'Diamond', 'Emerald', 'Ruby', 'Sapphire', 'Pearl', 'None'];
  const collections = ['All', 'Bridal Royalty', 'Solitaire Luxe', 'Heritage Gold', 'Modern Minimal', 'Eternal Diamond'];

  // Filter & Sort Logic
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      if (selectedCategory !== 'All' && p.category !== selectedCategory) return false;
      if (p.price > priceRange) return false;
      if (selectedMetal !== 'All' && p.metal !== selectedMetal) return false;
      if (selectedStone !== 'All' && p.stone !== selectedStone) return false;
      if (selectedCollection !== 'All' && p.collection !== selectedCollection) return false;
      if (p.rating < minRating) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
      return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
    });
  }, [products, selectedCategory, priceRange, selectedMetal, selectedStone, selectedCollection, minRating, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setPriceRange(300000);
    setSelectedMetal('All');
    setSelectedStone('All');
    setSelectedCollection('All');
    setMinRating(0);
    setSortBy('featured');
  };

  const filterContent = (
    <div className="space-y-6 text-xs text-[#1E1C1A] dark:text-[#E8D8B0]">
      {/* Category */}
      <div>
        <h4 className="font-semibold uppercase tracking-wider mb-3 text-[#1E1C1A] dark:text-white">
          Category
        </h4>
        <div className="space-y-1.5">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`w-full text-left py-1.5 px-2.5 rounded-md flex items-center justify-between transition-colors ${
                selectedCategory === cat
                  ? 'bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] font-semibold'
                  : 'text-[#6B6358] dark:text-[#9A9386] hover:bg-[#EFEAE0] dark:hover:bg-[#1E1E1E]'
              }`}
            >
              <span>{cat}</span>
              {selectedCategory === cat && <Check className="w-3.5 h-3.5" />}
            </button>
          ))}
        </div>
      </div>

      {/* Max Price Range Slider */}
      <div>
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-semibold uppercase tracking-wider text-[#1E1C1A] dark:text-white">
            Max Budget
          </h4>
          <span className="font-medium text-[#D4AF37]">₹{priceRange.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="30000"
          max="300000"
          step="10000"
          value={priceRange}
          onChange={e => setPriceRange(Number(e.target.value))}
          className="w-full accent-[#D4AF37] cursor-pointer"
        />
        <div className="flex justify-between text-[10px] text-[#8C8476] mt-1">
          <span>₹30,000</span>
          <span>₹3,00,000+</span>
        </div>
      </div>

      {/* Metal Preference */}
      <div>
        <h4 className="font-semibold uppercase tracking-wider mb-2 text-[#1E1C1A] dark:text-white">
          Precious Metal
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {metals.map(metal => (
            <button
              key={metal}
              onClick={() => setSelectedMetal(metal)}
              className={`px-3 py-1.5 rounded-lg border transition-all text-[11px] ${
                selectedMetal === metal
                  ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] font-semibold'
                  : 'border-[#DDD7CC] dark:border-[#333333] hover:border-[#D4AF37]'
              }`}
            >
              {metal}
            </button>
          ))}
        </div>
      </div>

      {/* Stone Preference */}
      <div>
        <h4 className="font-semibold uppercase tracking-wider mb-2 text-[#1E1C1A] dark:text-white">
          Primary Gemstone
        </h4>
        <div className="flex flex-wrap gap-1.5">
          {stones.map(stone => (
            <button
              key={stone}
              onClick={() => setSelectedStone(stone)}
              className={`px-3 py-1.5 rounded-lg border transition-all text-[11px] ${
                selectedStone === stone
                  ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#B38F24] dark:text-[#D4AF37] font-semibold'
                  : 'border-[#DDD7CC] dark:border-[#333333] hover:border-[#D4AF37]'
              }`}
            >
              {stone}
            </button>
          ))}
        </div>
      </div>

      {/* Collection */}
      <div>
        <h4 className="font-semibold uppercase tracking-wider mb-2 text-[#1E1C1A] dark:text-white">
          Signature Collection
        </h4>
        <div className="space-y-1">
          {collections.map(col => (
            <button
              key={col}
              onClick={() => setSelectedCollection(col)}
              className={`w-full text-left py-1 px-2 rounded-md transition-colors ${
                selectedCollection === col
                  ? 'text-[#B38F24] dark:text-[#D4AF37] font-semibold'
                  : 'text-[#6B6358] dark:text-[#9A9386] hover:text-[#D4AF37]'
              }`}
            >
              {col}
            </button>
          ))}
        </div>
      </div>

      {/* Minimum Rating */}
      <div>
        <h4 className="font-semibold uppercase tracking-wider mb-2 text-[#1E1C1A] dark:text-white">
          Patron Rating
        </h4>
        <div className="flex gap-2">
          {[0, 4.5, 4.8].map(r => (
            <button
              key={r}
              onClick={() => setMinRating(r)}
              className={`px-3 py-1 rounded-md text-[11px] border ${
                minRating === r
                  ? 'bg-[#D4AF37] text-[#121110] font-semibold border-[#D4AF37]'
                  : 'border-[#DDD7CC] dark:border-[#333333]'
              }`}
            >
              {r === 0 ? 'All' : `${r}★ & Up`}
            </button>
          ))}
        </div>
      </div>

      {/* Reset Button */}
      <button
        onClick={resetFilters}
        className="w-full py-2.5 rounded-lg border border-[#D4AF37]/50 text-xs font-semibold uppercase tracking-wider text-[#B38F24] dark:text-[#D4AF37] hover:bg-[#D4AF37]/10 transition-colors"
      >
        Clear All Filters
      </button>
    </div>
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Page Header */}
      <div className="text-center max-w-2xl mx-auto mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-[#D4AF37] font-semibold mb-2">
          The Haute Boutique
        </p>
        <h1 className="font-serif text-3xl sm:text-5xl font-light text-[#1E1C1A] dark:text-[#FAF8F5]">
          Fine Jewellery Creations
        </h1>
        <p className="text-xs text-[#7A7366] dark:text-[#9E978B] mt-3">
          Explore individual masterpieces handcrafted in pure 18K & 22K gold, platinum, and conflict-free diamonds.
        </p>
      </div>

      {/* Controls Bar: Mobile filter button, Results count, Sorting dropdown */}
      <div className="flex flex-wrap items-center justify-between gap-4 py-4 border-y border-[#E2DBD0] dark:border-[#2C2C2C] mb-8">
        <div className="flex items-center gap-3">
          {/* Mobile Filter Trigger */}
          <button
            onClick={() => setIsMobileFiltersOpen(true)}
            className="lg:hidden flex items-center gap-2 px-4 py-2 rounded-lg bg-[#EFEAE0] dark:bg-[#1E1E1E] text-xs font-medium uppercase tracking-wider"
          >
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
            <span>Filters</span>
          </button>

          <span className="text-xs text-[#7A7366] dark:text-[#9A9386]">
            Displaying <strong className="text-[#1E1C1A] dark:text-white">{filteredProducts.length}</strong> creations
          </span>
        </div>

        {/* Sorting Dropdown */}
        <div className="flex items-center gap-2 text-xs">
          <span className="text-[#7A7366] dark:text-[#9A9386] uppercase tracking-wider hidden sm:inline">
            Sort by:
          </span>
          <select
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="bg-[#FAF8F5] dark:bg-[#161616] border border-[#DDD7CC] dark:border-[#333333] rounded-lg px-3 py-2 text-xs focus:outline-none focus:border-[#D4AF37] cursor-pointer"
          >
            <option value="featured">Featured Creations</option>
            <option value="newest">New Arrivals First</option>
            <option value="price-low">Price: Low to High</option>
            <option value="price-high">Price: High to Low</option>
            <option value="rating">Best Rated by Patrons</option>
          </select>
        </div>
      </div>

      {/* Main Grid & Desktop Filters layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Desktop Sidebar Filters */}
        <aside className="hidden lg:block bg-white dark:bg-[#141414] p-6 rounded-2xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm h-fit sticky top-24">
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-[#E8E2D5] dark:border-[#252525]">
            <h3 className="font-serif text-lg font-medium">Boutique Filters</h3>
            <SlidersHorizontal className="w-4 h-4 text-[#D4AF37]" />
          </div>
          {filterContent}
        </aside>

        {/* Products Grid */}
        <main className="lg:col-span-3">
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="bg-white dark:bg-[#161616] p-12 rounded-2xl border border-[#E8E2D5] dark:border-[#252525] text-center">
              <h3 className="font-serif text-2xl font-light mb-2">No Jewellery Matched Your Criteria</h3>
              <p className="text-xs text-[#7A7366] dark:text-[#9E978B] mb-6">
                Try widening your price range or clearing selected category and metal filters.
              </p>
              <button
                onClick={resetFilters}
                className="px-6 py-2.5 rounded-lg bg-[#D4AF37] text-[#121110] text-xs font-semibold uppercase tracking-widest hover:bg-[#B38F24] transition-colors"
              >
                Reset All Filters
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Mobile Filters Drawer */}
      {isMobileFiltersOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsMobileFiltersOpen(false)}
          />
          <div className="relative w-4/5 max-w-sm bg-[#FAF8F5] dark:bg-[#121212] h-full shadow-2xl p-6 flex flex-col justify-between z-10 overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E0D9CD] dark:border-[#252525] mb-4">
                <h3 className="font-serif text-xl font-medium">Boutique Filters</h3>
                <button
                  onClick={() => setIsMobileFiltersOpen(false)}
                  className="p-1 text-[#4A453E] dark:text-[#C5BFB5]"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              {filterContent}
            </div>

            <button
              onClick={() => setIsMobileFiltersOpen(false)}
              className="mt-6 w-full py-3 bg-[#D4AF37] text-[#121110] font-semibold text-xs uppercase tracking-widest rounded-xl"
            >
              View Results ({filteredProducts.length})
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
