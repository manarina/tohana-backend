// app/farms/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { Layout } from '@/components/common/Layout';
import { useFarm } from '@/hooks/useFarmQueries';
import { useFarmMutations } from '@/hooks/useFarmMutations';
import { 
  Building2, 
  MapPin, 
  Ruler, 
  Phone, 
  Users, 
  Calendar,
  ArrowLeft,
  Edit2,
  Trash2,
  Loader2,
  CheckCircle,
  XCircle,
  Leaf,
  Package
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';
import { FarmForm } from '@/components/farms/FarmForm';
import { FarmDelete } from '@/components/farms/FarmDelete';

export default function FarmDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = parseInt(params.id as string);
  
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  
  const { farm, loading, error, refetch } = useFarm(id);
  const { deleteFarm } = useFarmMutations();

  const handleBack = () => {
    router.push('/farms');
  };

  const handleEdit = () => {
    setIsEditOpen(true);
  };

  const handleDelete = async () => {
    await deleteFarm(id);
    router.push('/farms');
  };

  const handleFormClose = () => {
    setIsEditOpen(false);
    refetch();
  };

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
            <p className="mt-4 text-gray-500">Chargement de l'exploitation...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !farm) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
          <p className="text-red-600 mt-1">{error?.message || 'Exploitation non trouvée'}</p>
          <button
            onClick={handleBack}
            className="mt-4 btn-primary"
          >
            Retour à la liste
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* En-tête avec bouton retour */}
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
              onClick={handleEdit}
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

        {/* Informations principales */}
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          <div className="bg-gradient-to-r from-green-600 to-green-700 p-6">
            <div className="flex items-center gap-4">
              <div className="p-3 bg-white/20 rounded-xl">
                <Building2 className="h-10 w-10 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-white">{farm.name}</h1>
                <p className="text-green-100 mt-1">ID: #{String(farm.id).padStart(3, '0')}</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Description */}
              {farm.description && (
                <div className="col-span-full">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Description</h3>
                  <p className="text-gray-700">{farm.description}</p>
                </div>
              )}

              {/* Localisation */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Localisation</h3>
                <div className="space-y-2 text-gray-700">
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-gray-400" />
                    <span>{farm.village}, {farm.commune}</span>
                  </div>
                  <div className="flex items-center gap-2 ml-6 text-sm text-gray-500">
                    <span>{farm.district}</span>
                    <span className="text-gray-300">•</span>
                    <span>{farm.region}</span>
                  </div>
                  {farm.fokontany && (
                    <div className="flex items-center gap-2 ml-6 text-sm text-gray-500">
                      <span>Fokontany: {farm.fokontany}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Données agricoles */}
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-1">Données agricoles</h3>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <Ruler className="h-4 w-4 text-gray-400" />
                    <span className="text-gray-700">{farm.totalSurface} hectares</span>
                  </div>
                  {farm.programAffiliation && (
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500">Programme:</span>
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {farm.programAffiliation}
                      </span>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-gray-500">Statut:</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${
                      farm.isBeneficiary
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {farm.isBeneficiary ? (
                        <CheckCircle className="h-3 w-3" />
                      ) : (
                        <XCircle className="h-3 w-3" />
                      )}
                      {farm.isBeneficiary ? 'Bénéficiaire' : 'Standard'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Contact */}
              {(farm.phoneNumber || farm.farmerGroup) && (
                <div className="col-span-full md:col-span-1">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Contact</h3>
                  <div className="space-y-2">
                    {farm.phoneNumber && (
                      <div className="flex items-center gap-2">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{farm.phoneNumber}</span>
                      </div>
                    )}
                    {farm.farmerGroup && (
                      <div className="flex items-center gap-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">Groupe: {farm.farmerGroup}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* GPS */}
              {(farm.gpsLatitude || farm.gpsLongitude) && (
                <div className="col-span-full md:col-span-1">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Coordonnées GPS</h3>
                  <div className="space-y-1 text-sm text-gray-600">
                    {farm.gpsLatitude && <div>Latitude: {farm.gpsLatitude}</div>}
                    {farm.gpsLongitude && <div>Longitude: {farm.gpsLongitude}</div>}
                  </div>
                </div>
              )}

              {/* Dates */}
              <div className="col-span-full md:col-span-1">
                <h3 className="text-sm font-medium text-gray-500 mb-1">Informations</h3>
                <div className="space-y-1 text-sm text-gray-500">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Créé le: {new Date(farm.createdAt).toLocaleDateString('fr-FR')}</span>
                  </div>
                  {farm.updatedAt && (
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-gray-400" />
                      <span>Dernière modification: {new Date(farm.updatedAt).toLocaleDateString('fr-FR')}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Propriétaire */}
              {farm.user && (
                <div className="col-span-full md:col-span-1">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Propriétaire</h3>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Users className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{farm.user.name}</span>
                    </div>
                    <div className="text-sm text-gray-500 ml-6">{farm.user.email}</div>
                  </div>
                </div>
              )}

              {/* Notes */}
              {farm.notes && (
                <div className="col-span-full">
                  <h3 className="text-sm font-medium text-gray-500 mb-1">Notes</h3>
                  <p className="text-gray-700 bg-gray-50 p-3 rounded-lg">{farm.notes}</p>
                </div>
              )}
            </div>
          </div>
        </div>

      

        {/* Modals */}
        {isEditOpen && (
          <FarmForm
            onClose={handleFormClose}
            initialData={farm}
          />
        )}

        {isDeleteOpen && (
          <FarmDelete
            farm={{ id: farm.id, name: farm.name }}
            onConfirm={handleDelete}
            onCancel={() => setIsDeleteOpen(false)}
          />
        )}
      </div>
    </Layout>
  );
}