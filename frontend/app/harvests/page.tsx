// app/harvests/page.tsx
'use client';

import { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { Package } from 'lucide-react';
import { HarvestList } from '@/components/harvests/HarvestList';
import { HarvestForm } from '@/components/harvests/HarvestForm';
import { HarvestDelete } from '@/components/harvests/HarvestDelete';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_HARVESTS } from '@/lib/graphql/queries/harvests.queries';
import { DELETE_HARVEST } from '@/lib/graphql/mutations/harvests.mutations';
import toast from 'react-hot-toast';

interface GetHarvestsData {
  harvests: any[];
  plots: any[];
}

export default function HarvestsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingHarvest, setEditingHarvest] = useState<any>(null);
  const [deletingHarvest, setDeletingHarvest] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // ✅ Récupération des données avec refetch
  const { data, loading, error, refetch } = useQuery<GetHarvestsData>(GET_HARVESTS, {
    fetchPolicy: 'network-only',
  });

  const [deleteHarvest] = useMutation(DELETE_HARVEST);

  const handleEdit = (harvest: any) => {
    setEditingHarvest(harvest);
    setIsFormOpen(true);
  };

  const handleDelete = (harvest: any) => {
    setDeletingHarvest(harvest);
    setIsDeleteOpen(true);
  };

  const handleView = (harvest: any) => {
    window.location.href = `/harvests/${harvest.id}`;
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      await deleteHarvest({ variables: { id } });
      toast.success('Récolte supprimée avec succès !');
      // ✅ Rafraîchir les données après suppression
      await refetch();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression');
    }
    setIsDeleteOpen(false);
    setDeletingHarvest(null);
  };

  // ✅ Gestionnaire de succès pour le formulaire
  const handleFormSuccess = async () => {
    // ✅ Rafraîchir les données après création ou mise à jour
    await refetch();
    setIsFormOpen(false);
    setEditingHarvest(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingHarvest(null);
    // ✅ Rafraîchir les données pour être sûr
    refetch();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-amber-100 rounded-xl">
              <Package className="h-6 w-6 text-amber-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Récoltes</h1>
              <p className="text-gray-500 mt-0.5">Gestion des récoltes agricoles</p>
            </div>
          </div>
        </div>

        <HarvestList
          harvests={data?.harvests || []}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onAdd={() => { setEditingHarvest(null); setIsFormOpen(true); }}
          onRefresh={() => refetch()}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* ✅ Formulaire avec gestion de succès */}
        {isFormOpen && (
          <HarvestForm
            onClose={handleFormClose}
            initialData={editingHarvest}
            plots={data?.plots || []}
            onSuccess={handleFormSuccess}
          />
        )}

        {isDeleteOpen && deletingHarvest && (
          <HarvestDelete
            harvest={deletingHarvest}
            onConfirm={handleConfirmDelete}
            onCancel={() => { setIsDeleteOpen(false); setDeletingHarvest(null); }}
          />
        )}
      </div>
    </Layout>
  );
}