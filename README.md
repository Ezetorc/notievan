# 📰 NotiEvan

Welcome to **NotiEvan** — the digital newspaper of our school 🎒✨  
A place where news, stories, opinions, memes-that-should-probably-not-be-posted 👀, and school updates come together.

Built to keep students and teachers connected without needing 37 WhatsApp groups.

---

## 🚀 Features

### 📖 Read & Explore
- Browse articles about school life, events, announcements, and more.
- Discover recent posts and random featured articles 🎲
- Comment and share opinions with the community 💬

### ✍️ Author Tools
- Create, edit, and manage articles easily.
- Upload images for posts 🖼️
- Organize and maintain content like a real newsroom.

### 🔐 Safety & Moderation
- Authentication and role-based access.
- Friendly and secure environment for everyone 🛡️

---

## Getting Started

### Prerequisites

You have to install
- Bun
- NodeJS

### Environment Variables

Create a `.env` file in the root directory and add the following variables:
```env
NODE_ENV=<development | production>

INSTAGRAM_BUSINESS_ACCOUNT_ID=<your_instagram_business_account_id>
# Only neccesary if NODE_ENV is set to 'production'

CLOUDINARY_CLOUD_NAME=<your_cloudinary_cloud_name>
CLOUDINARY_API_SECRET=<your_cloudinary_api_secret>
CLOUDINARY_API_KEY=<your_cloudinary_api_key>

JWT_EXPIRES_IN=<your_jwt_expires_in>
JWT_SECRET=<your_jwt_secret>

DATABASE_URL=<your_database_url>
```
