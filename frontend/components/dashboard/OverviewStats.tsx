// components/dashboard/OverviewStats.tsx
'use client';

import { Card } from '@/components/ui/Card';
import { 
  Building2, 
  MapPin, 
  Ruler, 
  Package, 
  Leaf, 
  Users, 
  TrendingUp,
  User 
} from 'lucide-react';

interface OverviewStatsProps {
  data: {
    totalFarms: number;
    totalPlots: number;
    totalSurface: number;
    totalHarvests: number;
    totalProduction: number;
    totalPractices: number;
    practiceAdoptionRate: number;
    totalUsers: number;
    womenFarmers: number;
  };
}

export function OverviewStats({ data }: OverviewStatsProps) {
  const stats = [
    {
      label: 'Exploitations',
      value: data.totalFarms,
      icon: Building2,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      label: 'Parcelles',
      value: data.totalPlots,
      icon: MapPin,
      color: 'text-green-600',
      bg: 'bg-green-50',
    },
    {
      label: 'Surface totale',
      value: `${data.totalSurface.toFixed(1)} ha`,
      icon: Ruler,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      label: 'Récoltes',
      value: data.totalHarvests,
      icon: Package,
      color: 'text-yellow-600',
      bg: 'bg-yellow-50',
    },
    {
      label: 'Production totale',
      value: `${data.totalProduction.toFixed(1)} kg`,
      icon: Leaf,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      label: 'Pratiques résilientes',
      value: data.totalPractices,
      icon: TrendingUp,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
    },
    {
      label: "Taux d'adoption",
      value: `${data.practiceAdoptionRate.toFixed(1)}%`,
      icon: Leaf,
      color: 'text-teal-600',
      bg: 'bg-teal-50',
    },
    {
      label: 'Utilisateurs',
      value: data.totalUsers,
      icon: Users,
      color: 'text-pink-600',
      bg: 'bg-pink-50',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {stats.map((stat, index) => (
        <Card key={index} className="p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">{stat.label}</p>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
            </div>
            <div className={`p-3 rounded-lg ${stat.bg}`}>
              <stat.icon className={`h-6 w-6 ${stat.color}`} />
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}