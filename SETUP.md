# Quick Setup Guide

## Step 1: Configure Supabase

1. Create a new project at [supabase.com](https://supabase.com)

2. Go to your project settings and copy:
   - Project URL
   - Anon/Public key

3. Create a `.env.local` file in the root directory:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Step 2: Set up Database

1. Open your Supabase SQL Editor
2. Copy and paste the contents of `supabase-schema.sql`
3. Run the SQL to create tables and insert sample data

## Step 3: Run the Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your dashboard!

## Step 4: Deploy to Vercel (Optional)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Add your environment variables in the Vercel dashboard:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. Deploy!

## Connecting Your n8n Scraper

To populate the dashboard with real data from your n8n workflow:

1. Update your n8n workflow to write data to Supabase
2. Use the Supabase node in n8n with the same credentials
3. Ensure your data matches the schema in `supabase-schema.sql`
4. The dashboard will automatically display the new data

## Customization

### Change Colors
Edit `tailwind.config.ts` to update the primary color and other design tokens.

### Add More Filters
Update the filter types in `src/types/database.types.ts` and add corresponding UI in `src/components/Filters.tsx`.

### Modify Table Columns
Edit `src/components/CompanyTable.tsx` to add or remove columns.

## Troubleshooting

**No data showing?**
- Check that your Supabase credentials are correct
- Verify that the tables exist in your database
- Check browser console for errors

**Build errors?**
- Run `npm install` to ensure all dependencies are installed
- Check that Node.js version is 18 or higher

**Styling issues?**
- Clear `.next` cache: `rm -rf .next`
- Rebuild: `npm run build`

## Support

For issues or questions, check the main README.md or create an issue on GitHub.
