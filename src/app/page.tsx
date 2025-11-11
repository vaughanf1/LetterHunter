"use client";

import { useEffect, useState, useMemo } from 'react';
import { MediaCompany, TrafficSizeFilter, NewsletterCountFilter, SubscriberRangeFilter } from '@/types/database.types';
import { getMediaCompanies } from '@/lib/api';
import StatsCards from '@/components/StatsCards';
import Filters from '@/components/Filters';
import SearchBar from '@/components/SearchBar';
import CompanyTable from '@/components/CompanyTable';
import TopNewslettersChart from '@/components/TopNewslettersChart';
import ExportActions from '@/components/ExportActions';
import { Newspaper } from 'lucide-react';

export default function DashboardPage() {
  const [companies, setCompanies] = useState<MediaCompany[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [trafficFilter, setTrafficFilter] = useState<TrafficSizeFilter>('all');
  const [newsletterFilter, setNewsletterFilter] = useState<NewsletterCountFilter>('all');
  const [subscriberFilter, setSubscriberFilter] = useState<SubscriberRangeFilter>('all');

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const data = await getMediaCompanies();
      setCompanies(data);
      setLoading(false);
    }
    loadData();
  }, []);

  const filteredCompanies = useMemo(() => {
    return companies.filter((company) => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = company.name.toLowerCase().includes(query);
        const matchesTopics = company.topic_categories?.some(topic =>
          topic.toLowerCase().includes(query)
        );
        if (!matchesName && !matchesTopics) return false;
      }

      // Traffic filter
      if (trafficFilter !== 'all') {
        if (!company.traffic_size || company.traffic_size !== trafficFilter) {
          return false;
        }
      }

      // Newsletter count filter
      if (newsletterFilter !== 'all') {
        const count = company.total_newsletters;
        switch (newsletterFilter) {
          case '1-5':
            if (count < 1 || count > 5) return false;
            break;
          case '6-10':
            if (count < 6 || count > 10) return false;
            break;
          case '11-20':
            if (count < 11 || count > 20) return false;
            break;
          case '20+':
            if (count < 20) return false;
            break;
        }
      }

      // Subscriber range filter
      if (subscriberFilter !== 'all') {
        const max = company.estimated_max_subscribers || 0;
        switch (subscriberFilter) {
          case '0-10K':
            if (max > 10000) return false;
            break;
          case '10K-50K':
            if (max < 10000 || max > 50000) return false;
            break;
          case '50K-100K':
            if (max < 50000 || max > 100000) return false;
            break;
          case '100K-500K':
            if (max < 100000 || max > 500000) return false;
            break;
          case '500K+':
            if (max < 500000) return false;
            break;
        }
      }

      return true;
    });
  }, [companies, searchQuery, trafficFilter, newsletterFilter, subscriberFilter]);

  const handleResetFilters = () => {
    setTrafficFilter('all');
    setNewsletterFilter('all');
    setSubscriberFilter('all');
    setSearchQuery('');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 shadow-soft">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-primary/10 p-3 rounded-xl">
                <Newspaper className="w-8 h-8 text-primary" />
              </div>
              <div>
                <h1 className="text-heading font-bold text-gray-900">Newspaper Scouter</h1>
                <p className="text-sm text-gray-600">Newsletter Analytics Dashboard</p>
              </div>
            </div>
            <ExportActions companies={filteredCompanies} />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Stats */}
        <StatsCards companies={filteredCompanies} />

        {/* Search */}
        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {/* Filters */}
        <Filters
          trafficFilter={trafficFilter}
          newsletterFilter={newsletterFilter}
          subscriberFilter={subscriberFilter}
          onTrafficChange={setTrafficFilter}
          onNewsletterChange={setNewsletterFilter}
          onSubscriberChange={setSubscriberFilter}
          onReset={handleResetFilters}
        />

        {/* Chart */}
        <TopNewslettersChart companies={filteredCompanies} />

        {/* Table */}
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-gray-900">
              Media Companies ({filteredCompanies.length})
            </h2>
          </div>
          <CompanyTable companies={filteredCompanies} />
        </div>
      </main>
    </div>
  );
}
