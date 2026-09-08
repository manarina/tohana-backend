// components/dashboard/AgricultureStats.tsx
'use client';

import { Card } from '@/components/ui/Card';
import { 
  Droplet, 
  TrendingUp, 
  Package, 
  Sprout,
  Wheat,
  Apple,
  Grape,
  Leaf,
  BarChart3,
  Award,
  Crop,
  Sun,
  CloudRain,
  Thermometer
} from 'lucide-react';

interface AgricultureStatsProps {
  data: {
    topCrops: Array<{
      cropType: string;
      totalQuantity: number;
      totalSurface: number;
      averageYield: number;
    }>;
    totalProduction: number;
    averageYield: number;
    irrigationCoverage: number;
  };
}

export function AgricultureStats({ data }: AgricultureStatsProps) {
  // Fonction pour obtenir l'icône en fonction du type de culture
  const getCropIcon = (cropType: string) => {
    const icons: Record<string, React.ReactNode> = {
      RIZ: <Wheat className="h-5 w-5 text-amber-600" />,
      MAIS: <Crop className="h-5 w-5 text-yellow-600" />,
      MANIOC: <Sprout className="h-5 w-5 text-green-600" />,
      PATATE_DOUCE: <Sprout className="h-5 w-5 text-orange-600" />,
      VANILLE: <Leaf className="h-5 w-5 text-emerald-600" />,
      CAFE: <Coffee className="h-5 w-5 text-brown-600" />,
      BANANE: <Apple className="h-5 w-5 text-yellow-500" />,
      MANGUE: <Apple className="h-5 w-5 text-green-500" />,
      TOMATE: <Apple className="h-5 w-5 text-red-500" />,
      AUTRE: <Sprout className="h-5 w-5 text-gray-500" />,
    };
    return icons[cropType] || icons['AUTRE'];
  };

  // Fonction pour obtenir la couleur de fond en fonction du type de culture
  const getCropColor = (cropType: string) => {
    const colors: Record<string, string> = {
      RIZ: 'bg-amber-50 border-amber-200',
      MAIS: 'bg-yellow-50 border-yellow-200',
      MANIOC: 'bg-green-50 border-green-200',
      PATATE_DOUCE: 'bg-orange-50 border-orange-200',
      VANILLE: 'bg-emerald-50 border-emerald-200',
      CAFE: 'bg-amber-50 border-amber-200',
      BANANE: 'bg-yellow-50 border-yellow-200',
      MANGUE: 'bg-green-50 border-green-200',
      TOMATE: 'bg-red-50 border-red-200',
      AUTRE: 'bg-gray-50 border-gray-200',
    };
    return colors[cropType] || colors['AUTRE'];
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      {/* En-tête */}
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <Sprout className="h-5 w-5 text-green-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Production agricole
          </h3>
          <p className="text-xs text-gray-400">Vue d'ensemble des productions</p>
        </div>
      </div>

      {/* Statistiques clés */}
      <div className="grid grid-cols-3 gap-4 mb-6">
        <div className="p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg text-center border border-blue-100">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Package className="h-4 w-4 text-blue-600" />
            <p className="text-xs font-medium text-blue-600">Production totale</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {data.totalProduction.toFixed(1)}
            <span className="text-sm font-normal text-gray-500 ml-1">kg</span>
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg text-center border border-purple-100">
          <div className="flex items-center justify-center gap-2 mb-1">
            <TrendingUp className="h-4 w-4 text-purple-600" />
            <p className="text-xs font-medium text-purple-600">Rendement moyen</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {data.averageYield.toFixed(1)}
            <span className="text-sm font-normal text-gray-500 ml-1">kg/ha</span>
          </p>
        </div>

        <div className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100/50 rounded-lg text-center border border-cyan-100">
          <div className="flex items-center justify-center gap-2 mb-1">
            <Droplet className="h-4 w-4 text-cyan-600" />
            <p className="text-xs font-medium text-cyan-600">Couverture irrigation</p>
          </div>
          <p className="text-2xl font-bold text-gray-900">
            {data.irrigationCoverage.toFixed(1)}
            <span className="text-sm font-normal text-gray-500 ml-1">%</span>
          </p>
        </div>
      </div>

      {/* Top cultures */}
      <div className="space-y-3">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-medium text-gray-700 flex items-center gap-2">
            <Award className="h-4 w-4 text-amber-500" />
            Top cultures
          </h4>
          <span className="text-xs text-gray-400">Quantité • Surface</span>
        </div>

        {data.topCrops.slice(0, 5).map((crop, index) => (
          <div
            key={crop.cropType}
            className={`flex items-center justify-between p-3 rounded-lg border ${getCropColor(
              crop.cropType
            )} hover:shadow-md transition-all duration-200 group`}
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-white shadow-sm">
                <span className="text-xs font-bold text-gray-600">{index + 1}</span>
              </div>
              <div className="flex items-center gap-2">
                {getCropIcon(crop.cropType)}
                <span className="font-medium text-gray-900 group-hover:text-gray-700 transition-colors">
                  {crop.cropType}
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4 text-sm">
              <span className="text-gray-600 font-medium">
                {crop.totalQuantity.toFixed(0)}
                <span className="text-gray-400 font-normal ml-1">kg</span>
              </span>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">
                {crop.totalSurface.toFixed(1)}
                <span className="text-gray-400 ml-1">ha</span>
              </span>
              <div className="hidden sm:flex items-center gap-1 px-2 py-0.5 bg-white/50 rounded-full">
                <BarChart3 className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-500">
                  {crop.averageYield.toFixed(0)} kg/ha
                </span>
              </div>
            </div>
          </div>
        ))}

        {data.topCrops.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <Sprout className="h-12 w-12 mx-auto text-gray-300 mb-2" />
            <p>Aucune donnée de culture disponible</p>
          </div>
        )}
      </div>

      {/* Footer avec indicateurs */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <Sun className="h-3 w-3 text-yellow-500" />
            Saison en cours
          </span>
          <span className="flex items-center gap-1">
            <CloudRain className="h-3 w-3 text-blue-400" />
            Pluies attendues
          </span>
        </div>
        <span className="flex items-center gap-1">
          <Thermometer className="h-3 w-3 text-orange-400" />
          Température moyenne: 25°C
        </span>
      </div>
    </Card>
  );
}

// Composant Coffee pour l'icône (si non disponible dans lucide-react)
// Vous pouvez utiliser une autre icône ou importer Coffee de lucide-react
// import { Coffee } from 'lucide-react';
// Si Coffee n'existe pas, utilisez Bean ou un autre
const Coffee = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
    <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
    <line x1="6" y1="2" x2="6" y2="4" />
    <line x1="10" y1="2" x2="10" y2="4" />
    <line x1="14" y1="2" x2="14" y2="4" />
  </svg>
);