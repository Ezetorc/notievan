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
# 🚨 Currently, database configuration is set to use a Neon's url when in production mode

PORT=3000

JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=24h

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

---

## Run server (in development mode)

```bash
npm run dev
```

By default, server will be listening in port 3000:

```
http://localhost:3000
```