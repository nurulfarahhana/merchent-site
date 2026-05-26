
import React, { useState, useEffect, useMemo, useRef } from 'react';

// ==========================================
// 1. TYPES & INTERFACES (TypeScript Equivalent)
// ==========================================
/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {number} price
 * @property {string} category
 * @property {{en: string, my: string}} desc
 * @property {string} img
 * @property {boolean} [isNew]
 */

/**
 * @typedef {Object} CartItem
 * @property {Product} product
 * @property {number} quantity
 */

/**
 * @typedef {Object} Toast
 * @property {string} id
 * @property {string} message
 * @property {'success' | 'info' | 'error'} type
 */

// ==========================================
// 2. CONSTANTS & TRANSLATIONS
// ==========================================
const I18N = {
  en: {
    brand_subtitle: "Modern Heritage",
    hero_title: "Modern Heritage.",
    hero_desc: "A carefully curated collection celebrating the seamless fusion of heritage craftsmanship and contemporary minimalist aesthetic.",
    hero_cta: "EXPLORE COLLECTION",
    catalog_title: "Catalog",
    browsing_label: "Browsing",
    cat_all: "All",
    cat_acc: "Accessories",
    cat_home: "Home",
    cat_apparel: "Apparel",
    recent_label: "Recently Viewed",
    cart_title: "Shopping Cart",
    wishlist_title: "My Wishlist",
    promo_label: "PROMO CODE",
    promo_placeholder: "Enter code (e.g., PORTFOLIO20)",
    promo_btn: "Apply",
    subtotal_label: "Subtotal",
    discount_label: "Discount",
    checkout_btn: "PROCEED TO CHECKOUT",
    search_placeholder: "Search curation...",
    added_to_cart: "added to cart.",
    added_to_wishlist: "added to wishlist.",
    removed_from_wishlist: "removed from wishlist.",
    cart_empty: "Your collection is empty.",
    wishlist_empty: "Your wishlist is empty.",
    no_products: "No pieces match your query.",
    promo_success: "20% Discount applied successfully!",
    promo_fail: "Invalid promotional code.",
    quick_view: "Quick View",
    add_to_cart: "Add to Bag",
    in_stock: "In Stock - Ships in 1-2 days",
    details: "Details",
    close: "Close",
    shipping_banner: "Complimentary worldwide shipping on orders exceeding $150",
    checkout_success: "Thank you! Your purchase order has been generated.",
    checkout_process: "Generating secure order invoice...",
    footer_desc: "Fusing legacy craftsmanship with contemporary perspectives to furnish timeless spaces and wardrobes.",
    newsletter_title: "The Journal",
    newsletter_desc: "Subscribe to receive seasonal collection previews and editorial insights.",
    newsletter_btn: "Subscribe",
    newsletter_placeholder: "Enter your email",
    newsletter_success: "Welcome to our inner circle.",
    copyright: "© 2026 Laghobuying. All rights reserved.",
    wishlist_label: "Wishlist"
  },
  my: {
    brand_subtitle: "Warisan Moden",
    hero_title: "Warisan Moden.",
    hero_desc: "Koleksi pilihan eksklusif yang meraikan gabungan harmoni antara pertukangan warisan tradisi dan rekaan kontemporari minimalis.",
    hero_cta: "TEROKAI KOLEKSI",
    catalog_title: "Katalog",
    browsing_label: "Meneroka",
    cat_all: "Semua",
    cat_acc: "Aksesori",
    cat_home: "Hiasan Rumah",
    cat_apparel: "Pakaian",
    recent_label: "Baru Dilihat",
    cart_title: "Troli Membeli-belah",
    wishlist_title: "Senarai Hajat",
    promo_label: "KOD PROMO",
    promo_placeholder: "Masukkan kod (cth: PORTFOLIO20)",
    promo_btn: "Guna",
    subtotal_label: "Jumlah Kecil",
    discount_label: "Diskaun",
    checkout_btn: "TERUSKAN KE PEMBAYARAN",
    search_placeholder: "Cari koleksi...",
    added_to_cart: "ditambah ke troli.",
    added_to_wishlist: "ditambah ke senarai hajat.",
    removed_from_wishlist: "dibuang dari senarai hajat.",
    cart_empty: "Koleksi anda masih kosong.",
    wishlist_empty: "Senarai hajat anda kosong.",
    no_products: "Tiada koleksi yang sepadan dengan carian.",
    promo_success: "Diskaun 20% berjaya digunakan!",
    promo_fail: "Kod promosi tidak sah.",
    quick_view: "Lihat Cepat",
    add_to_cart: "Tambah ke Beg",
    in_stock: "Stok Tersedia - Penghantaran 1-2 hari",
    details: "Butiran",
    close: "Tutup",
    shipping_banner: "Penghantaran global percuma untuk pesanan melebihi $150",
    checkout_success: "Terima kasih! Pesanan pembelian anda telah dijana.",
    checkout_process: "Menjana invois pesanan selamat...",
    footer_desc: "Menggabungkan seni warisan dengan perspektif moden untuk menghiasi ruang hidup dan gaya yang abadi.",
    newsletter_title: "Jurnal Kami",
    newsletter_desc: "Langgan untuk menerima pratonton koleksi bermusim dan analisis editorial.",
    newsletter_btn: "Langgan",
    newsletter_placeholder: "Masukkan e-mel anda",
    newsletter_success: "Selamat datang ke lingkungan eksklusif kami.",
    copyright: "© 2026 Laghobuying. Hak Cipta Terpelihara.",
    wishlist_label: "Hajat"
  }
};

