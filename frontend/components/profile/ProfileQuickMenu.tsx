// components/profile/ProfileQuickMenu.tsx
'use client';

import { Settings, Shield, Bell } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';

export function ProfileQuickMenu() {
  return (
    <Card className="p-4 mt-4">
      <div className="space-y-1">
        <Link
          href="/settings"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Settings className="h-4 w-4" />
          <span className="text-sm">Paramètres</span>
        </Link>
        <Link
          href="/settings?tab=security"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Shield className="h-4 w-4" />
          <span className="text-sm">Sécurité</span>
        </Link>
        <Link
          href="/settings?tab=notifications"
          className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Bell className="h-4 w-4" />
          <span className="text-sm">Notifications</span>
        </Link>
      </div>
    </Card>
  );
}