# UrbanPlek - Product Requirements Document (PRD) v2.0
## (Migration: Python Flask → Node.js / Express.js Backend)

## 1. Project Overview
**UrbanPlek** is Nashik's premier property platform, designed to help users (specifically students, families, and businesses) discover premium real estate. The platform offers a seamless experience for searching and listing properties across various categories including Homes, Lands, Commercial Spaces, and Student Accommodations (PGs/Hostels).

**Key Change in v2.0:** The backend is being migrated from **Python (Flask)** to **Node.js (Express.js)** to unify the stack under JavaScript/TypeScript, simplify deployment on Vercel, and improve maintainability by sharing types/utilities between frontend and backend.

---

## 2. Tech Stack & Architecture

### Frontend (Client-Side) — *No change*
- **Framework:** Next.js (App Router) v14+ / React 19
- **Styling:** Tailwind CSS v4, PostCSS
- **Authentication:** Clerk (`@clerk/nextjs`)
- **Maps & Geolocation:** Leaflet, React-Leaflet, Nominatim OpenStreetMap API
- **Animations:** Motion (`framer-motion` alternative)
- **Icons:** React Icons (`react-icons/io5`)

### Backend (Server-Side) — **UPDATED**
- **Framework:** Node.js + **Express.js** (`api/index.js` or `src/server.js`)
- **Language:** TypeScript (recommended) or JavaScript
- **Database:** PostgreSQL (hosted on **Neon.tech**) via **Prisma ORM** (or Sequelize/Drizzle as alternative)
- **Data Storage & Media:** Cloudinary (stores both images and heavy raw JSON payloads) — via `cloudinary` npm SDK
- **Concurrency:** `Promise.all()` / `p-limit` for handling parallel I/O requests (Cloudinary uploads/downloads) — replaces Python's `ThreadPoolExecutor`
- **Validation:** Zod or Joi for request payload validation
- **Auth Verification:** `@clerk/express` (or Clerk's Node SDK) to verify sessions/tokens issued by the frontend
- **API Client:** `axios` or native `fetch` for Cloudinary/Nominatim calls

### Deployment — **UPDATED**
- **Frontend:** Vercel (Root Directory: `frontendcode`)
- **Backend:** Vercel Node.js Serverless Functions (`@vercel/node`, configured via `vercel.json`), or a separate Vercel project if isolating backend scaling
- **Database:** Neon.tech (serverless Postgres, unchanged — Neon's connection pooling via `@neondatabase/serverless` or Prisma's Neon adapter is recommended for serverless cold-start efficiency)

---

## 3. Directory Structure — **UPDATED**

```text
UrbanPlek/
├── backend/
│   └── express-backend/
│       ├── src/
│       │   ├── routes/
│       │   │   ├── listings.routes.js     # /api/listings CRUD
│       │   │   ├── search.routes.js       # /api/search (Haversine logic)
│       │   │   └── admin.routes.js        # /api/admin (verification toggles)
│       │   ├── controllers/
│       │   │   ├── listings.controller.js
│       │   │   ├── search.controller.js
│       │   │   └── admin.controller.js
│       │   ├── services/
│       │   │   ├── cloudinary.service.js  # Upload/download helpers
│       │   │   └── geo.service.js         # Haversine distance calculations
│       │   ├── middleware/
│       │   │   ├── auth.middleware.js     # Clerk token verification
│       │   │   └── validate.middleware.js # Zod/Joi schema validation
│       │   ├── prisma/
│       │   │   ├── schema.prisma          # DB schema definition
│       │   │   └── client.js              # Prisma client singleton
│       │   ├── config/
│       │   │   └── env.js                 # Env variable loader/validator
│       │   └── server.js                  # Express app entrypoint
│       ├── prisma/
│       │   └── migrations/                # Auto-generated DB migrations
│       ├── package.json                   # Node dependencies & scripts
│       ├── tsconfig.json                  # (if using TypeScript)
│       ├── .env                           # DATABASE_URL, CLOUDINARY_*, CLERK_*
│       └── vercel.json                    # Vercel serverless configuration
│
├── frontendcode/                # Next.js Application Root (unchanged)
│   ├── src/
│   │   ├── app/
│   │   │   ├── auth/
│   │   │   ├── list-your-property/
│   │   │   ├── listing/
│   │   │   ├── listings/
│   │   │   ├── students-portal/
│   │   │   ├── layout.js
│   │   │   ├── page.js
│   │   │   └── globals.css
│   │   ├── lib/
│   │   └── middleware.js
│   │
│   ├── components/
│   │   ├── home/
│   │   ├── list-your-property/
│   │   ├── listings/
│   │   ├── map/
│   │   ├── students-portal/
│   │   └── application/
│   │
│   ├── public/
│   ├── package.json
│   └── next.config.mjs
```

---

## 4. Core User Flows

### A. Searching for a Property (Guest / User)
1. User lands on the **Home Page** (`/`).
2. User selects a category (Homes, Lands, Commercial).
3. User enters search filters: **Time Filter** (distance heuristic), **Property For** (Rent/Sale), and **Location** (Nashik auto-complete via OpenStreetMap).
4. User clicks "Explore Now", navigating to `/listings?lat=...&lng=...&category=...`.
5. Frontend calls `GET /api/search` or `GET /api/listings`.
6. **Express backend** calculates geographic distances using the **Haversine formula** (via `geo.service.js`) and fetches matching listing metadata from PostgreSQL through **Prisma**.
7. Backend dynamically fetches the rich JSON data for those listings from Cloudinary in parallel using `Promise.all()`.
8. Results are displayed as cards and plotted on the interactive `LeafletViewMap`.

### B. Viewing Property Details
1. User clicks a specific property card.
2. Navigates to `/listing/[listing_id]`.
3. Frontend calls `GET /api/listings/:listing_id`.
4. **Express backend** retrieves the single listing metadata from DB via Prisma, downloads full JSON from Cloudinary, and returns combined data.
5. Rich details, image carousels, and exact map locations are rendered.

### C. Adding a Property Listing (Authenticated User)
1. User navigates to `/list-your-property`.
2. Selects the type of property (e.g., Residential, Land).
3. Fills out extensive form data including placing a pin on the `LeafletSelectMap`.
4. Submits form via `POST /api/listings` (multipart/form-data, handled via `multer`).
5. **Backend Processing (Express):**
   - Auth middleware verifies the Clerk session token before proceeding.
   - Validation middleware checks payload shape (Zod/Joi).
   - Assigns a unique `LST-UUID` (via `uuid` package).
   - Uploads all images concurrently to Cloudinary (`urbanplek/images`) using `Promise.all()`.
   - Packages all text/form data into a JSON file and uploads it to Cloudinary as a raw file (`urbanplek/data`).
   - Saves lightweight metadata (ID, type, lat, lng, price, json_url) to PostgreSQL via Prisma for fast querying.
6. Listing is created with `is_verified = false` pending admin approval.

### D. Authentication Flow
- Managed entirely by **Clerk** on the frontend (unchanged).
- Backend uses Clerk's Node/Express middleware to verify incoming request tokens (`requireAuth()` or manual JWT verification against Clerk's JWKS endpoint).
- `middleware.js` (Next.js) protects sensitive frontend routes; Express `auth.middleware.js` protects sensitive API routes server-side.

