# Candidate Office & Political Campaign Platform
**Premium Trilingual Political Candidate Website + Citizen Written Submission Platform + Secure Admin Dashboard**

An official digital platform engineered for political candidates, built with **Next.js (App Router)**, **TypeScript**, **Tailwind CSS**, **Framer Motion**, and **LibSQL (SQLite/Turso)**.

---

## 🌟 Key Features

### 1. Trilingual & Native RTL Architecture
- **Languages:** Arabic (`ar`, default with full `dir="rtl"`), French (`fr`, `dir="ltr"`), and English (`en`, `dir="ltr"`).
- **Typography:** Playfair Display (editorial Latin headings), Inter (clean Latin body), and Cairo (balanced Arabic typography).
- **RTL-Aware:** Mirrored layouts, carousels, arrows, vertical timelines, and logical spacing (`ms/me/ps/pe`, `start/end`).
- **Translation System:** Centralized JSON messages (`messages/ar.json`, `messages/fr.json`, `messages/en.json`) with cookie persistence.

### 2. Complete Public Campaign Website (Sections 5.1 – 5.10)
- **5.1 Navigation Header:** Sticky, transparent over hero, backdrop-blurred on scroll, language switcher, mobile drawer, active section highlighting.
- **5.2 Hero Section:** Large editorial H1 with campaign slogan, candidate role, wilaya, portrait card, primary CTA "Support the Candidate", secondary "Discover Our Vision".
- **5.3 Support Registration Form:** First name, last name, searchable dropdown of all 58 Algerian wilayas, Algerian phone format validation (`05/06/07 + 8 digits` or `+213`), voting intention, participation preference, collapsible note, duplicate phone protection, and Web Share API / WhatsApp sharing.
- **5.4 Vision & Priorities:** 4 editorial cards with Lucide icons (Economic Dignity, Local Development, Youth & Education, Institutional Responsibility) with hover elevations and bullet points.
- **5.5 Biography & Journey:** Professional photo, vertical connected timeline with animated reveal, and field-work photo banner with caption.
- **5.6 Field Activities Carousel:** RTL-aware interactive carousel across categories (Urban Development, Youth, Women's Participation, Community, Local Governance) with modal detail view.
- **5.7 Key Achievements (Conditional):** Self-omitting section that only renders when verified statistics exist in `data/content.ts`.
- **5.8 Citizen Submission Platform ("Contact the Office"):**
  - **TEXT ONLY:** Strictly no file uploads, no PDFs, no image inputs, and no storage buckets.
  - Sections: Personal Information, Request Type (7 types), Detailed Description with live counter (up to 3,000 characters), Priority selector.
  - Conditional Complaint fields: category, department concerned, incident date, confidentiality toggle.
  - Conditional Suggestion fields: title, expected impact/improvement.
  - Generates collision-safe human-readable reference IDs (e.g. `REQ-2026-XXXXXX`).
- **5.9 Final Call to Action:** High-impact campaign banner with dual CTAs.
- **5.10 Institutional Footer:** Dark green palette, candidate information, quick links, contact info, social links, legal & privacy notices, admin login shortcut.

### 3. Secure Admin Authentication & Role-Based Dashboard
- **Security:** Scrypt password hashing with random salt, HMAC-SHA256 session tokens in `httpOnly` secure cookies, Edge middleware route protection.
- **Role-Based Access Control:** `super_admin` and `admin` roles. Confidential complaints mask the submitter's identity for standard staff.
- **Overview Analytics:** Total submissions, complaints, suggestions, pending, in-progress, resolved, supporters count, and 7-day activity chart.
- **Full Submissions Management:** Combinable multi-filtering (search, type, status, priority, wilaya, sort order), pagination, and sliding inspection drawer.
- **Administrative Tools:** Status transitions, priority changes, internal staff notes, direct email/phone/WhatsApp links, and cascade deletion.
- **Supporters Directory & CSV Export:** Filtered view of supporters with one-click CSV download (UTF-8 with BOM for Excel compatibility).

---

## 🚀 Getting Started

### 1. Requirements
- Node.js 18+ (tested and verified on Node 20, 22, and 24 on Windows & Linux)
- npm or pnpm

### 2. Environment Configuration
Copy `.env.example` to `.env.local`:
```bash
cp .env.example .env.local
```

Configure your secrets:
```env
DATABASE_PATH=./data/campaign.db
ADMIN_EMAIL=admin@candidate.dz
ADMIN_PASSWORD=YourSecurePassword123!
ADMIN_ROLE=super_admin
SESSION_SECRET=a5c889f8123d4567890abcdef1234567890abcdef1234567890abcdef12345678
```

### 3. Seed the First Admin User
Run the automated seeding script:
```bash
npm run seed
```
Or specify credentials inline:
```bash
npx tsx scripts/seed-admin.ts admin@candidate.dz YourSecurePassword123! super_admin
```

### 4. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) for the public site, and [http://localhost:3000/admin/login](http://localhost:3000/admin/login) for the admin portal.

### 5. Production Build
```bash
npm run build
npm run start
```

---

## 🗄️ Database Architecture & Migrations

The database engine uses `@libsql/client` which runs seamlessly both locally (SQLite file `data/campaign.db`) and in cloud serverless deployments (Turso / LibSQL).

### Tables:
1. `support_registrations`: Supporter entries with unique phone constraints and participation preferences.
2. `submissions`: Central citizen correspondence table with unique `reference_id` (`REQ-YYYY-XXXXXX`), priority, status, and confidentiality flags.
3. `complaint_details`: 1-to-1 extension table for complaint-specific data (category, department, incident date).
4. `suggestion_details`: 1-to-1 extension table for suggestion-specific data (title, expected improvement).
5. `admin_users`: Authenticated campaign staff with role and scrypt password hash.
6. `internal_notes`: Private administrative staff notes with timestamps and author email.
7. `status_history`: Audit trail logging every status change with timestamp and actor.

---

## 📝 Candidate Content Replacement Checklist

Everything you need to customize is located in **ONE** central file: [`data/content.ts`](file:///c:/Users/pc/Desktop/vote/data/content.ts).

| Item to Replace | File Location | Description |
| :--- | :--- | :--- |
| **Candidate Name** | `data/content.ts` | Replace `[اسم المرشح]`, `[Nom du Candidat]`, `[Candidate Name]` |
| **Profession / Role** | `data/content.ts` | Replace `[مهندس معماري · عضو منتخب]`, etc. |
| **Town & Wilaya** | `data/content.ts` | Replace `[البلدية، الولاية]`, `[Commune, Wilaya]` |
| **Campaign Slogan** | `data/content.ts` | Campaign motto displayed across hero and quotes |
| **Party / List** | `data/content.ts` | Official party affiliation or independent list name |
| **Biographies** | `data/content.ts` | `shortBio` (hero/meta) and `fullBio` (biography section) |
| **Milestones** | `data/content.ts` | `timelineMilestones` array (year, title, description) |
| **Field Activities** | `data/content.ts` | `activities` array (year, category, title, description) |
| **Office Contact** | `data/content.ts` | Email, phone number, physical address, and office hours |
| **Social Links** | `data/content.ts` | Facebook, X, Instagram, and YouTube URLs |

---

## 🖼️ Replaceable Image Assets Checklist

All placeholder assets are located in [`public/images/`](file:///c:/Users/pc/Desktop/vote/public/images/):

| Asset Path | Recommended Dimensions | Usage |
| :--- | :--- | :--- |
| `public/images/logo.svg` | Square (120x120 or SVG) | Header emblem, footer logo, metadata |
| `public/images/hero-portrait.svg` | 600 x 750 (4:5 portrait) | Hero section candidate portrait |
| `public/images/bio-photo.svg` | 600 x 700 (3:4 portrait) | Biography & professional practice card |
| `public/images/banner-field.svg` | 1200 x 420 (landscape) | Fieldwork consultation banner |
| `public/images/activity-1.svg` | 800 x 500 (16:10) | Activity 1: Urban Development |
| `public/images/activity-2.svg` | 800 x 500 (16:10) | Activity 2: Youth & Innovation |
| `public/images/activity-3.svg` | 800 x 500 (16:10) | Activity 3: Women's Participation |
| `public/images/activity-4.svg` | 800 x 500 (16:10) | Activity 4: Community Outreach |
| `public/images/activity-5.svg` | 800 x 500 (16:10) | Activity 5: Civic Assembly |

*(You can replace these with `.jpg` or `.png` files by updating the paths in `components/public/Hero.tsx`, `BiographySection.tsx`, and `ActivitiesCarousel.tsx`).*

---

## 🌐 How to Add or Modify Languages

1. Add your new language code (e.g. `es`) to `Locale` in `lib/i18n.tsx`.
2. Create `messages/es.json` with translated keys corresponding to `messages/en.json`.
3. Add the language button to `components/shared/LanguageSwitcher.tsx`.
4. Add the language metadata in `app/layout.tsx` under `alternates.languages`.

---

## ☁️ Deploying to Vercel

1. Push your repository to GitHub / GitLab.
2. Import the project into [Vercel](https://vercel.com).
3. In the Vercel Project Settings, add the Environment Variables:
   - `ADMIN_EMAIL`: Your primary admin email (e.g. `admin@candidate.dz`)
   - `ADMIN_PASSWORD_HASH`: The generated scrypt hash from `npm run seed`
   - `ADMIN_ROLE`: `super_admin`
   - `SESSION_SECRET`: A secure 64-character hex string (`openssl rand -hex 32`)
   - For database persistence on Vercel: set `TURSO_DATABASE_URL` and `TURSO_AUTH_TOKEN` (free serverless LibSQL database from [Turso](https://turso.tech)), or connect Supabase Postgres.
4. Deploy! All routes, static pages, and edge middleware deploy automatically.

---

## 🛡️ Security & Privacy Notice

- **Text-Only Submission System:** Eliminates remote code execution, malicious file uploads, storage bucket abuse, and MIME-sniffing vulnerabilities.
- **Honeypot & Rate Limiting:** All public forms include hidden honeypot fields and IP-based rate limiting to protect against automated spam bots.
- **Confidential Grievance Protection:** Citizen complaints marked as confidential have submitter contact details masked (`***@confidential.dz`) for regular administrative roles.
#   E l b a d i l 1 0 1  
 