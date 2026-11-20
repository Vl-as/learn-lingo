# Learn Lingo

A responsive language tutor discovery and trial-lesson booking web application
built with Next.js, React, and TypeScript.

**Live Demo:** https://learn-lingo-one-delta.vercel.app

**Design mockup:**
[Figma](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0)
· **Assignment (ТЗ):**
[Link](https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0)

---

## Features

- Browse language tutors with detailed profiles, teaching experience, and
  student reviews
- Filter tutors by language, proficiency level, and hourly price (filters are
  synced with the URL)
- Load more tutors in batches of four
- Save favorite tutors (stored in Firestore, persisted across reloads) with
  optimistic UI updates and rollback on error
- Private Favorites page for authenticated users
- Book trial lessons with validated forms
- Register, log in, log out, and update profile details (display name and avatar
  upload via Cloudinary)
- Toast notifications for user feedback and error states

---

## Tech Stack

| Area                   | Tools & Libraries                             |
| :--------------------- | :-------------------------------------------- |
| Framework & Language   | Next.js 16 (App Router), React 19, TypeScript |
| Styling                | CSS Modules, `clsx`                           |
| Server State & Caching | TanStack Query                                |
| Auth & Database        | Firebase Authentication, Cloud Firestore      |
| Media Storage          | Cloudinary                                    |
| Forms & Validation     | React Hook Form, Yup                          |
| Notifications          | React Toastify                                |

---

## Notes on the Assignment

- **Firestore instead of Realtime Database:** chosen for richer querying and
  subcollections (`users/{uid}/favorites`).
- **Next.js App Router instead of React Router:** routing is handled by the
  framework (`/`, `/teachers`, `/favorites`).
- **Favorites** are stored in Firestore, so the state persists after a page
  reload.
- **Security:** Firestore access rules are kept in
  [`firestore.rules`](./firestore.rules).

---

## Key Decisions

- **TanStack Query for server state:** centralizes fetching, caching, and
  invalidation, including infinite loading for tutors and favorites.
- **Optimistic updates with rollback:** `onMutate` cancels in-flight queries and
  updates the cache immediately; `onError` restores the snapshot and shows a
  toast.
- **Server prefetch:** the Teachers page prefetches the first page on the server
  and hydrates it on the client.
- **Server vs. Client Components:** interactive parts (forms, modals, file
  picker, mutations) live in `'use client'` components.
- **Accessibility:** `aria-label`, `aria-pressed`, `aria-expanded`,
  `aria-current`, and `aria-hidden` on interactive and decorative elements.
- **Schema-based validation:** React Hook Form + Yup with typed form state and
  inline error messages.

---

## Project Structure

```text
.
├── app/          # Pages, layouts, error boundaries
├── components/   # UI components, forms, modals, cards
├── contexts/     # Auth context
├── hooks/        # Custom hooks (useAuth)
├── lib/          # Firebase initialization
├── providers/    # TanStack Query and Auth providers
├── services/     # Firebase and Cloudinary service functions
├── types/        # TypeScript types
├── public/       # Static assets
└── firestore.rules
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm
- Firebase and Cloudinary accounts

### Installation

```bash
git clone https://github.com/Vl-as/learn-lingo.git
cd learn-lingo
npm install
```

Create a `.env.local` file:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=

NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

### Scripts

```bash
npm run dev     # start the dev server
npm run build   # production build
npm run start   # run the production build
npm run lint    # lint the code
```

---

## Roadmap

- [ ] Multi-criteria sorting (price, rating, lessons completed)
- [ ] Server-side pagination for large tutor collections
- [ ] Real-time calendar slot selection for trial lessons
- [ ] Messaging between students and tutors
- [ ] Multi-language UI
- [ ] Dark mode
- [ ] Automated tests and CI

---

## Author

**Volodymyr Asieiev**

- GitHub: https://github.com/Vl-as
- LinkedIn: https://linkedin.com/in/volodymyr-asieiev
- Telegram: https://t.me/vasvv
