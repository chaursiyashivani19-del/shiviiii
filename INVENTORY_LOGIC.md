# ÉLÉVÉ ATELIER — INVENTORY LOGIC & ATOMIC CONCURRENCY

## 1. Stock Calculations

In our architecture, inventory is tracked strictly at the **variant level** (size × color combination) and never at the generic product level.

```
available_stock = stock_on_hand - stock_reserved
```

- `stock_on_hand`: Physical garments present inside the atelier warehouse.
- `stock_reserved`: Garments currently held during active checkouts.
- `available_stock`: Physical units available for new orders.

Check constraints prevent negative numbers:
```sql
CHECK (stock_on_hand >= 0)
CHECK (stock_reserved >= 0)
```

---

## 2. Atomic Lifecycle & Row Locking

### Step 1: Reservation (`reserve_stock_atomic`)
When the customer clicks **"Authorize & Pay"**:
1. Acquires an exclusive row lock on `product_variants` using `FOR UPDATE`.
2. Validates that `available_stock >= requested_quantity`. If not, immediately aborts with `FALSE`.
3. Increments `stock_reserved += requested_quantity`.
4. Writes an audit row to `inventory_movements` with type `'order_reservation'`.

### Step 2: Payment Verification (`commit_stock_deduction`)
When the gateway verifies signature:
1. Decrements `stock_reserved -= requested_quantity`.
2. Decrements `stock_on_hand -= requested_quantity`.
3. Records `'order_fulfillment'` in `inventory_movements`.

### Step 3: Cancellation or Expiry (`release_stock_reservation`)
If the customer dismisses checkout or payment fails:
1. Decrements `stock_reserved -= requested_quantity`.
2. Restores `available_stock`.
3. Records `'order_cancellation'` in `inventory_movements`.
