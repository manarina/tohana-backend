// components/profile/ProfileStats.tsx
'use client';

import { Building2, MapPin, Leaf, Package } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ProfileStatsProps {
  stats: {
    farms: number;
    plots: number;
    practices: number;
    harvests: number;
  };
}

export function ProfileStats({ stats }: ProfileStatsProps) {
  const items = [
    { 
      label: 'Exploitations', 
      value: stats.farms, 
      icon: Building2, 
      color: 'text-blue-600', 
      bg: 'bg-blue-50' 
    },
    { 
      label: 'Parcelles', 
      value: stats.plots, 
      icon: MapPin, 
      color: 'text-green-600', 
      bg: 'bg-green-50' 
    },
    { 
      label: 'Pratiques', 
      value: stats.practices, 
      icon: Leaf, 
      color: 'text-purple-600', 
      bg: 'bg-purple-50' 
    },
    { 
      label: 'Récoltes', 
      value: stats.harvests, 
      icon: Package, 
      color: 'text-amber-600', 
      bg: 'bg-amber-50' 
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
        Statistiques
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {items.map((item) => (
          <div key={item.label} className={`text-center p-3 ${item.bg} rounded-lg`}>
            <item.icon className={`h-5 w-5 ${item.color} mx-auto`} />
            <p className="text-2xl font-bold text-gray-900 mt-1">{item.value}</p>
            <p className="text-xs text-gray-500">{item.label}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}