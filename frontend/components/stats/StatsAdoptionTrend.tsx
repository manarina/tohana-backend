// components/stats/StatsAdoptionTrend.tsx
'use client';

import { Activity } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface StatsAdoptionTrendProps {
  data: Array<{ month: string; adoption: number }>;
}

export function StatsAdoptionTrend({ data }: StatsAdoptionTrendProps) {
  if (!data.length) {
    return (
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Activity className="h-5 w-5 text-blue-500" />
          <h3 className="text-lg font-semibold text-gray-900">Tendances d'adoption</h3>
        </div>
        <div className="flex items-center justify-center h-[250px] text-gray-400">
          <div className="text-center">
            <Activity className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p>Aucune donnée de tendance</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="h-5 w-5 text-blue-500" />
        <h3 className="text-lg font-semibold text-gray-900">Tendances d'adoption</h3>
      </div>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
            <Tooltip />
            <Line type="monotone" dataKey="adoption" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} name="Nouvelles pratiques" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  );
}