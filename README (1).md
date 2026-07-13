# 🚢 Streamify

**A full-stack real-time language exchange platform with 1-on-1 chat and video calling**

Streamify connects language learners around the world — chat in real time, jump into video calls, and practice new languages with partners globally.

<p align="center">
  <img src="./screenshots/placeholder-hero.png" alt="Streamify Hero Screenshot" width="800"/>
</p>

<p align="center">
  <a href="https://streamify-tx4f.onrender.com"><strong>🔗 Live Demo</strong></a>
  ·
  <a href="https://github.com/Nileshnehe/Streamify/issues"><strong>🐛 Report Bug</strong></a>
  ·
  <a href="https://github.com/Nileshnehe/Streamify/issues"><strong>✨ Request Feature</strong></a>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?logo=node.js&logoColor=white" alt="Node.js"/>
  <img src="https://img.shields.io/badge/MongoDB-Mongoose-47A248?logo=mongodb&logoColor=white" alt="MongoDB"/>
  <img src="https://img.shields.io/badge/TailwindCSS-DaisyUI-38B2AC?logo=tailwind-css&logoColor=white" alt="TailwindCSS"/>
  <img src="https://img.shields.io/badge/Stream-Chat%20%26%20Video-005FFF?logo=stream&logoColor=white" alt="Stream"/>
  <img src="https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render&logoColor=white" alt="Render"/>
