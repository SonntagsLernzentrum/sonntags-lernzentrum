# Sonntags Lernzentrum App - Vollständiges Code-Grundgerüst

2-in-1 Web-App mit Elternportal und Mitarbeiterportal.

## Technik
- Backend: Node.js, Express, JWT, MySQL, Uploads
- Frontend: React + Vite
- Datenbank: MySQL
- Server geeignet für Hetzner VPS

## Funktionen enthalten

### Eltern
- Login mit Kundennummer + Passwort
- Passwort-zurücksetzen API vorbereitet
- Dashboard mit Tagesgruß
- Rechnungsanzeige im gewünschten Blockformat
- PDF-Download vorbereitet
- Meine Kinder
- Dokumente API je Schüler
- Vertragsdaten
- Kündigung/Widerruf als Formular-Anfrage
- Mein Konto API mit Alleinsorge-Nachweis Upload
- Zahlungsweise inklusive SEPA-Option

### Mitarbeiter
- Login mit Personalnummer + Passwort
- Rollenlogik:
  - LV432085 = Leitung/Verwaltung
  - L658934 = Lehrer
  - B45385 = Buchhaltung
- Verwaltung/Leitung Dashboard
- Offene Rechnungen / neue Kündigungen / Widerrufe
- Schülerverwaltung
- Elternverwaltung
- Vertragserstellung
- Vertragsübersicht
- Rechnungsanlage mit PDF-Upload

## Installation lokal

### 1. Datenbank erstellen
```bash
mysql -u root -p < database/schema.sql
mysql -u root -p < database/seed.sql
```

### 2. Backend starten
```bash
cd backend
cp .env.example .env
npm install
npm run seed
npm run dev
```

### 3. Frontend starten
```bash
cd frontend
npm install
npm run dev
```

Frontend läuft standardmäßig auf `http://localhost:5173`.
Backend läuft auf `http://localhost:4000`.

## Demo-Logins

### Eltern
```text
Kundennummer: K10001
Passwort: Start123!
```

### Mitarbeiter
```text
Personalnummer: LV432085
Passwort: Start123!
Rolle: Leitung/Verwaltung

Personalnummer: L658934
Passwort: Start123!
Rolle: Lehrer

Personalnummer: B45385
Passwort: Start123!
Rolle: Buchhaltung
```

## Wichtige Produktionshinweise
- `JWT_SECRET` in `.env` ändern.
- SMTP-Daten eintragen für echten Passwort-Reset.
- HTTPS auf Hetzner per Nginx + Certbot einrichten.
- Upload-Ordner außerhalb öffentlicher Pfade absichern, wenn sensible Dokumente produktiv genutzt werden.
- SEPA-Mandats-PDF und Google Calendar API sind als nächste Erweiterung vorgesehen.

## Beispiel SEPA-Gläubigerdaten
```text
Sonntags Lernzentrum Jason Sonntag
Gläubiger-ID: DE19ZZZ00002785273
```
