# Biashara AI — Dashboard

> React dashboard for the Biashara AI business assistant platform.

Displays real-time sales, expenses, profit summaries, transaction history, and stock levels for Kenyan SME owners. Connects to the Biashara AI FastAPI backend.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 + Vite |
| UI library | Material UI (MUI) v5 |
| Charts | Recharts |
| HTTP client | Axios |
| State management | React Context API |
| Hosting | Render |

---

## Project Structure

```
biashara-dashboard/
├── src/
│   ├── theme/
│   │   └── theme.js              # Centralized MUI theme and brand colors
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Sidebar.jsx       # Navigation sidebar — desktop and mobile
│   │   │   ├── Header.jsx        # Top header with clock and notifications
│   │   │   └── Layout.jsx        # Master layout wrapper
│   │   └── dashboard/
│   │       ├── SummaryCards.jsx  # Revenue, expenses, profit, transactions
│   │       ├── SalesChart.jsx    # Weekly and monthly bar chart
│   │       ├── TransactionTable.jsx # Searchable transaction history
│   │       └── StockLevels.jsx   # Stock progress bars and alerts
│   ├── context/
│   │   └── BusinessContext.jsx   # Global data context
│   ├── data/
│   │   └── mockData.js           # Fallback mock data
│   ├── pages/
│   │   ├── Dashboard.jsx         # Main dashboard page
│   │   ├── Transactions.jsx      # Full transactions page
│   │   └── Stock.jsx             # Stock management page
│   ├── services/
│   │   └── api.js                # All API calls in one place
│   ├── App.jsx                   # Root component and routing
│   └── main.jsx                  # Entry point
├── index.html
├── vite.config.js
├── .env.example
└── .gitignore
```

---

## Local Setup

### 1. Clone and install

```bash
git clone https://github.com/your-username/biashara-dashboard.git
cd biashara-dashboard
npm install
```

### 2. Set up environment variables

```bash
cp .env.example .env
```

Open `.env` and fill in:

```env
VITE_API_URL=http://localhost:8000
VITE_BUSINESS_ID=your-business-uuid-from-supabase
```

To get your business UUID:
- Go to Supabase → Table Editor → businesses table
- Copy the `id` of your business record

### 3. Start the development server

```bash
npm run dev
```

Open: `http://localhost:5173`

> The FastAPI backend must be running on port 8000 for real data to load. The dashboard falls back to mock data if the API is unavailable.

---

## Brand Colors

All colors are defined in `src/theme/theme.js` — change once, updates everywhere:

| Token | Hex | Usage |
|---|---|---|
| `red` | `#CF1239` | Primary — header, buttons, accents |
| `black` | `#0A0A0A` | Sidebar background, text |
| `smokeWhite` | `#F5F5F0` | Page background |
| `green` | `#16A34A` | Success, profit, healthy stock |
| `amber` | `#D97706` | Warnings, low stock alerts |

---

## Connecting to the Backend

The dashboard connects to the Biashara AI FastAPI backend via `src/services/api.js`.

In development set `VITE_API_URL=http://localhost:8000`.

In production set `VITE_API_URL=https://your-render-app.onrender.com`.

CORS is handled by the FastAPI backend — make sure your production URL is added to the allowed origins in `app/main.py`.

---

## Responsive Design

| Breakpoint | Layout |
|---|---|
| Mobile `xs` | Bottom navigation, stacked cards, hidden sidebar |
| Tablet `sm` | 2-column cards, collapsible sidebar |
| Desktop `md+` | Full sidebar, 4-column cards, all features |

---

## Deployment (Vercel)

1. Push to GitHub
2. Go to [Render.com](https://render.com) → Import repository //Whichever hosting platfrm yu prefer.
3. Framework preset: **Vite**
4. Add environment variables:
   - `VITE_API_URL` = your Render backend URL
   - `VITE_BUSINESS_ID` = your Supabase business UUID
5. Deploy

---

## Environment Variables Reference

| Variable | Description |
|---|---|
| `VITE_API_URL` | FastAPI backend URL. Empty string uses Vite proxy in dev |
| `VITE_BUSINESS_ID` | UUID of the business record in Supabase |

---

## Related Repositories

- **Backend**: [biashara-ai](https://github.com/23MorganDev/biashara-ai) — FastAPI + Supabase + Groq

---

## License

MIT