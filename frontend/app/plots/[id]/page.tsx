// app/plots/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/common/Layout';
import { useQuery } from '@apollo/client/react';
import { GET_PLOT } from '@/lib/graphql/queries/plots.queries';
import { 
  MapPin, 
  Ruler, 
  Sprout, 
  Calendar, 
  ArrowLeft,
  Edit2,
  Trash2,
  Loader2,
  Droplet,
  Award,
  Clock,
  Leaf,
  Package
} from 'lucide-react';
import { useState } from 'react';
import { PlotForm } from '@/components/plots/PlotForm';
import { PlotDelete } from '@/components/plots/PlotDelete';
import { useMutation } from '@apollo/client/react';
import { DELETE_PLOT } from '@/lib/graphql/mutations/plots.mutations';
import toast from 'react-hot-toast';
import Link from 'next/link';

// ============================================================
// TYPES
// ============================================================

interface PlotData {
  id: number;
  name: string;
  cropType: string;
  description?: string;
  cropVariety?: string;
  surface: number;
  expectedYield?: number;
  actualYield?: number;
  irrigationType?: string;
  soilType?: string;
  slope?: number;
  plantingDate?: string;
  harvestDate?: string;
  notes?: string;
  farm?: {
    id: number;
    name: string;
    user?: {
      id: number;
      name: string;
      email: string;
    };
  };
}

interface PlotQueryData {
  plot: PlotData;
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function PlotDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const { data, loading, error, refetch } = useQuery<PlotQueryData>(GET_PLOT, {
    variables: { id },
    skip: !id,
  });

  const [deletePlot] = useMutation(DELETE_PLOT);

  const plot = data?.plot;

  const handleBack = () => {
    router.push('/plots');
  };

  const handleDelete = async () => {
    try {
      await deletePlot({ variables: { id } });
      toast.success('Parcelle supprimée avec succès !');
      router.push('/plots');
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression');
    }
  };

  const handleFormClose = () => {
    setIsEditOpen(false);
    refetch();
  };

  // ============================================================
  // HELPERS
  // ============================================================

  const getCropIcon = (cropType: string) => {
    const icons: Record<string, string> = {
      RIZ: '🌾',
      MANIOC: '🌿',
      MAIS: '🌽',
      LEGUMINEUSES: '🫘',
      PATATE_DOUCE: '🍠',
      VANILLE: '🌱',
      CAFE: '☕',
      AUTRE: '🌿',
    };
    return icons[cropType] || icons['AUTRE'];
  };

  const getCropColor = (cropType: string) => {
    const colors: Record<string, string> = {
      RIZ: 'bg-green-100 text-green-800',
      MANIOC: 'bg-yellow-100 text-yellow-800',
      MAIS: 'bg-blue-100 text-blue-800',
      LEGUMINEUSES: 'bg-purple-100 text-purple-800',
      PATATE_DOUCE: 'bg-orange-100 text-orange-800',
      VANILLE: 'bg-emerald-100 text-emerald-800',
      CAFE: 'bg-amber-100 text-amber-800',
      AUTRE: 'bg-gray-100 text-gray-800',
    };
    return colors[cropType] || colors['AUTRE'];
  };

  const getIrrigationLabel = (type?: string) => {
    const labels: Record<string, string> = {
      GOUTTE_A_GOUTTE: 'Goutte-à-goutte',
      CANAUX: 'Canaux d\'irrigation',
      PLUIE: 'Pluie',
      BASSINE: 'Bassine',
    };
    return labels[type || ''] || 'Non spécifié';
  };

  const getSoilLabel = (type?: string) => {
    const labels: Record<string, string> = {
      SABLEUX: 'Sableux',
      ARGILEUX: 'Argileux',
      LIMON: 'Limon',
      HUMIFERE: 'Humifère',
    };
    return labels[type || ''] || 'Non spécifié';
  };

