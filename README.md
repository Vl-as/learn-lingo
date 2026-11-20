<div align="center">

# 🌍 Learn Lingo

**Find your perfect language tutor and book a trial lesson in a few clicks.**

[![Live Demo](https://img.shields.io/badge/Live_Demo-Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://learn-lingo-one-delta.vercel.app)
[![Figma](https://img.shields.io/badge/Design-Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)](https://www.figma.com/file/dewf5jVviSTuWMMyU3d8Mc/%D0%9F%D0%B5%D1%82-%D0%BF%D1%80%D0%BE%D1%94%D0%BA%D1%82-%D0%B4%D0%BB%D1%8F-%D0%9A%D0%A6?type=design&node-id=0-1&mode=design&t=jCmjSs9PeOjObYSc-0)
[![ТЗ](https://img.shields.io/badge/Assignment-ТЗ-4285F4?style=for-the-badge&logo=googledocs&logoColor=white)](https://docs.google.com/document/d/1ZB_MFgnnJj7t7OXtv5hESSwY6xRgVoACZKzgZczWc3Y/edit?tab=t.0)

![Next.js](https://img.shields.io/badge/Next.js_16-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React](https://img.shields.io/badge/React_19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=flat-square&logo=firebase&logoColor=black)
![TanStack Query](https://img.shields.io/badge/TanStack_Query-FF4154?style=flat-square&logo=reactquery&logoColor=white)

</div>

---

## 📑 Table of Contents

- [About](#-about)
- [Demo Account](#-demo-account)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Notes on the Assignment](#-notes-on-the-assignment)
- [Key Decisions](#-key-decisions)
- [Project Structure](#-project-structure)
- [Getting Started](#-getting-started)
- [Roadmap](#-roadmap)
- [Author](#-author)

---

## 📖 About

Learn Lingo is a responsive language tutor discovery and trial-lesson booking
web application built with Next.js, React, and TypeScript. Users can browse
tutors, filter them by language, level, and price, save favorites, and book a
trial lesson.

---

## 🔑 Demo Account

Want to try the app without registering? Log in with:

- **Email:** `demo@learn-lingo.test`
- **Password:** `Demo12345`

---

## ✨ Features

- 👩‍🏫 **Tutor catalog** with detailed profiles, teaching experience, and student
  reviews
- 🔍 **Filters** by language, proficiency level, and hourly price (synced with
  the URL)
- ➕ **Load more** tutors in batches of four
- ❤️ **Favorites** stored in Firestore and persisted across reloads, with
  optimistic UI updates and rollback on error
- 🔒 **Private Favorites page** for authenticated users
- 📅 **Trial lesson booking** with validated forms
- 🔐 **Authentication:** register, log in, log out, and update profile (display
  name and avatar upload via Cloudinary)
- 🔔 **Toast notifications** for feedback and error states

---

## 🛠️ Tech Stack

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

## 📋 Notes on the Assignment

- **Firestore instead of Realtime Database:** chosen for richer querying and
  subcollections (`users/{uid}/favorites`).
- **Next.js App Router instead of React Router:** routing is handled by the
  framework (`/`, `/teachers`, `/favorites`).
- **Favorites** are stored in Firestore, so the state persists after a page
  reload.
- **Security:** Firestore access rules are kept in
  [`firestore.rules`](./firestore.rules).

---

## 🧠 Key Decisions

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

## 📂 Project Structure

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

## 🚀 Getting Started

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

Create a `.env.local` file in the project root:

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

| Command         | Description               |
| :-------------- | :------------------------ |
| `npm run dev`   | Start the dev server      |
| `npm run build` | Create a production build |
| `npm run start` | Run the production build  |
| `npm run lint`  | Lint the code             |

---

## 🗺️ Roadmap

- [ ] Multi-criteria sorting (price, rating, lessons completed)
- [ ] Server-side pagination for large tutor collections
- [ ] Real-time calendar slot selection for trial lessons
- [ ] Messaging between students and tutors
- [ ] Multi-language UI
- [ ] Dark mode
- [ ] Automated tests and CI

---

## 👨‍💻 Author

**Volodymyr Asieiev**

[![GitHub](https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=github&logoColor=white)](https://github.com/Vl-as)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://linkedin.com/in/volodymyr-asieiev)
[![Telegram](https://img.shields.io/badge/Telegram-26A5E4?style=flat-square&logo=telegram&logoColor=white)](https://t.me/vasvv)
