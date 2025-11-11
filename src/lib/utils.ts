import { MediaCompany } from '@/types/database.types';

export function exportToCSV(data: MediaCompany[], filename: string = 'media-companies.csv') {
  const headers = [
    'Company Name',
    'Website',
    'Traffic Size',
    'Newsletters Count',
    'Est. Min Subscribers',
    'Est. Max Subscribers',
    'Topics',
    'Last Scraped'
  ];

  const rows = data.map(company => [
    company.name,
    company.website_url || '',
    company.traffic_size || '',
    company.total_newsletters.toString(),
    company.estimated_min_subscribers?.toString() || '',
    company.estimated_max_subscribers?.toString() || '',
    company.topic_categories?.join('; ') || '',
    company.last_scraped_at ? new Date(company.last_scraped_at).toLocaleDateString() : ''
  ]);

  const csvContent = [
    headers.join(','),
    ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
  ].join('\n');

  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  const url = URL.createObjectURL(blob);

  link.setAttribute('href', url);
  link.setAttribute('download', filename);
  link.style.visibility = 'hidden';

  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

export function copyToClipboard(data: MediaCompany[]) {
  const text = data.map(company =>
    `${company.name} - ${company.total_newsletters} newsletters, ${company.traffic_size || 'N/A'} traffic`
  ).join('\n');

  navigator.clipboard.writeText(text).then(
    () => true,
    () => false
  );
}

export function formatNumber(num?: number): string {
  if (!num) return 'N/A';
  if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
  if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
  return num.toString();
}

export function getSubscriberRange(min?: number, max?: number): string {
  if (!min && !max) return 'N/A';
  if (min && max) return `${formatNumber(min)} - ${formatNumber(max)}`;
  if (min) return `${formatNumber(min)}+`;
  if (max) return `Up to ${formatNumber(max)}`;
  return 'N/A';
}
