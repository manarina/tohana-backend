// components/dashboard/ResilienceStats.tsx
'use client';

import { Card } from '@/components/ui/Card';
import { 
  CheckCircle, 
  TrendingUp, 
  Users, 
  Clock, 
  Award,
  Leaf,
  Sprout,
  Recycle,
  Droplet,
  Shield,
  BarChart4,
  TreePine,
  Flower,
  Sun,
  Cloud,
  Gauge,
  Activity,
  Heart,
  Zap,
  Sparkles,
  Globe,
  Handshake,
  RefreshCw
} from 'lucide-react';

interface ResilienceStatsProps {
  data: {
    totalPractices: number;
    adoptionRate: number;
    averageYieldImprovement: number;
    stillPracticedRate: number;
    topPractices: string[];
  };
}

export function ResilienceStats({ data }: ResilienceStatsProps) {
  // Statistiques avec icônes Lucide
  const stats = [
    {
      label: "Taux d'adoption",
      value: `${data.adoptionRate.toFixed(1)}%`,
      icon: Users,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
      border: 'border-blue-100',
    },
    {
      label: 'Amélioration rendement',
      value: `+${data.averageYieldImprovement.toFixed(1)}%`,
      icon: TrendingUp,
      color: 'text-green-600',
      bg: 'bg-green-50',
      border: 'border-green-100',
    },
    {
      label: 'Pratiques continues',
      value: `${data.stillPracticedRate.toFixed(1)}%`,
      icon: Clock,
      color: 'text-purple-600',
      bg: 'bg-purple-50',
      border: 'border-purple-100',
    },
    {
      label: 'Total pratiques',
      value: data.totalPractices,
      icon: CheckCircle,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
      border: 'border-emerald-100',
    },
  ];

  // Fonction pour obtenir l'icône en fonction de la pratique
  const getPracticeIcon = (practice: string) => {
    const icons: Record<string, { icon: React.ReactNode; color: string; bg: string }> = {
      CULTURE_DE_COUVERTURE: {
        icon: <Leaf className="h-3.5 w-3.5" />,
        color: 'text-green-600',
        bg: 'bg-green-100',
      },
      AGROFORESTERIE: {
        icon: <TreePine className="h-3.5 w-3.5" />,
        color: 'text-emerald-600',
        bg: 'bg-emerald-100',
      },
      COMPOSTAGE: {
        icon: <Recycle className="h-3.5 w-3.5" />,
        color: 'text-amber-600',
        bg: 'bg-amber-100',
      },
      MULCHING: {
        icon: <Sprout className="h-3.5 w-3.5" />,
        color: 'text-lime-600',
        bg: 'bg-lime-100',
      },
      ZAI: {
        icon: <Flower className="h-3.5 w-3.5" />,
        color: 'text-orange-600',
        bg: 'bg-orange-100',
      },
      BANDES_ENHERBEES: {
        icon: <Grass className="h-3.5 w-3.5" />,
        color: 'text-green-600',
        bg: 'bg-green-100',
      },
      IRRIGATION_ECONOMIE_EAU: {
        icon: <Droplet className="h-3.5 w-3.5" />,
        color: 'text-cyan-600',
        bg: 'bg-cyan-100',
      },
      TERRASSEMENT: {
        icon: <Gauge className="h-3.5 w-3.5" />,
        color: 'text-amber-600',
        bg: 'bg-amber-100',
      },
      HAIES_VIVES: {
        icon: <Shield className="h-3.5 w-3.5" />,
        color: 'text-indigo-600',
        bg: 'bg-indigo-100',
      },
      ARBRES_AGROFORESTIERS: {
        icon: <TreePine className="h-3.5 w-3.5" />,
        color: 'text-emerald-600',
        bg: 'bg-emerald-100',
      },
      GOUTTE_A_GOUTTE: {
        icon: <Droplet className="h-3.5 w-3.5" />,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
      },
      BASSINE: {
        icon: <Droplet className="h-3.5 w-3.5" />,
        color: 'text-sky-600',
        bg: 'bg-sky-100',
      },
      CAPTAGE_EAU: {
        icon: <Droplet className="h-3.5 w-3.5" />,
        color: 'text-cyan-600',
        bg: 'bg-cyan-100',
      },
      FUMURE_ORGANIQUE: {
        icon: <Recycle className="h-3.5 w-3.5" />,
        color: 'text-amber-600',
        bg: 'bg-amber-100',
      },
      CROISSANCE_VERTE: {
        icon: <Sprout className="h-3.5 w-3.5" />,
        color: 'text-green-600',
        bg: 'bg-green-100',
      },
      BIOCHAR: {
        icon: <Shield className="h-3.5 w-3.5" />,
        color: 'text-gray-600',
        bg: 'bg-gray-100',
      },
      ROTATION_CULTURES: {
        icon: <RefreshCw className="h-3.5 w-3.5" />,
        color: 'text-purple-600',
        bg: 'bg-purple-100',
      },
      ASSOCIATION_CULTURES: {
        icon: <Handshake className="h-3.5 w-3.5" />,
        color: 'text-indigo-600',
        bg: 'bg-indigo-100',
      },
      SEMIS_DIRECT: {
        icon: <Sprout className="h-3.5 w-3.5" />,
        color: 'text-green-600',
        bg: 'bg-green-100',
      },
      LABOUR_MINIMAL: {
        icon: <Gauge className="h-3.5 w-3.5" />,
        color: 'text-amber-600',
        bg: 'bg-amber-100',
      },
      VARIETES_RESILIENTES: {
        icon: <Shield className="h-3.5 w-3.5" />,
        color: 'text-red-600',
        bg: 'bg-red-100',
      },
      CALENDRIER_AGROCLIMATIQUE: {
        icon: <Sun className="h-3.5 w-3.5" />,
        color: 'text-orange-600',
        bg: 'bg-orange-100',
      },
      ASSURANCE_CLIMATIQUE: {
        icon: <Shield className="h-3.5 w-3.5" />,
        color: 'text-blue-600',
        bg: 'bg-blue-100',
      },
      AUTRE: {
        icon: <Sparkles className="h-3.5 w-3.5" />,
        color: 'text-gray-600',
        bg: 'bg-gray-100',
      },
    };
    return icons[practice] || icons['AUTRE'];
  };

  const getPracticeLabel = (practice: string) => {
    const labels: Record<string, string> = {
      CULTURE_DE_COUVERTURE: 'Culture de couverture',
      AGROFORESTERIE: 'Agroforesterie',
      COMPOSTAGE: 'Compostage',
      MULCHING: 'Paillage',
      ZAI: 'Zai',
      BANDES_ENHERBEES: 'Bandes enherbées',
      IRRIGATION_ECONOMIE_EAU: 'Irrigation économie d\'eau',
      TERRASSEMENT: 'Terrassement',
      HAIES_VIVES: 'Haies vives',
      ARBRES_AGROFORESTIERS: 'Arbres agroforestiers',
      GOUTTE_A_GOUTTE: 'Goutte-à-goutte',
      BASSINE: 'Bassine',
      CAPTAGE_EAU: 'Captage d\'eau',
      FUMURE_ORGANIQUE: 'Fumure organique',
      CROISSANCE_VERTE: 'Engrais vert',
      BIOCHAR: 'Biochar',
      ROTATION_CULTURES: 'Rotation des cultures',
      ASSOCIATION_CULTURES: 'Association de cultures',
      SEMIS_DIRECT: 'Semis direct',
      LABOUR_MINIMAL: 'Labour minimal',
      VARIETES_RESILIENTES: 'Variétés résilientes',
      CALENDRIER_AGROCLIMATIQUE: 'Calendrier agroclimatique',
      ASSURANCE_CLIMATIQUE: 'Assurance climatique',
      AUTRE: 'Autre',
    };
    return labels[practice] || practice;
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg">
          <Shield className="h-5 w-5 text-purple-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Résilience agricole
          </h3>
          <p className="text-xs text-gray-400">Suivi des pratiques résilientes</p>
        </div>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`p-4 ${stat.bg} rounded-lg border ${stat.border} transition-all duration-200 hover:shadow-sm`}
          >
            <div className="flex items-center gap-2">
              <stat.icon className={`h-5 w-5 ${stat.color}`} />
              <span className="text-sm font-medium text-gray-600">{stat.label}</span>
            </div>
            <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      {/* Top pratiques */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            Top pratiques résilientes
          </h4>
          <span className="text-xs text-gray-400">
            {data.topPractices.length} pratiques
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {data.topPractices.map((practice) => {
            const { icon, color, bg } = getPracticeIcon(practice);
            return (
              <span
                key={practice}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 ${bg} ${color} rounded-full text-sm font-medium transition-all duration-200 hover:scale-105 cursor-default shadow-sm`}
              >
                {icon}
                {getPracticeLabel(practice)}
              </span>
            );
          })}
        </div>

        {data.topPractices.length === 0 && (
          <div className="text-center py-6 text-gray-400">
            <Leaf className="h-10 w-10 mx-auto text-gray-300 mb-2" />
            <p>Aucune pratique résiliente enregistrée</p>
          </div>
        )}
      </div>

      {/* Footer avec indicateurs */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Activity className="h-3 w-3 text-green-500" />
            Résilience active
          </span>
          <span className="flex items-center gap-1">
            <Zap className="h-3 w-3 text-yellow-500" />
            Impact positif
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Globe className="h-3 w-3 text-blue-400" />
          Adaptation climatique
        </span>
      </div>
    </Card>
  );
}

// Composants supplémentaires si non disponibles dans lucide-react
// Vous pouvez les importer ou les créer

// Pour RefreshCw (si non disponible)
// import { RefreshCw } from 'lucide-react';

// Pour Grass (si non disponible) - utiliser une alternative
const Grass = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M4 20c4-2 8-2 16-2" />
    <path d="M4 16c4-1 8-1 16-1" />
    <path d="M4 12c4-0.5 8-0.5 16-0.5" />
    <path d="M4 8c4-0.5 8-0.5 16-0.5" />
    <path d="M4 4c4-0.5 8-0.5 16-0.5" />
  </svg>
);