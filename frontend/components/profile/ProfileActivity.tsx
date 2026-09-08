// components/profile/ProfileActivity.tsx
'use client';

import { CheckCircle, MapPin, Leaf, Calendar, Clock } from 'lucide-react';
import { Card } from '@/components/ui/Card';

export function ProfileActivity() {
  const activities = [
    {
      icon: CheckCircle,
      title: 'Nouvelle exploitation ajoutée',
      date: 'Il y a 2 jours',
      color: 'text-green-600',
      bg: 'bg-green-100',
    },
    {
      icon: MapPin,
      title: 'Parcelle créée',
      date: 'Il y a 5 jours',
      color: 'text-blue-600',
      bg: 'bg-blue-100',
    },
    {
      icon: Leaf,
      title: 'Pratique résiliente ajoutée',
      date: 'Il y a 1 semaine',
      color: 'text-purple-600',
      bg: 'bg-purple-100',
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
        Activité récente
      </h3>
      <div className="space-y-3">
        {activities.map((activity, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
            <div className={`p-1.5 ${activity.bg} rounded-lg`}>
              <activity.icon className={`h-4 w-4 ${activity.color}`} />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-900">{activity.title}</p>
              <p className="text-xs text-gray-400 flex items-center gap-1">
                <Clock className="h-3 w-3" />
                {activity.date}
              </p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}