const PRODUCTS_MOCK = [
  { 
    id: 1, 
    name: "Vintage Leather Satchel", 
    price: 120, 
    category: "Accessories", 
    isNew: true,
    desc: {
      en: "Handmade genuine top-grain leather bag featuring secure solid-brass hardware, heavy-duty wax-thread stitching, and tailored compartmentalization built to last generations.", 
      my: "Beg kulit asli buatan tangan yang menampilkan perkakasan tembaga pepejal, jahitan benang lilin tahan lasak, dan pembahagian tersusun untuk bertahan selama beberapa generasi."
    }, 
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 2, 
    name: "Minimalist Ceramic Vase", 
    price: 45, 
    category: "Home", 
    isNew: false,
    desc: {
      en: "Matte warm-white ceramic earthenware, individually hand-thrown on a potter's wheel. Exceptional organic contours perfectly suited for minimalist floral arrangement.", 
      my: "Tembikar seramik matte putih suam, dicanai menggunakan tangan secara individu di atas roda tembikar. Reka bentuk organik yang sangat sesuai untuk gubahan bunga minimalis."
    }, 
    img: "https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 3, 
    name: "Premium Linen Summer Shirt", 
    price: 65, 
    category: "Apparel", 
    isNew: true,
    desc: {
      en: "Woven entirely from fine organic Belgian flax linen. Incredibly lightweight, breathable, and structured with a relaxed modern collar drape optimized for humid climates.", 
      my: "Ditenun sepenuhnya daripada linen flaks Belgium organik yang halus. Sangat ringan, beraliran udara baik, dan distrukturkan dengan kolar drape moden yang santai."
    }, 
    img: "https://images.unsplash.com/photo-1596755094514-f87034a70b2c?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 4, 
    name: "Mid-Century Brass Desk Lamp", 
    price: 85, 
    category: "Home", 
    isNew: false,
    desc: {
      en: "Form meets function in this task lamp. Hand-brushed brass shade and arm with weighted solid walnut base. Emits soft ambient diffused glow.", 
      my: "Gabungan fungsi dan keindahan pada lampu meja ini. Pelindung dan pemegang tembaga yang digilap tangan bersama tapak kayu walnut padu. Memancarkan cahaya lembut yang tenang."
    }, 
    img: "https://images.unsplash.com/photo-1534073828943-f801091bb18c?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 5, 
    name: "Wool Felt Fedora", 
    price: 75, 
    category: "Accessories", 
    isNew: false,
    desc: {
      en: "Hand-shaped 100% merino wool felt hat featuring a natural vegetable-tanned leather ribbon detailing. Provides structure and elegant timeless symmetry.", 
      my: "Topi felt bulu biri-biri merino 100% buatan tangan yang menampilkan perincian reben kulit asli yang disamak tumbuhan. Menawarkan simetri anggun yang abadi."
    }, 
    img: "https://images.unsplash.com/photo-1514327605112-b887c0e61c0a?auto=format&fit=crop&q=80&w=600" 
  },
  { 
    id: 6, 
    name: "Indigo Selvedge Denim Jacket", 
    price: 110, 
    category: "Apparel", 
    isNew: true,
    desc: {
      en: "Crafted from raw 14oz Japanese selvedge denim, dyed in rich organic indigo. Cut to a sharp modern silhouette with internal utilitarian storm pockets.", 
      my: "Dihasilkan daripada denim selvedge Jepun mentah 14oz, dicelup dengan indigo organik pekat. Dipotong mengikut siluet moden yang kemas dengan poket utiliti dalaman."
    }, 
    img: "https://images.unsplash.com/photo-1576905341939-402d5d37e8c3?auto=format&fit=crop&q=80&w=600" 
  }
];

// ==========================================
// 3. MOCK API SERVICE (Asynchronous Engine)
// ==========================================
const apiService = {
  getProducts: (delay = 700) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(PRODUCTS_MOCK);
      }, delay);
    });
  }
};

