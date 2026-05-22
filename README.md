# Tranquilo Vacation Rentals

Hand-picked vacation rentals in Playa del Carmen, Mexico. Book direct — no fees, no middlemen.

## Tech Stack

- **Framework**: Next.js 15 (App Router), React 19, TypeScript 5
- **Styling**: Tailwind CSS v4 with Cenote Luxe design tokens
- **UI**: Radix UI primitives, lucide-react icons
- **Fonts**: Fraunces (display), Inter (body) via next/font
- **Booking**: Stripe Checkout (direct booking)
- **Email**: Resend
- **Anti-spam**: Cloudflare Turnstile
- **Analytics**: Vercel Analytics
- **i18n**: next-intl (en default, es at /es/...)
- **Package manager**: pnpm

## Quick Start

```bash
# 1. Install dependencies
pnpm install

# 2. Copy environment variables
cp .env.example .env.local
# Fill in your values — see "Environment Variables" below

# 3. Start development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SITE_URL` | Yes | Full site URL (no trailing slash) |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Site display name |
| `STRIPE_SECRET_KEY` | Yes | Stripe secret key |
| `STRIPE_WEBHOOK_SECRET` | Yes | Stripe webhook signing secret |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Yes | Stripe publishable key |
| `RESEND_API_KEY` | Yes | Resend API key for email |
| `RESEND_FROM_EMAIL` | Yes | From address for emails |
| `RESEND_REPLY_TO` | Yes | Reply-to for booking emails |
| `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Yes | Cloudflare Turnstile site key |
| `TURNSTILE_SECRET_KEY` | Yes | Cloudflare Turnstile secret key |
| `UPSTASH_REDIS_REST_URL` | No | Upstash Redis URL (for rate limiting) |
| `UPSTASH_REDIS_REST_TOKEN` | No | Upstash Redis token |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Yes | WhatsApp number (+country code) |
| `NEXT_PUBLIC_AIRBNB_PROFILE_URL` | No | Airbnb profile URL (OTA button) |
| `NEXT_PUBLIC_VRBO_PROFILE_URL` | No | VRBO profile URL (OTA button) |
| `ICAL_BASE_URL` | No | Base URL for iCal imports |

## Scripts

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm start        # Start production server
pnpm lint         # Run ESLint
pnpm typecheck    # Run TypeScript type check
pnpm test         # Run unit tests
pnpm test:e2e     # Run Playwright E2E tests
pnpm images       # Process images (sharp pipeline)
pnpm favicons     # Generate favicons
pnpm import-ical  # Import iCal availability data
```

## How To

### Add a New Property

1. Open `content/properties/index.ts`
2. Add a new entry to the `properties` array following the `Property` interface
3. Create an availability file: `content/properties/availability/your-slug.json`
4. Add property photos to `public/img/raw/` and run `pnpm images`

### Add a Blog Post

1. Create an MDX file in `content/blog/en/your-post-slug.mdx`
2. Add a Spanish translation in `content/blog/es/your-post-slug.mdx`
3. Update the posts list in `app/(marketing)/blog/page.tsx`

### Import iCal Availability

```bash
pnpm import-ical your-property-slug https://www.airbnb.com/calendar/ical/xyz.ics
```

## Stripe Booking Flow

1. Guest selects dates + guests on property detail page
2. Clicks "Book Now" → POST `/api/booking`
3. Server checks availability, calculates total, creates Stripe Checkout Session
4. Guest redirected to Stripe Checkout
5. On success → `/booking/success?session_id=...`
6. Stripe webhook → `POST /api/booking/confirm` → marks dates as booked, sends emails

**Webhook**: Point `checkout.session.completed` to `/api/booking/confirm`

## Design System — Cenote Luxe

| Token | Color | Usage |
|---|---|---|
| `limestone-50` | `#F7F5EF` | Page background |
| `emerald-500` | `#1B5E4B` | Primary, links |
| `gold-500` | `#C9953A` | Accent, Book Now |
| `ink-900` | `#1C1A16` | Body text |
| `line` | `#E2DDD2` | Borders |

## AI Optimization

- `/llms.txt` — site + property data for AI crawlers
- `/api/properties` — machine-readable JSON of all properties
- Expanded Schema.org markup on all key pages