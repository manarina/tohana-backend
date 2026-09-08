// components/profile/ProfileCard.tsx
'use client';

import { Mail, Phone, MapPin, Calendar, Camera } from 'lucide-react';
import { Card } from '@/components/ui/Card';

interface ProfileCardProps {
  name: string;
  email: string;
  phone: string;
  role: string;
  region: string;
  joinedDate: string;
  roleInfo: { label: string; color: string };
  getInitials: () => string;
  formatDate: (date: string) => string;
}

export function ProfileCard({ 
  name, 
  email, 
  phone, 
  role, 
  region, 
  joinedDate, 
  roleInfo, 
  getInitials, 
  formatDate 
}: ProfileCardProps) {
  return (
    <Card className="p-6 text-center">
      {/* Avatar */}
      <div className="relative inline-block">
        <div className="h-24 w-24 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mx-auto shadow-lg">
          {getInitials()}
        </div>
        <button
          className="absolute bottom-0 right-0 p-1.5 bg-white rounded-full shadow-md hover:bg-gray-50 transition-colors border border-gray-200"
          title="Changer la photo"
        >
          <Camera className="h-4 w-4 text-gray-600" />
        </button>
      </div>

      {/* Nom et rôle */}
      <h2 className="mt-4 text-xl font-semibold text-gray-900">{name}</h2>
      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${roleInfo.color}`}>
        {roleInfo.label}
      </span>

      {/* Email */}
      <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-500">
        <Mail className="h-4 w-4" />
        <span>{email}</span>
      </div>

      {/* Téléphone */}
      {phone && (
        <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-500">
          <Phone className="h-4 w-4" />
          <span>{phone}</span>
        </div>
      )}

      {/* Localisation */}
      <div className="mt-1 flex items-center justify-center gap-2 text-sm text-gray-500">
        <MapPin className="h-4 w-4" />
        <span>{region}</span>
      </div>

      {/* Date d'adhésion */}
      <div className="mt-3 pt-3 border-t border-gray-100">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
          <Calendar className="h-3.5 w-3.5" />
          <span>Membre depuis {formatDate(joinedDate)}</span>
        </div>
      </div>
    </Card>
  );
}