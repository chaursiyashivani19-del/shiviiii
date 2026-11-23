# ÉLÉVÉ ATELIER — Premium 3D Fashion E-Commerce Ecosystem

> **Haute Mode • Édition 2026**  
> An independent international luxury fashion label combining Parisian editorial storytelling, Pinterest-inspired visual discovery, interactive Three.js 3D WebGL experiences, and variant-level atomic PostgreSQL inventory authority.

---

## 🌟 Local Access URL

The application is currently running live on your machine:
- **Local URL**: [http://localhost:3000](http://localhost:3000)
- **Network URL**: `http://10.186.27.135:3000/`

---

## 💎 Key Highlights & Capabilities

1. **Brand Identity & Art Direction**:
   - Inspired by coquette fashion, soft luxury, and contemporary Gen-Z streetwear.
   - Blush pinks (`#FDF7F8`, `#F6CED7`), warm ivory (`#FAF6F0`), cream white (`#FCFBF7`), pastel lavender (`#E8E0F0`), and rich cherry red (`#C92A42`).
   - Expressive typography: *Playfair Display* serif display headings paired with *Plus Jakarta Sans* functional body typography.

2. **Interactive 3D WebGL Engine**:
   - Three.js WebGL scene with realistic physical materials (`MeshStandardMaterial`), clearcoat, environment lighting, and shadows.
   - Interactive mouse-tracking parallax, rotating couture ribbon bow, chrome clutch evening box, and baroque pearls.
   - Responsive canvas scaling and automatic fallback for reduced motion or non-WebGL devices.

3. **53 Unique Garments & Accessories**:
   - Tops & Blouses (8), Dresses & Evening Slips (10), Skirts (7), Bottoms & Trousers (7), Co-ord Sets (7), Streetwear & Outerwear (7), and Fine Accessories (7).
   - Each product contains individual variants across sizes (XS, S, M, L, XL, OS) and colors with unique SKUs and real stock tracking.

4. **Atomic Concurrency & Inventory Engine**:
   - PostgreSQL RPC logic (`reserve_stock_atomic`, `release_stock_reservation`, `commit_stock_deduction`, `adjust_stock_manual`).
   - Row-level locking (`FOR UPDATE`) preventing negative stock and race conditions during simultaneous orders.
   - Full chronological audit log tracking every inventory movement.

5. **Integrated Payment Architecture (Razorpay)**:
   - Abstraction supporting **Demo Instant Checkout** (zero-friction portfolio evaluation with simulated authorization) and live **Razorpay Gateway** for India UPI, Cards, and NetBanking.

6. **Protected Administration Suite**:
   - Live revenue KPI dashboard, product catalogue management, variant stock table, stock adjustment modal, audit log stream, and order status lifecycle.

---

## 📁 Repository Structure

```
c:\Users\Admin\shivi\
├── dist/                             # Compiled production bundle
├── node_modules/                     # Dependencies
├── src/
│   ├── components/
│   │   ├── 3d/
│   │   │   └── Hero3DScene.tsx      # Three.js 3D WebGL hero canvas
│   │   ├── common/
│   │   │   ├── Header.tsx           # Announcement bar & editorial navigation
│   │   │   ├── Footer.tsx           # Brand story & newsletter form
│   │   │   └── CartDrawer.tsx       # Slide-out shopping bag drawer
│   │   ├── home/
│   │   │   ├── HeroSection.tsx      # Full-width editorial campaign hero
│   │   │   ├── NewArrivals.tsx      # Curated new arrivals grid
│   │   │   ├── CategoryShowcase.tsx # Asymmetrical category gallery
│   │   │   ├── MoodboardSection.tsx # Pinterest-inspired shoppable pins
│   │   │   └── CampaignStory.tsx    # Editorial narrative section
│   │   └── shop/
│   │       ├── ProductCard.tsx      # Interactive card with quick-add
│   │       └── FilterSidebar.tsx    # Multi-facet discovery sidebar
│   ├── context/
│   │   ├── AuthContext.tsx          # Customer & Admin authentication state
│   │   ├── CartContext.tsx          # Persistent bag, coupons, and totals
│   │   └── WishlistContext.tsx      # Saved items persistence
│   ├── data/
│   │   ├── categories.ts            # Category metadata
│   │   └── products.ts              # 53 rich unique sample products
│   ├── pages/
│   │   ├── HomePage.tsx             # Homepage campaign experience
│   │   ├── ShopPage.tsx             # Full discovery catalogue & filters
│   │   ├── ProductDetailPage.tsx    # Gallery, zoom, variant stock & size guide
│   │   ├── CartPage.tsx             # Bag review & coupon engine
│   │   ├── CheckoutPage.tsx         # Address validation, payment & confetti
│   │   ├── WishlistPage.tsx         # Saved pieces
│   │   ├── AccountPage.tsx          # Customer profile & historical orders
│   │   └── admin/
│   │       └── AdminDashboard.tsx   # Protected director management suite
│   ├── services/
│   │   ├── supabase.ts              # Supabase client + local mock database
│   │   └── payment.ts               # Payment provider abstraction
│   ├── types/
│   │   └── index.ts                 # Strict TypeScript schemas
│   ├── App.tsx                      # Root router and layout
│   ├── index.css                    # Luxury Tailwind styling & typography
│   └── main.tsx                     # React application root
├── supabase/
│   └── migrations/
│       └── 20261122000000_initial_schema.sql # Authoritative PostgreSQL migration
├── .env.example                     # Documented credentials template
├── ARCHITECTURE.md                  # System architecture specification
├── DATABASE_SCHEMA.md               # PostgreSQL schema & constraints
├── INVENTORY_LOGIC.md               # Atomic stock reservation & concurrency
├── PAYMENT_FLOW.md                  # Razorpay integration & webhook flow
├── SECURITY.md                      # RLS policies & credential isolation
├── DEPLOYMENT.md                    # Production hosting instructions
└── vite.config.ts                   # Vite bundler configuration
```

---

## ⚡ Quick Start & Exploration

1. Open [http://localhost:3000](http://localhost:3000) in your browser.
2. In the top announcement bar, click **"Switch to Admin"** to access the complete management dashboard, or **"Switch to Customer"** for the storefront.
3. Test adding any piece to your bag, use coupon code `WELCOME10` or `COQUETTE20`, and complete demo checkout to watch the atomic inventory commitment and celebratory confetti!
