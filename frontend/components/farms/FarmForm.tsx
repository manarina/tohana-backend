// components/farms/FarmForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { useFarmMutations } from '@/hooks/useFarmMutations';
import { useRouter } from 'next/navigation';
import { X, Loader2 } from 'lucide-react';

interface FarmFormProps {
  onClose: () => void;
  initialData?: any;
}

export function FarmForm({ onClose, initialData }: FarmFormProps) {
  const router = useRouter();
  const { createFarm, updateFarm, loading } = useFarmMutations();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    region: 'ATSIMO_ATSINANANA',
    district: '',
    commune: '',
    village: '',
    fokontany: '',
    gpsLatitude: '',
    gpsLongitude: '',
    totalSurface: 0,
    phoneNumber: '',
    farmerGroup: '',
    isBeneficiary: false,
    programAffiliation: 'TOHATRA',
    notes: '',
    userId: 1, // À remplacer par l'ID de l'utilisateur connecté
  });

  // Remplir le formulaire si on est en mode édition
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name || '',
        description: initialData.description || '',
        region: initialData.region || 'ATSIMO_ATSINANANA',
        district: initialData.district || '',
        commune: initialData.commune || '',
        village: initialData.village || '',
        fokontany: initialData.fokontany || '',
        gpsLatitude: initialData.gpsLatitude || '',
        gpsLongitude: initialData.gpsLongitude || '',
        totalSurface: initialData.totalSurface || 0,
        phoneNumber: initialData.phoneNumber || '',
        farmerGroup: initialData.farmerGroup || '',
        isBeneficiary: initialData.isBeneficiary || false,
        programAffiliation: initialData.programAffiliation || 'TOHATRA',
        notes: initialData.notes || '',
        userId: 1,
      });
    }
  }, [initialData]);

  const regions = [
    'ANALAMANGA',
    'BONGOLAVA',
    'ITASY',
    'VAKINANKARATRA',
    'DIANA',
    'SAVA',
    'AMORONI_MANIA',
    'HAUTE_MATSIATRA',
    'VATOVAVY',
    'FITOVINANY',
    'ATSIMO_ATSINANANA',
    'IHOROMBE',
    'SOFIA',
    'BOENY',
    'BETSIBOKA',
    'MELAKY',
    'ALAOTRA_MANGORO',
    'ATSINANANA',
    'ANALANJIROFO',
    'AMBATOSOA',
    'MENABE',
    'ATSIMO_ANDREFANA',
    'ANDROY',
    'ANOSY',
  ];

  const programs = ['TOHATRA', 'DEFIS', 'PRADA', 'AUTRE'];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      if (initialData?.id) {
        await updateFarm({ id: initialData.id, ...formData });
      } else {
        await createFarm(formData);
      }
      onClose();
      router.refresh();
    } catch (error) {
      // L'erreur est déjà gérée dans le hook
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-100 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            {initialData?.id ? 'Modifier l\'exploitation' : 'Nouvelle exploitation'}
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
          {/* Nom */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nom *
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
              required
              disabled={loading}
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              disabled={loading}
            />
          </div>

          {/* Localisation */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Région *
              </label>
              <select
                value={formData.region}
                onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              >
                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                District *
              </label>
              <input
                type="text"
                value={formData.district}
                onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Commune *
              </label>
              <input
                type="text"
                value={formData.commune}
                onChange={(e) => setFormData({ ...formData, commune: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Village *
              </label>
              <input
                type="text"
                value={formData.village}
                onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>
          </div>

          {/* Fokontany et GPS */}
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Fokontany
              </label>
              <input
                type="text"
                value={formData.fokontany}
                onChange={(e) => setFormData({ ...formData, fokontany: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Latitude GPS
              </label>
              <input
                type="text"
                value={formData.gpsLatitude}
                onChange={(e) => setFormData({ ...formData, gpsLatitude: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="-18.1234"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Longitude GPS
              </label>
              <input
                type="text"
                value={formData.gpsLongitude}
                onChange={(e) => setFormData({ ...formData, gpsLongitude: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                placeholder="49.1234"
                disabled={loading}
              />
            </div>
          </div>

          {/* Données agricoles */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Surface (ha) *
              </label>
              <input
                type="number"
                step="0.01"
                min="0"
                value={formData.totalSurface}
                onChange={(e) => setFormData({ ...formData, totalSurface: parseFloat(e.target.value) || 0 })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                required
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Téléphone
              </label>
              <input
                type="tel"
                value={formData.phoneNumber}
                onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Groupe / OP
              </label>
              <input
                type="text"
                value={formData.farmerGroup}
                onChange={(e) => setFormData({ ...formData, farmerGroup: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Programme
              </label>
              <select
                value={formData.programAffiliation}
                onChange={(e) => setFormData({ ...formData, programAffiliation: e.target.value })}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none"
                disabled={loading}
              >
                {programs.map((program) => (
                  <option key={program} value={program}>
                    {program}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Bénéficiaire */}
          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="isBeneficiary"
              checked={formData.isBeneficiary}
              onChange={(e) => setFormData({ ...formData, isBeneficiary: e.target.checked })}
              className="h-4 w-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              disabled={loading}
            />
            <label htmlFor="isBeneficiary" className="text-sm font-medium text-gray-700">
              Bénéficiaire du programme
            </label>
          </div>

          {/* Notes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notes
            </label>
            <textarea
              value={formData.notes}
              onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
              rows={2}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none resize-none"
              disabled={loading}
            />
          </div>

          {/* Boutons */}
          <div className="flex gap-3 pt-4 border-t border-gray-100">
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2.5 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Enregistrement...
                </>
              ) : (
                initialData?.id ? 'Mettre à jour' : 'Créer'
              )}
            </button>
            <button
              type="button"
              onClick={onClose}
              disabled={loading}
              className="px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium disabled:opacity-50"
            >
              Annuler
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}