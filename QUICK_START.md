# StockFlow Quick Start Guide

Get up and running with StockFlow in 5 minutes!

## Prerequisites
- Node.js 18+ installed
- PostgreSQL database (local or cloud)
- Clerk account (free tier available)

## Step 1: Clone & Install Dependencies (1 min)

```bash
# Install dependencies
npm install
```

## Step 2: Environment Setup (2 mins)

Copy the example env file:
```bash
cp .env.example .env.local
```

Edit `.env.local` and add your credentials:

### Database URL
```env
DATABASE_URL=postgresql://user:password@localhost:5432/stockflow
```
Get this from:
- Local: `postgresql://postgres:password@localhost:5432/stockflow`
- AWS RDS: From RDS console
- Neon: From project settings
- Supabase: From connection string

### Clerk Setup (FREE)
1. Go to https://clerk.com and sign up
2. Create new application
3. Copy keys from "API Keys" section:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
CLERK_WEBHOOK_SECRET=whsec_...
```

4. Go to "Webhooks" and add: `https://yourdomain.com/api/webhooks/clerk`
   (For local: Use ngrok to tunnel `http://localhost:3000`)

## Step 3: Database Setup (1 min)

```bash
# Run migrations
npm run prisma:migrate

# Generate Prisma client
npm run prisma:generate

# (Optional) View database UI
npm run prisma:studio
```

## Step 4: Start Development Server (1 min)

```bash
pnpm dev
```

Open http://localhost:3000 and explore:
- Landing page
- Sign up (create test account)
- Dashboard
- Marketplace
- Seller hub

## What's Included

### Pages (Ready to Use)
- **Landing Page** (`/`) - Feature highlights and CTA
- **Marketplace** (`/marketplace`) - Browse listings with filters
- **Dashboard** (`/dashboard`) - User overview
- **Seller Hub** (`/seller`) - Manage your listings
- **Buyer Dashboard** (`/buyer`) - Track orders & watchlist
- **Listing Detail** (`/listings/[id]`) - View & bid on auctions
- **Messages** (`/messages`) - Chat with other users
- **Settings** (`/settings`) - Account preferences
- **Admin** (`/admin`) - Moderation tools (if admin user)

### Database Models
All 13 models are pre-configured:
- Users with ratings and verification
- Listings with auction support
- Bids with validation
- Orders with payment tracking
- Messages for direct communication
- Notifications system
- Audit logs for compliance

### API Routes Ready
```
GET  /api/listings           - Get all listings
POST /api/listings           - Create listing
GET  /api/listings/[id]      - Get listing details

GET  /api/orders             - Get user orders
POST /api/orders             - Create order

GET  /api/bids?listingId=... - Get auction bids
POST /api/bids               - Place bid

POST /api/webhooks/clerk     - Sync user data
```

## Testing the Platform

### As a Buyer:
1. Sign up (buyer)
2. Go to marketplace
3. Browse listings
4. Click on a listing to view details
5. Place a bid on an auction
6. Add items to watchlist

### As a Seller:
1. Sign up (seller)
2. Go to Seller Hub
3. Click "Create Listing"
4. Fill in listing details
5. Track views and offers

### As an Admin:
1. Create user and manually set admin role in database
2. Go to `/admin`
3. Moderate listings
4. Manage flagged users
5. View platform analytics

## Next Steps

### Short Term (Complete These)
1. **Setup PesaPal** for payments
   - Get API credentials from PesaPal
   - Add to `.env.local`
   - Integrate payment API

2. **Setup Cloudinary** for images
   - Create account at cloudinary.com
   - Get API keys
   - Create image upload endpoint

3. **Setup Email** (SMTP)
   - Use Gmail, SendGrid, or other SMTP
   - Add credentials to `.env.local`
   - Create email templates

### Medium Term
- Add real-time notifications (WebSockets)
- Setup Redis for caching & rate limiting
- Create automated tests
- Add advanced analytics

### Before Production
- Run security audit
- Setup error tracking (Sentry)
- Configure backups
- Test payment flows
- Load test the platform

## Troubleshooting

### "DATABASE_URL is invalid"
Check your database connection string format:
```
postgresql://user:password@host:port/database
```

### Clerk Auth Not Working
1. Check `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` is public (starts with `pk_`)
2. Check `CLERK_SECRET_KEY` is secret (starts with `sk_`)
3. Verify webhook is configured in Clerk dashboard

### Build Errors with Components
```bash
# Regenerate shadcn components
npx shadcn@latest add card badge tabs input --yes
```

### Database Migration Issues
```bash
# Reset database (WARNING: deletes all data)
npm run prisma:reset

# Or manually fix migrations
npx prisma migrate resolve --rolled-back 20240101000000_init
```

## File Structure Quick Reference

```
app/
├── (auth)
│   ├── sign-in/page.tsx
│   └── sign-up/page.tsx
├── api/
│   ├── webhooks/clerk/route.ts
│   ├── listings/route.ts
│   ├── orders/route.ts
│   └── bids/route.ts
├── admin/page.tsx
├── buyer/page.tsx
├── dashboard/page.tsx
├── listings/[id]/page.tsx
├── marketplace/page.tsx
├── messages/page.tsx
├── seller/page.tsx
├── settings/page.tsx
├── layout.tsx
└── page.tsx

lib/
├── auth.ts
├── prisma.ts
└── api.ts

prisma/
└── schema.prisma

middleware.ts
```

## Important Files to Customize

1. **Colors** - Edit `/app/globals.css` (Tailwind theme)
2. **Branding** - Update logo in `/app/layout.tsx`
3. **Content** - Edit landing page in `/app/page.tsx`
4. **Database** - Modify `/prisma/schema.prisma`

## Useful Commands

```bash
# Development
npm run dev                 # Start dev server
npm run build               # Build for production
npm start                   # Run production build

# Database
npm run prisma:studio       # Open database UI
npm run prisma:migrate      # Run migrations
npm run prisma:generate     # Regenerate client
npx prisma db push          # Push schema to database

# Linting
npm run lint                # Run ESLint
npm run type-check          # TypeScript check

# Components
npx shadcn add [name]       # Add shadcn component
```

## Support & Resources

- **Docs**: Check `/README.md` and `IMPLEMENTATION_GUIDE.md`
- **Errors**: Check console for detailed error messages
- **Clerk Help**: https://clerk.com/docs
- **Prisma Help**: https://prisma.io/docs
- **Next.js Help**: https://nextjs.org/docs

## You're Ready! 🚀

Start the dev server and begin exploring:
```bash
npm run dev
```

Questions? Check the IMPLEMENTATION_GUIDE.md for detailed information on each feature!
