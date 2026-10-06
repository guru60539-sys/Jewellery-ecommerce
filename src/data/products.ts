import { Product, Coupon } from '../types';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'aur-001',
    sku: 'RNG-SOL-01',
    name: 'The Celestia Solitaire Diamond Ring',
    category: 'Rings',
    collection: 'Solitaire Luxe',
    price: 84999,
    originalPrice: 99999,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 42,
    images: [
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80',
    ],
    description: 'A signature masterpiece crafted in 18K Yellow Gold crowning a conflict-free, VVS1 brilliant-cut solitaire diamond. Designed to capture light from every vantage point.',
    material: '18K Solid Gold & Natural Diamond',
    metalPurity: '18K Hallmarked (750)',
    metal: 'Yellow Gold',
    stone: 'Diamond',
    stoneCarat: '1.25 Carat VVS1 / E Color',
    weight: '4.8 grams',
    dimensions: 'Band: 2.1mm | Setting: 6.5mm',
    sizes: ['6', '7', '8', '9', '10'],
    color: 'Warm Gold',
    inStock: true,
    stockCount: 14,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Gold Purity': '18 Karat Yellow Gold (Hallmarked)',
      'Diamond Cut': 'Round Brilliant Ideal Cut',
      'Diamond Clarity': 'VVS1',
      'Diamond Color': 'E (Colorless)',
      'Certificate': 'IGI Certified with Laser Inscription',
      'Warranty': 'Lifetime Plating & Stone Polish Guarantee'
    },
    reviews: [
      {
        id: 'rev-1',
        userName: 'Aishwarya Malhotra',
        rating: 5,
        date: '2026-03-12',
        comment: 'Exquisite craftsmanship! The sparkle is breathtaking and the fit is perfection. Comes in a stunning velvet box.',
        verified: true
      },
      {
        id: 'rev-2',
        userName: 'Devansh Singhania',
        rating: 5,
        date: '2026-02-28',
        comment: 'Proposed to my fiancé with this ring and she was in tears. Worth every single rupee!',
        verified: true
      }
    ]
  },
  {
    id: 'aur-002',
    sku: 'NCK-ROY-02',
    name: 'Empress Royal Emerald & Diamond Choker',
    category: 'Necklaces',
    collection: 'Bridal Royalty',
    price: 245000,
    originalPrice: 289000,
    discountPercentage: 15,
    rating: 5.0,
    reviewCount: 28,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475870-07755b62b146?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An ode to royalty. Features Colombian deep-green emeralds nestled amidst brilliant diamond clusters on 22K yellow gold.',
    material: '22K Gold & Zambian Emeralds with Diamonds',
    metalPurity: '22K BIS Hallmarked (916)',
    metal: 'Yellow Gold',
    stone: 'Emerald',
    stoneCarat: '4.80 Carats Emerald & 2.4 Carats Diamonds',
    weight: '38.5 grams',
    dimensions: 'Length: 16 inch adjustable dori',
    sizes: ['16 inch (Standard)', '18 inch'],
    color: 'Royal Emerald Green & Gold',
    inStock: true,
    stockCount: 6,
    isNewArrival: true,
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Gold Purity': '22 Karat Gold (916 BIS)',
      'Primary Gem': 'Natural Untreated Emeralds',
      'Diamond Accents': 'SI-GH Grade Round Diamonds',
      'Necklace Type': 'Choker Collar with Silk Adjustable Cord',
      'Certificate': 'SGL Certified Gemstone Authentication'
    },
    reviews: [
      {
        id: 'rev-3',
        userName: 'Rhea Kapoor',
        rating: 5,
        date: '2026-03-01',
        comment: 'Royal grandeur in every detail. Wore it for my reception and received endless compliments.',
        verified: true
      }
    ]
  },
  {
    id: 'aur-003',
    sku: 'EAR-PAR-03',
    name: 'Lumière Diamond Drop Waterfall Earrings',
    category: 'Earrings',
    collection: 'Eternal Diamond',
    price: 52000,
    originalPrice: 65000,
    discountPercentage: 20,
    rating: 4.8,
    reviewCount: 35,
    images: [
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1617038260897-41a1f14a8ca0?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Cascading drops of light meticulously set in 18K White Gold. Artfully proportioned to sway gently with every step.',
    material: '18K White Gold & Natural Diamonds',
    metalPurity: '18K Hallmarked (750)',
    metal: 'White Gold',
    stone: 'Diamond',
    stoneCarat: '1.6 Carats Brilliant Cut',
    weight: '8.2 grams',
    dimensions: 'Length: 42mm | Width: 8mm',
    sizes: ['Standard Pair'],
    color: 'Radiant White Gold',
    inStock: true,
    stockCount: 18,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    specifications: {
      'Metal': '18K White Gold Rhodium Finish',
      'Backing': 'Comfort Secure Push Back with Safety Clip',
      'Diamond Total': '1.60 ct. tw.',
      'Certification': 'IGI Diamond Certificate included'
    },
    reviews: [
      {
        id: 'rev-4',
        userName: 'Nalini Varma',
        rating: 5,
        date: '2026-02-14',
        comment: 'Extremely lightweight considering the dramatic cascade. Brilliant shine under chandelier lighting!',
        verified: true
      }
    ]
  },
  {
    id: 'aur-004',
    sku: 'BRC-TEN-04',
    name: 'Aurelia Eternity Tennis Bracelet',
    category: 'Bracelets',
    collection: 'Modern Minimal',
    price: 112000,
    originalPrice: 135000,
    discountPercentage: 17,
    rating: 4.9,
    reviewCount: 51,
    images: [
      'https://images.unsplash.com/photo-1611591475870-07755b62b146?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An everyday luxury essential. A seamless row of brilliant round cut diamonds bezel-set in 18K Rose Gold with double-safety lock.',
    material: '18K Rose Gold & VS Diamonds',
    metalPurity: '18K Hallmarked (750)',
    metal: 'Rose Gold',
    stone: 'Diamond',
    stoneCarat: '3.0 Carats Total Weight',
    weight: '12.4 grams',
    dimensions: 'Width: 3mm | Length: 7 inch',
    sizes: ['6.5 inch', '7.0 inch', '7.5 inch'],
    color: 'Warm Rose Gold',
    inStock: true,
    stockCount: 10,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: true,
    specifications: {
      'Metal': '18K Rose Gold',
      'Lock Mechanism': 'Box Clasp with Dual Figure-Eight Safety Latches',
      'Stone Setting': 'Classic Four-Prong Basket Setting',
      'Diamond Cut': 'Excellent'
    },
    reviews: [
      {
        id: 'rev-5',
        userName: 'Pooja Hegde',
        rating: 5,
        date: '2026-01-20',
        comment: 'I wear this every single day. The rose gold hue is soft and opulent. Pure perfection.',
        verified: true
      }
    ]
  },
  {
    id: 'aur-005',
    sku: 'CHN-HER-05',
    name: 'Imperial Heritage Figaro Gold Chain',
    category: 'Chains',
    collection: 'Heritage Gold',
    price: 68000,
    originalPrice: 79000,
    discountPercentage: 14,
    rating: 4.7,
    reviewCount: 39,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Crafted in 22K pure hallmarked gold, this Figaro chain exhibits high-sheen diamond cuts that reflect light with quiet luxury.',
    material: '22K Solid Gold',
    metalPurity: '22K BIS Hallmarked (916)',
    metal: 'Yellow Gold',
    stone: 'None',
    weight: '16.2 grams',
    dimensions: 'Length: 22 inch | Gauge: 3.5mm',
    sizes: ['20 inch', '22 inch', '24 inch'],
    color: 'Pure Yellow Gold',
    inStock: true,
    stockCount: 12,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    specifications: {
      'Purity': '91.6% Pure Gold (22K)',
      'Weave Type': 'Figaro 3+1 Diamond Cut Links',
      'Clasp': 'Heavy Duty Lobster Clasp',
      'Origin': 'Handcrafted in Mumbai Atelier'
    },
    reviews: [
      {
        id: 'rev-6',
        userName: 'Vikramaditya Roy',
        rating: 5,
        date: '2026-02-05',
        comment: 'Very solid feel and stunning shine. Authentic hallmark stamp easily visible.',
        verified: true
      }
    ]
  },
  {
    id: 'aur-006',
    sku: 'WTC-CHRONO-06',
    name: 'Aethelgard Diamond Chronometer Watch',
    category: 'Watches',
    collection: 'Modern Minimal',
    price: 185000,
    originalPrice: 220000,
    discountPercentage: 16,
    rating: 4.9,
    reviewCount: 19,
    images: [
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Swiss precision movement encased in surgical steel with 18K yellow gold bezel ringed with 48 pavé diamonds and sapphire crystal glass.',
    material: 'Stainless Steel & 18K Gold Bezel with Diamond Indices',
    metalPurity: '18K Gold Accent',
    metal: 'Yellow Gold',
    stone: 'Diamond',
    stoneCarat: '0.75 Carats Pavé Bezel',
    weight: '86.0 grams',
    dimensions: 'Case Diameter: 36mm | Thickness: 8.5mm',
    sizes: ['Adjustable Steel & Gold Bracelet'],
    color: 'Champagne & Two-Tone Gold',
    inStock: true,
    stockCount: 7,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    specifications: {
      'Movement': 'Swiss Automatic Calibre 2824',
      'Crystal': 'Anti-reflective Scratch Resistant Sapphire',
      'Water Resistance': '50 Metres (5 ATM)',
      'Dial': 'Champagne Sunburst with 12 Diamond Markers'
    },
    reviews: [
      {
        id: 'rev-7',
        userName: 'Samarth Kulkarni',
        rating: 5,
        date: '2026-03-10',
        comment: 'A true collector’s timepiece. Blends high jewellery with horological precision.',
        verified: true
      }
    ]
  },
  {
    id: 'aur-007',
    sku: 'RNG-SAP-07',
    name: 'Royal Ceylon Sapphire & Diamond Cocktail Ring',
    category: 'Rings',
    collection: 'Bridal Royalty',
    price: 98000,
    originalPrice: 115000,
    discountPercentage: 15,
    rating: 4.8,
    reviewCount: 22,
    images: [
      'https://images.unsplash.com/photo-1603561591411-07134e71a2a9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1605100804763-247f67b3557e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1598560917505-59a3ad559071?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'An intense cornflower blue cushion-cut Ceylon sapphire enveloped in a double halo of brilliant micro-pavé diamonds.',
    material: '950 Platinum & Ceylon Sapphire',
    metalPurity: '950 Platinum',
    metal: 'Platinum',
    stone: 'Sapphire',
    stoneCarat: '2.5 Carats Sapphire + 0.8ct Diamonds',
    weight: '6.4 grams',
    dimensions: 'Center motif: 14mm x 12mm',
    sizes: ['6', '7', '8', '9'],
    color: 'Royal Blue & Platinum White',
    inStock: true,
    stockCount: 8,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    specifications: {
      'Gemstone': 'Natural Unheated Sri Lankan Sapphire',
      'Metal': 'Pure 950 Platinum',
      'Halo': 'Double Micro-Prong Diamond Halo',
      'Hallmark': 'PT950 Stamped'
    },
    reviews: []
  },
  {
    id: 'aur-008',
    sku: 'NCK-PRL-08',
    name: 'South Sea Cultured Pearl & Gold Pendant',
    category: 'Necklaces',
    collection: 'Modern Minimal',
    price: 36000,
    originalPrice: 42000,
    discountPercentage: 14,
    rating: 4.9,
    reviewCount: 31,
    images: [
      'https://images.unsplash.com/photo-1599643477877-530eb83abc8e?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'A luminous 11mm Australian South Sea pearl suspended from an art deco bale set with sparkling brilliant diamonds in 18K gold.',
    material: '18K Yellow Gold & South Sea Pearl',
    metalPurity: '18K Hallmarked (750)',
    metal: 'Yellow Gold',
    stone: 'Pearl',
    stoneCarat: '11mm Pearl + 0.15ct Diamond',
    weight: '5.2 grams',
    dimensions: 'Chain: 18 inch | Pearl: 11.2mm',
    sizes: ['18 inch'],
    color: 'Iridescent Cream & Gold',
    inStock: true,
    stockCount: 15,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    specifications: {
      'Pearl Type': 'Grade AAA South Sea Cultured Pearl',
      'Lustre': 'High Mirror Sheen',
      'Chain Type': '18K Delicate Cable Chain with Lobster Clasp'
    },
    reviews: []
  },
  {
    id: 'aur-009',
    sku: 'EAR-RBY-09',
    name: 'Crimson Glow Burmese Ruby Studs',
    category: 'Earrings',
    collection: 'Heritage Gold',
    price: 45000,
    originalPrice: 55000,
    discountPercentage: 18,
    rating: 4.9,
    reviewCount: 16,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1630019852942-f89202989a59?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Vivid pigeon-blood red natural rubies encircled by radiant diamond flower petals in 18K yellow gold.',
    material: '18K Gold & Burmese Rubies',
    metalPurity: '18K Hallmarked (750)',
    metal: 'Yellow Gold',
    stone: 'Ruby',
    stoneCarat: '1.8 Carats Pigeon Blood Ruby',
    weight: '4.5 grams',
    dimensions: 'Diameter: 9.5mm',
    sizes: ['Standard Pair'],
    color: 'Crimson Ruby & Gold',
    inStock: true,
    stockCount: 11,
    isNewArrival: false,
    isBestSeller: false,
    isFeatured: false,
    specifications: {
      'Ruby Origin': 'Mogok, Burma (Myanmar)',
      'Clarity': 'Eye-clean rich saturation',
      'Closure': 'Screw back threaded post for safety'
    },
    reviews: []
  },
  {
    id: 'aur-010',
    sku: 'BRC-KDA-10',
    name: 'Nawabi Antique Jadau Gold Kada',
    category: 'Bracelets',
    collection: 'Bridal Royalty',
    price: 178000,
    originalPrice: 198000,
    discountPercentage: 10,
    rating: 5.0,
    reviewCount: 14,
    images: [
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1611591475870-07755b62b146?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Exquisite 22K handcrafted antique finished temple kada with intricate meenakari enamel work on the interior rim.',
    material: '22K Hallmarked Antique Gold with Polki Kundan',
    metalPurity: '22K BIS Hallmarked (916)',
    metal: 'Yellow Gold',
    stone: 'Moissanite',
    weight: '29.8 grams',
    dimensions: 'Size: 2.4, 2.6, 2.8',
    sizes: ['2.4 (Small)', '2.6 (Medium)', '2.8 (Large)'],
    color: 'Antique Yellow Gold',
    inStock: true,
    stockCount: 4,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    specifications: {
      'Craft': 'Heritage Bikaneri Jadau Craftsmanship',
      'Enamel': 'Royal Blue & Crimson Meenakari Backing',
      'Opening': 'Screw clasp hinge for effortless wear'
    },
    reviews: []
  },
  {
    id: 'aur-011',
    sku: 'CHN-ROSE-11',
    name: 'Sleek Venetian Box Chain in Rose Gold',
    category: 'Chains',
    collection: 'Modern Minimal',
    price: 32000,
    originalPrice: 38000,
    discountPercentage: 16,
    rating: 4.8,
    reviewCount: 27,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Sleek, fluid Venetian square box chain crafted in 18K Rose Gold with a liquid mirror-like polish.',
    material: '18K Rose Gold',
    metalPurity: '18K Hallmarked (750)',
    metal: 'Rose Gold',
    stone: 'None',
    weight: '7.8 grams',
    dimensions: 'Length: 18 inch | Width: 1.8mm',
    sizes: ['16 inch', '18 inch', '20 inch'],
    color: 'Rose Gold',
    inStock: true,
    stockCount: 16,
    isNewArrival: false,
    isBestSeller: true,
    isFeatured: false,
    specifications: {
      'Metal': '18K Italian Rose Gold',
      'Clasp': 'Sturdy Lobster Clasp with stamped hallmark',
      'Finish': 'High Gloss Diamond Polished'
    },
    reviews: []
  },
  {
    id: 'aur-012',
    sku: 'WTC-ONYX-12',
    name: 'Nocturne Onyx Dial Dress Watch',
    category: 'Watches',
    collection: 'Eternal Diamond',
    price: 142000,
    originalPrice: 168000,
    discountPercentage: 15,
    rating: 4.9,
    reviewCount: 11,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1000&q=80',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1000&q=80'
    ],
    description: 'Ultra-thin dress watch showcasing a genuine pitch-black natural onyx stone dial encased in 18K Rose Gold with alligator-textured strap.',
    material: '18K Rose Gold & Black Onyx Dial',
    metalPurity: '18K Rose Gold',
    metal: 'Rose Gold',
    stone: 'Diamond',
    stoneCarat: 'Single 0.10ct Diamond at 12 o\'clock',
    weight: '44.0 grams',
    dimensions: 'Case: 38mm | Thickness: 6.8mm',
    sizes: ['Standard Leather Strap'],
    color: 'Rose Gold & Deep Noir',
    inStock: true,
    stockCount: 5,
    isNewArrival: true,
    isBestSeller: false,
    isFeatured: true,
    specifications: {
      'Dial': 'Natural Black Onyx Stone Dial (Each unique)',
      'Movement': 'Ultra-slim Quartz Calibre',
      'Glass': 'Sapphire Crystal with Anti-Scratch Coating'
    },
    reviews: []
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'AURELIA10',
    discountPercentage: 10,
    minPurchase: 10000,
    maxDiscount: 15000,
    description: '10% off on your luxury purchase up to ₹15,000'
  },
  {
    code: 'ROYAL20',
    discountPercentage: 20,
    minPurchase: 50000,
    maxDiscount: 25000,
    description: '20% off on Royal Collection above ₹50,000'
  },
  {
    code: 'FIRSTLUXE',
    discountPercentage: 15,
    minPurchase: 15000,
    maxDiscount: 10000,
    description: 'Welcome luxury discount of 15% on your first order'
  }
];
