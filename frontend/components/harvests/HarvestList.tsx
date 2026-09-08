// components/harvests/HarvestList.tsx
'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Package, Plus, Search, Filter, Grid3x3, LayoutList, Eye, Edit2, Trash2, Calendar } from 'lucide-react';
import { HarvestCard } from './HarvestCard';
import { useState } from 'react';

interface HarvestListProps {
  harvests: any[];
  loading?: boolean;
  error?: any;
  onEdit: (harvest: any) => void;
  onDelete: (id: number) => void;
  onView: (harvest: any) => void;
  onAdd: () => void;
  onRefresh: () => void;
  searchTerm?: string;
  onSearchChange?: (value: string) => void;
}

export function HarvestList({
  harvests = [],
  loading = false,
  error = null,
  onEdit,
  onDelete,
  onView,
  onAdd,
  onRefresh,
  searchTerm = '',
  onSearchChange,
}: HarvestListProps) {
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
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-amber-600 border-t-transparent mx-auto" />
          <p className="mt-4 text-gray-500">Chargement des récoltes...</p>
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
              placeholder="Rechercher une récolte..."
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-transparent outline-none transition"
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
            className="flex items-center gap-2 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors shadow-lg shadow-amber-600/20"
          >
            <Plus className="h-4 w-4" />
            Nouvelle
          </button>
        </div>
      </div>

      {/* Liste des récoltes */}
      <AnimatePresence mode="wait">
        {harvests.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <Package className="h-16 w-16 mx-auto text-gray-300 mb-4" />
            <h3 className="text-lg font-medium text-gray-900">Aucune récolte</h3>
            <p className="text-gray-500 mt-1">Commencez par enregistrer votre première récolte</p>
            <button onClick={onAdd} className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition-colors">
              Enregistrer une récolte
            </button>
          </div>
        ) : viewMode === 'grid' ? (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4"
          >
            {harvests.map((harvest, index) => (
              <HarvestCard
                key={harvest.id}
                harvest={harvest}
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
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Culture</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantité</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Saison</th>
                    <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {harvests.map((harvest) => (
                    <tr key={harvest.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-lg bg-amber-100 flex items-center justify-center flex-shrink-0">
                            <Package className="h-5 w-5 text-amber-600" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{harvest.plot?.cropType || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{harvest.plot?.name || 'Parcelle inconnue'}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{harvest.quantity} {harvest.unit || 'kg'}</p>
                          {harvest.yieldPerHectare && <p className="text-xs text-gray-400">{harvest.yieldPerHectare} kg/ha</p>}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <Calendar className="h-4 w-4 text-gray-400" />
                          <span className="text-sm text-gray-600">{new Date(harvest.harvestDate).toLocaleDateString('fr-FR')}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${harvest.season === 'SAISON_DES_PLUIES' ? 'bg-blue-100 text-blue-800' : harvest.season === 'SAISON_SECHE' ? 'bg-yellow-100 text-yellow-800' : 'bg-purple-100 text-purple-800'}`}>
                          {harvest.season.replace(/_/g, ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button onClick={() => onView(harvest)} className="p-2 hover:bg-blue-50 rounded-lg text-blue-600"><Eye className="h-4 w-4" /></button>
                          <button onClick={() => onEdit(harvest)} className="p-2 hover:bg-green-50 rounded-lg text-green-600"><Edit2 className="h-4 w-4" /></button>
                          <button onClick={() => onDelete(harvest.id)} className="p-2 hover:bg-red-50 rounded-lg text-red-600"><Trash2 className="h-4 w-4" /></button>
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