  const formatDate = (date?: string) => {
    if (!date) return 'Non définie';
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    });
  };

  // ============================================================
  // RENDU
  // ============================================================

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
            <p className="mt-4 text-gray-500">Chargement de la parcelle...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !plot) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
          <p className="text-red-600 mt-1">{error?.message || 'Parcelle non trouvée'}</p>
          <button onClick={handleBack} className="mt-4 btn-primary">
            Retour à la liste
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* ====================================================
            EN-TÊTE
        ==================================================== */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <button
            onClick={handleBack}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="h-5 w-5" />
            Retour à la liste
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsEditOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Edit2 className="h-4 w-4" />
              Modifier
            </button>
            <button
              onClick={() => setIsDeleteOpen(true)}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
              Supprimer
            </button>
          </div>
        </div>

        {/* ====================================================
            INFORMATIONS PRINCIPALES
        ==================================================== */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* En-tête avec dégradé */}
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl text-4xl">
                {getCropIcon(plot.cropType)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{plot.name}</h1>
                <p className="text-green-100 mt-1">ID: #{String(plot.id).padStart(3, '0')}</p>
              </div>
            </div>
          </div>

          {/* Corps */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Description */}
              {plot.description && (
                <div className="col-span-full">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-700">{plot.description}</p>
                </div>
              )}

              {/* Culture */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Culture</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Sprout className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{plot.cropType}</span>
                    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${getCropColor(plot.cropType)}`}>
                      {plot.cropType}
                    </span>
                  </div>
                  {plot.cropVariety && (
                    <div className="flex items-center gap-2 ml-6 text-sm text-gray-500">
                      <span>Variété: {plot.cropVariety}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Surface et rendement */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Données agricoles</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{plot.surface} hectares</span>
                  </div>
                  {plot.expectedYield && (
                    <div className="flex items-center gap-2">
                      <Award className="h-4 w-4 text-amber-400" />
                      <span className="text-gray-700">Rendement attendu: {plot.expectedYield} kg/ha</span>
                    </div>
                  )}
                  {plot.actualYield && (
                    <div className="flex items-center gap-2">
                      <Package className="h-4 w-4 text-green-500" />
                      <span className="text-gray-700">Rendement réel: {plot.actualYield} kg/ha</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Irrigation et sol */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Irrigation & Sol</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Droplet className="h-4 w-4 text-blue-400" />
                    <span className="text-gray-700">{getIrrigationLabel(plot.irrigationType)}</span>
                  </div>
                  {plot.soilType && (
                    <div className="flex items-center gap-2">
                      <Leaf className="h-4 w-4 text-amber-400" />
                      <span className="text-gray-700">Sol: {getSoilLabel(plot.soilType)}</span>
                    </div>
                  )}
                  {plot.slope && (
                    <div className="flex items-center gap-2 ml-6 text-sm text-gray-500">
                      <span>Pente: {plot.slope}%</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Dates */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Dates</h3>
                <div className="space-y-2">
                  {plot.plantingDate && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">Plantation: {formatDate(plot.plantingDate)}</span>
                    </div>
                  )}
                  {plot.harvestDate && (
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">Récolte: {formatDate(plot.harvestDate)}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Exploitation */}
              {plot.farm && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Exploitation</h3>
                  <Link
                    href={`/farms/${plot.farm.id}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    <MapPin className="h-4 w-4" />
                    <span>{plot.farm.name}</span>
                  </Link>
                </div>
              )}

              {/* Notes */}
              {plot.notes && (
                <div className="col-span-full">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{plot.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ====================================================
            MODALS
        ==================================================== */}
        {isEditOpen && (
          <PlotForm
            onClose={handleFormClose}
            initialData={plot}
            farms={[{ id: plot.farm?.id || 0, name: plot.farm?.name || 'Exploitation' }]}
          />
        )}

        {isDeleteOpen && (
          <PlotDelete
            plot={{ id: plot.id, name: plot.name }}
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
}