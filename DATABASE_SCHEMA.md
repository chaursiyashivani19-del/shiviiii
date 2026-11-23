# ÉLÉVÉ ATELIER — DATABASE SCHEMA SPECIFICATION

The PostgreSQL database architecture is defined in `supabase/migrations/20261122000000_initial_schema.sql`.

## Primary Tables

### 1. `profiles`
Linked directly to `auth.users` through foreign key cascade.
- `id`: UUID (Primary Key, References `auth.users.id`)
- `full_name`: TEXT
- `avatar_url`: TEXT
- `phone`: TEXT
- `role`: TEXT ('customer' | 'admin' | 'inventory_manager')
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ

### 2. `categories`
- `id`: UUID PRIMARY KEY
- `name`: TEXT NOT NULL
- `slug`: TEXT UNIQUE NOT NULL
- `description`: TEXT
- `image_url`: TEXT
- `display_order`: INT
- `is_active`: BOOLEAN

### 3. `products`
- `id`: UUID PRIMARY KEY
- `title`: TEXT NOT NULL
- `slug`: TEXT UNIQUE NOT NULL
- `description`: TEXT NOT NULL
- `category_id`: UUID (References `categories.id`)
- `price_inr`: NUMERIC(10,2) CHECK (price_inr >= 0)
- `sale_price_inr`: NUMERIC(10,2) CHECK (sale_price_inr >= 0)
- `status`: TEXT ('draft' | 'published' | 'archived')
- `is_featured`: BOOLEAN
- `is_new_arrival`: BOOLEAN
- `editorial_quote`: TEXT
- `created_at`: TIMESTAMPTZ
- `updated_at`: TIMESTAMPTZ

### 4. `product_variants` (Variant-Level Inventory)
- `id`: UUID PRIMARY KEY
- `product_id`: UUID (References `products.id` ON DELETE CASCADE)
- `sku`: TEXT UNIQUE NOT NULL (e.g., `EAT-TOP-01-PNK-S`)
- `size`: TEXT NOT NULL ('XS', 'S', 'M', 'L', 'XL', 'OS')
- `color`: TEXT NOT NULL
- `color_hex`: TEXT NOT NULL
- `stock_on_hand`: INT NOT NULL CHECK (stock_on_hand >= 0)
- `stock_reserved`: INT NOT NULL CHECK (stock_reserved >= 0)
- `available_stock`: INT GENERATED ALWAYS AS (stock_on_hand - stock_reserved) STORED
- `low_stock_threshold`: INT DEFAULT 5
- `UNIQUE(product_id, size, color)`

### 5. `inventory_movements` (Audit Trail)
- `id`: UUID PRIMARY KEY
- `variant_id`: UUID (References `product_variants.id`)
- `movement_type`: TEXT ('initial_stock', 'manual_addition', 'manual_deduction', 'order_reservation', 'order_fulfillment', 'order_cancellation', 'return_restock', 'inventory_correction')
- `quantity_change`: INT NOT NULL
- `stock_on_hand_after`: INT NOT NULL
- `stock_reserved_after`: INT NOT NULL
- `reference_id`: TEXT
- `notes`: TEXT
- `created_by`: UUID (References `auth.users.id`)
- `created_at`: TIMESTAMPTZ

### 6. `orders` & `order_items`
- `orders`: `id`, `order_number` (UNIQUE), `user_id`, `guest_email`, `shipping_address` (JSONB), `subtotal_inr`, `discount_amount_inr`, `shipping_fee_inr`, `total_inr`, `status`, `created_at`.
- `order_items`: `id`, `order_id`, `product_id`, `variant_id`, `product_title_snapshot`, `sku_snapshot`, `size_snapshot`, `color_snapshot`, `unit_price_inr_snapshot`, `quantity`, `total_price_inr`.
