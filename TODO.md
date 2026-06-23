# TODO - Marketplace-first architecture redesign (StockFlow)

## Step 1: Remove dashboard redirects
- [x] Remove any `router.push('/dashboard')` behavior after login (start with `app/page.tsx`).


## Step 2: Update global header navigation
- [ ] Update `components/layout/header.tsx` to marketplace-first top nav.


- [ ] Remove “Dashboard” nav item when signed in.
- [ ] Add user avatar dropdown with required menu items.

## Step 3: Add missing pages for menu routes
- [ ] Create user pages: `/profile`, `/saved`, `/my-listings`, `/orders`, `/analytics`, keep `/settings`.
- [ ] Create seller pages: `/seller/listings`, `/seller/create`, `/seller/orders`, `/seller/analytics`.
- [ ] Create buyer pages aliases if needed: `/saved`, `/orders`, `/messages`, `/profile`.

## Step 4: Admin separation
- [ ] Add admin subpages under `/admin/*`.
- [ ] Ensure admin-only route protection.

## Step 5: Update middleware route protection
- [ ] Modify `middleware.ts` to protect only management/admin routes, not marketplace browsing.

## Step 6: Layout adjustments
- [ ] Remove/stop using dashboard-first layouts.
- [ ] Ensure marketplace pages use full-screen layout.

## Step 7: Smoke test
- [ ] Sign in from home stays on home.
- [ ] Sign in from listing stays on listing.
- [ ] Verify nav links work.
- [ ] Verify non-admin cannot access `/admin/*`.

