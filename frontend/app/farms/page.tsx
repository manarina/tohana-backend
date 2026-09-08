// app/farms/page.tsx
'use client';

import { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { Building2 } from 'lucide-react';
import { FarmList } from '@/components/farms/FarmList';
import { FarmForm } from '@/components/farms/FarmForm';
import { FarmDelete } from '@/components/farms/FarmDelete';
import { useFarms, useFarmStats } from '@/hooks/useFarmQueries';
import { useFarmMutations } from '@/hooks/useFarmMutations';

export default function FarmsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingFarm, setEditingFarm] = useState<any>(null);
  const [deletingFarm, setDeletingFarm] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  // Récupérer les données
  const { farms, loading, error, refetch } = useFarms({ searchTerm });
  const { stats } = useFarmStats();
  const { deleteFarm } = useFarmMutations();

  const handleEdit = (farm: any) => {
    setEditingFarm(farm);
    setIsFormOpen(true);
  };

  const handleDelete = (farm: any) => {
    setDeletingFarm(farm);
    setIsDeleteOpen(true);
  };

  const handleView = (farm: any) => {
    // Rediriger vers la page de détails
    window.location.href = `/farms/${farm.id}`;
  };

  const handleConfirmDelete = async (id: number) => {
    await deleteFarm(id);
    setIsDeleteOpen(false);
    setDeletingFarm(null);
    refetch();
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingFarm(null);
    refetch();
  };

  const handleAdd = () => {
    setEditingFarm(null);
    setIsFormOpen(true);
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-blue-100 rounded-xl">
              <Building2 className="h-6 w-6 text-blue-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Exploitations</h1>
              <p className="text-gray-500 mt-0.5">
                Gestion des exploitations agricoles
              </p>
            </div>
          </div>
        </div>

        {/* Statistiques rapides */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-500">Total exploitations</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalFarms}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-500">Surface totale</p>
            <p className="text-2xl font-bold text-gray-900">{stats.totalSurface.toFixed(1)} ha</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-500">Surface moyenne</p>
            <p className="text-2xl font-bold text-gray-900">{stats.averageSurface.toFixed(1)} ha</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-4">
            <p className="text-sm text-gray-500">Bénéficiaires</p>
            <p className="text-2xl font-bold text-gray-900">{stats.beneficiaryCount}</p>
          </div>
        </div>

        {/* Liste des exploitations */}
        <FarmList
          farms={farms}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onAdd={handleAdd}
          onRefresh={refetch}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* Modal de création/édition */}
        {isFormOpen && (
          <FarmForm
            onClose={handleFormClose}
            initialData={editingFarm}
          />
        )}

        {/* Modal de suppression */}
        {isDeleteOpen && deletingFarm && (
          <FarmDelete
            farm={deletingFarm}
            onConfirm={handleConfirmDelete}
            onCancel={() => {
              setIsDeleteOpen(false);
              setDeletingFarm(null);
            }}
          />
        )}
      </div>
    </Layout>
  );
}