import React, { createContext, useContext, useState, useEffect } from 'react';
import { Product, CartItem, Order, User, Coupon } from '../types';
import { INITIAL_PRODUCTS, INITIAL_COUPONS } from '../data/products';

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface ShopContextType {
  // Theme
  isDark: boolean;
  toggleTheme: () => void;
  // Navigation / Views
  currentView: 'home' | 'shop' | 'product-details' | 'cart' | 'checkout' | 'account' | 'admin' | 'about' | 'contact';
  navigateTo: (view: ShopContextType['currentView'], productId?: string) => void;
  selectedProductId: string | null;
  // Products
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (product: Product) => void;
  deleteProduct: (id: string) => void;
  // Cart
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, selectedSize?: string) => void;
  removeFromCart: (productId: string, selectedSize: string) => void;
  updateCartQuantity: (productId: string, selectedSize: string, delta: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  // Wishlist
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  // Quick View Modal
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
  // User & Auth
  currentUser: User | null;
  loginAs: (role: 'customer' | 'admin') => void;
  logout: () => void;
  updateUserProfile: (updated: Partial<User>) => void;
  // Orders
  orders: Order[];
  placeOrder: (order: Omit<Order, 'id' | 'date'>) => Order;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  // Coupons
  coupons: Coupon[];
  appliedCoupon: Coupon | null;
  applyCoupon: (code: string) => boolean;
  removeCoupon: () => void;
  // Recently viewed
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
  // Toast notifications
  toasts: Toast[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  dismissToast: (id: string) => void;
  // Search
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  // Mobile drawer
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (open: boolean) => void;
}

const ShopContext = createContext<ShopContextType | undefined>(undefined);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    return localStorage.getItem('aur_theme') === 'dark';
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aur_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aur_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark(prev => !prev);

  // View & Router state
  const [currentView, setCurrentView] = useState<ShopContextType['currentView']>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);

  const navigateTo = (view: ShopContextType['currentView'], productId?: string) => {
    setCurrentView(view);
    if (productId) {
      setSelectedProductId(productId);
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Products state (persisted in localStorage or default)
  const [products, setProducts] = useState<Product[]>(() => {
    const saved = localStorage.getItem('aur_products');
    return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
  });

  useEffect(() => {
    localStorage.setItem('aur_products', JSON.stringify(products));
  }, [products]);

  const addProduct = (p: Product) => {
    setProducts(prev => [p, ...prev]);
    showToast(`Added product "${p.name}" successfully`, 'success');
  };

  const updateProduct = (p: Product) => {
    setProducts(prev => prev.map(item => item.id === p.id ? p : item));
    showToast(`Updated "${p.name}" successfully`, 'success');
  };

  const deleteProduct = (id: string) => {
    setProducts(prev => prev.filter(p => p.id !== id));
    showToast('Product deleted from inventory', 'info');
  };

  // Cart state
  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem('aur_cart');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('aur_cart', JSON.stringify(cart));
  }, [cart]);

  // Wishlist state
  const [wishlist, setWishlist] = useState<string[]>(() => {
    const saved = localStorage.getItem('aur_wishlist');
    return saved ? JSON.parse(saved) : ['aur-001', 'aur-004'];
  });

  useEffect(() => {
    localStorage.setItem('aur_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from your Wishlist', 'info');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to your Wishlist ♥', 'success');
        return [...prev, productId];
      }
    });
  };

  const isInWishlist = (productId: string) => wishlist.includes(productId);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  // Toast notifications
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      dismissToast(id);
    }, 3800);
  };

  const dismissToast = (id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  };

  // Cart operations
  const addToCart = (product: Product, quantity = 1, selectedSize?: string) => {
    const size = selectedSize || product.sizes[0] || 'Standard';
    setCart(prev => {
      const index = prev.findIndex(item => item.product.id === product.id && item.selectedSize === size);
      if (index > -1) {
        const next = [...prev];
        next[index].quantity += quantity;
        return next;
      }
      return [...prev, { product, quantity, selectedSize: size }];
    });
    showToast(`Added ${quantity}x "${product.name}" to your Cart`, 'success');
  };

  const removeFromCart = (productId: string, selectedSize: string) => {
    setCart(prev => prev.filter(item => !(item.product.id === productId && item.selectedSize === selectedSize)));
    showToast('Removed item from Cart', 'info');
  };

  const updateCartQuantity = (productId: string, selectedSize: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.product.id === productId && item.selectedSize === selectedSize) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean) as CartItem[]);
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Coupons
  const [coupons] = useState<Coupon[]>(INITIAL_COUPONS);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);

  const applyCoupon = (code: string) => {
    const found = coupons.find(c => c.code.toUpperCase() === code.trim().toUpperCase());
    if (!found) {
      showToast('Invalid promo code. Try AURELIA10 or ROYAL20', 'error');
      return false;
    }
    if (cartTotal < found.minPurchase) {
      showToast(`Coupon valid only on orders above ₹${found.minPurchase.toLocaleString('en-IN')}`, 'error');
      return false;
    }
    setAppliedCoupon(found);
    showToast(`Coupon "${found.code}" applied! ${found.discountPercentage}% OFF`, 'success');
    return true;
  };

  const removeCoupon = () => {
    setAppliedCoupon(null);
    showToast('Coupon code removed', 'info');
  };

  // User state
  const [currentUser, setCurrentUser] = useState<User | null>({
    id: 'usr-vip-001',
    name: 'Mira Rajput',
    email: 'mira.rajput@luxury.com',
    role: 'customer',
    phone: '+91 98765 43210',
    addresses: [
      {
        id: 'addr-1',
        fullName: 'Mira Rajput',
        phone: '+91 98765 43210',
        street: 'Penthouse 4B, The Oberoi Sky Heights, Worli Sea Face',
        city: 'Mumbai',
        state: 'Maharashtra',
        pincode: '400018',
        isDefault: true
      },
      {
        id: 'addr-2',
        fullName: 'Mira Rajput (Studio)',
        phone: '+91 98765 43210',
        street: 'Suite 201, Grand Emporium, Jubilee Hills',
        city: 'Hyderabad',
        state: 'Telangana',
        pincode: '500033',
        isDefault: false
      }
    ],
    joinedDate: '2025-08-15'
  });

  const loginAs = (role: 'customer' | 'admin') => {
    if (role === 'admin') {
      setCurrentUser({
        id: 'adm-001',
        name: 'Lord Alistair Sterling',
        email: 'director@aureliajewels.com',
        role: 'admin',
        phone: '+91 99999 88888',
        addresses: [],
        joinedDate: '2024-01-01'
      });
      showToast('Switched to Administrator Master Account', 'success');
      navigateTo('admin');
    } else {
      setCurrentUser({
        id: 'usr-vip-001',
        name: 'Mira Rajput',
        email: 'mira.rajput@luxury.com',
        role: 'customer',
        phone: '+91 98765 43210',
        addresses: [
          {
            id: 'addr-1',
            fullName: 'Mira Rajput',
            phone: '+91 98765 43210',
            street: 'Penthouse 4B, The Oberoi Sky Heights, Worli Sea Face',
            city: 'Mumbai',
            state: 'Maharashtra',
            pincode: '400018',
            isDefault: true
          }
        ],
        joinedDate: '2025-08-15'
      });
      showToast('Logged in as Valued Patron: Mira Rajput', 'success');
      navigateTo('account');
    }
  };

  const logout = () => {
    setCurrentUser(null);
    showToast('Logged out of Aurelia & Co.', 'info');
    navigateTo('home');
  };

  const updateUserProfile = (updated: Partial<User>) => {
    if (currentUser) {
      setCurrentUser({ ...currentUser, ...updated });
      showToast('Profile information updated', 'success');
    }
  };

  // Orders
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('aur_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: 'ORD-2026-9041',
        date: '2026-03-24',
        status: 'Delivered',
        items: [
          {
            productId: 'aur-001',
            productName: 'The Celestia Solitaire Diamond Ring',
            productImage: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=600&q=80',
            price: 84999,
            quantity: 1,
            selectedSize: '7'
          }
        ],
        shippingAddress: {
          id: 'addr-1',
          fullName: 'Mira Rajput',
          phone: '+91 98765 43210',
          street: 'Penthouse 4B, The Oberoi Sky Heights, Worli Sea Face',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400018',
          isDefault: true
        },
        deliveryMethod: 'White-Glove Insured Armoured Express',
        paymentMethod: 'UPI',
        paymentStatus: 'Paid',
        subtotal: 84999,
        discount: 8499,
        shipping: 0,
        grandTotal: 76500,
        trackingNumber: 'AUR-SEC-IND-884920',
        estimatedDelivery: '2026-03-26'
      },
      {
        id: 'ORD-2026-9088',
        date: '2026-04-02',
        status: 'Shipped',
        items: [
          {
            productId: 'aur-004',
            productName: 'Aurelia Eternity Tennis Bracelet',
            productImage: 'https://images.unsplash.com/photo-1611591475870-07755b62b146?auto=format&fit=crop&w=600&q=80',
            price: 112000,
            quantity: 1,
            selectedSize: '7.0 inch'
          }
        ],
        shippingAddress: {
          id: 'addr-1',
          fullName: 'Mira Rajput',
          phone: '+91 98765 43210',
          street: 'Penthouse 4B, The Oberoi Sky Heights, Worli Sea Face',
          city: 'Mumbai',
          state: 'Maharashtra',
          pincode: '400018',
          isDefault: true
        },
        deliveryMethod: 'White-Glove Insured Armoured Express',
        paymentMethod: 'Credit/Debit Card',
        paymentStatus: 'Paid',
        subtotal: 112000,
        discount: 10000,
        shipping: 0,
        grandTotal: 102000,
        trackingNumber: 'AUR-SEC-IND-991204',
        estimatedDelivery: '2026-04-07'
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('aur_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (orderData: Omit<Order, 'id' | 'date'>): Order => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toISOString().split('T')[0]
    };
    setOrders(prev => [newOrder, ...prev]);
    clearCart();
    setAppliedCoupon(null);
    showToast(`Order #${newOrder.id} confirmed! Thank you for choosing Aurelia & Co.`, 'success');
    return newOrder;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status } : o));
    showToast(`Order ${orderId} marked as ${status}`, 'info');
  };

  // Recently viewed
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);

  const addRecentlyViewed = (product: Product) => {
    setRecentlyViewed(prev => {
      const filtered = prev.filter(p => p.id !== product.id);
      return [product, ...filtered].slice(0, 6);
    });
  };

  // Search & Mobile menu state
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <ShopContext.Provider
      value={{
        isDark,
        toggleTheme,
        currentView,
        navigateTo,
        selectedProductId,
        products,
        addProduct,
        updateProduct,
        deleteProduct,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartTotal,
        cartCount,
        wishlist,
        toggleWishlist,
        isInWishlist,
        quickViewProduct,
        setQuickViewProduct,
        currentUser,
        loginAs,
        logout,
        updateUserProfile,
        orders,
        placeOrder,
        updateOrderStatus,
        coupons,
        appliedCoupon,
        applyCoupon,
        removeCoupon,
        recentlyViewed,
        addRecentlyViewed,
        toasts,
        showToast,
        dismissToast,
        searchQuery,
        setSearchQuery,
        isSearchOpen,
        setIsSearchOpen,
        isMobileMenuOpen,
        setIsMobileMenuOpen
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