// ==========================================
// 4. MAIN APPLICATION COMPONENT
// ==========================================
export default function App() {
  // --- Persistent & Local Application States ---
  const [lang, setLang] = useState(() => localStorage.getItem('lgb_lang') || 'en');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState(() => JSON.parse(localStorage.getItem('lgb_cart')) || []);
  const [wishlist, setWishlist] = useState(() => JSON.parse(localStorage.getItem('lgb_wishlist')) || []);
  const [history, setHistory] = useState(() => JSON.parse(localStorage.getItem('lgb_history')) || []);
  
  // Interactive UI States
  const [category, setCategory] = useState('All');
  const [search, setSearch] = useState('');
  const [activeSidebar, setActiveSidebar] = useState('none'); // 'none' | 'cart' | 'wishlist'
  const [promoCode, setPromoCode] = useState('');
  const [discountRate, setDiscountRate] = useState(0);
  const [promoMessage, setPromoMessage] = useState({ text: '', isSuccess: false });
  const [toasts, setToasts] = useState([]);
  const [quickViewProduct, setQuickViewProduct] = useState(null);
  const [checkoutProcessing, setCheckoutProcessing] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSubscribed, setNewsletterSubscribed] = useState(false);

  // --- Effects for State Synchronization & Persistence ---
  useEffect(() => {
    localStorage.setItem('lgb_lang', lang);
  }, [lang]);

  useEffect(() => {
    localStorage.setItem('lgb_cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('lgb_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  useEffect(() => {
    localStorage.setItem('lgb_history', JSON.stringify(history));
  }, [history]);

  // Fetch products upon initialization
  useEffect(() => {
    const fetchCollection = async () => {
      try {
        setLoading(true);
        const data = await apiService.getProducts();
        setProducts(data);
      } catch (err) {
        showToast('Error loading design catalog.', 'error');
      } finally {
        setLoading(false);
      }
    };
    fetchCollection();
  }, []);

  // --- Utility: Feedback & Toasts System ---
  const showToast = (message, type = 'success') => {
    const id = Date.now().toString() + Math.random().toString();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(toast => toast.id !== id));
    }, 4000);
  };

  // --- Business Logic handlers ---
  const handleAddToCart = (product, e) => {
    if (e) e.stopPropagation();
    setCart(prevCart => {
      const existing = prevCart.find(item => item.product.id === product.id);
      if (existing) {
        return prevCart.map(item => 
          item.product.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      return [...prevCart, { product, quantity: 1 }];
    });
    
    // Add to Recently Viewed
    handleAddToHistory(product);
    showToast(`"${product.name}" ${I18N[lang].added_to_cart}`, 'success');
  };

  const handleUpdateCartQty = (productId, delta) => {
    setCart(prevCart => {
      return prevCart.map(item => {
        if (item.product.id === productId) {
          const newQty = item.quantity + delta;
          return newQty > 0 ? { ...item, quantity: newQty } : null;
        }
        return item;
      }).filter(Boolean);
    });
  };

  const handleRemoveFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.product.id !== productId));
  };

  const handleToggleWishlist = (product, e) => {
    if (e) e.stopPropagation();
    const isWishlisted = wishlist.some(item => item.id === product.id);
    if (isWishlisted) {
      setWishlist(prev => prev.filter(item => item.id !== product.id));
      showToast(`"${product.name}" ${I18N[lang].removed_from_wishlist}`, 'info');
    } else {
      setWishlist(prev => [...prev, product]);
      showToast(`"${product.name}" ${I18N[lang].added_to_wishlist}`, 'success');
    }
  };

  const handleAddToHistory = (product) => {
    setHistory(prev => {
      const filtered = prev.filter(item => item.id !== product.id);
      return [product, ...filtered].slice(0, 4); // Keep only last 4 items
    });
  };

  const handleApplyPromo = () => {
    const formattedCode = promoCode.trim().toUpperCase();
    if (formattedCode === 'PORTFOLIO20') {
      setDiscountRate(0.20);
      setPromoMessage({ text: I18N[lang].promo_success, isSuccess: true });
    } else {
      setDiscountRate(0);
      setPromoMessage({ text: I18N[lang].promo_fail, isSuccess: false });
    }
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (!newsletterEmail) return;
    setNewsletterSubscribed(true);
    showToast(I18N[lang].newsletter_success, 'success');
    setNewsletterEmail('');
  };

  const handleCheckout = () => {
    setCheckoutProcessing(true);
    setTimeout(() => {
      setCheckoutProcessing(false);
      setCart([]);
      setActiveSidebar('none');
      showToast(I18N[lang].checkout_success, 'success');
    }, 2000);
  };

  // --- Memorized Calculations ---
  const filteredProducts = useMemo(() => {
    return products.filter(p => {
      const matchCategory = category === 'All' || p.category === category;
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || 
                          p.desc[lang].toLowerCase().includes(search.toLowerCase());
      return matchCategory && matchSearch;
    });
  }, [products, category, search, lang]);

  const cartCalculations = useMemo(() => {
    const subtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
    const discount = subtotal * discountRate;
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  }, [cart, discountRate]);

  const totalItemsInCart = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-neutral-50/60 text-zinc-900 font-sans antialiased selection:bg-neutral-900 selection:text-white">
      
      {/* 4a. COMPLIMENTARY BANNER */}
      <div className="bg-[#1a1a1a] text-[#c5a059] text-[10px] md:text-xs uppercase tracking-widest text-center py-2 px-4 font-medium">
        {I18N[lang].shipping_banner}
      </div>

      {/* 4b. NAVIGATION COMPONENT */}
      <nav className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-neutral-200/60 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo and Brand */}
            <div className="flex-1 flex items-center">
              <a href="#" className="group flex flex-col focus:outline-none">
                <span className="font-serif text-2xl md:text-3xl font-extrabold tracking-wide uppercase transition-colors group-hover:text-[#c5a059]">
                  LAGHOBUYING
                </span>
                <span className="text-[9px] md:text-[10px] tracking-[0.25em] text-neutral-400 font-semibold uppercase mt-0.5 group-hover:text-zinc-600 transition-colors">
                  {I18N[lang].brand_subtitle}
                </span>
              </a>
            </div>

            {/* Centralized Search Box for Desktop */}
            <div className="hidden md:flex flex-1 max-w-xs items-center relative mx-4">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={I18N[lang].search_placeholder}
                className="w-full pl-9 pr-4 py-1.5 text-xs bg-neutral-100 border border-neutral-200 rounded-full focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:bg-white transition-all duration-200 text-zinc-800 placeholder-zinc-400"
              />
            </div>

            {/* Language Selection & Functional Triggers */}
            <div className="flex items-center space-x-4 md:space-x-6">
              
              {/* Language Switcher */}
              <div className="flex items-center space-x-1 border-r border-neutral-300 pr-4">
                <button 
                  onClick={() => setLang('en')} 
                  className={`px-1.5 py-0.5 text-xs font-semibold rounded transition-colors ${lang === 'en' ? 'bg-[#1a1a1a] text-white' : 'text-zinc-500 hover:text-black'}`}
                >
                  EN
                </button>
                <span className="text-zinc-300 text-xs">|</span>
                <button 
                  onClick={() => setLang('my')} 
                  className={`px-1.5 py-0.5 text-xs font-semibold rounded transition-colors ${lang === 'my' ? 'bg-[#1a1a1a] text-white' : 'text-zinc-500 hover:text-black'}`}
                >
                  MY
                </button>
              </div>

              {/* Wishlist Toggle Button */}
              <button 
                onClick={() => setActiveSidebar('wishlist')} 
                className="relative p-1 text-zinc-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-zinc-950 rounded"
                aria-label={I18N[lang].wishlist_label}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {wishlist.length > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#c5a059] text-[9px] font-bold text-white">
                    {wishlist.length}
                  </span>
                )}
              </button>

              {/* Shopping Cart Trigger */}
              <button 
                onClick={() => setActiveSidebar('cart')}
                className="relative p-1 text-zinc-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-zinc-950 rounded flex items-center"
                aria-label={I18N[lang].cart_title}
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
                {totalItemsInCart > 0 && (
                  <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-zinc-950 text-[9px] font-bold text-white">
                    {totalItemsInCart}
                  </span>
                )}
              </button>
            </div>
          </div>
          
          {/* Mobile Search Bar - Visible under Nav */}
          <div className="pb-4 md:hidden">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-4 w-4 text-neutral-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={I18N[lang].search_placeholder}
                className="w-full pl-9 pr-4 py-2 text-sm bg-neutral-100 border border-neutral-200 rounded-full focus:outline-none focus:ring-1 focus:ring-zinc-950 focus:bg-white transition-all text-zinc-800 placeholder-zinc-400"
              />
            </div>
          </div>

        </div>
      </nav>

      {/* 4c. PREMIUM CINEMATIC HERO SECTION */}
      <header className="relative bg-[#faf9f6] py-16 md:py-24 overflow-hidden border-b border-neutral-200">
        <div className="absolute right-0 bottom-0 top-0 w-full md:w-1/2 opacity-25 md:opacity-100 pointer-events-none">
          <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f6] via-[#faf9f6]/80 to-transparent z-10" />
          <img 
            src="https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&q=80&w=1200" 
            alt="Interior Aesthetics" 
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-20">
          <div className="max-w-xl md:max-w-lg lg:max-w-xl">
            <span className="text-[10px] md:text-xs font-semibold tracking-[0.4em] text-[#c5a059] uppercase block mb-3">
              LAGHOBUYING EST. 2026
            </span>
            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-extrabold text-zinc-900 tracking-tight leading-tight mb-6">
              {I18N[lang].hero_title}
            </h1>
            <p className="text-zinc-600 font-light text-sm sm:text-base md:text-lg leading-relaxed mb-8">
              {I18N[lang].hero_desc}
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#shop" 
                className="inline-flex items-center justify-center px-8 py-3.5 border border-zinc-900 bg-zinc-950 text-white text-xs font-semibold uppercase tracking-widest rounded-none hover:bg-[#c5a059] hover:border-[#c5a059] transition-all duration-300 shadow-sm"
              >
                {I18N[lang].hero_cta}
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* 4d. MAIN CATALOG SECTION */}
      <main id="shop" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        
        {/* Navigation & Category Bar */}
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between border-b border-neutral-200 pb-6 mb-10 gap-6">
          <div>
            <h2 className="font-serif text-3xl font-bold tracking-wide text-zinc-900">
              {I18N[lang].catalog_title}
            </h2>
            <p className="text-zinc-500 text-xs mt-1.5 font-light">
              <span>{I18N[lang].browsing_label}</span>{' '}
              <span className="font-medium text-zinc-800">
                {category === 'All' ? I18N[lang].cat_all : I18N[lang][`cat_${category.toLowerCase().slice(0, 3)}` || 'cat_all']}
              </span>
              {search && ` / keyword: "${search}"`}
            </p>
          </div>

          {/* Luxury Filter Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-2 -mx-4 px-4 lg:mx-0 lg:px-0 scrollbar-none">
            {['All', 'Accessories', 'Home', 'Apparel'].map((cat) => {
              const labelKey = cat === 'All' ? 'cat_all' : `cat_${cat.toLowerCase().substring(0, 3)}`;
              const isActive = category === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategory(cat)}
                  className={`whitespace-nowrap px-5 py-2 text-xs font-bold tracking-wider uppercase border transition-all duration-200 ${
                    isActive 
                      ? 'bg-zinc-950 border-zinc-950 text-white shadow-xs' 
                      : 'border-transparent text-zinc-500 hover:text-zinc-900 hover:bg-neutral-100/80'
                  }`}
                >
                  {I18N[lang][labelKey] || cat}
                </button>
              );
            })}
          </div>
        </div>

        {/* 4e. PRODUCT GRID & SKELETON LOADERS */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {[1, 2, 3].map((skeletonId) => (
              <div key={skeletonId} className="flex flex-col space-y-4 animate-pulse">
                <div className="aspect-[3/4] w-full bg-neutral-200 rounded-lg" />
                <div className="h-4 bg-neutral-200 rounded w-2/3" />
                <div className="h-3 bg-neutral-200 rounded w-1/3" />
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20 border border-dashed border-neutral-300 rounded-lg">
            <svg className="mx-auto h-12 w-12 text-zinc-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-zinc-500 font-light text-sm">{I18N[lang].no_products}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProducts.map((product) => {
              const isWishlisted = wishlist.some(item => item.id === product.id);
              return (
                <div 
                  key={product.id}
                  className="group flex flex-col bg-white border border-neutral-100 p-3 transition-all duration-300 hover:shadow-xl hover:border-neutral-200"
                >
                  {/* Photo Container */}
                  <div className="relative aspect-[3/4] bg-neutral-100 overflow-hidden cursor-pointer" onClick={() => setQuickViewProduct(product)}>
                    <img 
                      src={product.img} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />

                    {/* New Badge */}
                    {product.isNew && (
                      <span className="absolute top-3 left-3 bg-[#c5a059] text-white text-[9px] font-bold tracking-widest uppercase px-2.5 py-1">
                        NEW
                      </span>
                    )}

                    {/* Interactive Wishlist Button on Image */}
                    <button
                      onClick={(e) => handleToggleWishlist(product, e)}
                      className="absolute top-3 right-3 bg-white/90 hover:bg-white text-zinc-900 p-2 rounded-full shadow-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-zinc-950"
                      aria-label="Add to Wishlist"
                    >
                      <svg 
                        className={`w-4 h-4 transition-colors ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-zinc-700 hover:text-red-500'}`}
                        fill={isWishlisted ? 'currentColor' : 'none'}
                        stroke="currentColor" 
                        strokeWidth="2.5"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </button>

                    {/* Hover Quick View Overlay (Desktop Only) */}
                    <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <button 
                        onClick={() => setQuickViewProduct(product)}
                        className="bg-white/95 text-zinc-950 font-bold text-[11px] tracking-widest uppercase px-6 py-3 transition-transform duration-300 translate-y-4 group-hover:translate-y-0"
                      >
                        {I18N[lang].quick_view}
                      </button>
                    </div>

                    {/* Add to Cart Quick Trigger */}
                    <button
                      onClick={(e) => handleAddToCart(product, e)}
                      className="absolute bottom-4 right-4 bg-white hover:bg-zinc-950 hover:text-white text-zinc-950 p-3 rounded-full shadow-lg transition-colors duration-300 md:opacity-0 md:group-hover:opacity-100"
                      title={I18N[lang].add_to_cart}
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                      </svg>
                    </button>
                  </div>

                  {/* Info Block */}
                  <div className="pt-4 pb-2 px-1 flex-grow flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] tracking-widest text-[#c5a059] uppercase font-bold">
                          {product.category}
                        </span>
                        <span className="text-xs font-bold text-zinc-800">
                          ${product.price}
                        </span>
                      </div>
                      <h3 className="font-serif text-base font-semibold text-zinc-900 mt-1 cursor-pointer group-hover:text-[#c5a059] transition-colors" onClick={() => setQuickViewProduct(product)}>
                        {product.name}
                      </h3>
                      <p className="text-zinc-500 font-light text-[11px] mt-1.5 line-clamp-2 leading-relaxed">
                        {product.desc[lang]}
                      </p>
                    </div>
                    
                    {/* Compact Mobile Action Bar */}
                    <div className="mt-4 flex items-center gap-2 md:hidden">
                      <button
                        onClick={() => setQuickViewProduct(product)}
                        className="flex-1 text-center py-2 bg-neutral-100 hover:bg-neutral-200 text-[10px] font-bold tracking-widest uppercase transition-colors"
                      >
                        {I18N[lang].quick_view}
                      </button>
                      <button
                        onClick={(e) => handleAddToCart(product, e)}
                        className="flex-1 text-center py-2 bg-zinc-950 hover:bg-[#c5a059] text-white text-[10px] font-bold tracking-widest uppercase transition-colors"
                      >
                        {I18N[lang].add_to_cart}
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      {/* 4f. SIDE PANEL DRAWERS (CART & WISHLIST) */}
      <div className={`fixed inset-0 z-50 transition-opacity duration-500 ${activeSidebar !== 'none' ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        
        {/* Backdrop overlay */}
        <div 
          onClick={() => setActiveSidebar('none')}
          className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity duration-500" 
        />

        {/* Dynamic Panel Drawer */}
        <div className={`absolute top-0 right-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col z-10 transition-transform duration-500 transform ${activeSidebar !== 'none' ? 'translate-x-0' : 'translate-x-full'}`}>
          
          {/* Header */}
          <div className="px-6 py-5 border-b border-neutral-200 flex items-center justify-between">
            <h3 className="font-serif text-lg font-bold uppercase tracking-wide">
              {activeSidebar === 'cart' ? I18N[lang].cart_title : I18N[lang].wishlist_title}
            </h3>
            <button 
              onClick={() => setActiveSidebar('none')}
              className="p-1 text-zinc-400 hover:text-black transition-colors focus:outline-none"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* SIDEBAR VIEW 1: SHOPPING CART */}
          {activeSidebar === 'cart' && (
            <>
              <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
                {cart.length === 0 ? (
                  <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                    <svg className="w-12 h-12 text-zinc-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                    <p className="text-zinc-500 font-light text-sm">{I18N[lang].cart_empty}</p>
                  </div>
                ) : (
                  cart.map(({ product, quantity }) => (
                    <div key={product.id} className="flex gap-4 pb-4 border-b border-neutral-100 items-start">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-16 h-20 object-cover bg-neutral-100 flex-shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <div className="flex justify-between items-start gap-2">
                          <h4 className="text-xs font-bold text-zinc-950 truncate">{product.name}</h4>
                          <button 
                            onClick={() => handleRemoveFromCart(product.id)}
                            className="text-zinc-400 hover:text-zinc-950 text-base font-bold leading-none p-0.5 focus:outline-none"
                          >
                            &times;
                          </button>
                        </div>
                        <p className="text-zinc-500 text-[10px] uppercase tracking-wider mt-0.5">{product.category}</p>
                        <p className="text-xs font-semibold text-zinc-800 mt-2">${product.price}</p>
                        
                        {/* Custom Input Qty Spinner */}
                        <div className="flex items-center space-x-2 mt-2">
                          <button 
                            onClick={() => handleUpdateCartQty(product.id, -1)}
                            className="w-6 h-6 border border-neutral-200 rounded-full flex items-center justify-center text-xs font-semibold hover:bg-neutral-100 active:scale-95 transition-all"
                          >
                            -
                          </button>
                          <span className="text-xs font-bold w-4 text-center">{quantity}</span>
                          <button 
                            onClick={() => handleUpdateCartQty(product.id, 1)}
                            className="w-6 h-6 border border-neutral-200 rounded-full flex items-center justify-center text-xs font-semibold hover:bg-neutral-100 active:scale-95 transition-all"
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {cart.length > 0 && (
                <div className="border-t border-neutral-200 p-6 bg-neutral-50/50 space-y-4">
                  {/* Promo Input Area */}
                  <div>
                    <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest block mb-1.5">
                      {I18N[lang].promo_label}
                    </label>
                    <div className="flex">
                      <input 
                        type="text" 
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder={I18N[lang].promo_placeholder}
                        className="flex-grow px-3 py-2 text-xs bg-white border border-neutral-200 rounded-l focus:outline-none focus:ring-1 focus:ring-zinc-900"
                      />
                      <button 
                        onClick={handleApplyPromo}
                        className="px-4 bg-zinc-950 text-white hover:bg-zinc-800 text-xs font-bold tracking-wider uppercase rounded-r transition-colors"
                      >
                        {I18N[lang].promo_btn}
                      </button>
                    </div>
                    {promoMessage.text && (
                      <p className={`text-[10px] mt-1.5 font-bold ${promoMessage.isSuccess ? 'text-emerald-600' : 'text-red-500'}`}>
                        {promoMessage.text}
                      </p>
                    )}
                  </div>

                  {/* Financial Invoicing Row */}
                  <div className="space-y-1 pt-2 border-t border-neutral-200/80">
                    <div className="flex justify-between text-xs text-zinc-500">
                      <span>{I18N[lang].subtotal_label}</span>
                      <span>${cartCalculations.subtotal.toFixed(2)}</span>
                    </div>
                    {discountRate > 0 && (
                      <div className="flex justify-between text-xs text-emerald-600 font-semibold">
                        <span>{I18N[lang].discount_label} ({(discountRate * 100)}%)</span>
                        <span>-${cartCalculations.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-base font-bold text-zinc-900 pt-2 border-t border-neutral-200/60">
                      <span>Total</span>
                      <span>${cartCalculations.total.toFixed(2)}</span>
                    </div>
                  </div>

                  <button 
                    onClick={handleCheckout}
                    disabled={checkoutProcessing}
                    className="w-full py-4 bg-zinc-950 hover:bg-[#c5a059] disabled:bg-neutral-300 text-white font-bold text-xs tracking-widest uppercase transition-colors flex items-center justify-center space-x-2"
                  >
                    {checkoutProcessing ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{I18N[lang].checkout_process}</span>
                      </>
                    ) : (
                      <span>{I18N[lang].checkout_btn}</span>
                    )}
                  </button>
                </div>
              )}
            </>
          )}

          {/* SIDEBAR VIEW 2: WISHLIST DRAWER */}
          {activeSidebar === 'wishlist' && (
            <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4">
              {wishlist.length === 0 ? (
                <div className="h-full flex flex-col items-center justify-center py-20 text-center">
                  <svg className="w-12 h-12 text-zinc-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                  <p className="text-zinc-500 font-light text-sm">{I18N[lang].wishlist_empty}</p>
                </div>
              ) : (
                wishlist.map((product) => (
                  <div key={product.id} className="flex gap-4 pb-4 border-b border-neutral-100 items-center justify-between">
                    <div className="flex gap-3 items-center min-w-0">
                      <img 
                        src={product.img} 
                        alt={product.name} 
                        className="w-12 h-16 object-cover bg-neutral-100 flex-shrink-0"
                      />
                      <div className="min-w-0">
                        <h4 className="text-xs font-bold text-zinc-950 truncate">{product.name}</h4>
                        <p className="text-zinc-500 text-[9px] uppercase tracking-wider">{product.category}</p>
                        <p className="text-xs font-semibold text-zinc-800 mt-1">${product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button 
                        onClick={() => handleAddToCart(product)}
                        className="p-2 bg-zinc-950 text-white hover:bg-[#c5a059] transition-colors rounded-full"
                        aria-label="Add to Bag"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                      <button 
                        onClick={() => setWishlist(prev => prev.filter(item => item.id !== product.id))}
                        className="p-2 border border-neutral-200 text-zinc-400 hover:text-red-500 transition-colors rounded-full"
                        aria-label="Remove"
                      >
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

        </div>
      </div>

      {/* 4g. QUICK VIEW INTERACTIVE DIALOG MODAL */}
      {quickViewProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div 
            onClick={() => setQuickViewProduct(null)}
            className="absolute inset-0 bg-zinc-950/40 backdrop-blur-xs transition-opacity duration-300" 
          />
          
          <div className="relative bg-white max-w-2xl w-full flex flex-col md:flex-row overflow-hidden shadow-2xl z-10 transition-transform duration-300">
            <button 
              onClick={() => setQuickViewProduct(null)}
              className="absolute top-4 right-4 z-20 bg-white/80 backdrop-blur-sm p-1.5 rounded-full hover:bg-white text-zinc-900 transition-colors shadow-xs"
              aria-label={I18N[lang].close}
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Product Image Panel */}
            <div className="w-full md:w-1/2 aspect-square md:aspect-auto md:h-[400px] bg-neutral-100">
              <img 
                src={quickViewProduct.img} 
                alt={quickViewProduct.name} 
                className="w-full h-full object-cover"
              />
            </div>

            {/* Product Details Panel */}
            <div className="w-full md:w-1/2 p-6 md:p-8 flex flex-col justify-between">
              <div>
                <span className="text-[10px] tracking-[0.2em] text-[#c5a059] uppercase font-bold block mb-1">
                  {quickViewProduct.category}
                </span>
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-zinc-950">
                  {quickViewProduct.name}
                </h3>
                <p className="text-lg font-bold text-zinc-800 mt-2">${quickViewProduct.price}</p>
                <p className="text-xs text-emerald-600 font-semibold mt-1">{I18N[lang].in_stock}</p>
                
                <div className="border-t border-neutral-200 mt-4 pt-4">
                  <h4 className="text-[10px] tracking-widest text-zinc-500 font-bold uppercase mb-2">
                    {I18N[lang].details}
                  </h4>
                  <p className="text-xs text-zinc-600 leading-relaxed font-light">
                    {quickViewProduct.desc[lang]}
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-2">
                <button
                  onClick={() => {
                    handleAddToCart(quickViewProduct);
                    setQuickViewProduct(null);
                  }}
                  className="w-full py-3 bg-zinc-950 hover:bg-[#c5a059] text-white text-xs font-semibold uppercase tracking-widest transition-colors flex items-center justify-center space-x-2"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                  <span>{I18N[lang].add_to_cart}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 4h. STICKY BOTTOM RECENTLY VIEWED BAR */}
      {history.length > 0 && (
        <div className="fixed bottom-4 left-4 right-4 md:left-auto md:w-80 bg-white border border-neutral-200 p-4 shadow-xl z-30 transition-all duration-300">
          <div className="flex items-center justify-between mb-3">
            <span className="text-[9px] font-bold tracking-wider text-zinc-500 uppercase">
              {I18N[lang].recent_label}
            </span>
            <button 
              onClick={() => setHistory([])}
              className="text-[9px] hover:underline text-zinc-400 hover:text-zinc-950 focus:outline-none"
            >
              Clear
            </button>
          </div>
          <div className="flex space-x-3 overflow-x-auto pb-1 scrollbar-none">
            {history.map((product) => (
              <div 
                key={product.id}
                onClick={() => setQuickViewProduct(product)}
                className="w-12 h-16 flex-shrink-0 cursor-pointer overflow-hidden border border-neutral-100 hover:border-zinc-400 transition-colors"
                title={product.name}
              >
                <img 
                  src={product.img} 
                  alt={product.name} 
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 4i. STACKED TOAST NOTIFICATION CONTAINER */}
      <div className="fixed top-24 right-4 z-50 flex flex-col space-y-2 pointer-events-none max-w-sm w-full">
        {toasts.map((toast) => (
          <div 
            key={toast.id}
            className={`pointer-events-auto flex items-center p-4 rounded bg-zinc-900 text-white shadow-xl border border-zinc-800 transition-transform duration-300 animate-slide-in-right`}
          >
            <div className="flex-shrink-0 mr-3">
              {toast.type === 'success' ? (
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              ) : toast.type === 'error' ? (
                <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              ) : (
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              )}
            </div>
            <p className="text-xs font-semibold">{toast.message}</p>
          </div>
        ))}
      </div>

      {/* 4j. EDITORIAL FOOTER COMPONENT */}
      <footer className="bg-white border-t border-neutral-200 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            
            {/* About Column */}
            <div>
              <h4 className="font-serif text-lg font-bold uppercase tracking-widest mb-4">
                LAGHOBUYING
              </h4>
              <p className="text-zinc-500 font-light text-xs leading-relaxed max-w-sm">
                {I18N[lang].footer_desc}
              </p>
            </div>

            {/* Quick Links Column */}
            <div className="md:justify-self-center">
              <h4 className="text-xs font-bold uppercase tracking-[0.2em] mb-4 text-zinc-400">
                Collections
              </h4>
              <ul className="space-y-2 text-xs font-bold uppercase tracking-wider text-zinc-600">
                <li><button onClick={() => { setCategory('Accessories'); window.scrollTo({top: 500, behavior: 'smooth'}); }} className="hover:text-[#c5a059] transition-colors">{I18N[lang].cat_acc}</button></li>
                <li><button onClick={() => { setCategory('Home'); window.scrollTo({top: 500, behavior: 'smooth'}); }} className="hover:text-[#c5a059] transition-colors">{I18N[lang].cat_home}</button></li>
                <li><button onClick={() => { setCategory('Apparel'); window.scrollTo({top: 500, behavior: 'smooth'}); }} className="hover:text-[#c5a059] transition-colors">{I18N[lang].cat_apparel}</button></li>
              </ul>
            </div>

            {/* Journal/Newsletter Column */}
            <div>
              <h4 className="font-serif text-sm font-bold uppercase tracking-wide mb-2">
                {I18N[lang].newsletter_title}
              </h4>
              <p className="text-zinc-500 font-light text-xs leading-relaxed mb-4">
                {I18N[lang].newsletter_desc}
              </p>
              
              {newsletterSubscribed ? (
                <p className="text-xs font-bold text-emerald-600">{I18N[lang].newsletter_success}</p>
              ) : (
                <form onSubmit={handleNewsletterSubmit} className="flex">
                  <input
                    type="email"
                    required
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={I18N[lang].newsletter_placeholder}
                    className="flex-grow px-3 py-2 bg-neutral-100 border border-neutral-200 text-xs rounded-l focus:outline-none focus:bg-white focus:ring-1 focus:ring-zinc-950 transition-all placeholder-zinc-400 text-zinc-800"
                  />
                  <button
                    type="submit"
                    className="px-4 bg-zinc-950 text-white hover:bg-[#c5a059] text-xs font-semibold tracking-wider uppercase rounded-r transition-colors"
                  >
                    {I18N[lang].newsletter_btn}
                  </button>
                </form>
              )}
            </div>

          </div>

          <div className="border-t border-neutral-200 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-[10px] text-zinc-400">
              {I18N[lang].copyright}
            </span>
            <div className="flex space-x-6">
              <a href="#" className="text-zinc-400 hover:text-zinc-950 transition-colors" aria-label="Instagram">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
                </svg>
              </a>
              <a href="#" className="text-zinc-400 hover:text-zinc-950 transition-colors" aria-label="Pinterest">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.41 7.61 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.061-4.869-5.007-4.869-3.41 0-5.413 2.561-5.413 5.201 0 1.03.397 2.133.893 2.734.1.12.113.223.083.343-.09.375-.291 1.181-.33 1.341-.053.214-.172.26-.398.155-1.484-.695-2.41-2.88-2.41-4.631 0-3.763 2.733-7.226 7.89-7.226 4.144 0 7.365 2.955 7.365 6.902 0 4.119-2.597 7.433-6.202 7.433-1.212 0-2.35-.63-2.739-1.379l-.747 2.853c-.269 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.607 0 11.985-5.36 11.985-11.987C24.014 5.367 18.63 0 12.017 0z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>

    </div>
  );
}