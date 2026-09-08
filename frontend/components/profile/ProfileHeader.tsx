// components/profile/ProfileHeader.tsx
'use client';

import { User, Settings, Edit2, Save, Loader2, CheckCircle } from 'lucide-react';
import Link from 'next/link';

interface ProfileHeaderProps {
  isEditing: boolean;
  isLoading: boolean;
  isSaved: boolean;
  onEdit: () => void;
  onSave: () => void;
}

export function ProfileHeader({ 
  isEditing, 
  isLoading, 
  isSaved, 
  onEdit, 
  onSave 
}: ProfileHeaderProps) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-blue-100 rounded-xl">
          <User className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Profil</h1>
          <p className="text-gray-500 mt-0.5">
            Gérez vos informations personnelles
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Link
          href="/settings"
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
        >
          <Settings className="h-4 w-4" />
          Paramètres
        </Link>
        {!isEditing ? (
          <button
            onClick={onEdit}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Edit2 className="h-4 w-4" />
            Modifier
          </button>
        ) : (
          <button
            onClick={onSave}
            disabled={isLoading}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
          >
            {isLoading ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : isSaved ? (
              <CheckCircle className="h-4 w-4" />
            ) : (
              <Save className="h-4 w-4" />
            )}
            {isLoading ? 'Enregistrement...' : isSaved ? 'Enregistré !' : 'Enregistrer'}
          </button>
        )}
      </div>
    </div>
  );
}