# Forms Collection

A collection of web forms built with Solid.js and Cloudflare Workers. Each form is designed to be simple, efficient, and easy to maintain.

## Current Forms

- **Prayer Request Form** (`/prayer`)
  - Collects prayer requests and mailing addresses
  - Optional sections for prayer requests and mailing addresses
  - Simple and clean UI

- **What Makes You Go "Ugh" Survey** (`/survey`)
  - 5-question survey about workflow challenges and pain points
  - Helps identify product opportunities and user needs
  - Comprehensive form covering role, time management, and process inefficiencies

- **Whom Should I Meet?** (`/intro`)
  - Referral form for introductions (friends, work, dating)
  - Supports both regular referrals and self-introductions
  - Collects person details, connection type, and descriptive context

## Tech Stack

- **Frontend**: Solid.js + Vite
- **Backend**: Cloudflare Workers
- **Database**: Cloudflare D1
- **Deployment**: Cloudflare Workers

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Deploy to Cloudflare
npm run deploy
```

## Database Setup

The application uses Cloudflare D1 for data storage. Each form has its own table:

```sql
-- Prayer Request Form
CREATE TABLE connections (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  prayer TEXT,
  address TEXT,
  created_at TEXT NOT NULL
);

-- What Makes You Go "Ugh" Survey
CREATE TABLE surveys (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT,
  role TEXT,
  time_spikes TEXT,
  workflow_friction TEXT,
  annoyances_priorities TEXT,
  dream_solution TEXT,
  created_at TEXT NOT NULL
);

-- Whom Should I Meet? Form
CREATE TABLE intros (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  person_name TEXT NOT NULL,
  person_contact TEXT,
  referrer_name TEXT,
  referrer_email TEXT,
  connection_type TEXT NOT NULL,
  description TEXT NOT NULL,
  is_self_referral INTEGER DEFAULT 0,
  created_at TEXT NOT NULL
);
```

## Project Structure

- `src/app.jsx` - Main routing setup
- `src/components/Home.jsx` - Home page with form selector
- `src/components/PrayerForm.jsx` - Prayer request form component
- `src/components/SurveyForm.jsx` - "What Makes You Go Ugh" survey component
- `src/components/IntroForm.jsx` - "Whom Should I Meet?" referral form component
- `src/worker.js` - Cloudflare Worker for handling requests
- `wrangler.toml` - Cloudflare Worker configuration

## How It Works

1. Each form is a standalone component
2. Forms submit data to the Cloudflare Worker
3. Worker stores submissions in D1 database
4. Users receive confirmation messages

## Deployment

The application is deployed to Cloudflare Pages with:
- Static frontend files served from `/dist`
- Worker handling both static file serving and form submissions
- D1 database for data persistence

## Adding New Forms

To add a new form:
1. Create a new component in `src/app.jsx`
2. Update the worker to handle the new form's submissions
3. Deploy the changes
