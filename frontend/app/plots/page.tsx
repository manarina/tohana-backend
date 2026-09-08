// app/plots/page.tsx
'use client';

import { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { MapPin } from 'lucide-react';
import { PlotList } from '@/components/plots/PlotList';
import { PlotForm } from '@/components/plots/PlotForm';
import { PlotDelete } from '@/components/plots/PlotDelete';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_PLOTS } from '@/lib/graphql/queries/plots.queries';
import { DELETE_PLOT } from '@/lib/graphql/mutations/plots.mutations';
import toast from 'react-hot-toast';

// ============================================================
// TYPES
// ============================================================

interface Plot {
  id: number;
  name: string;
  description?: string;
  cropType: string;
  cropVariety?: string;
  surface: number;
  plantingDate?: string;
  harvestDate?: string;
  irrigationType?: string;
  soilType?: string;
  slope?: number;
  expectedYield?: number;
  actualYield?: number;
  notes?: string;
  createdAt: string;
  farm?: {
    id: number;
    name: string;
  };
}

interface Farm {
  id: number;
  name: string;
}

interface GetPlotsData {
  plots: Plot[];
  farms: Farm[];
}

// ============================================================
// PAGE
// ============================================================

export default function PlotsPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingPlot, setEditingPlot] = useState<any>(null);
  const [deletingPlot, setDeletingPlot] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error, refetch } = useQuery<GetPlotsData>(GET_PLOTS, {
    fetchPolicy: 'network-only',
  });

  const [deletePlot] = useMutation(DELETE_PLOT);

  const handleEdit = (plot: any) => {
    setEditingPlot(plot);
    setIsFormOpen(true);
  };

  const handleDelete = (plot: any) => {
    setDeletingPlot(plot);
    setIsDeleteOpen(true);
  };

  const handleView = (plot: any) => {
    window.location.href = `/plots/${plot.id}`;
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      await deletePlot({ variables: { id } });
      toast.success('Parcelle supprimée avec succès !');
      await refetch();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression');
    }
    setIsDeleteOpen(false);
    setDeletingPlot(null);
  };

  // ✅ Gestionnaire de succès pour le formulaire
  const handleFormSuccess = async () => {
    await refetch();
    setIsFormOpen(false);
    setEditingPlot(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPlot(null);
    refetch();
  };

  return (
    <Layout>
      <div className="space-y-6">
        {/* En-tête */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-green-100 rounded-xl">
              <MapPin className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Parcelles</h1>
              <p className="text-gray-500 mt-0.5">Gestion des parcelles agricoles</p>
            </div>
          </div>
        </div>

        {/* Liste des parcelles */}
        <PlotList
          plots={data?.plots || []}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onAdd={() => { setEditingPlot(null); setIsFormOpen(true); }}
          onRefresh={refetch}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {/* ✅ Modal de création/édition avec gestion de succès */}
        {isFormOpen && (
          <PlotForm
            onClose={handleFormClose}
            initialData={editingPlot}
            farms={data?.farms || []}
            onSuccess={handleFormSuccess}
          />
        )}

        {/* Modal de suppression */}
        {isDeleteOpen && deletingPlot && (
          <PlotDelete
            plot={deletingPlot}
            onConfirm={handleConfirmDelete}
            onCancel={() => { setIsDeleteOpen(false); setDeletingPlot(null); }}
          />
        )}
      </div>
    </Layout>
  );
}