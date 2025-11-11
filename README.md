# Newspaper Scouter Dashboard

A minimalist, Apple-style dashboard for tracking and analyzing media company newsletters. Built with Next.js, TypeScript, Tailwind CSS, and Supabase.

## Features

- **Table View**: Display all scraped media companies with key metrics
- **Smart Filters**: Filter by traffic size, newsletter count, and subscriber range
- **Search**: Find companies by name or topic
- **Visualizations**: Bar chart showing top 10 companies by subscriber count
- **Export Options**: Download data as CSV or copy to clipboard
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop
- **Real-time Data**: Connected to Supabase for live data updates

## Tech Stack

- **Frontend**: Next.js 15 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS with custom Apple-style design system
- **Backend**: Supabase (PostgreSQL)
- **Charts**: Recharts
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project

### Installation

1. Clone the repository and install dependencies:

```bash
npm install
```

2. Set up your environment variables:

Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. Set up your Supabase database:

Run the SQL schema provided in `supabase-schema.sql` in your Supabase SQL Editor to create the necessary tables.

4. Run the development server:

```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Database Schema

The dashboard expects two main tables in Supabase:

### `media_companies`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| name | text | Company name |
| website_url | text | Company website |
| traffic_size | text | Traffic range (e.g., "100K-500K") |
| total_newsletters | integer | Number of newsletters |
| estimated_min_subscribers | integer | Min estimated subscribers |
| estimated_max_subscribers | integer | Max estimated subscribers |
| topic_categories | text[] | Array of topics |
| last_scraped_at | timestamp | Last scrape date |
| created_at | timestamp | Record creation date |
| updated_at | timestamp | Last update date |

### `newsletters`

| Column | Type | Description |
|--------|------|-------------|
| id | uuid | Primary key |
| company_id | uuid | Foreign key to media_companies |
| name | text | Newsletter name |
| description | text | Newsletter description |
| frequency | text | Publishing frequency |
| estimated_subscribers | integer | Estimated subscriber count |
| topic | text | Newsletter topic |
| created_at | timestamp | Record creation date |
| updated_at | timestamp | Last update date |

## Design System

The dashboard follows a minimalist Apple-style aesthetic:

- **Primary Color**: #0A84FF (iOS blue)
- **Typography**: Inter font family
  - Base: 16px
  - Headings: 24px
- **Shadows**: Soft shadows for depth
- **Corners**: Rounded corners (8-12px)

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main dashboard page
│   └── globals.css         # Global styles
├── components/
│   ├── CompanyTable.tsx    # Table component
│   ├── Filters.tsx         # Filter controls
│   ├── SearchBar.tsx       # Search input
│   ├── StatsCards.tsx      # Statistics cards
│   ├── TopNewslettersChart.tsx  # Bar chart
│   └── ExportActions.tsx   # Export buttons
├── lib/
│   ├── supabase.ts         # Supabase client
│   ├── api.ts              # API functions
│   └── utils.ts            # Utility functions
└── types/
    └── database.types.ts   # TypeScript types
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add your environment variables in the Vercel dashboard
4. Deploy!

### Other Platforms

Build the production version:

```bash
npm run build
npm start
```

## Optional Features (Future Enhancements)

- AI-generated company summaries
- Competitor comparison matrix
- Integration with n8n webhook for re-scraping
- Newsletter detail view
- Historical trend tracking

## Contributing

Feel free to submit issues and pull requests!

## License

ISC
