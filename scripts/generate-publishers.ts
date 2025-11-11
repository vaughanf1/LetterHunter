import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Major publisher names and types
const publisherTypes = {
  news: [
    'Times', 'Post', 'Tribune', 'Herald', 'Journal', 'Chronicle', 'News', 'Press',
    'Observer', 'Gazette', 'Examiner', 'Record', 'Telegraph', 'Standard', 'Guardian'
  ],
  business: [
    'Business', 'Finance', 'Markets', 'Trade', 'Commerce', 'Industry', 'Economy',
    'Capital', 'Venture', 'Enterprise', 'Corporate', 'Executive'
  ],
  tech: [
    'Tech', 'Digital', 'Innovation', 'Silicon', 'Code', 'Startup', 'Byte',
    'Cyber', 'Cloud', 'Data', 'AI', 'Future'
  ],
  lifestyle: [
    'Life', 'Style', 'Living', 'Culture', 'Arts', 'Food', 'Travel', 'Health',
    'Wellness', 'Home', 'Garden', 'Fashion'
  ],
  sports: [
    'Sports', 'Athletic', 'Game', 'Play', 'Score', 'Champion', 'Arena'
  ]
};

const regions = [
  'New York', 'London', 'San Francisco', 'Los Angeles', 'Chicago', 'Boston',
  'Washington', 'Seattle', 'Austin', 'Miami', 'Atlanta', 'Dallas', 'Houston',
  'Philadelphia', 'Phoenix', 'San Diego', 'Denver', 'Portland', 'Detroit',
  'Minneapolis', 'Tampa', 'Baltimore', 'St. Louis', 'Pittsburgh', 'Cleveland',
  'Toronto', 'Vancouver', 'Montreal', 'Sydney', 'Melbourne', 'Tokyo', 'Seoul',
  'Singapore', 'Hong Kong', 'Shanghai', 'Beijing', 'Dubai', 'Mumbai', 'Delhi',
  'Berlin', 'Paris', 'Madrid', 'Rome', 'Amsterdam', 'Stockholm', 'Copenhagen',
  'Global', 'International', 'World', 'America', 'Europe', 'Asia', 'Pacific'
];

const topics = [
  ['News', 'Politics', 'World'],
  ['Business', 'Finance', 'Markets'],
  ['Technology', 'Innovation', 'Startups'],
  ['Lifestyle', 'Culture', 'Entertainment'],
  ['Sports', 'Athletics'],
  ['Science', 'Research', 'Health'],
  ['Education', 'Academia'],
  ['Real Estate', 'Property'],
  ['Energy', 'Environment'],
  ['Media', 'Marketing', 'Advertising']
];

const frequencies = ['Daily', 'Weekly', 'Bi-weekly', 'Monthly', 'Occasional'];

