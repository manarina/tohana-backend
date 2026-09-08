// components/stats/StatsCropDistribution.tsx
'use client';

import { PieChart } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface StatsCropDistributionProps {
  data: Array<{ name: string; value: number; color: string }>;
}

const COLORS = ['#22c55e', '#f59e0b', '#3b82f6', '#8b5cf6', '#ef4444', '#a855f7', '#78716c'];

export function StatsCropDistribution({ data }: StatsCropDistributionProps) {
  if (!data.length) {
    return (
      <Card className="p-6 h-full">
        <div className="flex items-center gap-2 mb-4">
          <PieChart className="h-5 w-5 text-purple-500" />
          <h3 className="text-lg font-semibold text-gray-900">Distribution</h3>
        </div>
        <div className="flex items-center justify-center h-[250px] text-gray-400">
          <div className="text-center">
            <PieChart className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p>Aucune donnée de culture</p>
          </div>
        </div>
      </Card>
    );
  }

  return (
    <Card className="p-6 h-full">
      <div className="flex items-center gap-2 mb-4">
        <PieChart className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900">Distribution</h3>
      </div>
      <div className="h-[250px]">
        <ResponsiveContainer width="100%" height="100%">
          <RechartsPieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
              label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
              labelLine={false}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </RechartsPieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-2">
        {data.map((crop, index) => (
          <div key={crop.name} className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: crop.color || COLORS[index] }} />
            <span className="text-xs text-gray-600">{crop.name}</span>
            <span className="text-xs font-medium text-gray-900 ml-auto">{crop.value} kg</span>
          </div>
        ))}
      </div>
    </Card>
  );
}