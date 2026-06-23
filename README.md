# StockFlow - B2B Liquidation Marketplace

A comprehensive marketplace platform built with Next.js 16, TypeScript, Prisma, and Clerk authentication. StockFlow enables businesses to buy and sell excess inventory with real-time auctions, secure payments, and verified seller verification.

## Architecture Overview

### Technology Stack
- **Frontend:** Next.js 16 (App Router), React 19, TypeScript, TailwindCSS v4
- **Backend:** Next.js Server Actions & API Routes
- **Database:** PostgreSQL with Prisma ORM
- **Authentication:** Clerk
- **Payments:** PesaPal (for East African markets)
- **Storage:** Cloudinary (images)
- **Email:** SMTP/Nodemailer
- **Validation:** Zod, React Hook Form

### Project Structure
```
/app
  /admin                          # Admin dashboard & moderation
  /api
    /webhooks/clerk              # Clerk webhook for user sync
    /listings                    # Marketplace listings CRUD
    /orders                      # Order management
    /bids                        # Auction bidding system
  /buyer                         # Buyer dashboard & orders
  /dashboard                     # User dashboard
  /listings/[id]                 # Listing detail & auction page
  /marketplace                   # Main marketplace with search/filters
  /messages                      # Messaging system
  /seller                        # Seller dashboard & listing management
  /settings                      # Account settings
  /sign-in, /sign-up            # Auth pages
  layout.tsx                     # Root layout with Clerk
  page.tsx                       # Landing page

/components/ui                   # shadcn/ui components (Card, Badge, Tabs, etc.)

/lib
  /auth.ts                       # Auth utilities & server functions
  /prisma.ts                     # Prisma client singleton
  /api.ts                        # API response helpers

/prisma
  schema.prisma                  # Complete database schema

middleware.ts                    # Clerk middleware for protected routes
```

## Database Schema

The Prisma schema includes 13 core models:

1. **User** - Business accounts with seller/buyer roles, ratings, verification status
2. **Listing** - Marketplace listings with auction support, condition tracking, bulk discounts
3. **Bid** - Auction bids with amount tracking and status management
4. **Order** - Purchase orders with payment tracking and fulfillment status
5. **Payment** - Payment records with PesaPal integration
6. **Message** - Direct messaging between users
7. **Notification** - Real-time notifications for platform events
8. **WatchlistItem** - Items saved by buyers for later
9. **AuditLog** - Security audit trail for compliance
10. **AdminSettings** - Platform-wide configuration (maintenance mode, fee percentages, etc.)

## Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database
- Clerk account (auth)
- PesaPal merchant account (payments)
- Cloudinary account (images)

### Environment Setup

1. Clone and install dependencies:
```bash
npm install
```

2. Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

3. Configure environment variables:
```env
# Database
DATABASE_URL=postgresql://user:password@localhost:5432/stockflow

# Clerk
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/dashboard
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/onboarding

# PesaPal
PESAPAL_API_KEY=your_api_key
PESAPAL_CLIENT_ID=your_client_id
PESAPAL_SECRET_KEY=your_secret_key
NEXT_PUBLIC_PESAPAL_CALLBACK_URL=https://your-domain.com/api/payments/callback

# Email
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
SMTP_FROM=noreply@stockflow.com

# Cloudinary
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Database Setup

1. Initialize Prisma and create database:
```bash
npm run prisma:migrate
```

2. Generate Prisma client:
```bash
npm run prisma:generate
```

3. (Optional) Seed database with mock data:
```bash
npx prisma db seed
```

### Running the Development Server

```bash
npm run dev
```

Visit `http://localhost:3000` to see the application.

## Key Features

### Marketplace
- Advanced search with filters (category, condition, price range)
- Real-time listing availability
- Seller ratings and verification badges
- Quick view and wishlist functionality

### Seller Dashboard
- Create and manage listings
- Track views, offers, and conversion rates
- Performance analytics
- Bulk listing operations

### Buyer Dashboard
- Track active orders and delivery status
- Manage saved items (watchlist)
- View order history with filtering
- Direct messaging with sellers

### Auction System
- Real-time bidding with countdown timer
- Automatic bid validation
- Minimum bid calculations
- Bid history and transparency

### Admin Panel
- Listing moderation and approval workflow
- User flagging and suspension
- Report management
- Platform analytics and settings

### Security Features
- Clerk-managed authentication with webhooks
- Protected API routes with user verification
- Audit logging for compliance
- Rate limiting (configurable)
- CSRF protection

## API Endpoints

### Listings
- `GET /api/listings` - Get all listings with filters
- `POST /api/listings` - Create new listing (seller only)
- `GET /api/listings/[id]` - Get listing details
- `PUT /api/listings/[id]` - Update listing (owner only)
- `DELETE /api/listings/[id]` - Delete listing (owner only)

### Orders
- `GET /api/orders` - Get user's orders
- `POST /api/orders` - Create new order
- `GET /api/orders/[id]` - Get order details
- `PUT /api/orders/[id]` - Update order status

### Bids
- `GET /api/bids?listingId=[id]` - Get bids for listing
- `POST /api/bids` - Place bid on auction
- `PUT /api/bids/[id]` - Update existing bid

### Webhooks
- `POST /api/webhooks/clerk` - Sync user data from Clerk

## Deployment

### Vercel (Recommended)
1. Push code to GitHub
2. Connect repository to Vercel
3. Set environment variables in Vercel dashboard
4. Deploy automatically on push

### Docker
```bash
docker build -t stockflow .
docker run -p 3000:3000 stockflow
```

## Future Enhancements

- [ ] WebSocket real-time notifications
- [ ] Advanced analytics dashboard
- [ ] Automated invoice generation
- [ ] Bulk import/export functionality
- [ ] Multi-currency support
- [ ] Mobile app
- [ ] AI-powered listing recommendations
- [ ] Integration with shipping APIs

## Contributing

1. Create feature branch: `git checkout -b feature/your-feature`
2. Make changes and commit: `git commit -am 'Add feature'`
3. Push to branch: `git push origin feature/your-feature`
4. Submit pull request

## License

MIT License - see LICENSE file for details

## Support

For issues and questions:
- Email: support@stockflow.com
- Documentation: https://docs.stockflow.com
- Twitter: @stockflow_io
