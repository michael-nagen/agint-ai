# Chavruta - Landing Page

A landing/intro site for **Chavruta**, an AI agent that acts as a study partner.
Chavruta doesn't just transfer knowledge to you - it helps you _process and
internalize_ what you already learned, simulating a study companion. It works
best as a complement to learning with the Maestro.

The page ends with an email waitlist form. Submitted emails are appended to a
real Excel file (`data/waitlist.xlsx`) via a small Express backend.

## Tech stack

- **Frontend:** [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **Backend:** [Express](https://expressjs.com/) + [SheetJS (`xlsx`)](https://sheetjs.com/)

## Getting started

```bash
npm install
npm run dev
```

`npm run dev` runs both the Vite dev server (http://localhost:5173) and the
Express API (http://localhost:3001) together. Vite proxies `/api` requests to
the Express server.

## How signups are stored

When a visitor submits the form, the frontend sends `POST /api/signup` with
their email. The server validates the email, rejects duplicates, and appends a
row (`email`, `timestamp`) to `data/waitlist.xlsx`. The file is created on the
first signup and can be opened directly in Excel / Google Sheets / Numbers.

## Scripts

- `npm run dev` - run frontend + backend together
- `npm run dev:web` - frontend only
- `npm run dev:api` - backend only
- `npm run build` - production build of the frontend
- `npm run start` - run the Express server only
