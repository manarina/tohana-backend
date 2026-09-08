// components/farms/FarmCard.tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import { 
  Building2, 
  MapPin, 
  Ruler, 
  Users, 
  Edit2, 
  Trash2, 
  Eye, 
  Calendar, 
  Award,
  Sprout,        // 🌱 → TOHATRA
  Target,        // 🎯 → DEFIS
  Leaf,          // 🌿 → PRADA
  Pin,           // 📌 → AUTRE
  CheckCircle,
  Clock
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';

interface FarmCardProps {
  farm: {
    id: number;
    name: string;
    region: string;
    district: string;
    commune: string;
    village: string;
    totalSurface: number;
    isBeneficiary: boolean;
    programAffiliation?: string;
    createdAt: string;
    user?: {
      id: number;
      name: string;
    };
  };
  onEdit: (farm: any) => void;
  onDelete: (id: number) => void;
  onView: (farm: any) => void;
  index?: number;
}

export function FarmCard({ farm, onEdit, onDelete, onView, index = 0 }: FarmCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  // ✅ Couleurs des programmes avec icônes Lucide
  const getProgramStyle = (program?: string) => {
    const styles: Record<string, { color: string; bg: string; icon: React.ReactNode }> = {
      TOHATRA: {
        color: 'text-green-700',
        bg: 'bg-green-50 border-green-200',
        icon: <Sprout className="h-3.5 w-3.5" />,
      },
      DEFIS: {
        color: 'text-blue-700',
        bg: 'bg-blue-50 border-blue-200',
        icon: <Target className="h-3.5 w-3.5" />,
      },
      PRADA: {
        color: 'text-purple-700',
        bg: 'bg-purple-50 border-purple-200',
        icon: <Leaf className="h-3.5 w-3.5" />,
      },
      AUTRE: {
        color: 'text-gray-700',
        bg: 'bg-gray-50 border-gray-200',
        icon: <Pin className="h-3.5 w-3.5" />,
      },
    };
    return styles[program || 'AUTRE'] || styles['AUTRE'];
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const cardVariants: Variants = {
    hidden: {
      opacity: 0,
      y: 20,
      scale: 0.95,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 250,
        damping: 25,
        delay: index * 0.05,
      },
    },
    hover: {
      y: -8,
      scale: 1.02,
      transition: {
        type: 'spring',
        stiffness: 400,
        damping: 30,
      },
    },
  };

  const imageVariants = {
    hover: {
      scale: 1.05,
      transition: {
        duration: 0.4,
        ease: 'easeOut' as const,
      },
    },
  };

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.1 },
    tap: { scale: 0.9 },
  };

  const shortName = farm.name.length > 25 ? farm.name.substring(0, 25) + '...' : farm.name;
  const programStyle = getProgramStyle(farm.programAffiliation);
  const isNew = new Date(farm.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

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
        {/* Badge "Nouveau" */}
        {isNew && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="absolute top-3 left-3 z-10"
          >
            <span className="flex items-center gap-1 px-2 py-0.5 bg-blue-500 text-white text-[10px] font-bold rounded-full shadow-lg">
              <Clock className="h-3 w-3" />
              NOUVEAU
            </span>
          </motion.div>
        )}

        {/* En-tête */}
        <motion.div
          className="relative h-36 overflow-hidden cursor-pointer"
          onClick={() => onView(farm)}
          whileHover="hover"
        >
          <motion.div
            variants={imageVariants}
            className="absolute inset-0 bg-gradient-to-r from-green-600 to-green-700 flex items-center justify-center"
          >
            <Building2 className="h-16 w-16 text-white/10" />
          </motion.div>

          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 bg-black/30 flex items-center justify-center"
          >
            <span className="text-white font-medium text-sm bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">
              Voir les détails
            </span>
          </motion.div>

          {/* Badge statut */}
          <motion.div
            className="absolute top-3 right-3 z-10"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: 'spring', stiffness: 500, delay: 0.1 }}
          >
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium shadow-lg ${
                farm.isBeneficiary
                  ? 'bg-green-500 text-white'
                  : 'bg-gray-600 text-white'
              }`}
            >
              {farm.isBeneficiary ? (
                <CheckCircle className="h-3 w-3" />
              ) : (
                <span className="h-1.5 w-1.5 rounded-full bg-gray-300" />
              )}
              {farm.isBeneficiary ? 'Bénéficiaire' : 'Standard'}
            </span>
          </motion.div>

          {/* Nom */}
          <motion.div
            className="absolute bottom-3 left-4 right-4"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <h3 className="text-white font-semibold text-base truncate drop-shadow-md">
              {shortName}
            </h3>
          </motion.div>
        </motion.div>

        {/* Contenu */}
        <div className="p-4 flex-1 flex flex-col space-y-2.5">
          {/* Localisation */}
          <motion.div
            className="flex items-start gap-2 text-sm text-gray-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.05 }}
          >
            <MapPin className="h-4 w-4 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="line-clamp-2 text-sm">
              {farm.village}, {farm.commune}
              <span className="text-xs text-gray-400 block">
                {farm.district}
              </span>
            </span>
          </motion.div>

          {/* Métriques */}
          <motion.div
            className="flex flex-wrap items-center gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <div className="flex items-center gap-1.5 text-sm text-gray-600 bg-gray-50 px-2.5 py-1 rounded-full">
              <Ruler className="h-3.5 w-3.5 text-gray-400" />
              <span className="font-medium">{farm.totalSurface} ha</span>
            </div>

            {/* Programme avec icône Lucide */}
            {farm.programAffiliation && (
              <div
                className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full border ${programStyle.bg} ${programStyle.color}`}
              >
                {programStyle.icon}
                <span>{farm.programAffiliation}</span>
              </div>
            )}
          </motion.div>

          {/* Propriétaire et date */}
          <motion.div
            className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15 }}
          >
            {farm.user && (
              <div className="flex items-center gap-1.5">
                <Users className="h-3.5 w-3.5" />
                <span className="truncate max-w-[100px]">{farm.user.name}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(farm.createdAt)}</span>
            </div>
          </motion.div>

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
              onClick={() => onView(farm)}
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
              onClick={() => onEdit(farm)}
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
              onClick={() => onDelete(farm.id)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Soulignement */}
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