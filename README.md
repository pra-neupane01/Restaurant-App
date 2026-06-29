# Restaurant Food App

Full-stack restaurant ordering platform with a Node.js/Express API and React frontend.

**Author: Pralad Neupane**

---

## Project structure

```
FOOD-APP/
├── backend/     # Express + PostgreSQL API
├── frontend/    # React + Vite UI
└── package.json # Root scripts
```

---

## Setup

### Backend

```bash
cd backend
npm install
# Create .env with DB and JWT settings (see backend/.env.example)
npm run server
```

API runs on `http://localhost:4849` by default.

### Frontend

```bash
cd frontend
npm install
npm run dev
```

UI runs on `http://localhost:5173` by default.

### Run both from root

```bash
npm run install:all
npm run dev:backend   # terminal 1
npm run dev:frontend  # terminal 2
```

---

## Tech stack

- **Backend:** Node.js, Express, PostgreSQL, JWT, bcrypt
- **Frontend:** React, Vite, React Router

---

## Authentication

JWT-based. Include token in headers:

```
Authorization: Bearer <your_token>
```

Protected routes require authentication. Admin routes require `userType: "Admin"`.

---

## API routes

All routes are under `/api/v1/`:

| Module     | Base path              |
|------------|------------------------|
| Auth       | `/api/v1/auth`         |
| User       | `/api/v1/user`         |
| Restaurant | `/api/v1/restaurant`  |
| Category   | `/api/v1/category`     |
| Food       | `/api/v1/food`         |
| Order      | `/api/v1/order`        |

See backend route files for full endpoint details.

---

## Role-based access

| Role   | Permissions |
|--------|-------------|
| Client | Browse menu, place orders, manage profile |
| Admin  | Manage restaurants, categories, food, order status |
