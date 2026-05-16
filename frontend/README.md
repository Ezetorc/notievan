# 📰 NotiEvan Frontend

Frontend 🌐 for NotiEvan 📰, a school newspaper 🏫 to browse and manage articles about what is happening at Evan ✨

## 🛠️ Tech Stack

- **Framework** ⚛️: SvelteKit
- **Build tool** ⚡: Vite
- **Styling** 🎨: TailwindCSS

## 📋 Prerequisites

- Node.js 🟢 (LTS recommended)
- pnpm 📦

## 📥 Installation

```bash
pnpm install
```

## 🔐 Environment Variables

Create a `.env` file 📄 in `frontend/` and set the backend API base URL 🌐:

```env
VITE_PUBLIC_API_URL=http://localhost:3000
```

The app reads this via `import.meta.env.VITE_PUBLIC_API_URL` ⚙️ (see `src/configuration/env.configuration.ts`).

## 📜 Scripts

- `pnpm run dev` ▶️ — start the dev server
- `pnpm run build` 🏗️ — type-check and build for production
- `pnpm run lint` 🔍 — run Biome linting
- `pnpm run format` 🧼 — run Biome formatting

## 🚀 Run (development)

```bash
pnpm run dev
```

Then open the printed URL 🌐 from Vite ⚡ (typically `http://localhost:5173`).

## 📦 Build

```bash
pnpm run build
```
