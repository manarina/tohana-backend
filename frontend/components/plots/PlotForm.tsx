// components/plots/PlotForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { CREATE_PLOT, UPDATE_PLOT } from '@/lib/graphql/mutations/plots.mutations';
import toast from 'react-hot-toast';

interface PlotFormProps {
  onClose: () => void;
  initialData?: any;
  farms?: any[];
  onSuccess?: () => void;
}

export function PlotForm({ onClose, initialData, farms = [], onSuccess }: PlotFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    cropType: 'RIZ',
    cropVariety: '',
    surface: 0,
    plantingDate: '',
    harvestDate: '',
    irrigationType: 'PLUIE',
    soilType: '',
    slope: 0,
    expectedYield: 0,
    actualYield: 0,
    notes: '',
    farmId: farms.length > 0 ? farms[0].id : 0,
  });

  // ✅ Mutations
  const [createPlot] = useMutation(CREATE_PLOT);
  const [updatePlot] = useMutation(UPDATE_PLOT);

  // ============================================================
  // INITIALISATION DU FORMULAIRE
  // ============================================================

  useEffect(() => {
    if (initialData) {
      const farmId = initialData.farmId || initialData.farm?.id || (farms.length > 0 ? farms[0].id : 0);

      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        cropType: initialData.cropType || 'RIZ',
        cropVariety: initialData.cropVariety || '',
        surface: initialData.surface || 0,
        plantingDate: initialData.plantingDate ? initialData.plantingDate.split('T')[0] : '',
        harvestDate: initialData.harvestDate ? initialData.harvestDate.split('T')[0] : '',
        irrigationType: initialData.irrigationType || 'PLUIE',
        soilType: initialData.soilType || '',
        slope: initialData.slope || 0,
        expectedYield: initialData.expectedYield || 0,
        actualYield: initialData.actualYield || 0,
        notes: initialData.notes || '',
        farmId: farmId,
      });
    } else if (farms.length > 0) {
      setFormData(prev => ({
        ...prev,
        farmId: farms[0].id,
      }));
    }
  }, [initialData, farms]);

  // ============================================================
  // CONSTANTES
  // ============================================================

  const cropTypes = [
    'RIZ', 'MANIOC', 'MAIS', 'LEGUMINEUSES', 
    'PATATE_DOUCE', 'VANILLE', 'CAFE', 'GIROFLE', 
    'POIVRE', 'ARACHIDE', 'AUTRE'
  ];

  const irrigationTypes = ['GOUTTE_A_GOUTTE', 'CANAUX', 'PLUIE', 'BASSINE'];
  const soilTypes = ['SABLEUX', 'ARGILEUX', 'LIMON', 'HUMIFERE'];

  // ============================================================
  // HANDLERS
  // ============================================================

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.farmId || formData.farmId === 0) {
      toast.error('Veuillez sélectionner une exploitation');
      return;
    }

    if (!formData.name.trim()) {
      toast.error('Veuillez entrer un nom');
      return;
    }

    if (!formData.surface || formData.surface <= 0) {
      toast.error('Veuillez entrer une surface valide');
      return;
    }

    setLoading(true);

    try {
      // ✅ Préparer les données pour la mutation
      const input = {
        name: formData.name,
        description: formData.description || undefined,
        cropType: formData.cropType,
        cropVariety: formData.cropVariety || undefined,
        surface: formData.surface,
        plantingDate: formData.plantingDate || undefined,
        harvestDate: formData.harvestDate || undefined,
        irrigationType: formData.irrigationType || undefined,
        soilType: formData.soilType || undefined,
        slope: formData.slope || 0,
        expectedYield: formData.expectedYield || 0,
        actualYield: formData.actualYield || 0,
        notes: formData.notes || undefined,
        farmId: formData.farmId,
      };

      let response;
      
      if (initialData?.id) {
        // ✅ Mode édition : UPDATE
        response = await updatePlot({
          variables: {
            input: {
              id: initialData.id,
              ...input,
            },
          },
        });
        toast.success('Parcelle mise à jour avec succès !');
        console.log('✅ Update response:', response.data);
      } else {
        // ✅ Mode création : CREATE
        response = await createPlot({
          variables: { input },
        });
        toast.success('Parcelle créée avec succès !');
        console.log('✅ Create response:', response.data);
      }

      // ✅ Fermer le modal et rafraîchir les données
      if (onSuccess) {
        await onSuccess();
      } else {
        onClose();
      }
      
    } catch (error: any) {
      console.error('❌ Mutation error:', error);
      toast.error(error.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ============================================================
  // RENDU
  // ============================================================

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData?.id ? 'Modifier la parcelle' : 'Nouvelle parcelle'}
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
          {/* Nom et Exploitation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Nom *
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exploitation *
              </label>
              <select
                value={formData.farmId}
                onChange={(e) => handleInputChange('farmId', Number(e.target.value))}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
                disabled={loading || farms.length === 0}
              >
                <option value={0}>Sélectionner une exploitation</option>
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>
                    {farm.name}
                  </option>
                ))}
              </select>
              {farms.length === 0 && (
                <p className="text-xs text-amber-600 mt-1">
                  ⚠️ Aucune exploitation disponible.
                </p>
              )}
            </div>
          </div>

          {/* Culture et Variété */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Culture *
              </label>
              <select
                value={formData.cropType}
                onChange={(e) => handleInputChange('cropType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              >
                {cropTypes.map((crop) => (
                  <option key={crop} value={crop}>{crop}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Variété
              </label>
              <input
                type="text"
                value={formData.cropVariety}
                onChange={(e) => handleInputChange('cropVariety', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
                placeholder="Ex: Riz 242"
              />
            </div>
          </div>

          {/* Surface et Rendements */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Surface (ha) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.surface}
                onChange={(e) => handleInputChange('surface', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rendement attendu
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.expectedYield}
                onChange={(e) => handleInputChange('expectedYield', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                disabled={loading}
                placeholder="kg/ha"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Rendement réel
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.actualYield}
                onChange={(e) => handleInputChange('actualYield', parseFloat(e.target.value) || 0)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                disabled={loading}
                placeholder="kg/ha"
              />
            </div>
          </div>

          {/* Irrigation et Sol */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Irrigation
              </label>
              <select
                value={formData.irrigationType}
                onChange={(e) => handleInputChange('irrigationType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              >
                {irrigationTypes.map((type) => (
                  <option key={type} value={type}>
                    {type.replace(/_/g, ' ')}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Type de sol
              </label>
              <select
                value={formData.soilType}
                onChange={(e) => handleInputChange('soilType', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              >
                <option value="">Non spécifié</option>
                {soilTypes.map((type) => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Dates */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de plantation
              </label>
              <input
                type="date"
                value={formData.plantingDate}
                onChange={(e) => handleInputChange('plantingDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Date de récolte
              </label>
              <input
                type="date"
                value={formData.harvestDate}
                onChange={(e) => handleInputChange('harvestDate', e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                disabled={loading}
              />
            </div>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => handleInputChange('notes', e.target.value)}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              disabled={loading}
              placeholder="Informations complémentaires..."
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading || farms.length === 0}
              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  {initialData?.id ? 'Mise à jour...' : 'Création...'}
                </>
              ) : (
                initialData?.id ? 'Mettre à jour' : 'Créer'
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