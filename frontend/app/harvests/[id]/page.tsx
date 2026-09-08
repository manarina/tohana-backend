// app/harvests/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/common/Layout';
import { useQuery } from '@apollo/client/react';
import { GET_HARVEST } from '@/lib/graphql/queries/harvests.queries';
import { 
  Package, 
  Calendar, 
  ArrowLeft,
  Edit2,
  Trash2,
  Loader2,
  TrendingUp,
  DollarSign,
  MapPin,
  Award,
  Clock,
  User,
  Building2,
  Ruler,
  Leaf
} from 'lucide-react';
import { useState } from 'react';
import { HarvestForm } from '@/components/harvests/HarvestForm';
import { HarvestDelete } from '@/components/harvests/HarvestDelete';
import { useMutation } from '@apollo/client/react';
import { DELETE_HARVEST } from '@/lib/graphql/mutations/harvests.mutations';
import toast from 'react-hot-toast';
import Link from 'next/link';

// ============================================================
// TYPES
// ============================================================

interface HarvestData {
  id: number;
  season: string;
  harvestDate: string;
  quantity: number;
  unit?: string;
  quality?: string;
  salePrice?: number;
  yieldPerHectare?: number;
  totalRevenue?: number;
  buyer?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  plot?: {
    id: number;
    name: string;
    cropType: string;
    surface: number;
    farm?: {
      id: number;
      name: string;
      user?: {
        id: number;
        name: string;
        email: string;
      };
    };
  };
}

interface HarvestQueryData {
  harvest: HarvestData;
}

// ============================================================
// COMPOSANT PRINCIPAL
// ============================================================

