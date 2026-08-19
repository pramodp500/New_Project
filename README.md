# ExpenseFlow AI

> **Kane CLI Hackathon Submission** | Built with opencode (AI Agent) | Verified with Kane CLI

A modern, production-quality expense management application built with Next.js, TypeScript, Tailwind CSS, and SQLite.

## What I Built & Who It's For

ExpenseFlow AI is a full-stack expense management app for individuals and small teams who want a fast, clean way to track, categorize, and analyze their spending. The app features a real-time dashboard with charts, full CRUD operations on expenses, search/filter/sort, and a reports page — all backed by a SQLite database with auto-seeded sample data.

**AI Agent used:** opencode (big-pickle model)

**What Kane CLI verifies:** 8 end-to-end test flows covering dashboard loading, adding valid/invalid expenses, editing, deleting, searching, filtering, and verifying dashboard totals update correctly — all exercised against the live app via browser automation.

## Demo

**Video:** [Coming soon — 3 min demo on YouTube (Unlisted)]

**Live URL:** Run locally — see setup below (takes <30 seconds to start)

## Features

- **Dashboard** — Overview with total expenses, current month expenses, category breakdown, monthly summary, and recent expenses
- **Add Expense** — Form with validation for amount, category, description, date, and payment method
- **Expense List** — Searchable, filterable, and sortable table of all expenses
- **Expense Details** — View complete details of a single expense
- **Edit Expense** — Update any field of an existing expense
- **Delete Expense** — Delete with confirmation dialog
- **Search & Filter** — Search by description/category, filter by category, sort by date or amount
- **Reports** — Category breakdown, monthly trends, and summary tables
- **Seed Data** — Automatically populated with sample expenses on first launch

## Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** SQLite (via better-sqlite3)
- **UI:** Custom components with semantic HTML

## Prerequisites

- Node.js 18+ (recommended: 20+)
- npm

## Getting Started

### 1. Clone the repo

```bash
git clone <your-repo-url>
cd expenseflow-ai
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The app starts at **http://localhost:3000**. The SQLite database is auto-created and seeded with sample data on first launch.

### 4. Build for production (optional)

```bash
npm run build
npm start
```

## Project Structure

```
expenseflow-ai/
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── dashboard/route.ts    — Dashboard statistics API
│   │   │   └── expenses/
│   │   │       ├── route.ts          — List & create expenses
│   │   │       └── [id]/route.ts     — Get, update, delete expense
│   │   ├── dashboard/page.tsx        — Dashboard page
│   │   ├── expenses/
│   │   │   ├── page.tsx              — Expense list with search/filter
│   │   │   ├── add/page.tsx          — Add expense form
│   │   │   ├── [id]/page.tsx         — Expense details
│   │   │   └── edit/[id]/page.tsx    — Edit expense form
│   │   ├── reports/page.tsx          — Reports & analytics
│   │   ├── layout.tsx                — Root layout with sidebar
│   │   ├── page.tsx                  — Redirects to /dashboard
│   │   └── globals.css
│   ├── components/
│   │   ├── Sidebar.tsx               — Navigation sidebar
│   │   ├── StatCard.tsx              — Statistics card
│   │   ├── ExpenseTable.tsx          — Expense list table
│   │   ├── ExpenseForm.tsx           — Add/edit expense form
│   │   ├── ConfirmDialog.tsx         — Delete confirmation modal
│   │   ├── Notification.tsx          — Toast notifications
│   │   ├── CategoryChart.tsx         — Category breakdown chart
│   │   └── MonthlyChart.tsx          — Monthly trend chart
│   └── lib/
│       ├── db.ts                     — Database setup, seed data, queries
│       ├── types.ts                  — TypeScript interfaces and constants
│       └── validations.ts            — Form validation logic
├── data/                             — SQLite database (auto-created)
└── next.config.ts
```

## Kane CLI Verification

This app is verified with **Kane CLI** — 8 end-to-end test flows that exercise the full expense lifecycle via browser automation.

### Test Suite

| # | Test | What it verifies |
|---|------|-----------------|
| 01 | Dashboard loads | Stat cards, charts, recent expenses table render with real data |
| 02 | Add expense | Fill form, submit, verify new expense appears in list |
| 03 | Add invalid expense | Submit empty/invalid form, verify validation errors appear |
| 04 | Edit expense | Open existing expense, modify fields, save, verify changes persist |
| 05 | Delete expense | Click delete, confirm dialog, verify expense removed from list |
| 06 | Search expense | Type in search box, verify filtered results match query |
| 07 | Filter by category | Select category filter, verify only matching expenses shown |
| 08 | Dashboard totals | Verify aggregate stats (total, count, average) are correct |

### Running the tests

```bash
# Make sure the dev server is running first (npm run dev)
kane-cli run tests/kane/01_dashboard_loads_test.md
```

Test results are cached in `.testmuai/evidence/`. Subsequent runs replay at zero cost.

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/expenses` | List expenses (supports `search`, `category`, `sortBy`, `sortOrder` query params) |
| POST | `/api/expenses` | Create a new expense |
| GET | `/api/expenses/:id` | Get a single expense |
| PUT | `/api/expenses/:id` | Update an expense |
| DELETE | `/api/expenses/:id` | Delete an expense |
| GET | `/api/dashboard` | Get dashboard statistics |

## Data Model

Each expense contains:
- `id` — Unique identifier
- `amount` — Expense amount (decimal)
- `category` — One of: Food, Travel, Shopping, Bills, Entertainment, Healthcare, Education, Other
- `description` — Text description (min 3 characters)
- `date` — Expense date
- `paymentMethod` — One of: Cash, Credit Card, Debit Card, UPI, Bank Transfer
- `createdAt` — Timestamp of creation
- `updatedAt` — Timestamp of last update

## Hackathon Submission

**What I built:** ExpenseFlow AI — a full-stack expense management app with dashboard analytics, CRUD operations, search/filter, and reports, backed by SQLite.

**Who it's for:** Individuals and small teams who want a fast, clean way to track and analyze spending.

**AI Agent used:** opencode (big-pickle model) — the agent built the entire app from scratch, including API routes, React components, database layer, and form validation.

**What Kane CLI verifies:** 8 browser-automated test flows that exercise the complete expense lifecycle — from dashboard rendering through add/edit/delete/search/filter — confirming the app works end to end.

## License

MIT
