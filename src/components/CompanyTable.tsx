"use client";

import { MediaCompany } from '@/types/database.types';
import { formatNumber, getSubscriberRange } from '@/lib/utils';
import { ExternalLink } from 'lucide-react';

interface CompanyTableProps {
  companies: MediaCompany[];
}

export default function CompanyTable({ companies }: CompanyTableProps) {
  return (
    <div className="overflow-x-auto rounded-xl shadow-soft bg-white">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Company
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Monthly Traffic
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Newsletters
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Primary Frequency
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Est. Subscribers
            </th>
            <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">
              Topics
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {companies.length === 0 ? (
            <tr>
              <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                No companies found. Please check your filters or add data to your Supabase database.
              </td>
            </tr>
          ) : (
            companies.map((company) => (
              <tr key={company.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div>
                      <div className="font-medium text-gray-900">{company.name}</div>
                      {company.website_url && (
                        <a
                          href={company.website_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-primary hover:underline flex items-center gap-1 mt-1"
                        >
                          Visit site
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">
                    {formatNumber(company.monthly_traffic)}
                  </div>
                  <div className="text-xs text-gray-500">
                    {company.traffic_size}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary/10 text-primary">
                    {company.total_newsletters}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  <div className="font-medium">{company.primary_frequency || 'N/A'}</div>
                  {company.frequency_breakdown && (
                    <div className="text-xs text-gray-500 mt-1">
                      {Object.entries(company.frequency_breakdown)
                        .filter(([_, count]) => count > 0)
                        .map(([freq, count]) => `${freq}: ${count}`)
                        .join(', ')}
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">
                  {getSubscriberRange(company.estimated_min_subscribers, company.estimated_max_subscribers)}
                </td>
                <td className="px-6 py-4 text-sm text-gray-700">
                  <div className="flex flex-wrap gap-1">
                    {company.topic_categories && company.topic_categories.length > 0 ? (
                      company.topic_categories.slice(0, 3).map((topic, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                        >
                          {topic}
                        </span>
                      ))
                    ) : (
                      <span className="text-gray-400">N/A</span>
                    )}
                    {company.topic_categories && company.topic_categories.length > 3 && (
                      <span className="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700">
                        +{company.topic_categories.length - 3}
                      </span>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
