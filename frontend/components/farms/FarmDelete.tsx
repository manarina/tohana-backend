// components/farms/FarmDelete.tsx
'use client';

import { useState } from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface FarmDeleteProps {
  farm: {
    id: number;
    name: string;
  };
  onConfirm: (id: number) => Promise<void>;
  onCancel: () => void;
}

export function FarmDelete({ farm, onConfirm, onCancel }: FarmDeleteProps) {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm(farm.id);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full">
              <AlertTriangle className="h-6 w-6 text-red-600" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900">
              Supprimer l'exploitation
            </h2>
          </div>
          <button
            onClick={onCancel}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <div className="mb-6">
          <p className="text-gray-600">
            Êtes-vous sûr de vouloir supprimer l'exploitation{' '}
            <span className="font-semibold text-gray-900">"{farm.name}"</span> ?
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Cette action est irréversible. Toutes les données associées (parcelles,
            pratiques, récoltes) seront également supprimées.
          </p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Suppression...
              </>
            ) : (
              'Supprimer'
            )}
          </button>
          <button
            onClick={onCancel}
            disabled={loading}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
}