const realPublishers = [
  { name: 'The New York Times', url: 'nytimes.com', traffic: 450000000, newsletters: 45, topics: ['News', 'Politics', 'Culture'] },
  { name: 'The Washington Post', url: 'washingtonpost.com', traffic: 120000000, newsletters: 38, topics: ['News', 'Politics', 'Opinion'] },
  { name: 'The Wall Street Journal', url: 'wsj.com', traffic: 98000000, newsletters: 42, topics: ['Business', 'Finance', 'Markets'] },
  { name: 'The Guardian', url: 'theguardian.com', traffic: 310000000, newsletters: 35, topics: ['News', 'World', 'Opinion'] },
  { name: 'BBC News', url: 'bbc.com/news', traffic: 520000000, newsletters: 28, topics: ['News', 'World', 'Analysis'] },
  { name: 'CNN', url: 'cnn.com', traffic: 380000000, newsletters: 32, topics: ['News', 'Politics', 'World'] },
  { name: 'Reuters', url: 'reuters.com', traffic: 92000000, newsletters: 25, topics: ['News', 'Business', 'Markets'] },
  { name: 'Bloomberg', url: 'bloomberg.com', traffic: 110000000, newsletters: 48, topics: ['Business', 'Finance', 'Markets'] },
  { name: 'Financial Times', url: 'ft.com', traffic: 42000000, newsletters: 40, topics: ['Business', 'Finance', 'World'] },
  { name: 'The Economist', url: 'economist.com', traffic: 38000000, newsletters: 22, topics: ['Business', 'Politics', 'World'] },
  { name: 'Forbes', url: 'forbes.com', traffic: 95000000, newsletters: 30, topics: ['Business', 'Technology', 'Lifestyle'] },
  { name: 'TechCrunch', url: 'techcrunch.com', traffic: 52000000, newsletters: 18, topics: ['Technology', 'Startups', 'Innovation'] },
  { name: 'The Verge', url: 'theverge.com', traffic: 48000000, newsletters: 15, topics: ['Technology', 'Science', 'Culture'] },
  { name: 'Wired', url: 'wired.com', traffic: 35000000, newsletters: 20, topics: ['Technology', 'Science', 'Culture'] },
  { name: 'Axios', url: 'axios.com', traffic: 28000000, newsletters: 24, topics: ['News', 'Business', 'Politics'] },
  { name: 'Politico', url: 'politico.com', traffic: 45000000, newsletters: 35, topics: ['Politics', 'Policy', 'News'] },
  { name: 'The Atlantic', url: 'theatlantic.com', traffic: 32000000, newsletters: 16, topics: ['Politics', 'Culture', 'Opinion'] },
  { name: 'Vox', url: 'vox.com', traffic: 55000000, newsletters: 14, topics: ['News', 'Explainers', 'Politics'] },
  { name: 'BuzzFeed News', url: 'buzzfeednews.com', traffic: 68000000, newsletters: 12, topics: ['News', 'Culture', 'Entertainment'] },
  { name: 'Vice', url: 'vice.com', traffic: 72000000, newsletters: 18, topics: ['News', 'Culture', 'Lifestyle'] },
  { name: 'Business Insider', url: 'businessinsider.com', traffic: 88000000, newsletters: 26, topics: ['Business', 'Tech', 'Finance'] },
  { name: 'CNBC', url: 'cnbc.com', traffic: 125000000, newsletters: 22, topics: ['Business', 'Markets', 'Finance'] },
  { name: 'USA Today', url: 'usatoday.com', traffic: 95000000, newsletters: 28, topics: ['News', 'Sports', 'Entertainment'] },
  { name: 'Los Angeles Times', url: 'latimes.com', traffic: 42000000, newsletters: 25, topics: ['News', 'Culture', 'California'] },
  { name: 'Chicago Tribune', url: 'chicagotribune.com', traffic: 28000000, newsletters: 20, topics: ['News', 'Sports', 'Local'] },
  { name: 'Morning Brew', url: 'morningbrew.com', traffic: 8500000, newsletters: 12, topics: ['Business', 'Finance', 'Tech'] },
  { name: 'The Hustle', url: 'thehustle.co', traffic: 6200000, newsletters: 10, topics: ['Business', 'Tech', 'Trends'] },
  { name: 'Substack', url: 'substack.com', traffic: 42000000, newsletters: 85, topics: ['Various', 'Publishing', 'Media'] },
  { name: 'Medium', url: 'medium.com', traffic: 180000000, newsletters: 45, topics: ['Writing', 'Technology', 'Culture'] },
  { name: 'HuffPost', url: 'huffpost.com', traffic: 92000000, newsletters: 18, topics: ['News', 'Politics', 'Lifestyle'] },
];

function generatePublisherName(index: number): string {
  if (index < realPublishers.length) {
    return realPublishers[index].name;
  }

  const typeKeys = Object.keys(publisherTypes);
  const randomType = typeKeys[Math.floor(Math.random() * typeKeys.length)];
  const words = publisherTypes[randomType as keyof typeof publisherTypes];
  const region = regions[Math.floor(Math.random() * regions.length)];
  const word = words[Math.floor(Math.random() * words.length)];

  const formats = [
    `The ${region} ${word}`,
    `${region} ${word}`,
    `The ${word}`,
    `${word} ${region}`,
    `${region} ${word} Network`,
  ];

  return formats[Math.floor(Math.random() * formats.length)];
}

function generateUrl(name: string): string {
  return name
    .toLowerCase()
    .replace(/^the\s+/i, '')
    .replace(/\s+/g, '')
    .replace(/[^a-z0-9]/g, '') + '.com';
}

function generateTraffic(rank: number): number {
  // Top 50 publishers: 20M - 500M monthly
  if (rank < 50) {
    return Math.floor(20000000 + Math.random() * 480000000);
  }
  // Rank 50-200: 5M - 20M
  if (rank < 200) {
    return Math.floor(5000000 + Math.random() * 15000000);
  }
  // Rank 200-500: 1M - 5M
  if (rank < 500) {
    return Math.floor(1000000 + Math.random() * 4000000);
  }
  // Rank 500-1000: 500K - 1M
  return Math.floor(500000 + Math.random() * 500000);
}

function getTrafficSize(traffic: number): string {
  if (traffic >= 10000000) return '10M+';
  if (traffic >= 5000000) return '5M-10M';
  if (traffic >= 1000000) return '1M-5M';
  if (traffic >= 500000) return '500K-1M';
  if (traffic >= 100000) return '100K-500K';
  return '0-100K';
}

