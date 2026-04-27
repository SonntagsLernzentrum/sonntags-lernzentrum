# Sonntags Lernzentrum Portal WebApp

Neue Version ohne Hetzner.

## Hosting

- Frontend: Vercel
- Backend: Render
- Datenbank: Render PostgreSQL oder externe MySQL-Datenbank

## Ordner

- `frontend` = Website Portal für Eltern und Mitarbeiter
- `backend` = API Server für Login, Rechnungen, Schüler, Verträge
- `database` = SQL Struktur

## Demo Logins

### Mitarbeiter
- LV432085 / Start123! = Leitung / Verwaltung
- L658934 / Start123! = Lehrer
- B45385 / Start123! = Buchhaltung

### Eltern
- K10001 / Start123!

## Start lokal

Backend:
```bash
cd backend
npm install
npm run dev
```

Frontend:
```bash
cd frontend
npm install
npm run dev
```

## Render Backend

Root Directory:
```text
backend
```

Build Command:
```text
npm install
```

Start Command:
```text
npm start
```

Environment Variables:
```text
PORT=10000
JWT_SECRET=ein-langes-geheimes-passwort
FRONTEND_URL=https://dein-vercel-link.vercel.app
```

## Vercel Frontend

Root Directory:
```text
frontend
```

Environment Variable:
```text
VITE_API_URL=https://dein-render-backend.onrender.com
```
