# ÉLÉVÉ ATELIER — ARCHITECTURE SPECIFICATION

## 1. System Overview

ÉLÉVÉ ATELIER is built on a modern decoupled architecture:
- **Presentation Layer**: React 18 + Vite + TypeScript with Tailwind CSS for high-fashion typography and responsive layouts.
- **3D & Graphics Engine**: Three.js WebGL with custom geometry composition, ACESFilmic tone mapping, and pointer parallax.
- **Data & Authority Layer**: Supabase PostgreSQL featuring Row Level Security (RLS), atomic stored procedures (RPCs), and immutable snapshots.
- **Resilience Engine**: Dual-mode data access layer (Local Mock Database Engine seamlessly transitioning to live Supabase backend when environment keys are supplied).

```
[ Browser Client ]
       │
       ├───► React Three.js WebGL Canvas (3D Hero Scene)
       │
       ├───► React Router (Public & Protected Admin Routes)
       │
       ├───► AuthContext, CartContext, WishlistContext
       │
       └───► Data Access Layer (src/services/supabase.ts)
                 │
                 ├── (If VITE_SUPABASE_URL set) ──► Cloud Supabase PostgreSQL
                 │                                        │
                 │                                        ├── Tables with RLS
                 │                                        └── Atomic Stored Procs
                 │
                 └── (If Demo Mode) ──────────────► LocalStorage Mock Database Engine
                                                          │
                                                          ├── 53 Initial Products
                                                          ├── Atomic Inventory Locks
                                                          └── Audit Log Trail
```

## 2. Key Architectural Decisions

1. **Portfolio-First, Production-Ready**:
   - The app can be reviewed and tested immediately without requiring external API setup.
   - All database migrations, tables, foreign keys, constraints, and RPC functions are authored in `supabase/migrations/20261122000000_initial_schema.sql`.

2. **Immutable Order History Snapshots**:
   - Orders do not simply reference current product prices. Instead, each order record snapshots `product_title_snapshot`, `sku_snapshot`, `size_snapshot`, `color_snapshot`, and `unit_price_inr_snapshot`.
   - Subsequent price alterations or product archiving will never corrupt past order receipts.

3. **Atomic Stock Locking**:
   - Stock reservations are committed inside atomic transactions before payment verification to prevent overselling during flash sales.
