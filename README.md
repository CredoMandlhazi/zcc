# ZCC Member Portal (TypeScript)

**Zion Creationist Church — Kganya Ya Mmupi**

Fully typed React 18 + TypeScript 5 member portal.

---

## 🚀 Quick Start

```bash
npm install
npm start           # dev server at localhost:3000
npm run build       # production build
npm run deploy      # deploy to https://CredoMandlhazi.github.io/zcc
```

---

## 📁 Structure

```
src/
├── types/
│   └── index.ts          ← ALL shared interfaces & types (User, Transaction, Provider…)
├── utils/
│   ├── api.ts            ← Typed Axios API layer (authApi, walletApi, utilsApi…)
│   ├── constants.ts      ← Palette (P), bundles, networks, CAT_CFG, TX_META
│   ├── helpers.ts        ← Pure helper functions (fmtR, genMembershipNo, genOTP…)
│   └── mockData.ts       ← Typed mock data (matches production API shapes)
├── context/
│   └── AppContext.tsx     ← Typed global state with AppContextValue interface
├── components/
│   ├── Icons.tsx          ← SVG icon factory, typed IconProps
│   ├── BottomNav.tsx      ← Floating pill nav
│   ├── ZCCCard.tsx        ← Realistic debit card
│   ├── PageHeader.tsx     ← Shared gradient header
│   ├── SpendChart.tsx     ← SVG area chart
│   ├── Btn.tsx            ← Typed reusable button (BtnVariant type)
│   ├── TxtInput.tsx       ← Typed input
│   ├── Modal.tsx          ← Bottom-sheet modal
│   ├── Atoms.tsx          ← FieldLabel, HR, Pill, Spinner, SuccessState
│   └── Toast.tsx          ← Toast notifications
├── modals/
│   ├── TopUpModal.tsx
│   ├── TransferModal.tsx
│   ├── GiveModal.tsx
│   └── BookingModal.tsx   ← exports BookingResult type
├── pages/
│   ├── LoginPage.tsx      ← Sign in + OTP registration
│   ├── DashboardPage.tsx  ← Carousel (Card → Spending → Summary)
│   ├── WalletPage.tsx     ← Balance ring + milestones
│   ├── TransactionsPage.tsx
│   ├── UtilitiesPage.tsx  ← Airtime, data, electricity
│   ├── RecurringPage.tsx  ← Contributions + events
│   ├── ServicesPage.tsx   ← Marketplace + bookings
│   ├── MorePage.tsx       ← Profile, settings shortcuts
│   ├── SettingsPage.tsx   ← Password/PIN, notifications, theme
│   └── NotificationsPage.tsx
└── declarations.d.ts      ← PNG/SVG module declarations
```

---

## 🔑 Key Types (`src/types/index.ts`)

| Type | Purpose |
|---|---|
| `User` | Authenticated user shape (matches backend JWT payload) |
| `Transaction` | Wallet credit/debit record |
| `Provider` | Marketplace service provider |
| `Service` | Individual bookable service |
| `ChurchEvent` | Event with ticket info |
| `Contribution` | Recurring tithe/offering |
| `Notification` | In-app notification |
| `AppContextValue` | Full typed context interface |
| `ApiResponse<T>` | Generic API wrapper |
| `LoginPayload`, `RegisterPayload` | Auth request bodies |
| `TopUpPayload`, `TransferPayload` | Wallet request bodies |
| `AirtimePayload`, `DataPayload`, `ElectricityPayload` | Utility payloads |
| `BookingPayload`, `ContributionPayload` | Service payloads |
| `UssdRequest`, `UssdResponse` | USSD session types |

---

## 🌐 API Integration (`src/utils/api.ts`)

Swap mock data for real API calls:

```typescript
// Login example
import { authApi } from './utils/api';

const { data } = await authApi.login({ phone, password });
localStorage.setItem('zcc_token', data.data.token);
login(data.data.user);
```

Set `REACT_APP_API_URL` in `.env`:
```
REACT_APP_API_URL=https://your-backend.railway.app/api
```

---

## 🎨 Design Tokens

```typescript
import { P } from './utils/constants';
// P.green, P.greenDeep, P.ink, P.cream, P.sage…
```

---

## 🔐 Demo Credentials

```
Phone:    +27823456789
Password: password123
```

---

## 🚢 Deploy to GitHub Pages

```bash
npm run deploy
```
Then: GitHub → Settings → Pages → source: `gh-pages` branch

Uses **HashRouter** — no server config needed.

---

*Kganya Ya Mmupi — Light of the Creator*
# zcc
