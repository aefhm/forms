# Forms Collection

A collection of web forms built with Solid.js and Cloudflare Workers. Each form is designed to be simple, efficient, and easy to maintain.

## Current Forms

- **Prayer Request Form**
  - Collects prayer requests and mailing addresses
  - Optional sections for prayer requests and mailing addresses
  - Simple and clean UI

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
```

## Project Structure

- `src/app.jsx` - Form components
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
