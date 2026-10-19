# FixTrack

Repair job tracker for mobile repair shops. Shop owners create and update repair jobs; customers check job status with a job code (e.g. `FX-1234`).

- `backend/` - Express + TypeScript + MongoDB API
- `frontend/` - React + Vite dashboard

> The AI category suggestion is currently commented out, so no Anthropic API key is needed.

## Prerequisites

- [Node.js](https://nodejs.org) 18 or newer (includes npm)
- A MongoDB database: either a local MongoDB (`mongodb://127.0.0.1:27017`) or a free [MongoDB Atlas](https://www.mongodb.com/atlas) cluster

## 1. Run the backend

```bash
cd backend
cp .env.example .env      # on Windows PowerShell: copy .env.example .env
npm install
npm run dev
```

Edit `backend/.env`:

| Variable | Value |
| --- | --- |
| `DATABASE_URL` | Your MongoDB connection string |
| `DB_NAME` | `fixtrack` |
| `ACCESS_TOKEN_SECRET` | Any long random string |
| `ALLOWED_ORIGIN` | `http://localhost:3000` |
| `PORT` | `5000` (default) |

The API runs at http://localhost:5000. Check it at http://localhost:5000/health - you should see `{"success":true,"message":"ok"}`.

## 2. Run the frontend

In a second terminal:

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000.

The frontend talks to `http://localhost:5000` by default. To use a different backend, create `frontend/.env` with:

```
VITE_API_URL=http://localhost:5000
```

## 3. Use the app

1. Open http://localhost:3000 and sign up as a shop owner.
2. Add a repair job. The app gives you a job code like `FX-1234`.
3. Give that code to the customer so they can check the status on the tracking page.

## Useful commands

Backend (`backend/`):

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the API with auto reload |
| `npm run build` | Compile TypeScript to `dist/` |
| `npm start` | Run the compiled build |
| `npm test` | Run tests on an in-memory MongoDB (no setup needed) |

Frontend (`frontend/`):

| Command | What it does |
| --- | --- |
| `npm run dev` | Start the dev server |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Preview the production build |
| `npm run lint` | Run ESLint |

## Troubleshooting

- **`[env] missing required settings`** - `DATABASE_URL` or `ACCESS_TOKEN_SECRET` is empty in `backend/.env`.
- **Can't connect to MongoDB Atlas** - in Atlas, open Network Access and add your IP address (or `0.0.0.0/0` for development).
- **CORS error in the browser** - `ALLOWED_ORIGIN` in `backend/.env` must match the address the frontend runs on (`http://localhost:3000`). Restart the backend after changing it.
- **Port already in use** - change `PORT` in `backend/.env` (and `VITE_API_URL` in the frontend to match), or stop the other process.
- **Frontend shows network errors** - make sure the backend is running and `/health` responds.

## Deploying to Vercel

Deploy `backend/` and `frontend/` as two separate Vercel projects, setting each project's Root Directory to its folder.

- Backend environment variables: `DATABASE_URL`, `DB_NAME`, `ACCESS_TOKEN_SECRET`, `NODE_ENV=production`, `ALLOWED_ORIGIN` (the frontend URL).
- Frontend environment variable: `VITE_API_URL` (the backend URL).
- In MongoDB Atlas, allow `0.0.0.0/0` under Network Access, because Vercel's IP addresses change.