function generateNewsletterCount(rank: number): number {
  // Top publishers have more newsletters
  if (rank < 100) {
    return Math.floor(15 + Math.random() * 50); // 15-65 newsletters
  }
  if (rank < 300) {
    return Math.floor(12 + Math.random() * 30); // 12-42 newsletters
  }
  if (rank < 600) {
    return Math.floor(10 + Math.random() * 20); // 10-30 newsletters
  }
  return Math.floor(10 + Math.random() * 15); // 10-25 newsletters
}

function generateSubscriberEstimate(traffic: number, newsletterCount: number) {
  // Typically 2-10% of web traffic converts to newsletter subscribers
  const conversionRate = 0.02 + Math.random() * 0.08;
  const totalSubscribers = Math.floor(traffic * conversionRate);

  // Distribute across newsletters with variance
  const avgPerNewsletter = totalSubscribers / newsletterCount;
  const min = Math.floor(avgPerNewsletter * 0.1);
  const max = Math.floor(avgPerNewsletter * 3);

  return { min, max, total: totalSubscribers };
}

function generateTopics(): string[] {
  const selectedTopics = topics[Math.floor(Math.random() * topics.length)];
  const numTopics = 1 + Math.floor(Math.random() * 3);
  return selectedTopics.slice(0, numTopics);
}

function generateFrequencyBreakdown(newsletterCount: number): { breakdown: { [key: string]: number }, primary: string } {
  const breakdown: { [key: string]: number } = {};
  let remaining = newsletterCount;

  // Distribute newsletters across frequencies
  frequencies.forEach((freq, index) => {
    if (remaining === 0) return;

    if (index === frequencies.length - 1) {
      breakdown[freq] = remaining;
    } else {
      const max = Math.min(remaining, Math.ceil(newsletterCount * 0.5));
      const count = Math.floor(Math.random() * max);
      if (count > 0) {
        breakdown[freq] = count;
        remaining -= count;
      }
    }
  });

  // Find primary frequency
  let primary = 'Weekly';
  let maxCount = 0;
  Object.entries(breakdown).forEach(([freq, count]) => {
    if (count > maxCount) {
      maxCount = count;
      primary = freq;
    }
  });

  return { breakdown, primary };
}

function generatePublishers(count: number) {
  const publishers = [];
  const usedNames = new Set<string>();

  for (let i = 0; i < count; i++) {
    let name = generatePublisherName(i);

    // Ensure unique names
    let attempts = 0;
    while (usedNames.has(name) && attempts < 10) {
      name = generatePublisherName(i + Math.floor(Math.random() * 1000));
      attempts++;
    }
    usedNames.add(name);

    const traffic = i < realPublishers.length ? realPublishers[i].traffic : generateTraffic(i);
    const newsletterCount = i < realPublishers.length ? realPublishers[i].newsletters : generateNewsletterCount(i);
    const subscribers = generateSubscriberEstimate(traffic, newsletterCount);
    const topicList = i < realPublishers.length ? realPublishers[i].topics : generateTopics();
    const { breakdown, primary } = generateFrequencyBreakdown(newsletterCount);
    const url = i < realPublishers.length ? realPublishers[i].url : generateUrl(name);

    publishers.push({
      id: `pub_${i.toString().padStart(4, '0')}`,
      name,
      website_url: `https://${url}`,
      traffic_size: getTrafficSize(traffic),
      monthly_traffic: traffic,
      total_newsletters: newsletterCount,
      estimated_min_subscribers: subscribers.min,
      estimated_max_subscribers: subscribers.max,
      topic_categories: topicList,
      primary_frequency: primary,
      frequency_breakdown: breakdown,
      last_scraped_at: new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString(),
      created_at: new Date(Date.now() - Math.random() * 365 * 24 * 60 * 60 * 1000).toISOString(),
      updated_at: new Date().toISOString(),
    });
  }

  // Sort by traffic (highest first)
  publishers.sort((a, b) => b.monthly_traffic - a.monthly_traffic);

  return publishers;
}

// Generate the data
const publishers = generatePublishers(1000);

// Save to JSON file
const outputDir = path.join(__dirname, '../data');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

const outputPath = path.join(outputDir, 'publishers.json');
fs.writeFileSync(outputPath, JSON.stringify(publishers, null, 2));

console.log(`Generated ${publishers.length} publishers`);
console.log(`Saved to ${outputPath}`);
console.log(`\nSample statistics:`);
console.log(`- Top publisher: ${publishers[0].name} (${publishers[0].monthly_traffic.toLocaleString()} monthly visits)`);
console.log(`- Total newsletters: ${publishers.reduce((sum, p) => sum + p.total_newsletters, 0)}`);
console.log(`- Average newsletters per publisher: ${(publishers.reduce((sum, p) => sum + p.total_newsletters, 0) / publishers.length).toFixed(1)}`);
