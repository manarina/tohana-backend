// components/harvests/HarvestForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Loader2, Calendar, Package, DollarSign } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { CREATE_HARVEST, UPDATE_HARVEST } from '@/lib/graphql/mutations/harvests.mutations';
import toast from 'react-hot-toast';

interface HarvestFormProps {
  onClose: () => void;
  initialData?: any;
  plots?: any[];
  onSuccess?: () => void;
}

export function HarvestForm({ onClose, initialData, plots = [], onSuccess }: HarvestFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    season: 'SAISON_DES_PLUIES',
    harvestDate: '',
    quantity: 0,
    unit: 'KG',
    quality: '',
    salePrice: 0,
    buyer: '',
    notes: '',
    plotId: plots.length > 0 ? plots[0].id : 0,
  });

  // Mutations
  const [createHarvest] = useMutation(CREATE_HARVEST);
  const [updateHarvest] = useMutation(UPDATE_HARVEST);

  useEffect(() => {
    if (initialData) {
      setFormData({
        season: initialData.season || 'SAISON_DES_PLUIES',
        harvestDate: initialData.harvestDate ? initialData.harvestDate.split('T')[0] : '',
        quantity: initialData.quantity || 0,
        unit: initialData.unit || 'KG',
        quality: initialData.quality || '',
        salePrice: initialData.salePrice || 0,
        buyer: initialData.buyer || '',
        notes: initialData.notes || '',
        plotId: initialData.plotId || initialData.plot?.id || (plots.length > 0 ? plots[0].id : 0),
      });
    }
  }, [initialData, plots]);

  const seasons = ['SAISON_DES_PLUIES', 'SAISON_SECHE', 'HORS_SAISON'];
  const units = ['KG', 'TONNES', 'SACS'];
  const qualities = ['PREMIUM', 'STANDARD', 'BASIQUE'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.plotId || formData.plotId === 0) {
      toast.error('Veuillez sélectionner une parcelle');
      return;
    }

    if (!formData.harvestDate) {
      toast.error('Veuillez sélectionner une date de récolte');
      return;
    }

    if (!formData.quantity || formData.quantity <= 0) {
      toast.error('Veuillez entrer une quantité valide');
      return;
    }

    setLoading(true);

    try {
      // ✅ Préparer les données pour la mutation
      const input = {
        season: formData.season,
        harvestDate: formData.harvestDate,
        quantity: formData.quantity,
        unit: formData.unit,
        quality: formData.quality || undefined,
        salePrice: formData.salePrice || 0,
        buyer: formData.buyer || undefined,
        notes: formData.notes || undefined,
        plotId: formData.plotId,
      };

      let response;
      
      if (initialData?.id) {
        // ✅ Mode édition : UPDATE
        response = await updateHarvest({
          variables: {
            input: {
              id: initialData.id,
              ...input,
            },
          },
        });
        toast.success('Récolte mise à jour avec succès !');
      } else {
        // ✅ Mode création : CREATE
        response = await createHarvest({
          variables: { input },
        });
        toast.success('Récolte enregistrée avec succès !');
      }

      // ✅ Fermer le modal et rafraîchir les données
      if (onSuccess) onSuccess();
      onClose();
      
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData?.id ? 'Modifier la récolte' : 'Nouvelle récolte'}
          </h2>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            disabled={loading}
          >
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Parcelle *</label>
              <select
                value={formData.plotId}
                onChange={(e) => handleInputChange('plotId', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              >
                <option value={0}>Sélectionner une parcelle</option>
                {plots.map((plot) => (
                  <option key={plot.id} value={plot.id}>
                    {plot.name} ({plot.cropType}) - {plot.farm?.name || ''}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Saison *</label>
              <select
                value={formData.season}
                onChange={(e) => handleInputChange('season', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                disabled={loading}
              >
                {seasons.map((season) => (
                  <option key={season} value={season}>{season.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date de récolte *</label>
              <input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unité</label>
              <select
                value={formData.unit}
                onChange={(e) => handleInputChange('unit', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                disabled={loading}
              >
                {units.map((unit) => <option key={unit} value={unit}>{unit}</option>)}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Quantité *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Qualité</label>
              <select
                value={formData.quality}
                onChange={(e) => handleInputChange('quality', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                disabled={loading}
              >
                <option value="">Non spécifié</option>
                {qualities.map((q) => <option key={q} value={q}>{q}</option>)}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Prix de vente (Ar/kg)</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.salePrice}
                onChange={(e) => handleInputChange('salePrice', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                disabled={loading}
                placeholder="0"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Acheteur</label>
            <input
              type="text"
              value={formData.buyer}
              onChange={(e) => handleInputChange('buyer', e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none"
              disabled={loading}
              placeholder="Nom de l'acheteur ou coopérative"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none resize-none"
              disabled={loading}
              placeholder="Informations complémentaires..."
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading || plots.length === 0}
              className="flex-1 px-4 py-2.5 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {initialData?.id ? 'Mise à jour...' : 'Enregistrement...'}
                </>
              ) : (
                initialData?.id ? 'Mettre à jour' : 'Enregistrer'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}