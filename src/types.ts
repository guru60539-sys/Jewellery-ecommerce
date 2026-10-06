export interface ProductReview {
  id: string;
  userName: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  sku: string;
  name: string;
  category: 'Rings' | 'Necklaces' | 'Earrings' | 'Bracelets' | 'Chains' | 'Watches';
  collection: 'Bridal Royalty' | 'Solitaire Luxe' | 'Heritage Gold' | 'Modern Minimal' | 'Eternal Diamond';
  price: number;
  originalPrice: number;
  discountPercentage: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  material: string;
  metalPurity: string; // e.g. 18K Yellow Gold, 22K Hallmarked, 950 Platinum, Rose Gold
  metal: 'Yellow Gold' | 'Rose Gold' | 'White Gold' | 'Platinum' | 'Sterling Silver';
  stone: 'Diamond' | 'Emerald' | 'Ruby' | 'Sapphire' | 'Pearl' | 'Moissanite' | 'None';
  stoneCarat?: string;
  weight: string; // e.g. 4.2g
  dimensions: string; // e.g. 18mm x 12mm
  sizes: string[]; // e.g. ['6', '7', '8', '9'] or ['Standard', '16 inch', '18 inch']
  color: string;
  inStock: boolean;
  stockCount: number;
  isNewArrival: boolean;
  isBestSeller: boolean;
  isFeatured: boolean;
  specifications: { [key: string]: string };
  reviews: ProductReview[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize: string;
}

export interface WishlistItem {
  productId: string;
  addedAt: string;
}

export interface Address {
  id: string;
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  isDefault: boolean;
}

export interface OrderItem {
  productId: string;
  productName: string;
  productImage: string;
  price: number;
  quantity: number;
  selectedSize: string;
}

export interface Order {
  id: string;
  date: string;
  status: 'Pending' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: OrderItem[];
  shippingAddress: Address;
  deliveryMethod: string;
  paymentMethod: 'UPI' | 'Credit/Debit Card' | 'Net Banking' | 'Cash on Delivery';
  paymentStatus: 'Paid' | 'Pending';
  subtotal: number;
  discount: number;
  shipping: number;
  grandTotal: number;
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'admin';
  phone: string;
  addresses: Address[];
  joinedDate: string;
}

export interface Coupon {
  code: string;
  discountPercentage: number;
  minPurchase: number;
  maxDiscount: number;
  description: string;
}
