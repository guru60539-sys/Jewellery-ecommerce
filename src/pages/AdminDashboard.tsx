import React, { useState } from 'react';
import { useShop } from '../context/ShopContext';
import { Product } from '../types';
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  AlertTriangle,
  Plus,
  Trash2,
  Edit,
  TrendingUp,
  BarChart3,
  Search,
  CheckCircle,
  Clock,
  Shield,
  Tag
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    orders,
    updateOrderStatus,
    coupons,
    currentUser,
    loginAs
  } = useShop();

  const [activeTab, setActiveTab] = useState<'analytics' | 'products' | 'orders' | 'coupons'>('analytics');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // Form State for Add / Edit Product
  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState<Product['category']>('Rings');
  const [formCollection, setFormCollection] = useState<Product['collection']>('Solitaire Luxe');
  const [formPrice, setFormPrice] = useState(50000);
  const [formOriginalPrice, setFormOriginalPrice] = useState(60000);
  const [formMaterial, setFormMaterial] = useState('18K Yellow Gold');
  const [formMetalPurity, setFormMetalPurity] = useState('18K Hallmarked (750)');
  const [formMetal, setFormMetal] = useState<Product['metal']>('Yellow Gold');
  const [formStone, setFormStone] = useState<Product['stone']>('Diamond');
  const [formWeight, setFormWeight] = useState('4.5 grams');
  const [formImage, setFormImage] = useState('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80');
  const [formDescription, setFormDescription] = useState('Handcrafted luxury jewellery piece.');
  const [formStock, setFormStock] = useState(10);

  const resetForm = () => {
    setFormName('');
    setFormCategory('Rings');
    setFormCollection('Solitaire Luxe');
    setFormPrice(50000);
    setFormOriginalPrice(60000);
    setFormMaterial('18K Yellow Gold');
    setFormMetalPurity('18K Hallmarked (750)');
    setFormMetal('Yellow Gold');
    setFormStone('Diamond');
    setFormWeight('4.5 grams');
    setFormImage('https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80');
    setFormDescription('Handcrafted luxury jewellery piece.');
    setFormStock(10);
    setEditingProduct(null);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormName(product.name);
    setFormCategory(product.category);
    setFormCollection(product.collection);
    setFormPrice(product.price);
    setFormOriginalPrice(product.originalPrice);
    setFormMaterial(product.material);
    setFormMetalPurity(product.metalPurity);
    setFormMetal(product.metal);
    setFormStone(product.stone);
    setFormWeight(product.weight);
    setFormImage(product.images[0]);
    setFormDescription(product.description);
    setFormStock(product.stockCount);
    setIsAddModalOpen(true);
  };

  const handleSaveProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingProduct) {
      updateProduct({
        ...editingProduct,
        name: formName,
        category: formCategory,
        collection: formCollection,
        price: formPrice,
        originalPrice: formOriginalPrice,
        material: formMaterial,
        metalPurity: formMetalPurity,
        metal: formMetal,
        stone: formStone,
        weight: formWeight,
        images: [formImage, ...editingProduct.images.slice(1)],
        description: formDescription,
        stockCount: formStock,
        inStock: formStock > 0
      });
    } else {
      addProduct({
        id: `aur-${Date.now()}`,
        sku: `AUR-${formCategory.substring(0, 3).toUpperCase()}-${Math.floor(100 + Math.random() * 900)}`,
        name: formName,
        category: formCategory,
        collection: formCollection,
        price: formPrice,
        originalPrice: formOriginalPrice,
        discountPercentage: Math.round(((formOriginalPrice - formPrice) / formOriginalPrice) * 100),
        rating: 5.0,
        reviewCount: 1,
        images: [formImage],
        description: formDescription,
        material: formMaterial,
        metalPurity: formMetalPurity,
        metal: formMetal,
        stone: formStone,
        weight: formWeight,
        dimensions: 'Standard fit',
        sizes: ['Standard'],
        color: 'Gold',
        inStock: formStock > 0,
        stockCount: formStock,
        isNewArrival: true,
        isBestSeller: false,
        isFeatured: true,
        specifications: {
          'Gold Purity': formMetalPurity,
          'Certification': 'IGI Authenticated',
          'Stone Type': formStone
        },
        reviews: []
      });
    }
    setIsAddModalOpen(false);
    resetForm();
  };

  // Metrics Calculations
  const totalRevenue = orders.reduce((acc, o) => acc + o.grandTotal, 0);
  const totalOrders = orders.length;
  const pendingOrders = orders.filter(o => o.status === 'Pending' || o.status === 'Processing').length;
  const lowStockProducts = products.filter(p => p.stockCount < 8);

  const categoryBreakdown = {
    Rings: products.filter(p => p.category === 'Rings').length,
    Necklaces: products.filter(p => p.category === 'Necklaces').length,
    Earrings: products.filter(p => p.category === 'Earrings').length,
    Bracelets: products.filter(p => p.category === 'Bracelets').length,
    Chains: products.filter(p => p.category === 'Chains').length,
    Watches: products.filter(p => p.category === 'Watches').length,
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-8 border-b border-[#E8E2D5] dark:border-[#252525] mb-8 gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-[10px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              Atelier Master Console
            </span>
          </div>
          <h1 className="font-serif text-3xl sm:text-4xl font-light">Director's Admin Dashboard</h1>
          <p className="text-xs text-[#8C8476]">
            Inventory, realtime valuation analytics, courier orchestration and patron orders.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              resetForm();
              setIsAddModalOpen(true);
            }}
            className="flex items-center gap-2 px-4 py-2.5 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] text-xs font-semibold uppercase tracking-wider rounded-xl transition-all shadow-md"
          >
            <Plus className="w-4 h-4" />
            <span>Add Fine Jewel</span>
          </button>
        </div>
      </div>

      {/* 6 Key Executive Dashboard Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
        <div className="bg-white dark:bg-[#141414] p-4 rounded-xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
          <div className="flex items-center justify-between text-[#8C8476] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif text-lg sm:text-xl font-bold">₹{totalRevenue.toLocaleString('en-IN')}</p>
          <span className="text-[10px] text-emerald-600 font-medium">+18.4% vs last month</span>
        </div>

        <div className="bg-white dark:bg-[#141414] p-4 rounded-xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
          <div className="flex items-center justify-between text-[#8C8476] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Orders</span>
            <ShoppingBag className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif text-lg sm:text-xl font-bold">{totalOrders}</p>
          <span className="text-[10px] text-emerald-600 font-medium">100% fulfillment rate</span>
        </div>

        <div className="bg-white dark:bg-[#141414] p-4 rounded-xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
          <div className="flex items-center justify-between text-[#8C8476] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Patrons</span>
            <Users className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif text-lg sm:text-xl font-bold">1,428</p>
          <span className="text-[10px] text-emerald-600 font-medium">High Net Worth</span>
        </div>

        <div className="bg-white dark:bg-[#141414] p-4 rounded-xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
          <div className="flex items-center justify-between text-[#8C8476] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Live Catalogue</span>
            <Package className="w-4 h-4 text-[#D4AF37]" />
          </div>
          <p className="font-serif text-lg sm:text-xl font-bold">{products.length}</p>
          <span className="text-[10px] text-[#8C8476]">Across 6 categories</span>
        </div>

        <div className="bg-white dark:bg-[#141414] p-4 rounded-xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
          <div className="flex items-center justify-between text-[#8C8476] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Pending Courier</span>
            <Clock className="w-4 h-4 text-amber-500" />
          </div>
          <p className="font-serif text-lg sm:text-xl font-bold text-amber-600">{pendingOrders}</p>
          <span className="text-[10px] text-amber-600 font-medium">In vault transit</span>
        </div>

        <div className="bg-white dark:bg-[#141414] p-4 rounded-xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
          <div className="flex items-center justify-between text-[#8C8476] mb-2">
            <span className="text-[10px] uppercase tracking-wider font-semibold">Low Stock Items</span>
            <AlertTriangle className="w-4 h-4 text-red-500" />
          </div>
          <p className="font-serif text-lg sm:text-xl font-bold text-red-500">{lowStockProducts.length}</p>
          <span className="text-[10px] text-red-500 font-medium">&lt; 8 units left</span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex gap-2 pb-4 border-b border-[#E8E2D5] dark:border-[#252525] mb-8 text-xs font-semibold uppercase tracking-wider">
        {[
          { id: 'analytics', label: 'Sales & Inventory Analytics' },
          { id: 'products', label: `Manage Products (${products.length})` },
          { id: 'orders', label: `Orders (${orders.length})` },
          { id: 'coupons', label: `Promo Coupons (${coupons.length})` },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`py-2 px-4 rounded-lg transition-all ${
              activeTab === tab.id
                ? 'bg-[#1E1C1A] text-white dark:bg-white dark:text-[#121110] shadow-sm'
                : 'text-[#6B6358] dark:text-[#A8A196] hover:bg-[#EFEAE0] dark:hover:bg-[#1E1E1E]'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab: Analytics & Charts */}
      {activeTab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Visual Revenue Bar Chart */}
            <div className="bg-white dark:bg-[#141414] p-6 rounded-2xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-lg font-medium">Monthly Revenue Run Rate (₹ in Lakhs)</h3>
                  <p className="text-xs text-[#8C8476]">Consecutive 6-month luxury sales velocity</p>
                </div>
                <TrendingUp className="w-5 h-5 text-[#D4AF37]" />
              </div>

              <div className="space-y-3">
                {[
                  { month: 'Oct 2025', value: 34.5, pct: 45 },
                  { month: 'Nov 2025 (Diwali)', value: 88.2, pct: 95 },
                  { month: 'Dec 2025 (Weddings)', value: 92.0, pct: 100 },
                  { month: 'Jan 2026', value: 42.1, pct: 52 },
                  { month: 'Feb 2026 (Valentine)', value: 68.4, pct: 78 },
                  { month: 'Mar 2026 (Current)', value: 76.5, pct: 85 }
                ].map(item => (
                  <div key={item.month} className="text-xs space-y-1">
                    <div className="flex justify-between">
                      <span className="text-[#6B6358] dark:text-[#A8A196]">{item.month}</span>
                      <strong className="text-[#1E1C1A] dark:text-white">₹{item.value} Lakhs</strong>
                    </div>
                    <div className="w-full bg-[#EFEAE0] dark:bg-[#252525] h-2.5 rounded-full overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-[#B38F24] to-[#D4AF37] h-full rounded-full transition-all duration-700"
                        style={{ width: `${item.pct}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sales by Category Breakdown */}
            <div className="bg-white dark:bg-[#141414] p-6 rounded-2xl border border-[#E8E2D5] dark:border-[#252525] shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <div>
                  <h3 className="font-serif text-lg font-medium">Product Portfolio Distribution</h3>
                  <p className="text-xs text-[#8C8476]">Active items per jewellery discipline</p>
                </div>
                <BarChart3 className="w-5 h-5 text-[#D4AF37]" />
              </div>

              <div className="space-y-4">
                {Object.entries(categoryBreakdown).map(([cat, count]) => {
                  const sharePct = Math.round((count / products.length) * 100);
                  return (
                    <div key={cat} className="text-xs space-y-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{cat}</span>
                        <span className="text-[#8C8476]">{count} creations ({sharePct}%)</span>
                      </div>
                      <div className="w-full bg-[#EFEAE0] dark:bg-[#252525] h-2.5 rounded-full overflow-hidden">
                        <div
                          className="bg-[#D4AF37] h-full rounded-full transition-all duration-500"
                          style={{ width: `${sharePct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Low Stock Warning Alert */}
          {lowStockProducts.length > 0 && (
            <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-300 dark:border-amber-800/40">
              <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-medium text-xs uppercase tracking-wider mb-2">
                <AlertTriangle className="w-4 h-4" />
                <span>Atelier Vault Low-Stock Inventory Alerts</span>
              </div>
              <p className="text-xs text-amber-700 dark:text-amber-300 mb-3">
                The following masterworks require atelier re-casting to prevent stockout:
              </p>
              <div className="flex flex-wrap gap-2">
                {lowStockProducts.map(p => (
                  <span
                    key={p.id}
                    className="px-3 py-1 bg-white dark:bg-[#1A1A1A] border border-amber-200 dark:border-amber-800/50 rounded-lg text-xs font-semibold"
                  >
                    {p.name} ({p.stockCount} left)
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Tab: Products Management */}
      {activeTab === 'products' && (
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-[#E8E2D5] dark:border-[#252525] p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8E2D5] dark:border-[#252525] text-[#8C8476] uppercase tracking-wider">
                <th className="pb-3">Jewel Piece</th>
                <th className="pb-3">SKU</th>
                <th className="pb-3">Category</th>
                <th className="pb-3">Price</th>
                <th className="pb-3">Metal / Stone</th>
                <th className="pb-3">Stock</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D8] dark:divide-[#252525]">
              {products.map(p => (
                <tr key={p.id} className="hover:bg-[#FAF8F5] dark:hover:bg-[#1A1A1A] transition-colors">
                  <td className="py-3 flex items-center gap-3">
                    <img src={p.images[0]} alt="" className="w-10 h-10 rounded-lg object-cover" />
                    <div>
                      <p className="font-serif font-medium text-sm truncate max-w-[200px]">{p.name}</p>
                      <p className="text-[10px] text-[#8C8476]">{p.metalPurity}</p>
                    </div>
                  </td>
                  <td className="py-3 font-mono text-[11px]">{p.sku}</td>
                  <td className="py-3">{p.category}</td>
                  <td className="py-3 font-serif font-semibold text-sm">₹{p.price.toLocaleString('en-IN')}</td>
                  <td className="py-3">{p.metal} • {p.stone}</td>
                  <td className="py-3">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                      p.stockCount < 8 ? 'bg-red-100 text-red-700' : 'bg-emerald-100 text-emerald-700'
                    }`}>
                      {p.stockCount} units
                    </span>
                  </td>
                  <td className="py-3 text-right space-x-2">
                    <button
                      onClick={() => openEditModal(p)}
                      className="p-1.5 hover:text-[#D4AF37] transition-colors"
                      title="Edit Product"
                    >
                      <Edit className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => deleteProduct(p.id)}
                      className="p-1.5 text-red-500 hover:text-red-700 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Orders Management */}
      {activeTab === 'orders' && (
        <div className="bg-white dark:bg-[#141414] rounded-2xl border border-[#E8E2D5] dark:border-[#252525] p-6 shadow-sm overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#E8E2D5] dark:border-[#252525] text-[#8C8476] uppercase tracking-wider">
                <th className="pb-3">Order ID</th>
                <th className="pb-3">Date</th>
                <th className="pb-3">Patron Name</th>
                <th className="pb-3">Total Amount</th>
                <th className="pb-3">Payment</th>
                <th className="pb-3">Courier Status</th>
                <th className="pb-3 text-right">Update Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#EAE4D8] dark:divide-[#252525]">
              {orders.map(o => (
                <tr key={o.id} className="hover:bg-[#FAF8F5] dark:hover:bg-[#1A1A1A] transition-colors">
                  <td className="py-3 font-serif font-medium">{o.id}</td>
                  <td className="py-3 text-[#8C8476]">{o.date}</td>
                  <td className="py-3">{o.shippingAddress.fullName}</td>
                  <td className="py-3 font-serif font-semibold text-sm">₹{o.grandTotal.toLocaleString('en-IN')}</td>
                  <td className="py-3">{o.paymentMethod}</td>
                  <td className="py-3">
                    <span className={`px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider ${
                      o.status === 'Delivered'
                        ? 'bg-emerald-100 text-emerald-800'
                        : o.status === 'Shipped'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}>
                      {o.status}
                    </span>
                  </td>
                  <td className="py-3 text-right">
                    <select
                      value={o.status}
                      onChange={e => updateOrderStatus(o.id, e.target.value as any)}
                      className="bg-[#FAF8F5] dark:bg-[#202020] border border-[#DDD7CC] dark:border-[#333333] rounded px-2 py-1 text-xs"
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab: Coupons Management */}
      {activeTab === 'coupons' && (
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {coupons.map(coupon => (
            <div
              key={coupon.code}
              className="p-5 rounded-2xl bg-white dark:bg-[#141414] border border-[#D4AF37]/40 shadow-sm space-y-3"
            >
              <div className="flex justify-between items-center">
                <span className="font-mono text-base font-bold text-[#D4AF37] px-2.5 py-1 bg-[#D4AF37]/15 rounded-lg">
                  {coupon.code}
                </span>
                <span className="font-serif text-lg font-bold">{coupon.discountPercentage}% OFF</span>
              </div>
              <p className="text-xs text-[#6B6358] dark:text-[#A8A196]">{coupon.description}</p>
              <div className="pt-2 border-t border-[#EAE4D8] dark:border-[#252525] text-[11px] text-[#8C8476] space-y-1">
                <p>Min Order: ₹{coupon.minPurchase.toLocaleString('en-IN')}</p>
                <p>Max Discount: ₹{coupon.maxDiscount.toLocaleString('en-IN')}</p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add / Edit Product Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={() => setIsAddModalOpen(false)}
          />
          <div className="relative bg-[#FAF8F5] dark:bg-[#151515] text-[#1E1C1A] dark:text-[#F3EFEA] rounded-2xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-[#D4AF37]/40 z-10 max-h-[90vh] overflow-y-auto">
            <h2 className="font-serif text-2xl font-light mb-6">
              {editingProduct ? 'Edit Fine Jewel Piece' : 'Catalogue New Fine Jewel'}
            </h2>

            <form onSubmit={handleSaveProduct} className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Creation Name</label>
                  <input
                    type="text"
                    required
                    value={formName}
                    onChange={e => setFormName(e.target.value)}
                    placeholder="e.g. Celestial Aurora Solitaire Ring"
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Category</label>
                  <select
                    value={formCategory}
                    onChange={e => setFormCategory(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  >
                    <option value="Rings">Rings</option>
                    <option value="Necklaces">Necklaces</option>
                    <option value="Earrings">Earrings</option>
                    <option value="Bracelets">Bracelets</option>
                    <option value="Chains">Chains</option>
                    <option value="Watches">Watches</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Selling Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formPrice}
                    onChange={e => setFormPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Original Price (₹)</label>
                  <input
                    type="number"
                    required
                    value={formOriginalPrice}
                    onChange={e => setFormOriginalPrice(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Precious Metal</label>
                  <select
                    value={formMetal}
                    onChange={e => setFormMetal(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  >
                    <option value="Yellow Gold">Yellow Gold</option>
                    <option value="Rose Gold">Rose Gold</option>
                    <option value="White Gold">White Gold</option>
                    <option value="Platinum">Platinum</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Primary Gemstone</label>
                  <select
                    value={formStone}
                    onChange={e => setFormStone(e.target.value as any)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  >
                    <option value="Diamond">Diamond</option>
                    <option value="Emerald">Emerald</option>
                    <option value="Ruby">Ruby</option>
                    <option value="Sapphire">Sapphire</option>
                    <option value="Pearl">Pearl</option>
                    <option value="None">None (Solid Metal)</option>
                  </select>
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Hallmark / Purity</label>
                  <input
                    type="text"
                    value={formMetalPurity}
                    onChange={e => setFormMetalPurity(e.target.value)}
                    placeholder="e.g. 18K Hallmarked (750)"
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                </div>

                <div>
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Stock Count</label>
                  <input
                    type="number"
                    value={formStock}
                    onChange={e => setFormStock(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Product Image URL</label>
                  <input
                    type="url"
                    required
                    value={formImage}
                    onChange={e => setFormImage(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block uppercase tracking-wider text-[#8C8476] mb-1">Description</label>
                  <textarea
                    rows={3}
                    value={formDescription}
                    onChange={e => setFormDescription(e.target.value)}
                    className="w-full px-3 py-2 rounded-lg border border-[#DDD7CC] dark:border-[#333333] bg-transparent"
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-6 py-2.5 rounded-lg border border-[#DDD7CC] font-semibold uppercase tracking-wider"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 bg-[#D4AF37] hover:bg-[#B38F24] text-[#121110] font-bold uppercase tracking-widest rounded-lg transition-colors shadow-md"
                >
                  Save to Atelier Inventory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
