// components/dashboard/TrendsChart.tsx
'use client';

import { Card } from '@/components/ui/Card';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Area,
  ComposedChart,
  Bar,
} from 'recharts';
import { 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Calendar,
  ChevronDown,
  ChevronUp,
  BarChart3,
  LineChart as LineChartIcon,
  Download,
  RefreshCw,
  AlertCircle,
  AreaChart as AreaChartIcon
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface TrendsChartProps {
  data: {
    productionTrend: Array<{ period: string; value: number }>;
    adoptionTrend: Array<{ period: string; value: number }>;
  };
}

export function TrendsChart({ data }: TrendsChartProps) {
  const [chartType, setChartType] = useState<'line' | 'area' | 'composed'>('line');

  // Combiner les données pour le graphique
  const combinedData = data.productionTrend.map((item) => ({
    period: item.period,
    production: item.value,
    adoption: data.adoptionTrend.find((a) => a.period === item.period)?.value || 0,
  }));

  // Calculer les tendances
  const getTrend = (data: number[]) => {
    if (data.length < 2) return 0;
    const first = data[0];
    const last = data[data.length - 1];
    return last - first;
  };

  const productionTrend = getTrend(combinedData.map(d => d.production));
  const adoptionTrend = getTrend(combinedData.map(d => d.adoption));

  // Custom Tooltip
  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 rounded-xl shadow-xl border border-gray-100 min-w-[180px]">
          <p className="font-semibold text-gray-900 border-b border-gray-100 pb-2 mb-2">
            {label}
          </p>
          {payload.map((item: any, index: number) => (
            <div key={index} className="flex items-center justify-between py-1">
              <div className="flex items-center gap-2">
                <div 
                  className="h-2.5 w-2.5 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span className="text-sm text-gray-600">{item.name}</span>
              </div>
              <span className="text-sm font-semibold text-gray-900">
                {item.value.toFixed(1)}
                {item.name === 'Production (kg)' ? ' kg' : ''}
              </span>
            </div>
          ))}
          <div className="mt-2 pt-2 border-t border-gray-100 text-xs text-gray-400">
            Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}
          </div>
        </div>
      );
    }
    return null;
  };

  // Render du graphique selon le type
  const renderChart = () => {
    // Configuration commune
    const commonProps = {
      data: combinedData,
      margin: { top: 10, right: 30, left: 0, bottom: 0 },
    };

    switch (chartType) {
      case 'area':
        return (
          <ComposedChart {...commonProps}>
            <defs>
              <linearGradient id="productionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="adoptionGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="period" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Area
              yAxisId="left"
              type="monotone"
              dataKey="production"
              name="Production (kg)"
              stroke="#22c55e"
              strokeWidth={2.5}
              fill="url(#productionGradient)"
              dot={{ r: 4, fill: '#22c55e', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
            />
            <Area
              yAxisId="right"
              type="monotone"
              dataKey="adoption"
              name="Nouvelles pratiques"
              stroke="#8b5cf6"
              strokeWidth={2.5}
              fill="url(#adoptionGradient)"
              dot={{ r: 4, fill: '#8b5cf6', strokeWidth: 2 }}
              activeDot={{ r: 6, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
            />
          </ComposedChart>
        );

      case 'composed':
        return (
          <ComposedChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="period" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Bar
              yAxisId="right"
              dataKey="adoption"
              name="Nouvelles pratiques"
              fill="#8b5cf6"
              radius={[4, 4, 0, 0]}
              barSize={20}
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="production"
              name="Production (kg)"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 5, fill: '#22c55e', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
            />
          </ComposedChart>
        );

      default:
        return (
          <LineChart {...commonProps}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="period" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="left" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" tick={{ fontSize: 11 }} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ stroke: '#e5e7eb', strokeWidth: 1 }} />
            <Legend wrapperStyle={{ paddingTop: '10px' }} />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="production"
              name="Production (kg)"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ r: 5, fill: '#22c55e', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#22c55e', stroke: '#fff', strokeWidth: 2 }}
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="adoption"
              name="Nouvelles pratiques"
              stroke="#8b5cf6"
              strokeWidth={3}
              dot={{ r: 5, fill: '#8b5cf6', strokeWidth: 2 }}
              activeDot={{ r: 7, fill: '#8b5cf6', stroke: '#fff', strokeWidth: 2 }}
            />
          </LineChart>
        );
    }
  };

  return (
    <Card className="p-6 hover:shadow-lg transition-shadow duration-300">
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg">
            <TrendingUp className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Tendances</h3>
            <p className="text-xs text-gray-400">Évolution des indicateurs clés</p>
          </div>
        </div>

        {/* Contrôles */}
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setChartType('line')}
              className={`p-1.5 rounded-md transition-all ${
                chartType === 'line'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Ligne"
            >
              <LineChartIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType('area')}
              className={`p-1.5 rounded-md transition-all ${
                chartType === 'area'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Aire"
            >
              <AreaChartIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => setChartType('composed')}
              className={`p-1.5 rounded-md transition-all ${
                chartType === 'composed'
                  ? 'bg-white shadow-sm text-blue-600'
                  : 'text-gray-400 hover:text-gray-600'
              }`}
              title="Mixte"
            >
              <BarChart3 className="h-4 w-4" />
            </button>
          </div>

          <button
            className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            title="Exporter les données"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Indicateurs de tendance */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        <div className="p-3 bg-gradient-to-br from-green-50 to-green-100/50 rounded-lg border border-green-100">
          <p className="text-xs text-green-600 font-medium">Production actuelle</p>
          <p className="text-lg font-bold text-gray-900">
            {combinedData.length > 0 ? combinedData[combinedData.length - 1]?.production.toFixed(0) : 0} kg
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            {productionTrend >= 0 ? (
              <ChevronUp className="h-3 w-3 text-green-500" />
            ) : (
              <ChevronDown className="h-3 w-3 text-red-500" />
            )}
            <span className={`text-xs font-medium ${productionTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(productionTrend).toFixed(0)}% vs période précédente
            </span>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-lg border border-purple-100">
          <p className="text-xs text-purple-600 font-medium">Nouvelles pratiques</p>
          <p className="text-lg font-bold text-gray-900">
            {combinedData.reduce((sum, d) => sum + d.adoption, 0)}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            {adoptionTrend >= 0 ? (
              <ChevronUp className="h-3 w-3 text-green-500" />
            ) : (
              <ChevronDown className="h-3 w-3 text-red-500" />
            )}
            <span className={`text-xs font-medium ${adoptionTrend >= 0 ? 'text-green-600' : 'text-red-600'}`}>
              {Math.abs(adoptionTrend).toFixed(0)}% vs période précédente
            </span>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-br from-blue-50 to-blue-100/50 rounded-lg border border-blue-100">
          <p className="text-xs text-blue-600 font-medium">Période</p>
          <p className="text-sm font-bold text-gray-900">
            {combinedData.length > 0 ? combinedData[0]?.period : '-'}
            <span className="text-gray-400 font-normal"> → </span>
            {combinedData.length > 0 ? combinedData[combinedData.length - 1]?.period : '-'}
          </p>
          <div className="flex items-center gap-1 mt-0.5">
            <Calendar className="h-3 w-3 text-gray-400" />
            <span className="text-xs text-gray-400">{combinedData.length} mois</span>
          </div>
        </div>

        <div className="p-3 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-lg border border-amber-100">
          <p className="text-xs text-amber-600 font-medium">Tendance générale</p>
          <div className="flex items-center gap-2 mt-1">
            {productionTrend >= 0 && adoptionTrend >= 0 ? (
              <>
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="text-sm font-medium text-green-600">Croissance</span>
              </>
            ) : productionTrend < 0 && adoptionTrend < 0 ? (
              <>
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span className="text-sm font-medium text-red-600">Baisse</span>
              </>
            ) : (
              <>
                <Activity className="h-5 w-5 text-amber-500" />
                <span className="text-sm font-medium text-amber-600">Mixte</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Graphique avec animation */}
      <div className="h-80">
        <AnimatePresence mode="wait">
          <motion.div
            key={chartType}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.3 }}
            className="h-full"
          >
            <ResponsiveContainer width="100%" height="100%">
              {renderChart()}
            </ResponsiveContainer>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="mt-4 pt-4 border-t border-gray-100 flex flex-wrap items-center justify-between gap-2 text-xs text-gray-400">
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" />
            Données en temps réel
          </span>
          <span className="flex items-center gap-1">
            <AlertCircle className="h-3 w-3" />
            Mise à jour automatique
          </span>
        </div>
        <span>
          {combinedData.length} points de données • Type: {chartType === 'line' ? 'Ligne' : chartType === 'area' ? 'Aire' : 'Mixte'}
        </span>
      </div>
    </Card>
  );
}