"use client";

import { TrafficSizeFilter, NewsletterCountFilter, SubscriberRangeFilter } from '@/types/database.types';

interface FiltersProps {
  trafficFilter: TrafficSizeFilter;
  newsletterFilter: NewsletterCountFilter;
  subscriberFilter: SubscriberRangeFilter;
  onTrafficChange: (value: TrafficSizeFilter) => void;
  onNewsletterChange: (value: NewsletterCountFilter) => void;
  onSubscriberChange: (value: SubscriberRangeFilter) => void;
  onReset: () => void;
}

export default function Filters({
  trafficFilter,
  newsletterFilter,
  subscriberFilter,
  onTrafficChange,
  onNewsletterChange,
  onSubscriberChange,
  onReset,
}: FiltersProps) {
  const hasActiveFilters = trafficFilter !== 'all' || newsletterFilter !== 'all' || subscriberFilter !== 'all';

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-gray-900">Filters</h3>
        {hasActiveFilters && (
          <button
            onClick={onReset}
            className="text-sm text-primary hover:underline"
          >
            Reset All
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Traffic Size
          </label>
          <select
            value={trafficFilter}
            onChange={(e) => onTrafficChange(e.target.value as TrafficSizeFilter)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="all">All Traffic</option>
            <option value="0-100K">0-100K</option>
            <option value="100K-500K">100K-500K</option>
            <option value="500K-1M">500K-1M</option>
            <option value="1M-5M">1M-5M</option>
            <option value="5M+">5M+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Number of Newsletters
          </label>
          <select
            value={newsletterFilter}
            onChange={(e) => onNewsletterChange(e.target.value as NewsletterCountFilter)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="all">All Counts</option>
            <option value="1-5">1-5</option>
            <option value="6-10">6-10</option>
            <option value="11-20">11-20</option>
            <option value="20+">20+</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Subscriber Range
          </label>
          <select
            value={subscriberFilter}
            onChange={(e) => onSubscriberChange(e.target.value as SubscriberRangeFilter)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
          >
            <option value="all">All Ranges</option>
            <option value="0-10K">0-10K</option>
            <option value="10K-50K">10K-50K</option>
            <option value="50K-100K">50K-100K</option>
            <option value="100K-500K">100K-500K</option>
            <option value="500K+">500K+</option>
          </select>
        </div>
      </div>
    </div>
  );
}
