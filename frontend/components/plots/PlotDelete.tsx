// components/plots/PlotDelete.tsx
'use client';

import { useState } from 'react';
import { X, AlertTriangle, Loader2 } from 'lucide-react';

interface PlotDeleteProps {
  plot: { id: number; name: string };
  onConfirm: (id: number) => Promise<void>;
  onCancel: () => void;
}

export function PlotDelete({ plot, onConfirm, onCancel }: PlotDeleteProps) {
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-full"><AlertTriangle className="h-6 w-6 text-red-600" /></div>
            <h2 className="text-xl font-semibold text-gray-900">Supprimer la parcelle</h2>
          </div>
          <button onClick={onCancel} className="p-2 hover:bg-gray-100 rounded-lg"><X className="h-5 w-5 text-gray-500" /></button>
        </div>
        <p className="text-gray-600 mb-2">Êtes-vous sûr de vouloir supprimer <span className="font-semibold">"{plot.name}"</span> ?</p>
        <p className="text-sm text-gray-500 mb-6">Cette action est irréversible.</p>
        <div className="flex gap-3">
          <button onClick={async () => { setLoading(true); await onConfirm(plot.id); setLoading(false); }} disabled={loading} className="flex-1 px-4 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 disabled:opacity-50 font-medium flex items-center justify-center gap-2">
            {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {loading ? 'Suppression...' : 'Supprimer'}
          </button>
          <button onClick={onCancel} className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 font-medium">Annuler</button>
        </div>
      </div>
    </div>
  );
}