</p>

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Screenshots](#-screenshots)
- [Folder Structure](#-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [API Routes](#-api-routes)
- [Deployment](#-deployment)
- [Author](#-author)

---

## ✨ Features

- 🔐 **Authentication** — Secure signup/login/logout with JWT stored in httpOnly cookies
- 🧭 **Onboarding flow** — Collects user's native language, learning language, and profile details
- 👥 **Friends system** — Send/accept friend requests, view friends list
- 💬 **Real-time 1-on-1 Chat** — Powered by Stream Chat, with typing indicators, reactions, threads, and message history
- 📹 **Video Calling** — Instant video calls via Stream Video SDK, shareable call links directly in chat
- 🔔 **Notifications** — Friend request notifications with real-time updates
- 🎨 **Theme Switcher** — Multiple DaisyUI themes, persisted across sessions
- 📱 **Responsive UI** — Works seamlessly across desktop and mobile
- ⚡ **Optimized Data Fetching** — TanStack Query for caching, background refetching, and mutations

---

## 🛠 Tech Stack

**Frontend**
| Technology | Purpose |
|---|---|
| React (Vite) | UI library & build tool |
| Tailwind CSS + DaisyUI | Styling & component themes |
| React Router | Client-side routing |
| Zustand | Lightweight global state (theme store) |
| TanStack Query | Server state management, caching, mutations |
| Stream Chat React | Chat UI components & SDK |
| Stream Video React SDK | Video calling UI components & SDK |
| Axios | HTTP client |
| React Hot Toast | Toast notifications |
| Lucide React | Icon library |

**Backend**
| Technology | Purpose |
|---|---|
| Node.js + Express | REST API server |
| MongoDB + Mongoose | Database & ODM |
| JWT | Authentication tokens |
| bcrypt | Password hashing |
| Stream Chat / Video Node SDK | Server-side token generation & user sync |
| cookie-parser | Cookie handling |
| cors | Cross-origin resource sharing |

**Deployment**
| Service | Purpose |
|---|---|
| Render | Single web service — Express serves the built React app |

---

## 📸 Screenshots

> Screenshots coming soon — placeholders below.

| Login | Chat | Video Call |
|---|---|---|
| ![Login](./screenshots/placeholder-login.png) | ![Chat](./screenshots/placeholder-chat.png) | ![Call](./screenshots/placeholder-call.png) |

---

## 📁 Folder Structure

```
Streamify/
├── client/                      # React frontend (Vite)
│   ├── public/
│   ├── src/
│   │   ├── components/          # Shared/reusable UI components (Layout, Navbar, Sidebar, etc.)
│   │   ├── constants/           # App-wide constants (language-flag maps, etc.)
│   │   ├── features/            # Feature-based modules
│   │   │   ├── auth/            # Signup, Login, Onboarding pages
│   │   │   ├── calls/           # CallPage (Stream Video)
│   │   │   ├── chats/           # ChatPage (Stream Chat)
│   │   │   ├── home/            # HomePage, FriendCard, etc.
│   │   │   ├── notification/    # NotificationPage
│   │   │   └── services/        # Axios API calls (api.js)
│   │   ├── hook/                # Custom hooks (useAuthUser, useLogin, useSignup, useLogout)
│   │   ├── store/                # Zustand stores (useThemeStore)
│   │   ├── App.jsx               # Route definitions
│   │   └── main.jsx
│   ├── .env
│   └── package.json
│
├── server/                      # Express backend
│   ├── src/
│   │   ├── config/               # DB connection, Stream client config, env config
│   │   ├── controllers/          # Route handler logic (auth, user, chat)
│   │   ├── models/                # Mongoose schemas (User, FriendRequest, etc.)
│   │   ├── routes/                # Express routers (auth, user, chat)
│   │   ├── middleware/            # Auth middleware (JWT verification)
│   │   └── app.js                 # Express app setup
│   ├── .env
│   └── package.json
│
├── package.json                  # Root — combined build/start scripts for deployment
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- MongoDB (local instance or MongoDB Atlas)
- A [Stream](https://getstream.io/) account (for Chat & Video API keys)

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/Nileshnehe/Streamify.git
cd Streamify

# 2. Install server dependencies
cd server
npm install

# 3. Install client dependencies
cd ../client
npm install
```

### Running locally (development)

```bash
# Terminal 1 — start backend (from /server)
npm run dev

# Terminal 2 — start frontend (from /client)
npm run dev
```

- Backend runs on `http://localhost:3000`
- Frontend runs on `http://localhost:5173`

---

## 🔑 Environment Variables

Create a `.env` file inside **both** `client/` and `server/`.

**`server/.env`**
```env
PORT=3000
NODE_ENV=development
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STEAM_API_KEY=your_stream_api_key
STEAM_API_SECRET=your_stream_api_secret
```

**`client/.env`**
```env
VITE_STREAM_API_KEY=your_stream_api_key
```

> ⚠️ Never commit `.env` files — they're already excluded via `.gitignore`.

---

## 🔌 API Routes

| Method | Endpoint | Description |
|---|---|---|
| `POST` | `/api/auth/signup` | Register a new user |
| `POST` | `/api/auth/login` | Login existing user |
| `POST` | `/api/auth/logout` | Logout current user |
| `GET` | `/api/auth/me` | Get currently authenticated user |
| `POST` | `/api/auth/onboarding` | Complete user onboarding |
| `GET` | `/api/users` | Get recommended users |
| `GET` | `/api/users/friends` | Get current user's friends |
| `POST` | `/api/users/friend-request/:id` | Send a friend request |
| `PUT` | `/api/users/friend-request/:id/accept` | Accept a friend request |
| `GET` | `/api/users/friend-requests` | Get incoming/accepted friend requests |
| `GET` | `/api/chat/token` | Get a Stream Chat/Video token for the current user |

> Exact route names may vary slightly — update this table to match your actual `routes/` files.

---

## ☁️ Deployment

Streamify is deployed as a **single Render Web Service** — the Express server serves the built React app from `client/dist`.

**Render settings:**
- **Root Directory:** *(empty — root of repo)*
- **Build Command:** `npm run build`
- **Start Command:** `npm start`
- **Environment Variables:** set the same keys as `server/.env` (plus `VITE_STREAM_API_KEY` if needed at build time) in the Render dashboard

Root `package.json`:
```json
{
  "scripts": {
    "build": "npm install --prefix server && npm install --prefix client && npm run build --prefix client",
    "start": "npm start --prefix server"
  }
}
```

---

## 👤 Author

**Nilesh Nehe**

- GitHub: [@Nileshnehe](https://github.com/Nileshnehe)
- Project: [Streamify](https://github.com/Nileshnehe/Streamify)
- Live Demo: [streamify-tx4f.onrender.com](https://streamify-tx4f.onrender.com)

---

<p align="center">Made with ❤️ while learning the MERN stack</p>
