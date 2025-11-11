"use client";

import { MediaCompany } from '@/types/database.types';
import { Building2, Mail, Users, TrendingUp } from 'lucide-react';

interface StatsCardsProps {
  companies: MediaCompany[];
}

export default function StatsCards({ companies }: StatsCardsProps) {
  const totalCompanies = companies.length;
  const totalNewsletters = companies.reduce((sum, c) => sum + c.total_newsletters, 0);
  const avgNewslettersPerCompany = totalCompanies > 0
    ? (totalNewsletters / totalCompanies).toFixed(1)
    : '0';
  const totalEstimatedSubscribers = companies.reduce(
    (sum, c) => sum + (c.estimated_max_subscribers || 0),
    0
  );

  const stats = [
    {
      label: 'Total Companies',
      value: totalCompanies.toString(),
      icon: Building2,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      label: 'Total Newsletters',
      value: totalNewsletters.toString(),
      icon: Mail,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
    {
      label: 'Avg Newsletters/Company',
      value: avgNewslettersPerCompany,
      icon: TrendingUp,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      label: 'Est. Total Subscribers',
      value: totalEstimatedSubscribers >= 1000000
        ? `${(totalEstimatedSubscribers / 1000000).toFixed(1)}M`
        : totalEstimatedSubscribers >= 1000
        ? `${(totalEstimatedSubscribers / 1000).toFixed(0)}K`
        : totalEstimatedSubscribers.toString(),
      icon: Users,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-soft p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`${stat.bgColor} p-3 rounded-lg`}>
                <Icon className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
