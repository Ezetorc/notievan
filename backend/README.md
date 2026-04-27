# 📚 NotiEvan Backend

Backend for **NotiEvan**, a school newspaper to publish and manage articles about what is happening at Evan.

---

# 🧰 Tech Stack

* **Runtime**: Node.js + Express
* **Database**: PostgreSQL
* **ORM**: Drizzle ORM
* **Auth**: JWT (HS256)
* **Storage**: Cloudinary (article images)

---

# ✨ Features

* 📰 **Articles**

  * create, update, delete
  * list all articles
  * get own articles
  * get random articles

* 🔐 **Authentication**

  * register / login
  * current user endpoint

* 🛡️ **Authorization**

  * role-based access control:

    * `USER`
    * `AUTHOR`
    * `ADMIN`

* 👤 **Users**

  * admin listing
  * role updates

---

# 🏗️ Architecture

```
Client ──HTTP──> Express API
                 ├─ Auth routes (/auth)
                 ├─ Users routes (/users)
                 └─ Articles routes (/articles)

Drizzle ORM ──> PostgreSQL (Neon)
Cloudinary SDK ──> Image storage
```

---

# 🚀 Getting Started

## Prerequisites

* Node.js (LTS recommended)
* npm
* PostgreSQL database (e.g. Neon)

---

## Installation

```bash
npm install
```

---

## Environment Variables

Create `.env`:

```env
DATABASE_URL=postgresql://USER:PASSWORD@HOST:PORT/DBNAME?sslmode=require
PORT=3000

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

# 🗄️ Database (Drizzle)

## Push schema (development)

```bash
npm run db:push
```

## Generate migrations (if enabled)

```bash
npm run db:generate
```

## Optional: Studio

```bash
npm run db:studio
```

---

⚠️ This project uses Drizzle directly; no Prisma migrations or `db push` from Prisma.

---

# ▶️ Run server (dev)

```bash
npm run dev
```

API:

```
http://localhost:3000
```

---

# 🔐 Auth & Roles

* JWT (HS256)
* Roles:

  * `USER`
  * `AUTHOR`
  * `ADMIN`

Permissions:

* `AUTHOR` → manage own articles
* `ADMIN` → manage users + roles

---

# ☁️ Cloudinary

* Images uploaded to `articles/`
* Stored URL saved in DB
* Requires env variables configured