// components/stats/StatsResilience.tsx
'use client';

import { Shield } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface StatsResilienceProps {
  data: {
    adoptionRate: number;
    averageYieldImprovement: number;
    stillPracticedRate: number;
    topPractices: string[];
  };
}

export function StatsResilience({ data }: StatsResilienceProps) {
  return (
    <Card className="p-6">
      <div className="flex items-center gap-2 mb-4">
        <Shield className="h-5 w-5 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900">Résilience agricole</h3>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-3 bg-purple-50 rounded-lg text-center">
            <p className="text-xs text-purple-600 font-medium">Taux d'adoption</p>
            <p className="text-2xl font-bold text-purple-700">{data?.adoptionRate || 0}%</p>
          </div>
          <div className="p-3 bg-green-50 rounded-lg text-center">
            <p className="text-xs text-green-600 font-medium">Amélioration rendement</p>
            <p className="text-2xl font-bold text-green-700">+{data?.averageYieldImprovement || 0}%</p>
          </div>
        </div>
        <div>
          <p className="text-sm text-gray-500 mb-2">Top pratiques</p>
          <div className="flex flex-wrap gap-2">
            {data?.topPractices?.length > 0 ? (
              data.topPractices.map((practice: string) => (
                <span key={practice} className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                  {practice.replace(/_/g, ' ')}
                </span>
              ))
            ) : (
              <span className="text-gray-400">Aucune pratique</span>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}