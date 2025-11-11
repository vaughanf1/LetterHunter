"use client";

import { MediaCompany } from '@/types/database.types';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface TopNewslettersChartProps {
  companies: MediaCompany[];
}

export default function TopNewslettersChart({ companies }: TopNewslettersChartProps) {
  const topCompanies = companies
    .filter(c => c.estimated_max_subscribers)
    .sort((a, b) => (b.estimated_max_subscribers || 0) - (a.estimated_max_subscribers || 0))
    .slice(0, 10)
    .map(c => ({
      name: c.name.length > 20 ? c.name.substring(0, 20) + '...' : c.name,
      subscribers: c.estimated_max_subscribers,
    }));

  if (topCompanies.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-soft p-6">
        <h3 className="font-semibold text-gray-900 mb-4">Top 10 by Subscribers</h3>
        <div className="flex items-center justify-center h-64 text-gray-500">
          No subscriber data available
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-soft p-6">
      <h3 className="font-semibold text-gray-900 mb-4">Top 10 by Estimated Subscribers</h3>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={topCompanies}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis
            dataKey="name"
            tick={{ fontSize: 12 }}
            angle={-45}
            textAnchor="end"
            height={100}
          />
          <YAxis
            tick={{ fontSize: 12 }}
            tickFormatter={(value) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value.toString();
            }}
          />
          <Tooltip
            formatter={(value: number) => {
              if (value >= 1000000) return `${(value / 1000000).toFixed(2)}M`;
              if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
              return value.toString();
            }}
            contentStyle={{
              backgroundColor: 'white',
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
            }}
          />
          <Bar dataKey="subscribers" fill="#0A84FF" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
