// components/practices/PracticeCard.tsx
'use client';

import { motion, type Variants } from 'framer-motion';
import { 
  Leaf, 
  Ruler, 
  Calendar, 
  Edit2, 
  Trash2, 
  Eye,
  Award,
  CheckCircle,
  Clock,
  Users,
  TrendingUp,
  Sprout
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { useState } from 'react';

interface PracticeCardProps {
  practice: {
    id: number;
    practiceType: string;
    specificTechnique?: string;
    surface: number;
    adoptionDate: string;
    description?: string;
    perceivedBenefit?: string;
    yieldImprovement?: number;
    sourceOfKnowledge?: string;
    isStillPracticed: boolean;
    satisfactionRating?: number;
    recommendation?: string;
    farm?: {
      id: number;
      name: string;
    };
  };
  onEdit: (practice: any) => void;
  onDelete: (id: number) => void;
  onView: (practice: any) => void;
  index?: number;
}

export function PracticeCard({ practice, onEdit, onDelete, onView, index = 0 }: PracticeCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  const getPracticeColor = (type: string) => {
    const colors: Record<string, string> = {
      CULTURE_DE_COUVERTURE: 'bg-green-100 text-green-800 border-green-200',
      AGROFORESTERIE: 'bg-emerald-100 text-emerald-800 border-emerald-200',
      COMPOSTAGE: 'bg-amber-100 text-amber-800 border-amber-200',
      MULCHING: 'bg-lime-100 text-lime-800 border-lime-200',
      ZAI: 'bg-orange-100 text-orange-800 border-orange-200',
      BANDES_ENHERBEES: 'bg-green-100 text-green-800 border-green-200',
      IRRIGATION_ECONOMIE_EAU: 'bg-cyan-100 text-cyan-800 border-cyan-200',
      AUTRE: 'bg-gray-100 text-gray-800 border-gray-200',
    };
    return colors[type] || colors['AUTRE'];
  };

  const getPracticeIcon = (type: string) => {
    const icons: Record<string, string> = {
      CULTURE_DE_COUVERTURE: '🌱',
      AGROFORESTERIE: '🌳',
      COMPOSTAGE: '♻️',
      MULCHING: '🍂',
      ZAI: '🕳️',
      BANDES_ENHERBEES: '🌿',
      IRRIGATION_ECONOMIE_EAU: '💧',
      AUTRE: '🌱',
    };
    return icons[type] || '🌱';
  };

  const getPracticeLabel = (type: string) => {
    const labels: Record<string, string> = {
      CULTURE_DE_COUVERTURE: 'Culture de couverture',
      AGROFORESTERIE: 'Agroforesterie',
      COMPOSTAGE: 'Compostage',
      MULCHING: 'Paillage',
      ZAI: 'Zai',
      BANDES_ENHERBEES: 'Bandes enherbées',
      IRRIGATION_ECONOMIE_EAU: 'Irrigation économie d\'eau',
      AUTRE: 'Autre',
    };
    return labels[type] || type;
  };

  const getBenefitLabel = (benefit?: string) => {
    const labels: Record<string, string> = {
      AMELIORATION_SOL: 'Amélioration du sol',
      AUGMENTATION_RENDEMENT: 'Augmentation rendement',
      REDUCTION_EROSION: 'Réduction érosion',
      ECONOMIE_EAU: 'Économie d\'eau',
      REDUCTION_INTRANTS: 'Réduction intrants',
      DIVERSIFICATION_REVENUS: 'Diversification revenus',
      MEILLEURE_ADAPTATION: 'Meilleure adaptation',
      AUTRE: 'Autre bénéfice',
    };
    return labels[benefit || ''] || 'Non spécifié';
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
        <div className="relative h-28 bg-gradient-to-r from-purple-600 to-purple-700 flex items-center justify-center">
          <span className="text-4xl">{getPracticeIcon(practice.practiceType)}</span>
          <div className="absolute bottom-2 left-3">
            <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${getPracticeColor(practice.practiceType)}`}>
              {getPracticeLabel(practice.practiceType)}
            </span>
          </div>
          {practice.isStillPracticed ? (
            <div className="absolute top-2 right-3">
              <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-green-500 text-white rounded-full">
                <CheckCircle className="h-3 w-3" />
                Actif
              </span>
            </div>
          ) : (
            <div className="absolute top-2 right-3">
              <span className="flex items-center gap-1 text-xs font-medium px-2 py-0.5 bg-gray-500 text-white rounded-full">
                <Clock className="h-3 w-3" />
                Arrêté
              </span>
            </div>
          )}
        </div>

        {/* Contenu */}
        <div className="p-4 flex-1 flex flex-col space-y-2.5">
          {/* Description */}
          <div>
            {practice.specificTechnique && (
              <p className="text-sm font-medium text-gray-900">{practice.specificTechnique}</p>
            )}
            {practice.description && (
              <p className="text-xs text-gray-500 line-clamp-2">{practice.description}</p>
            )}
          </div>

          {/* Métriques */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-2 py-0.5 rounded-full">
              <Ruler className="h-3.5 w-3.5 text-gray-400" />
              <span>{practice.surface} ha</span>
            </div>
            {practice.yieldImprovement && (
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-green-50 px-2 py-0.5 rounded-full">
                <TrendingUp className="h-3.5 w-3.5 text-green-500" />
                <span>+{practice.yieldImprovement}%</span>
              </div>
            )}
            {practice.satisfactionRating && (
              <div className="flex items-center gap-1 text-sm text-gray-600 bg-amber-50 px-2 py-0.5 rounded-full">
                <Award className="h-3.5 w-3.5 text-amber-500" />
                <span>{practice.satisfactionRating}/5</span>
              </div>
            )}
          </div>

          {/* Bénéfice */}
          {practice.perceivedBenefit && (
            <div className="flex items-center gap-1 text-xs text-gray-500">
              <Leaf className="h-3 w-3" />
              <span>{getBenefitLabel(practice.perceivedBenefit)}</span>
            </div>
          )}

          {/* Date et source */}
          <div className="flex items-center justify-between text-xs text-gray-400 pt-1 border-t border-gray-50">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>{formatDate(practice.adoptionDate)}</span>
            </div>
            {practice.sourceOfKnowledge && (
              <span className="truncate max-w-[120px]">{practice.sourceOfKnowledge.replace(/_/g, ' ')}</span>
            )}
          </div>

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
              onClick={() => onView(practice)}
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
              onClick={() => onEdit(practice)}
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
              onClick={() => onDelete(practice.id)}
              className="p-1.5 hover:bg-red-50 rounded-lg transition-colors text-red-600"
              title="Supprimer"
            >
              <Trash2 className="h-4 w-4" />
            </motion.button>
          </motion.div>
        </div>

        {/* Soulignement au survol */}
        <motion.div
          className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-400 via-purple-500 to-purple-600"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          style={{ originX: 0 }}
        />
      </Card>
    </motion.div>
  );
}