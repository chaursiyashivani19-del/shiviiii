# ÉLÉVÉ ATELIER — PRODUCTION DEPLOYMENT GUIDE

## 1. Vercel Frontend Deployment

1. Push this repository to GitHub or GitLab.
2. In Vercel, click **"Add New Project"** and import the repository.
3. Configure build settings:
   - Framework Preset: **Vite**
   - Build Command: `pnpm run build`
   - Output Directory: `dist`
4. Configure Environment Variables in Vercel:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_RAZORPAY_KEY_ID`

---

## 2. Supabase Database Migration

1. Create a new Supabase project at [supabase.com](https://supabase.com).
2. Navigate to the **SQL Editor**.
3. Copy the contents of `supabase/migrations/20261122000000_initial_schema.sql` and execute the query.
4. All tables, foreign keys, row-level security policies, and atomic RPC functions will be created automatically.
