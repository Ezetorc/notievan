# 📰 NotiEvan Frontend

Frontend 🌐 for NotiEvan 📰, a school newspaper 🏫 to browse and manage articles about what is happening at Evan ✨

## 🛠️ Tech Stack

- **Framework** ⚛️: React + TypeScript
- **Build tool** ⚡: Vite
- **Styling** 🎨: TailwindCSS
- **Routing** 🧭: Wouter
- **Data fetching/caching** 📦: @tanstack/react-query
- **State management** 🧠: Zustand
- **Markdown** ✍️: Marked + EasyMDE, sanitized via DOMPurify 🛡️

## 📋 Prerequisites

- Node.js 🟢 (LTS recommended)
- npm 📦

## 📥 Installation

```bash
npm install
```

## 🔐 Environment Variables

Create a `.env` file 📄 in `frontend/` and set the backend API base URL 🌐:

```env
VITE_PUBLIC_API_URL=http://localhost:3000
```

The app reads this via `import.meta.env.VITE_PUBLIC_API_URL` ⚙️ (see `src/configuration/env.configuration.ts`).

## 📜 Scripts

- `npm run dev` ▶️ — start the dev server
- `npm run build` 🏗️ — type-check and build for production
- `npm run lint` 🔍 — run Biome linting
- `npm run format` 🧼 — run Biome formatting

## 🚀 Run (development)

```bash
npm run dev
```

Then open the printed URL 🌐 from Vite ⚡ (typically `http://localhost:5173`).

## 📦 Build

```bash
npm run build
```