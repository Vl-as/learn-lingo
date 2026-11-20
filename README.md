# 🌍 Learn Lingo

A responsive online language tutor booking web application built with **Next.js**, **React**, and **TypeScript**.

Learn Lingo allows users to browse language tutors, filter teachers by criteria such as proficiency level, inspect detailed profiles and student reviews, manage a personal favorites list, and book trial lessons through a clean, accessible interface.

---

## ✨ Features

- 👩‍🏫 Browse language tutors with detailed profiles
- 🔍 Filter teachers by criteria and proficiency level (`aria-current` on active level)
- ❤️ Add or remove favorite teachers with optimistic UI updates and instant rollback on error
- 📖 Expand tutor cards to view teaching experience and student reviews
- 📅 Book trial lessons with form validation
- 🔐 User authentication and profile management (display name & avatar upload)
- 🔔 Toast notifications for user feedback and error states
- ♿ Accessible UI controls (`aria-label`, `aria-pressed`, `aria-expanded`, semantic roles)
- 📱 Fully responsive design (desktop, tablet, mobile)
- ⚡ Fast navigation with Next.js App Router
- 🌐 SEO optimization with Metadata API and Open Graph

---

## 🛠️ Tech Stack

### Frontend

<p>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" width="40"/>
  <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" width="40"/>
</p>

**React • Next.js • TypeScript • CSS Modules**

### Libraries & Services

- TanStack Query — server state management, caching, and optimistic mutations
- Firebase / Firestore — authentication and data persistence
- Cloudinary — avatar image hosting
- React Hook Form & Yup — form handling and validation
- React Toastify — feedback notifications
- `clsx` — conditional CSS class composition

---

## 🚀 Next.js Features

- ✅ App Router
- ✅ Server Components
- ✅ Client Components
- ✅ Metadata API & Open Graph
- ✅ Error Handling (`error.tsx`)
- ✅ Image Optimization (`next/image`)

---

## 📂 Project Structure

```text
src/
├── app/                      # Next.js App Router pages, layouts, and error boundaries
├── components/               # Reusable UI components, modals, forms, and cards
├── hooks/                    # Custom hooks (e.g., useAuth)
├── services/                 # API, Firebase, and Cloudinary integration
├── types/                    # TypeScript types and interfaces
└── utils/                    # Helper functions
```

---

## ⚙️ Installation

```bash
git clone [https://github.com/Vl-as/learn-lingo.git](https://github.com/Vl-as/learn-lingo.git)

cd learn-lingo

npm install

npm run dev
```

Open:

```text
http://localhost:3000
```

---

## 🎯 What I Learned

During this project, I improved my skills in:

- Building applications with the Next.js App Router
- Managing server state and optimistic updates with TanStack Query
- Integrating authentication and database operations with Firebase / Firestore
- Handling avatar uploads and image previews cleanly
- Building accessible components with proper ARIA attributes and keyboard/screen-reader support
- Form validation and clean TypeScript typing
- Responsive UI styling with CSS Modules and `clsx`

---

## 🔮 Future Improvements

- Real-time calendar slot selection for trial lessons
- Multi-criteria sorting (price, rating, lessons completed)
- Messaging or chat between students and tutors
- Multi-language UI support
- Dark mode

---

## 👨‍💻 Author

**Volodymyr Asieiev**

- GitHub: https://github.com/Vl-as
- LinkedIn: https://linkedin.com/in/volodymyr-asieiev
- Telegram: https://t.me/vasvv
