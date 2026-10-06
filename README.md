# AURELIA & CO. — Haute Joaillerie & Fine Luxury Jewellery E-Commerce

A modern, fully responsive luxury fine jewellery e-commerce platform built with React, TypeScript, and Tailwind CSS.

---

## ✨ Features & Architecture

### 👑 Brand & Visual Aesthetic
- **Brand**: **AURELIA & CO. | Haute Joaillerie**
- **Palette**: Ivory / Cream (`#FAF8F5`), Champagne Gold (`#D4AF37`), Deep Noir (`#121110`), and Subtle Beige
- **Typography**: Editorial serif headings (`Cormorant Garamond`) paired with modern clean sans (`Plus Jakarta Sans`)
- **Theme**: Luxury Dark Mode & Ivory Light Mode toggle with persistence

### 🏠 Homepage
1. **Announcement Bar**: "Complimentary Insured White-Glove Shipping on Orders Above ₹999", hallmarking guarantees, toll-free concierge
2. **Luxury Navbar**: Navigation links, live search trigger, dark/light theme switch, interactive wishlist counter, shopping bag with badge, and role switcher (Patron / Administrator)
3. **Hero Section**: Large cinematic photography slider with subtexts and dual action buttons
4. **Featured Categories**: Rings, Necklaces, Earrings, Bracelets, Chains, Watches with hover scale animations
5. **New Arrivals Product Carousel**: Interactive pagination controls
6. **Best Sellers Section**: Most adorned pieces by patrons
7. **Promotional Banner**: "Celebrate Every Moment" with promo code `ROYAL20`
8. **Signature Collections Showcase**: Bridal Royalty, Solitaire Luxe, and Modern Minimal
9. **The Aurelia Standard**: Certified Quality, Insured Armoured Delivery, 15-Day Easy Returns, Secure Payments
10. **Patron Testimonials**: Verified high-society reviews and star ratings
11. **Instagram Gallery**: `#AureliaMoments` grid with hover effects
12. **The Privé Gazette**: Newsletter subscription with instant feedback toast
13. **Comprehensive Footer**: Trust badges, category directories, flagship salon address, social links

### 💎 Shop Page
- Comprehensive product grid featuring pricing in ₹, original price, discount percentage, ratings, wishlist heart toggle, quick view, and Add to Bag
- **Multi-Attribute Filters**:
  - Category (Rings, Necklaces, Earrings, Bracelets, Chains, Watches)
  - Price Range Slider (₹30,000 to ₹3,00,000+)
  - Metal (Yellow Gold, Rose Gold, White Gold, Platinum)
  - Primary Gemstone (Diamond, Emerald, Ruby, Sapphire, Pearl, None)
  - Collection filter
  - Minimum Rating filter
- **Sorting**: Featured, Newest First, Price Low-to-High, Price High-to-Low, Best Rated
- **Mobile Filter Drawer** for small screens

### 🔍 Product Details Page
- High-resolution interactive product gallery with **real-time magnifier zoom** on mouse hover
- Gold hallmark stamps and gemstone carat breakdown
- Ring & bangle size selector
- Quantity stepper controls
- Add to Cart, Instant Buy Now, and Wishlist toggle
- Live Indian PIN Code delivery checker with delivery date estimates
- Detailed specifications table (IGI certification, diamond clarity, metal hallmark)
- Patron reviews list and interactive "Submit Review" form
- Related pieces recommendation section
- Sticky Add to Cart bottom bar on mobile devices

### 🛍️ Shopping Bag & Cart
- Item listings with thumbnail, selected size, metal purity, and price calculation
- Quantity increment / decrement and remove button
- "Save for Later" wishlist relocation
- Interactive promo coupon box with support for `AURELIA10`, `ROYAL20`, and `FIRSTLUXE`
- Order summary with breakdown of subtotal, complimentary insured shipping, discount, and grand total

### 💳 6-Step Checkout
1. **Patron Verification**: Login or Guest Checkout
2. **Insured Shipping Address**: Delivery address and contact number
3. **Delivery Method**: Armoured Insured Express (Complimentary) or Same-Day Atelier Hand Delivery
4. **Payment Options**: UPI (GPay/PhonePe), Credit/Debit Card, Net Banking, and Cash on Delivery
5. **Order Review**: Itemized bill and final authentication
6. **Order Confirmation**: Order reference ID, live courier tracking number, and celebration confetti animation

### 👤 Patron Account
- Patron profile details and role indicator
- Order history with live delivery stages (`Delivered`, `Shipped`, `Processing`)
- Real-time armoured tracking numbers
- Saved wishlist with direct Add-to-Bag
- Registered delivery residence vaults
- Recently viewed jewels
- Password update modal

### 🛡️ Admin Master Dashboard
- **6 Executive KPI Cards**: Total Revenue, Total Orders, Patron Count, Live Catalogue, Pending Courier, Low Stock alerts
- **Visual Analytics**:
  - Monthly Revenue Run-rate progress bars
  - Product portfolio distribution by jewellery category
- **Product Management**: Add, edit, and delete pieces with image URLs, metal purities, and stock tracking
- **Order Orchestration**: Real-time order status updater (`Pending`, `Processing`, `Shipped`, `Delivered`, `Cancelled`)
- **Coupons Management**: View active promotional discounts and rules
- **Low Stock Inventory Alerts**: Highlights pieces with fewer than 8 units remaining

### 📱 Mobile Experience
- Dedicated mobile bottom navigation bar (Home, Shop, Wishlist, Cart, Account)
- Mobile hamburger menu drawer
- Sticky mobile bottom CTA bar on product pages
- Fully responsive touch-friendly filters and modals

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start development server
npm run dev

# 3. Create production build
npm run build
```
