// components/practices/PracticeList.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Leaf, Plus, Search, Filter, Grid3x3, LayoutList, Eye, Edit2, Trash2 } from 'lucide-react';
import { PracticeCard } from './PracticeCard';
import { useState } from 'react';

interface PracticeListProps {
  practices: any[];
  loading?: boolean;
  error?: any;
  onEdit: (practice: any) => void;
  onDelete: (id: number) => void;
  onView: (practice: any) => void;
  onAdd: () => void;
  onRefresh: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function PracticeList({
  practices = [],
  loading = false,
  error = null,
  onEdit,
  onDelete,
  onView,
  onAdd,
  onRefresh,
  searchTerm = '',
  onSearchChange,
}: PracticeListProps) {
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05, delayChildren: 0.1 },
    },
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-purple-600 border-t-transparent mx-auto" />
          <p className="mt-4 text-gray-500">Chargement des pratiques...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
        <p className="text-red-600 mt-1">{error.message}</p>
        <button onClick={onRefresh} className="mt-4 btn-primary">
          Réessayer
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Barre d'outils */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 flex-1">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange?.(e.target.value)}
              placeholder="Rechercher une pratique..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
            <Filter className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Filtres</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <Grid3x3 className="h-4 w-4" />
            </button>
            <button
              onClick={() => setViewMode('list')}
              className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm text-gray-900' : 'text-gray-500 hover:text-gray-700'}`}
            >
              <LayoutList className="h-4 w-4" />
            </button>
          </div>
          <button
            onClick={onAdd}
            className="flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors shadow-lg shadow-purple-600/20"
          >
            <Plus className="h-4 w-4" />
            Nouvelle
          </button>
        </div>
      </div>

      {/* Liste des pratiques */}
      <AnimatePresence mode="wait">
        {practices.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Leaf className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Aucune pratique</h3>
            <p className="text-gray-500 mt-1">Commencez par enregistrer votre première pratique résiliente</p>
            <button onClick={onAdd} className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
              Enregistrer une pratique
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {practices.map((practice, index) => (
              <PracticeCard
                key={practice.id}
                practice={practice}
                index={index}
                onEdit={onEdit}
                onDelete={onDelete}
                onView={onView}
              />
            ))}
          </motion.div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pratique</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Surface</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bénéfice</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Statut</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {practices.map((practice) => (
                    <tr key={practice.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                            <Leaf className="h-5 w-5 text-purple-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{practice.practiceType.replace(/_/g, ' ')}</p>
                            {practice.specificTechnique && <p className="text-sm text-gray-500">{practice.specificTechnique}</p>}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{practice.surface} ha</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{practice.perceivedBenefit?.replace(/_/g, ' ') || 'N/A'}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${practice.isStillPracticed ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-600'}`}>
                          {practice.isStillPracticed ? 'Actif' : 'Arrêté'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => onView(practice)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => onEdit(practice)} className="p-2 hover:bg-green-50 rounded-lg text-green-600"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => onDelete(practice.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600"><Trash2 className="h-4 w-4" /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}