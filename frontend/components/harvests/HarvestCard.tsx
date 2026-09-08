// components/harvests/HarvestCard.tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import { 
  Package, 
  Calendar, 
  Ruler, 
  TrendingUp, 
  Edit2, 
  Trash2, 
  Eye,
  Award,
  Clock,
  MapPin,
  DollarSign
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';

interface HarvestCardProps {
  harvest: {
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
    plot?: {
      id: number;
      name: string;
      cropType: string;
      farm?: {
        id: number;
        name: string;
      };
    };
  };
  onEdit: (harvest: any) => void;
  onDelete: (id: number) => void;
  onView: (harvest: any) => void;
  index?: number;
}

export function HarvestCard({ harvest, onEdit, onDelete, onView, index = 0 }: HarvestCardProps) {
  const [isHovered, setIsHovered] = useState(false);

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

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const cardVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { type: 'spring', stiffness: 300, damping: 25, delay: index * 0.05 },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: { type: 'spring', stiffness: 400, damping: 30 },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      className="h-full"
    >
      <Card className="overflow-hidden h-full flex flex-col shadow-md hover:shadow-xl transition-shadow duration-300 relative">
        {/* En-tête avec icône */}
        <div className="relative h-28 bg-gradient-to-r from-amber-600 to-amber-700 flex items-center justify-center">
          <span className="text-4xl">{getSeasonIcon(harvest.season)}</span>
          <div className="absolute bottom-2 left-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getSeasonColor(harvest.season)}`}>
              {harvest.season.replace(/_/g, ' ')}
            </span>
          </div>
          {harvest.quality && (
            <div className="absolute bottom-2 right-3">
              <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getQualityColor(harvest.quality)}`}>
                {harvest.quality}
              </span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-4 flex-1 flex flex-col space-y-2.5">
          {/* Quantité et unité */}
          <div>
            <div className="flex items-center gap-2">
              <Package className="h-4 w-4 text-amber-500" />
              <span className="font-semibold text-gray-900">
                {harvest.quantity} {harvest.unit || 'kg'}
              </span>
            </div>
            {harvest.yieldPerHectare && (
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <Ruler className="h-3.5 w-3.5" />
                <span>{harvest.yieldPerHectare.toFixed(0)} kg/ha</span>
              </div>
            )}
          </div>

          {/* Date et saison */}
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-3.5 w-3.5" />
            <span>{formatDate(harvest.harvestDate)}</span>
          </div>

          {/* Prix et revenu */}
          <div className="flex items-center gap-4">
            {harvest.salePrice && (
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full">
                <DollarSign className="h-3 w-3 text-green-500" />
                <span>{harvest.salePrice} Ar/kg</span>
              </div>
            )}
            {harvest.totalRevenue && (
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-green-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3 w-3 text-green-500" />
                <span>{harvest.totalRevenue.toFixed(0)} Ar</span>
              </div>
            )}
          </div>

          {/* Acheteur */}
          {harvest.buyer && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <span>Acheteur: {harvest.buyer}</span>
            </div>
          )}

          {/* Parcelle */}
          {harvest.plot && (
            <div className="flex items-center gap-1 text-xs text-gray-400 pt-1 border-t border-gray-50">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{harvest.plot.name}</span>
              {harvest.plot.farm && (
                <span className="text-gray-300">•</span>
              )}
              {harvest.plot.farm && (
                <span className="truncate">{harvest.plot.farm.name}</span>
              )}
            </div>
          )}

          {/* Actions */}
          <motion.div
            className="flex items-center justify-end gap-0.5 pt-2 border-t border-gray-100 mt-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onView(harvest)}
              className="p-1.5 hover:bg-blue-50 rounded-lg transition-colors text-blue-600"
              title="Voir les détails"
            >
              <Eye className="h-4 w-4" />
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onEdit(harvest)}
              className="p-1.5 hover:bg-green-50 rounded-lg transition-colors text-green-600"
              title="Modifier"
            >
              <Edit2 className="h-4 w-4" />
            </motion.button>
            <motion.button
              variants={buttonVariants}
              initial="initial"
              whileHover="hover"
              whileTap="tap"
              onClick={() => onDelete(harvest.id)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Soulignement au survol */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-400 via-amber-500 to-amber-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </Card>
    </motion.div>
  );
}