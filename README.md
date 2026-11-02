# Elbadil 101 — Political Campaign & Citizen Office Platform

[![Next.js 15](https://img.shields.io/badge/Next.js-15.1.6-black?style=flat&logo=next.js)](https://nextjs.org/)
[![React 19](https://img.shields.io/badge/React-19.0.0-61dafb?style=flat&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS v4](https://img.shields.io/badge/Tailwind_CSS-v4.0-38bdf8?style=flat&logo=tailwindcss)](https://tailwindcss.com/)
[![LibSQL / Turso](https://img.shields.io/badge/Database-LibSQL%20%2F%20Turso-00d492?style=flat&logo=sqlite)](https://turso.tech/)
[![License](https://img.shields.io/badge/License-Proprietary-red?style=flat)](#license)

An official, high-performance trilingual campaign website and digital citizen correspondence portal built for political candidates and civic organizations. Features a modern editorial design, full native Arabic RTL layout, citizen grievance/suggestion tracking, supporter registration, and a role-based administrative dashboard.

---

## 🌟 Key Features

### 1. 🌐 Trilingual & Native RTL Architecture
* **Supported Languages**: Arabic (`ar`, default with complete `dir="rtl"`), French (`fr`, `dir="ltr"`), and English (`en`, `dir="ltr"`).
* **Typography**: Cairo (balanced Arabic typography), Playfair Display (editorial Latin headings), and Inter (body copy).
* **RTL-Native Layout**: Dynamic direction switching, mirrored carousels, responsive timelines, and logical CSS spacing (`ms-*`, `me-*`, `ps-*`, `pe-*`).
* **Translation System**: Centralized JSON dictionaries (`messages/ar.json`, `messages/fr.json`, `messages/en.json`) with cookie persistence.

### 2. 🏛️ Public Citizen & Campaign Portal
* **Navigation Bar**: Glassmorphic sticky header with scroll detection, mobile navigation drawer, language switch, and smooth anchor scrolling.
* **Hero Section**: High-impact editorial layout with candidate portrait card, campaign slogan, badges, and primary action buttons.
* **Supporter Registration**: Real-time validation for Algerian mobile numbers (`05/06/07 + 8 digits` or `+213`), searchable selector for all 58 Algerian wilayas, voting intentions, volunteer preferences, and duplicate prevention.
* **Program & Priorities**: Thematic policy cards (Economic Dignity, Regional Development, Youth & Education, Institutional Accountability) with interactive micro-animations.
* **Biography & Journey**: Verified milestones timeline and field consultation photo banner.
* **Field Activities**: Interactive carousel showcasing community outreach, youth forums, and municipal assemblies with rich modal details.
* **Citizen Submission Platform ("Contact the Office")**:
  * **Zero File Upload Vulnerability**: Strictly text-only inputs—no binary uploads, PDFs, or external storage buckets required.
  * **Categorized Routing**: 7 distinct submission types (Grievance, Suggestion, Inquiry, Meeting Request, Support, etc.).
  * **Smart Forms**: Context-sensitive fields for complaints (category, concerned department, incident date, confidentiality toggle) and suggestions (title, expected impact).
  * **Human-Readable Tracking IDs**: Collision-resistant tracking codes (e.g. `REQ-2026-XXXXXX`).
* **Interactive Sharing**: Web Share API integration with automatic fallback to WhatsApp.

### 3. 🛡️ Secure Staff & Admin Dashboard (`/admin`)
* **Role-Based Access Control (RBAC)**: Distinct access levels (`super_admin` and `admin`).
* **Citizen Privacy Protection**: Submissions flagged as confidential automatically mask citizen contact details for non-supervisors.
* **Real-time Analytics**: Visual KPI cards (Total Submissions, Pending, In Progress, Resolved, Active Supporters) and 7-day activity metrics.
* **Submissions Management Drawer**: Multi-factor filtering (type, status, priority, wilaya), live search, internal staff notes, status transitions, and audit logs.
* **Supporters Directory**: Full searchable registry with instant **CSV Export** (UTF-8 with BOM for native Microsoft Excel Arabic/French rendering).
* **Edge Route Protection**: Scrypt password hashing with unique salt, cryptographic HMAC-SHA256 session cookies, and Next.js Edge Middleware protection.

---

## 🛠️ Tech Stack

* **Framework**: Next.js 15 (App Router, Server Actions & Edge Middleware)
* **Frontend**: React 19, Tailwind CSS v4, Framer Motion, Lucide Icons
* **Data Validation**: Zod
* **Database Client**: `@libsql/client` (SQLite for local development, Turso LibSQL for cloud/serverless)
* **Authentication**: Custom lightweight Scrypt + WebCrypto HMAC-SHA256 (no heavy external auth dependencies)

---

## 📁 Project Structure

```text
├── app/
│   ├── admin/                 # Admin dashboard pages (overview, submissions, complaints, suggestions, support)
│   ├── api/                   # API routes (submissions, support, auth, admin actions)
│   ├── layout.tsx             # Root layout with font definitions & metadata
│   ├── page.tsx               # Main public campaign page
│   └── globals.css            # Tailwind CSS v4 configurations
├── components/
│   ├── admin/                 # Admin drawer, header, sidebar, dialogs
│   ├── public/                # Public site sections (Hero, Vision, Bio, Activities, Forms)
│   └── shared/                # Logo, LanguageSwitcher, shared UI components
├── data/
│   ├── content.ts             # Central candidate details, bio, milestones & contact info
│   └── campaign.db            # Local SQLite database (ignored by git)
├── lib/
│   ├── auth.ts                # Session management & Scrypt password hashing
│   ├── db.ts                  # LibSQL client & automatic table initialization
│   ├── i18n.tsx               # Trilingual context provider & hooks
│   ├── rate-limit.ts          # In-memory IP rate limiter
│   ├── validations.ts         # Zod schemas for submissions & registrations
│   └── wilayas.ts             # 58 Algerian Wilayas dataset
├── messages/                  # i18n strings (ar.json, fr.json, en.json)
├── public/                    # Logos, SVG illustrations, and icons
├── scripts/
│   ├── seed-admin.ts          # CLI script to initialize/reset admin credentials
│   └── test-e2e.ts            # E2E verification test script
└── middleware.ts              # Edge session authentication middleware
```

---

## 🚀 Quickstart Guide

### 1. Prerequisites
* **Node.js** 18.x or 20.x+
* **npm** or **pnpm**

### 2. Installation
Clone the repository and install dependencies:
```bash
git clone https://github.com/isaacbel/Elbadil101.git
cd Elbadil101
npm install
```

### 3. Environment Configuration
Create your local environment file:
```bash
cp .env.example .env.local
```

Edit `.env.local` with your configuration:
```env
# Local SQLite database (default for development)
DATABASE_PATH=./data/campaign.db

# Admin User Credentials
ADMIN_EMAIL=admin@candidate.dz
ADMIN_PASSWORD=ReplaceWithStrongPassword123!
ADMIN_ROLE=super_admin

# Session Security (Generate with: openssl rand -hex 32)
SESSION_SECRET=replace-with-a-64-character-random-hex-string
```

### 4. Database Setup & Admin Seeding
Initialize the database tables and seed the initial administrator:
```bash
npm run seed
```

### 5. Start Development Server
```bash
npm run dev
```
* **Public Campaign Website**: [http://localhost:3000](http://localhost:3000)
* **Administrative Portal**: [http://localhost:3000/admin/login](http://localhost:3000/admin/login)

---

## 🗄️ Database: Local SQLite & Cloud Turso

The application automatically connects based on environment variables configured in `lib/db.ts`:

### Local Development
Uses local SQLite file (`data/campaign.db`). Tables are created automatically on first query.

### Cloud / Production (Free Serverless LibSQL)
For serverless hosting (such as Vercel), set up a free [Turso](https://turso.tech) database:

1. Install Turso CLI or log in to the Turso Dashboard:
   ```bash
   turso db create elbadil-db
   turso db tokens create elbadil-db
   ```
2. Add the connection credentials to your environment variables:
   ```env
   TURSO_DATABASE_URL=libsql://elbadil-db-yourusername.turso.io
   TURSO_AUTH_TOKEN=your-turso-auth-token
   ```

---

## ☁️ Free Cloud Deployment (Vercel)

1. Push your repository to GitHub.
2. Link the repository on [Vercel](https://vercel.com/new).
3. Set the following **Environment Variables** in Vercel Project Settings:
   * `TURSO_DATABASE_URL` — your Turso database connection URL
   * `TURSO_AUTH_TOKEN` — your Turso authentication token
   * `ADMIN_EMAIL` — primary admin email
   * `ADMIN_PASSWORD_HASH` — hashed password generated by `npm run seed`
   * `ADMIN_ROLE` — `super_admin`
   * `SESSION_SECRET` — 64-character random hex string
4. Click **Deploy**. Next.js App Router and Edge Middleware will deploy automatically.

---

## ✏️ Customizing Candidate Content

To update candidate details, political program, milestones, or office contact details, edit [`data/content.ts`](file:///c:/Users/pc/Desktop/vote/data/content.ts):

* **Name & Affiliation**: Arabic, French, and English translations of the candidate name and list/party.
* **Biography**: Short summary for meta tags and detailed biography timeline.
* **Office & Social Links**: Address, office opening hours, phone, email, and social media URLs.

---

## 🔒 Security Practices

* **No File Upload Attack Surface**: Eliminates shell execution, malicious script storage, and excessive storage billing.
* **Spam & Bot Mitigation**: In-memory rate limiting and invisible form honeypots.
* **XSS & SQL Injection Defense**: Parametrized LibSQL statements and automated input string sanitization.
* **Secure Cookies**: HTTP-only, SameSite=Lax cookie storage with HMAC-SHA256 cryptographic verification.

---

## 📄 License

This project is licensed under private campaign terms. All rights reserved.
