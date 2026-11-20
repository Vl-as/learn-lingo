# Learn Lingo

A responsive language tutor discovery and trial-lesson booking web application built with Next.js, React, and TypeScript.

**Live Demo:** https://learn-lingo-one-delta.vercel.app

---

## Features

- Browse language tutors with detailed profiles, teaching experience, and student reviews
- Filter tutors by criteria and proficiency level (`aria-current` on active level)
- Manage favorite tutors with optimistic UI updates and rollback on error
- Book trial lessons with validated forms
- Authenticate users and update profile details (display name and avatar upload via Cloudinary)
- Display toast notifications for user feedback and error states

---

## Tech Stack

| Area | Tools & Libraries (versions: `[verify in package.json]`) |
| :--- | :--- |
| Framework & Language | Next.js (App Router), React, TypeScript |
| Styling | CSS Modules, `clsx` |
| Server State & Caching | TanStack Query (`@tanstack/react-query`) |
| Auth & Database | Firebase Authentication, Cloud Firestore |
| Media Storage | Cloudinary |
| Forms & Validation | React Hook Form, Yup (`@hookform/resolvers`) |
| Notifications | React Toastify |

---

## Key Decisions

- **TanStack Query for server state and favorites:** Centralizes async fetching, caching, and query invalidation (`['favorites', user?.uid]`, `['favoriteTeachers']`) so UI state stays synchronized without manual prop drilling or ad-hoc loading flags.
- **Optimistic updates with rollback and error feedback:** `onMutate` cancels in-flight queries, snapshots prior favorites, and updates cache immediately, while `onError` restores the snapshot and surfaces a `toast.error` message so failed mutations do not leave stale UI state.
- **Server vs. Client Components split:** Keeps data/metadata rendering on the server where possible and isolates interactive controls (forms, file pickers, optimistic mutations, and browser APIs like `URL.createObjectURL`) in `'use client'` components.
- **Accessibility attributes on interactive elements:** Uses `aria-current`, `aria-label`, `aria-pressed`, `aria-expanded`, and `aria-hidden` on decorative icons so state changes and controls remain clear beyond visual styling.
- **Schema-based form validation with React Hook Form + Yup:** Centralizes field rules (such as display name length and required fields) in declarative schemas with typed form state and inline error messages.

---

## Project Structure

Verify exact top-level folders in your repository (`app/` vs. `src/app/`):

```text
.
├── app/ # `[verify: app/ or src/app/]` Next.js App Router pages, layouts, and error boundaries
├── components/ # `[verify path]` Reusable UI components, forms, modals, and cards
├── hooks/ # `[verify path]` Custom hooks (e.g., useAuth)
├── services/ # `[verify path]` Firebase and Cloudinary service functions
├── types/ # `[verify path]` TypeScript types and interfaces
└── utils/ # `[verify path]` Helper utilities
```

---

## Getting Started

### Prerequisites

- Node.js (`[verify version in package.json / engines]`)
- npm
- Firebase and Cloudinary accounts

### Installation & Local Setup

```bash
git clone [https://github.com/Vl-as/learn-lingo.git](https://github.com/Vl-as/learn-lingo.git)
cd learn-lingo
npm install
```

Create a `.env.local` file using the exact `process.env.*` variable names from your codebase (`[verify exact names in src/services/* or app/*]`):

```env
# Firebase ([verify exact process.env.* keys in code])
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=

# Cloudinary ([verify exact process.env.* keys in src/services/cloudinary*])
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

### Scripts

Run the scripts defined in your `package.json` (`[verify exact script names in package.json]`):

```bash
npm run dev
npm run build
npm run start
npm run lint
```

---

## Roadmap

- [ ] Multi-criteria sorting (price, rating, lessons completed)
- [ ] Real-time calendar slot selection for trial lessons
- [ ] Direct messaging or chat between students and tutors
- [ ] Multi-language UI support
- [ ] Dark mode
- [ ] Automated tests and CI pipeline

---

## Author

**Volodymyr Asieiev**

- GitHub: https://github.com/Vl-as
- LinkedIn: https://linkedin.com/in/volodymyr-asieiev
- Telegram: https://t.me/vasvv
```
