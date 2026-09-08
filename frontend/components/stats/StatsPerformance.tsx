// components/stats/StatsPerformance.tsx
'use client';

import { Users, CheckCircle, Droplet, Award } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StatsPerformanceProps {
  data: {
    totalUsers: number;
    adoptionRate: number;
    irrigationCoverage: number;
    averageYield: number;
  };
}

export function StatsPerformance({ data }: StatsPerformanceProps) {
  const items = [
    {
      label: 'Utilisateurs',
      value: data?.totalUsers || 0,
      icon: Users,
      color: 'text-blue-500',
    },
    {
      label: 'Adoption',
      value: `${data?.adoptionRate || 0}%`,
      icon: CheckCircle,
      color: 'text-green-500',
    },
    {
      label: 'Irrigation',
      value: `${data?.irrigationCoverage || 0}%`,
      icon: Droplet,
      color: 'text-cyan-500',
    },
    {
      label: 'Rendement moyen',
      value: `${data?.averageYield || 0} kg/ha`,
      icon: Award,
      color: 'text-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item) => (
        <Card key={item.label} className="p-4 text-center">
          <div className="flex items-center justify-center gap-2 text-sm text-gray-500 mb-2">
            <item.icon className={`h-4 w-4 ${item.color}`} />
            {item.label}
          </div>
          <p className="text-2xl font-bold text-gray-900">{item.value}</p>
        </Card>
      ))}
    </div>
  );
}