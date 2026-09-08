// components/stats/StatsCards.tsx
'use client';

import { Package, Building2, MapPin, Leaf } from 'lucide-react';
import { StatCard } from './StatCard';

interface StatsCardsProps {
  data: {
    totalProduction: number;
    totalHarvests: number;
    totalFarms: number;
    womenFarmers: number;
    totalPlots: number;
    totalSurface: number;
    totalPractices: number;
    practiceAdoptionRate: number;
  };
}

export function StatsCards({ data }: StatsCardsProps) {
  const cards = [
    {
      title: 'Production totale',
      value: `${data?.totalProduction || 0} kg`,
      subtitle: `${data?.totalHarvests || 0} récoltes`,
      icon: <Package className="h-6 w-6 text-white" />,
      color: 'bg-green-500',
    },
    {
      title: 'Exploitations',
      value: data?.totalFarms || 0,
      subtitle: `${data?.womenFarmers || 0} femmes agricultrices`,
      icon: <Building2 className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
    },
    {
      title: 'Parcelles',
      value: data?.totalPlots || 0,
      subtitle: `${data?.totalSurface || 0} ha total`,
      icon: <MapPin className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
    },
    {
      title: 'Pratiques résilientes',
      value: data?.totalPractices || 0,
      subtitle: `${data?.practiceAdoptionRate || 0}% adoption`,
      icon: <Leaf className="h-6 w-6 text-white" />,
      color: 'bg-amber-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <StatCard key={index} {...card} />
      ))}
    </div>
  );
}