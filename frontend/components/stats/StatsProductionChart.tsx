// components/stats/StatsProductionChart.tsx
'use client';

import { useState } from 'react';
import { TrendingUp, LineChart as LineChartIcon, BarChart as BarChartIcon, AreaChart as AreaChartIcon } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface StatsProductionChartProps {
  data: Array<{ month: string; production: number }>;
}

export function StatsProductionChart({ data }: StatsProductionChartProps) {
  const [chartType, setChartType] = useState<'line' | 'bar' | 'area'>('line');

  if (!data.length) {
    return (
      <Card className="p-6">
        <div className="flex items-center justify-center h-[300px] text-gray-400">
          <div className="text-center">
            <TrendingUp className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p>Aucune donnée de production disponible</p>
          </div>
        </div>
      </Card>
    );
  }

  const renderChart = () => {
    const ChartComponent = chartType === 'line' ? LineChart : chartType === 'bar' ? BarChart : AreaChart;
    const DataComponent = chartType === 'line' ? Line : chartType === 'bar' ? Bar : Area;

    return (
      <ChartComponent data={data}>
        <defs>
          <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
            <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
        <XAxis dataKey="month" stroke="#9ca3af" tick={{ fontSize: 12 }} />
        <YAxis stroke="#9ca3af" tick={{ fontSize: 12 }} />
        <Tooltip
          contentStyle={{
            backgroundColor: 'white',
            borderRadius: '12px',
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
          }}
        />
        <Legend />
        {chartType === 'line' ? (
          <Line type="monotone" dataKey="production" stroke="#22c55e" strokeWidth={3} dot={{ r: 4 }} name="Production (kg)" />
        ) : chartType === 'bar' ? (
          <Bar dataKey="production" fill="#22c55e" radius={[4, 4, 0, 0]} name="Production (kg)" />
        ) : (
          <Area type="monotone" dataKey="production" stroke="#22c55e" strokeWidth={2} fill="url(#productionGradient)" name="Production (kg)" />
        )}
      </ChartComponent>
    );
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-green-500" />
          <h3 className="text-lg font-semibold text-gray-900">Production</h3>
        </div>
        <div className="flex bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setChartType('line')}
            className={`p-1.5 rounded-md transition-all ${chartType === 'line' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
          >
            <LineChartIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setChartType('bar')}
            className={`p-1.5 rounded-md transition-all ${chartType === 'bar' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
          >
            <BarChartIcon className="h-4 w-4" />
          </button>
          <button
            onClick={() => setChartType('area')}
            className={`p-1.5 rounded-md transition-all ${chartType === 'area' ? 'bg-white shadow-sm text-blue-600' : 'text-gray-400'}`}
          >
            <AreaChartIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </Card>
  );
}