export default function HarvestDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const { data, loading, error, refetch } = useQuery<HarvestQueryData>(GET_HARVEST, {
    variables: { id },
    skip: !id,
  });

  const [deleteHarvest] = useMutation(DELETE_HARVEST);

  const harvest = data?.harvest;

  const handleBack = () => {
    router.push('/harvests');
  };

  const handleDelete = async () => {
    try {
      await deleteHarvest({ variables: { id } });
      toast.success('Récolte supprimée avec succès !');
      router.push('/harvests');
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

  const getSeasonColor = (season: string) => {
    const colors: Record<string, string> = {
      SAISON_DES_PLUIES: 'bg-blue-100 text-blue-800 border-blue-200',
      SAISON_SECHE: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      HORS_SAISON: 'bg-purple-100 text-purple-800 border-purple-200',
    };
    return colors[season] || 'bg-gray-100 text-gray-800 border-gray-200';
  };

  const getSeasonIcon = (season: string) => {
    const icons: Record<string, string> = {
      SAISON_DES_PLUIES: '🌧️',
      SAISON_SECHE: '☀️',
      HORS_SAISON: '🌿',
    };
    return icons[season] || '🌾';
  };

  const getQualityColor = (quality?: string) => {
    const colors: Record<string, string> = {
      PREMIUM: 'bg-amber-100 text-amber-800',
      STANDARD: 'bg-blue-100 text-blue-800',
      BASIQUE: 'bg-gray-100 text-gray-800',
    };
    return colors[quality || ''] || 'bg-gray-100 text-gray-800';
  };

  const getQualityLabel = (quality?: string) => {
    const labels: Record<string, string> = {
      PREMIUM: 'Premium',
      STANDARD: 'Standard',
      BASIQUE: 'Basique',
    };
    return labels[quality || ''] || 'Non spécifié';
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
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
            <Loader2 className="h-12 w-12 animate-spin text-amber-600 mx-auto" />
            <p className="mt-4 text-gray-500">Chargement de la récolte...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !harvest) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
          <p className="text-red-600 mt-1">{error?.message || 'Récolte non trouvée'}</p>
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
              className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors"
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
          <div className="bg-gradient-to-r from-amber-600 to-amber-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl text-4xl">
                {getSeasonIcon(harvest.season)}
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Récolte #{String(harvest.id).padStart(3, '0')}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1">
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeasonColor(harvest.season)}`}>
                    {harvest.season.replace(/_/g, ' ')}
                  </span>
                  {harvest.quality && (
                    <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getQualityColor(harvest.quality)}`}>
                      {getQualityLabel(harvest.quality)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Corps */}
          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Quantité et production */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Quantité récoltée</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Package className="h-5 w-5 text-amber-500" />
                    <span className="text-2xl font-bold text-gray-900">
                      {harvest.quantity} {harvest.unit || 'kg'}
                    </span>
                  </div>
                  {harvest.yieldPerHectare && (
                    <div className="flex items-center gap-2 text-sm text-gray-600">
                      <Ruler className="h-4 w-4 text-gray-400" />
                      <span>Rendement: {harvest.yieldPerHectare.toFixed(0)} kg/ha</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Prix et revenu */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Valeur</h3>
                <div className="space-y-2">
                  {harvest.salePrice && (
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-5 w-5 text-green-500" />
                      <span className="text-lg font-semibold text-gray-900">
                        {harvest.salePrice} Ar/kg
                      </span>
                    </div>
                  )}
                  {harvest.totalRevenue && (
                    <div className="flex items-center gap-2">
                      <TrendingUp className="h-5 w-5 text-green-500" />
                      <span className="text-lg font-semibold text-green-600">
                        {harvest.totalRevenue.toFixed(0)} Ar
                      </span>
                      <span className="text-sm text-gray-400">(revenu total)</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Date et saison */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Date</h3>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-gray-400" />
                  <span className="text-gray-700">{formatDate(harvest.harvestDate)}</span>
                </div>
              </div>

              {/* Acheteur */}
              {harvest.buyer && (
                <div>
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Acheteur</h3>
                  <div className="flex items-center gap-2">
                    <User className="h-5 w-5 text-gray-400" />
                    <span className="text-gray-700">{harvest.buyer}</span>
                  </div>
                </div>
              )}

              {/* Parcelle */}
              {harvest.plot && (
                <div className="col-span-full">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Parcelle</h3>
                  <Link
                    href={`/plots/${harvest.plot.id}`}
                    className="flex items-center gap-2 text-blue-600 hover:text-blue-700 hover:underline transition-colors"
                  >
                    <MapPin className="h-5 w-5" />
                    <span className="font-medium">{harvest.plot.name}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-600">{harvest.plot.cropType}</span>
                    <span className="text-gray-400">•</span>
                    <span className="text-gray-500">{harvest.plot.surface} ha</span>
                  </Link>
                  {harvest.plot.farm && (
                    <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                      <Building2 className="h-4 w-4" />
                      <span>Exploitation: {harvest.plot.farm.name}</span>
                    </div>
                  )}
                </div>
              )}

              {/* Notes */}
              {harvest.notes && (
                <div className="col-span-full">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{harvest.notes}</p>
                </div>
              )}

              {/* Métadonnées */}
              <div className="col-span-full pt-4 border-t border-gray-100">
                <div className="grid grid-cols-2 gap-4 text-sm text-gray-400">
                  <div>
                    <span className="font-medium text-gray-500">Créé le:</span>
                    <span className="ml-2">{formatDate(harvest.createdAt)}</span>
                  </div>
                  {harvest.updatedAt && (
                    <div>
                      <span className="font-medium text-gray-500">Modifié le:</span>
                      <span className="ml-2">{formatDate(harvest.updatedAt)}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ====================================================
            ACTIONS RAPIDES
        ==================================================== */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Link
            href={`/plots/${harvest.plot?.id}`}
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <MapPin className="h-6 w-6 text-green-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Voir la parcelle</p>
          </Link>
          <Link
            href={`/farms/${harvest.plot?.farm?.id}`}
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <Building2 className="h-6 w-6 text-blue-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Voir l'exploitation</p>
          </Link>
          <button
            onClick={() => setIsEditOpen(true)}
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <Edit2 className="h-6 w-6 text-amber-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Modifier</p>
          </button>
          <button
            onClick={() => setIsDeleteOpen(true)}
            className="bg-white rounded-xl shadow-md p-4 text-center hover:shadow-lg transition-shadow"
          >
            <Trash2 className="h-6 w-6 text-red-500 mx-auto mb-2" />
            <p className="text-sm font-medium text-gray-700">Supprimer</p>
          </button>
        </div>

        {/* ====================================================
            MODALS
        ==================================================== */}
        {isEditOpen && (
          <HarvestForm
            onClose={handleFormClose}
            initialData={harvest}
            plots={[{
              id: harvest.plot?.id,
              name: harvest.plot?.name,
              cropType: harvest.plot?.cropType,
              farm: harvest.plot?.farm
            }]}
          />
        )}

        {isDeleteOpen && (
          <HarvestDelete
            harvest={{ id: harvest.id, name: `Récolte #${harvest.id}` }}
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
}