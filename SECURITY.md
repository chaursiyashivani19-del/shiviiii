# ÉLÉVÉ ATELIER — APPLICATION SECURITY ARCHITECTURE

## 1. Row Level Security (RLS)

All 15 tables have RLS enabled:
- Public read access is granted only to `status = 'published'` products and active categories.
- Customers can only read and mutate their own carts, wishlists, saved addresses, and historical orders (`auth.uid() = user_id`).
- Administrative operations (product updates, manual stock rebalances, order status overrides) are protected by `is_admin()` checks querying `user_roles`.

---

## 2. Input Sanitization & Validation

- Customer inputs (addresses, phones, emails, checkout quantities) are sanitized on input.
- Database checks ensure non-negative numeric prices and strictly defined enum values for sizes, statuses, and movement types.

---

## 3. Credential Protection

- `SUPABASE_SERVICE_ROLE_KEY`, `RAZORPAY_KEY_SECRET`, and webhook secrets are never exposed on the frontend client.
- The repository utilizes `.env.example` to prevent accidental credential leakage in version control.
