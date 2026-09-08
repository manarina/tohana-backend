// components/stats/StatsHeader.tsx
'use client';

import { BarChart3, Download, RefreshCw } from 'lucide-react';
import { motion } from 'framer-motion';

interface StatsHeaderProps {
  timeRange: string;
  onTimeRangeChange: (value: string) => void;
  onRefresh: () => void;
  isLoading?: boolean;
}

export function StatsHeader({ 
  timeRange, 
  onTimeRangeChange, 
  onRefresh, 
  isLoading = false 
}: StatsHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-gradient-to-br from-blue-100 to-blue-200 rounded-xl">
          <BarChart3 className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Statistiques</h1>
          <p className="text-gray-500 mt-0.5">
            Analyse détaillée des données agricoles
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
          className="px-3 py-2 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none bg-white"
        >
          <option value="7d">7 derniers jours</option>
          <option value="30d">30 derniers jours</option>
          <option value="90d">90 derniers jours</option>
          <option value="12m">12 derniers mois</option>
        </select>
        <button className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
          <Download className="h-4 w-4 text-gray-500" />
        </button>
        <button 
          onClick={onRefresh}
          className="p-2 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <RefreshCw className={`h-4 w-4 text-gray-500 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
    </motion.div>
  );
}