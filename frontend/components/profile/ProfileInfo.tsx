// components/profile/ProfileInfo.tsx
'use client';

import { Card } from '@/components/ui/Card';

interface ProfileInfoProps {
  profile: {
    name: string;
    email: string;
    phone: string;
    region: string;
    district: string;
    bio: string;
  };
  isEditing: boolean;
  onProfileChange: (field: string, value: string) => void;
}

export function ProfileInfo({ profile, isEditing, onProfileChange }: ProfileInfoProps) {
  return (
    <Card className="p-6">
      <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-4">
        Informations personnelles
      </h3>

      {isEditing ? (
        // Mode édition
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom complet
              </label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => onProfileChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => onProfileChange('email', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => onProfileChange('phone', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="+261 32 XX XXX XX"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Région
              </label>
              <input
                type="text"
                value={profile.region}
                onChange={(e) => onProfileChange('region', e.target.value)}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Biographie
            </label>
            <textarea
              value={profile.bio}
              onChange={(e) => onProfileChange('bio', e.target.value)}
              rows={3}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none"
              placeholder="Parlez-nous de vous..."
            />
          </div>
        </div>
      ) : (
        // Mode affichage
        <div className="space-y-3">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Nom complet</p>
              <p className="text-sm font-medium text-gray-900">{profile.name}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Email</p>
              <p className="text-sm font-medium text-gray-900">{profile.email}</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-xs text-gray-400">Téléphone</p>
              <p className="text-sm font-medium text-gray-900">{profile.phone || 'Non renseigné'}</p>
            </div>
            <div>
              <p className="text-xs text-gray-400">Région</p>
              <p className="text-sm font-medium text-gray-900">{profile.region}</p>
            </div>
          </div>
          <div>
            <p className="text-xs text-gray-400">District</p>
            <p className="text-sm font-medium text-gray-900">{profile.district}</p>
          </div>
          {profile.bio && (
            <div>
              <p className="text-xs text-gray-400">Biographie</p>
              <p className="text-sm text-gray-700 mt-1">{profile.bio}</p>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}