// app/practices/page.tsx
'use client';

import { useState } from 'react';
import { Layout } from '@/components/common/Layout';
import { Leaf } from 'lucide-react';
import { PracticeList } from '@/components/practices/PracticeList';
import { PracticeForm } from '@/components/practices/PracticeForm';
import { PracticeDelete } from '@/components/practices/PracticeDelete';
import { useQuery, useMutation } from '@apollo/client/react';
import { GET_PRACTICES } from '@/lib/graphql/queries/practices.queries';
import { DELETE_PRACTICE } from '@/lib/graphql/mutations/practices.mutations';
import toast from 'react-hot-toast';

interface GetPracticesData {
  practices: any[];
  farms: any[];
}

export default function PracticesPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [editingPractice, setEditingPractice] = useState<any>(null);
  const [deletingPractice, setDeletingPractice] = useState<any>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const { data, loading, error, refetch } = useQuery<GetPracticesData>(GET_PRACTICES, {
    fetchPolicy: 'network-only',
  });

  const [deletePractice] = useMutation(DELETE_PRACTICE);

  const handleEdit = (practice: any) => {
    setEditingPractice(practice);
    setIsFormOpen(true);
  };

  const handleDelete = (practice: any) => {
    setDeletingPractice(practice);
    setIsDeleteOpen(true);
  };

  const handleView = (practice: any) => {
    window.location.href = `/practices/${practice.id}`;
  };

  const handleConfirmDelete = async (id: number) => {
    try {
      await deletePractice({ variables: { id } });
      toast.success('Pratique supprimée avec succès !');
      await refetch();
    } catch (error: any) {
      toast.error(error.message || 'Erreur lors de la suppression');
    }
    setIsDeleteOpen(false);
    setDeletingPractice(null);
  };

  const handleFormSuccess = async () => {
    await refetch();
    setIsFormOpen(false);
    setEditingPractice(null);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingPractice(null);
    refetch();
  };

  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2.5 bg-purple-100 rounded-xl">
              <Leaf className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Pratiques</h1>
              <p className="text-gray-500 mt-0.5">Gestion des pratiques résilientes</p>
            </div>
          </div>
        </div>

        <PracticeList
          practices={data?.practices || []}
          loading={loading}
          error={error}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onView={handleView}
          onAdd={() => { setEditingPractice(null); setIsFormOpen(true); }}
          onRefresh={refetch}
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
        />

        {isFormOpen && (
          <PracticeForm
            onClose={handleFormClose}
            initialData={editingPractice}
            farms={data?.farms || []}
            onSuccess={handleFormSuccess}
          />
        )}

        {isDeleteOpen && deletingPractice && (
          <PracticeDelete
            practice={{ id: deletingPractice.id, name: deletingPractice.practiceType }}
            onConfirm={handleConfirmDelete}
            onCancel={() => { setIsDeleteOpen(false); setDeletingPractice(null); }}
          />
        )}
      </div>
    </Layout>
  );
}