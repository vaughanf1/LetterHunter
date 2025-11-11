export interface MediaCompany {
  id: string;
  name: string;
  website_url?: string;
  traffic_size?: string; // e.g., "100K-500K", "1M-5M"
  monthly_traffic?: number; // Actual monthly traffic count
  total_newsletters: number;
  estimated_min_subscribers?: number;
  estimated_max_subscribers?: number;
  topic_categories?: string[];
  primary_frequency?: string; // Most common newsletter frequency
  frequency_breakdown?: { [key: string]: number }; // e.g., { "Daily": 5, "Weekly": 3 }
  last_scraped_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Newsletter {
  id: string;
  company_id: string;
  name: string;
  description?: string;
  frequency?: string; // e.g., "Daily", "Weekly"
  estimated_subscribers?: number;
  topic?: string;
  created_at: string;
  updated_at: string;
}

export type TrafficSizeFilter = "all" | "0-100K" | "100K-500K" | "500K-1M" | "1M-5M" | "5M+";
export type NewsletterCountFilter = "all" | "1-5" | "6-10" | "11-20" | "20+";
export type SubscriberRangeFilter = "all" | "0-10K" | "10K-50K" | "50K-100K" | "100K-500K" | "500K+";