---

## 5. Backend Database Schema (Metadata) — **UPDATED (Prisma)**

The PostgreSQL DB (Neon) intentionally stays lightweight by only storing searchable/filterable data. Heavy descriptions and arrays remain offloaded to Cloudinary JSON files.

```prisma
model Listing {
  id             String   @id @default(uuid())
  propertyType   String   // residential, student, commercial, land
  createdAt      DateTime @default(now())
  isVerified     Boolean  @default(false)
  dataUrl        String   // Cloudinary URL pointing to full JSON data
  name           String
  location       String
  price          Int
  subtype        String?  // PG, Hostel, Room/Flat
  listingAction  String   // Rent, Sale
  lat            Float
  lng            Float

  @@index([lat, lng])
  @@index([propertyType])
}
```

| Column | Type | Description |
| :--- | :--- | :--- |
| `id` | String (UUID) | Primary Key (`LST-UUID`) |
| `propertyType` | String | residential, student, commercial, land |
| `createdAt` | DateTime | Timestamp of creation |
| `isVerified` | Boolean | Admin approval flag |
| `dataUrl` | String | Cloudinary URL pointing to the full JSON data |
| `name` | String | Listing Title / Name |
| `location` | String | Human readable address |
| `price` | Int | Numeric price for filtering |
| `subtype` | String | PG, Hostel, Room/Flat |
| `listingAction` | String | Rent, Sale |
| `lat` / `lng` | Float | Coordinates for spatial search (Haversine) |

