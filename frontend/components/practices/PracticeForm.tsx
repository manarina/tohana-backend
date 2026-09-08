// components/practices/PracticeForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { X, Loader2 } from 'lucide-react';
import { useMutation } from '@apollo/client/react';
import { CREATE_PRACTICE, UPDATE_PRACTICE } from '@/lib/graphql/mutations/practices.mutations';
import toast from 'react-hot-toast';

interface PracticeFormProps {
  onClose: () => void;
  initialData?: any;
  farms?: any[];
  onSuccess?: () => void;
}

export function PracticeForm({ onClose, initialData, farms = [], onSuccess }: PracticeFormProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    practiceType: 'CULTURE_DE_COUVERTURE',
    specificTechnique: '',
    surface: 0,
    adoptionDate: '',
    description: '',
    perceivedBenefit: '',
    yieldImprovement: 0,
    sourceOfKnowledge: '',
    isStillPracticed: true,
    challenges: '',
    satisfactionRating: 0,
    recommendation: '',
    farmId: farms.length > 0 ? farms[0].id : 0,
  });

  const [createPractice] = useMutation(CREATE_PRACTICE);
  const [updatePractice] = useMutation(UPDATE_PRACTICE);

  useEffect(() => {
    if (initialData) {
      setFormData({
        practiceType: initialData.practiceType || 'CULTURE_DE_COUVERTURE',
        specificTechnique: initialData.specificTechnique || '',
        surface: initialData.surface || 0,
        adoptionDate: initialData.adoptionDate ? initialData.adoptionDate.split('T')[0] : '',
        description: initialData.description || '',
        perceivedBenefit: initialData.perceivedBenefit || '',
        yieldImprovement: initialData.yieldImprovement || 0,
        sourceOfKnowledge: initialData.sourceOfKnowledge || '',
        isStillPracticed: initialData.isStillPracticed !== undefined ? initialData.isStillPracticed : true,
        challenges: initialData.challenges || '',
        satisfactionRating: initialData.satisfactionRating || 0,
        recommendation: initialData.recommendation || '',
        farmId: initialData.farmId || initialData.farm?.id || (farms.length > 0 ? farms[0].id : 0),
      });
    }
  }, [initialData, farms]);

  const practiceTypes = [
    'CULTURE_DE_COUVERTURE', 'AGROFORESTERIE', 'COMPOSTAGE', 'MULCHING',
    'ZAI', 'BANDES_ENHERBEES', 'IRRIGATION_ECONOMIE_EAU', 'AUTRE'
  ];

  const perceivedBenefits = [
    'AMELIORATION_SOL', 'AUGMENTATION_RENDEMENT', 'REDUCTION_EROSION',
    'ECONOMIE_EAU', 'REDUCTION_INTRANTS', 'DIVERSIFICATION_REVENUS',
    'MEILLEURE_ADAPTATION', 'AUTRE'
  ];

  const knowledgeSources = [
    'FORMATION_TOHATRA', 'FORMATION_DEFIS', 'FORMATION_PRADA',
    'VULGARISATION', 'ECHANGE_PAYSAN', 'AUTO_APPRENTISSAGE', 'AUTRE'
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.farmId || formData.farmId === 0) {
      toast.error('Veuillez sélectionner une exploitation');
      return;
    }

    if (!formData.surface || formData.surface <= 0) {
      toast.error('Veuillez entrer une surface valide');
      return;
    }

    if (!formData.adoptionDate) {
      toast.error('Veuillez sélectionner une date d\'adoption');
      return;
    }

    setLoading(true);

    try {
      const input = {
        practiceType: formData.practiceType,
        specificTechnique: formData.specificTechnique || undefined,
        surface: formData.surface,
        adoptionDate: formData.adoptionDate,
        description: formData.description || undefined,
        perceivedBenefit: formData.perceivedBenefit || undefined,
        yieldImprovement: formData.yieldImprovement || 0,
        sourceOfKnowledge: formData.sourceOfKnowledge || undefined,
        isStillPracticed: formData.isStillPracticed,
        challenges: formData.challenges || undefined,
        satisfactionRating: formData.satisfactionRating || 0,
        recommendation: formData.recommendation || undefined,
        farmId: formData.farmId,
      };

      let response;
      
      if (initialData?.id) {
        response = await updatePractice({
          variables: { input: { id: initialData.id, ...input } },
        });
        toast.success('Pratique mise à jour avec succès !');
      } else {
        response = await createPractice({
          variables: { input },
        });
        toast.success('Pratique enregistrée avec succès !');
      }

      if (onSuccess) await onSuccess();
      else onClose();
      
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de l\'enregistrement');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData?.id ? 'Modifier la pratique' : 'Nouvelle pratique'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <X className="h-5 w-5 text-gray-500" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exploitation *</label>
              <select
                value={formData.farmId}
                onChange={(e) => setFormData({...formData, farmId: Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none"
                required
              >
                <option value={0}>Sélectionner une exploitation</option>
                {farms.map((farm) => (
                  <option key={farm.id} value={farm.id}>{farm.name}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Type de pratique *</label>
              <select
                value={formData.practiceType}
                onChange={(e) => setFormData({...formData, practiceType: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                {practiceTypes.map((type) => (
                  <option key={type} value={type}>{type.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Technique spécifique</label>
            <input
              type="text"
              value={formData.specificTechnique}
              onChange={(e) => setFormData({...formData, specificTechnique: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Ex: Mucuna pruriens"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Surface (ha) *</label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.surface}
                onChange={(e) => setFormData({...formData, surface: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date d'adoption *</label>
              <input
                type="date"
                value={formData.adoptionDate}
                onChange={(e) => setFormData({...formData, adoptionDate: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
              placeholder="Description de la pratique..."
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Bénéfice perçu</label>
              <select
                value={formData.perceivedBenefit}
                onChange={(e) => setFormData({...formData, perceivedBenefit: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Non spécifié</option>
                {perceivedBenefits.map((benefit) => (
                  <option key={benefit} value={benefit}>{benefit.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Amélioration rendement (%)</label>
              <input
                type="number"
                step="0.1"
                min="0"
                value={formData.yieldImprovement}
                onChange={(e) => setFormData({...formData, yieldImprovement: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="25.5"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Source de connaissance</label>
              <select
                value={formData.sourceOfKnowledge}
                onChange={(e) => setFormData({...formData, sourceOfKnowledge: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              >
                <option value="">Non spécifiée</option>
                {knowledgeSources.map((source) => (
                  <option key={source} value={source}>{source.replace(/_/g, ' ')}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Satisfaction (/5)</label>
              <input
                type="number"
                step="0.5"
                min="0"
                max="5"
                value={formData.satisfactionRating}
                onChange={(e) => setFormData({...formData, satisfactionRating: parseFloat(e.target.value) || 0})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                placeholder="4.5"
              />
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isStillPracticed"
              checked={formData.isStillPracticed}
              onChange={(e) => setFormData({...formData, isStillPracticed: e.target.checked})}
              className="h-4 w-4 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
            />
            <label htmlFor="isStillPracticed" className="text-sm font-medium text-gray-700">
              Toujours pratiqué
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Défis rencontrés</label>
            <input
              type="text"
              value={formData.challenges}
              onChange={(e) => setFormData({...formData, challenges: e.target.value})}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg"
              placeholder="Défis ou difficultés..."
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Recommandation</label>
            <textarea
              value={formData.recommendation}
              onChange={(e) => setFormData({...formData, recommendation: e.target.value})}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg resize-none"
              placeholder="Recommandations pour d'autres paysans..."
            />
          </div>

          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading || farms.length === 0}
              className="flex-1 px-4 py-2.5 bg-teal-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
              {loading ? 'Enregistrement...' : initialData?.id ? 'Mettre à jour' : 'Enregistrer'}
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