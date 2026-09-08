// components/plots/PlotCard.tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import { 
  MapPin, 
  Ruler, 
  Sprout, 
  Calendar, 
  Edit2, 
  Trash2, 
  Eye,
  Droplet,
  Sun,
  Award,
  Clock
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';

interface PlotCardProps {
  plot: {
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
    expectedYield?: number;
    actualYield?: number;
    createdAt: string;
    farm?: {
      id: number;
      name: string;
    };
  };
  onEdit: (plot: any) => void;
  onDelete: (id: number) => void;
  onView: (plot: any) => void;
  index?: number;
}

export function PlotCard({ plot, onEdit, onDelete, onView, index = 0 }: PlotCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getCropColor = (cropType: string) => {
    const colors: Record<string, string> = {
      RIZ: 'bg-green-100 text-green-800 border-green-200',
      MANIOC: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      MAIS: 'bg-blue-100 text-blue-800 border-blue-200',
      LEGUMINEUSES: 'bg-purple-100 text-purple-800 border-purple-200',
      PATATE_DOUCE: 'bg-orange-100 text-orange-800 border-orange-200',
      VANILLE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      CAFE: 'bg-amber-100 text-amber-800 border-amber-200',
      AUTRE: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[cropType] || colors['AUTRE'];
  };

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

  const getIrrigationIcon = (type?: string) => {
    if (!type) {
      return {
        icon: <Droplet className="h-3 w-3 text-gray-400" />,
        label: 'Non spécifié',
      };
    }
    const icons: Record<string, { icon: React.ReactNode; label: string }> = {
      GOUTTE_A_GOUTTE: { icon: <Droplet className="h-3 w-3 text-blue-500" />, label: 'Goutte-à-goutte' },
      CANAUX: { icon: <Droplet className="h-3 w-3 text-cyan-500" />, label: 'Canaux' },
      PLUIE: { icon: <Sun className="h-3 w-3 text-yellow-500" />, label: 'Pluie' },
      BASSINE: { icon: <Droplet className="h-3 w-3 text-teal-500" />, label: 'Bassine' },
    };
    return icons[type] || { icon: <Droplet className="h-3 w-3 text-gray-400" />, label: 'Non spécifié' };
  };

  const getSoilType = (type?: string) => {
    const types: Record<string, string> = {
      SABLEUX: 'Sableux',
      ARGILEUX: 'Argileux',
      LIMON: 'Limon',
      HUMIFERE: 'Humifère',
    };
    return types[type || ''] || 'Non spécifié';
  };

  const formatDate = (date?: string) => {
    if (!date) return 'Non définie';
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

  const irrigation = getIrrigationIcon(plot.irrigationType);

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
        <div className="relative h-28 bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center">
          <span className="text-4xl">{getCropIcon(plot.cropType)}</span>
          <div className="absolute bottom-2 left-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getCropColor(plot.cropType)}`}>
              {plot.cropType}
            </span>
          </div>
        </div>

        {/* Contenu */}
        <div className="p-4 flex-1 flex flex-col space-y-2.5">
          {/* Nom et variété */}
          <div>
            <h3 className="font-semibold text-gray-900 truncate">{plot.name}</h3>
            {plot.cropVariety && (
              <p className="text-xs text-gray-400">{plot.cropVariety}</p>
            )}
          </div>

          {/* Informations clés */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full">
              <Ruler className="h-3.5 w-3.5 text-gray-400" />
              <span>{plot.surface} ha</span>
            </div>
            {plot.expectedYield && (
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full">
                <Award className="h-3.5 w-3.5 text-amber-400" />
                <span>{plot.expectedYield} kg/ha</span>
              </div>
            )}
          </div>

          {/* Irrigation et sol */}
          <div className="flex flex-wrap items-center gap-2 text-xs text-gray-500">
            <span className="flex items-center gap-1">
              {irrigation.icon}
              {irrigation.label}
            </span>
            <span className="text-gray-300">|</span>
            <span className="flex items-center gap-1">
              <Sprout className="h-3 w-3 text-gray-400" />
              {getSoilType(plot.soilType)}
            </span>
          </div>

          {/* Date de plantation */}
          {plot.plantingDate && (
            <div className="flex items-center gap-1 text-xs text-gray-400">
              <Calendar className="h-3 w-3" />
              <span>Plantation: {formatDate(plot.plantingDate)}</span>
            </div>
          )}

          {/* Exploitation */}
          {plot.farm && (
            <div className="flex items-center gap-1 text-xs text-gray-400 pt-1 border-t border-gray-50">
              <MapPin className="h-3 w-3" />
              <span className="truncate">{plot.farm.name}</span>
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
              onClick={() => onView(plot)}
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
              onClick={() => onEdit(plot)}
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
              onClick={() => onDelete(plot.id)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Soulignement au survol */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-green-400 via-green-500 to-green-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </Card>
    </motion.div>
  );
}