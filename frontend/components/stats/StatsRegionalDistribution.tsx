// components/stats/StatsRegionalDistribution.tsx
'use client';

import { Globe } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import {
  ComposedChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StatsRegionalDistributionProps {
  data: Array<{
    region: string;
    farms: number;
    surface: number;
    production: number;
  }>;
}

export function StatsRegionalDistribution({ data }: StatsRegionalDistributionProps) {
  if (!data.length) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Globe className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Distribution régionale</h3>
        </div>
        <div className="flex items-center justify-center h-[300px] text-gray-400">
          <div className="text-center">
            <Globe className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p>Aucune donnée régionale disponible</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Globe className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Distribution régionale</h3>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="region" stroke="#9ca3af" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="left" stroke="#9ca3af" tick={{ fontSize: 11 }} />
            <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" tick={{ fontSize: 11 }} />
            <Tooltip />
            <Legend />
            <Bar yAxisId="left" dataKey="farms" fill="#3b82f6" name="Exploitations" radius={[4, 4, 0, 0]} />
            <Bar yAxisId="left" dataKey="surface" fill="#22c55e" name="Surface (ha)" radius={[4, 4, 0, 0]} />
            <Line yAxisId="right" type="monotone" dataKey="production" stroke="#f59e0b" strokeWidth={3} name="Production (kg)" dot={{ r: 5 }} />
          </ComposedChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}