---

## 6. Migration Notes: Flask → Express.js

| Aspect | Old (Flask/Python) | New (Express/Node) |
| :--- | :--- | :--- |
| ORM / DB Access | `Flask-SQLAlchemy` | **Prisma ORM** (or Drizzle/Sequelize) |
| Concurrency | `concurrent.futures.ThreadPoolExecutor` | `Promise.all()`, `p-limit` |
| File Uploads | `werkzeug`/manual multipart parsing | `multer` middleware |
| Env Config | `python-dotenv` | `dotenv` |
| Validation | Manual / `marshmallow` | `zod` or `joi` |
| Serverless Adapter | `@vercel/python` | `@vercel/node` |
| Auth Verification | Manual token check | `@clerk/express` or Clerk JWKS verification |
| DB Driver | `psycopg2` | `@neondatabase/serverless` (via Prisma adapter) or `pg` |

**Data Migration:** No schema changes required at the storage level — existing Neon Postgres tables and Cloudinary JSON files remain compatible. Only the access layer changes. Recommended: introspect existing DB with `npx prisma db pull` to auto-generate the initial `schema.prisma`, rather than rebuilding it from scratch.

---

## 7. Architecture Highlights & Trade-offs
- **JSON in Cloudinary:** Storing JSON in Cloudinary instead of PostgreSQL columns keeps the database extremely lightweight and fast, but requires an extra HTTP request (managed concurrently via `Promise.all()`) to fetch full property details.
- **Client-Side Maps:** Leaflet is imported dynamically or guarded by `'use client'` to prevent SSR issues in Next.js.
- **Node Async I/O:** Express's native async/await and non-blocking I/O model natively handles concurrent Cloudinary upload/download without needing manual thread pools, simplifying the code compared to the Python implementation.
- **Serverless Cold Starts:** Using Neon's serverless driver (`@neondatabase/serverless`) with connection pooling is recommended over long-lived Prisma connections to avoid exhausting Neon's connection limits under Vercel's serverless function model.

## 8. Future Considerations & Management
- **Search Optimization:** Move the current in-app Haversine distance calculation to a native **PostGIS** query in PostgreSQL as the database grows.
- **Caching:** Introduce Redis (e.g., Upstash Redis for serverless compatibility) to cache frequent searches (e.g., standard "KTHM College" searches) and heavily reduce Cloudinary JSON fetch times.
- **Admin Panel:** Build a dedicated admin dashboard (Next.js route, protected by Clerk role-based access) to review listings and toggle `isVerified = true`.
- **API Documentation:** Consider adding OpenAPI/Swagger docs (`swagger-jsdoc` + `swagger-ui-express`) for the new Express API surface, since Node tooling for this is more mature than the Flask equivalent.
- **Testing:** Add Jest/Supertest integration tests for Express routes to replace any prior Python `pytest` coverage.
