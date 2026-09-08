// app/stats/page.tsx
'use client';

import { useState } from 'react';
import { useQuery } from '@apollo/client/react';
import { Layout } from '@/components/common/Layout';
import { GET_DASHBOARD } from '@/lib/graphql/queries/dashboard.queries';
import { StatsHeader } from '@/components/stats/StatsHeader';
import { StatsCards } from '@/components/stats/StatsCards';
import { StatsProductionChart } from '@/components/stats/StatsProductionChart';
import { StatsCropDistribution } from '@/components/stats/StatsCropDistribution';
import { StatsResilience } from '@/components/stats/StatsResilience';
import { StatsAdoptionTrend } from '@/components/stats/StatsAdoptionTrend';
import { StatsRegionalDistribution } from '@/components/stats/StatsRegionalDistribution';
import { StatsPerformance } from '@/components/stats/StatsPerformance';
import { Loader2 } from 'lucide-react';

// ============================================================
// HELPERS
// ============================================================

function getCropColor(cropType: string): string {
  const colors: Record<string, string> = {
    RIZ: '#22c55e',
    MANIOC: '#f59e0b',
    MAIS: '#3b82f6',
    LEGUMINEUSES: '#8b5cf6',
    PATATE_DOUCE: '#ef4444',
    VANILLE: '#a855f7',
    CAFE: '#78716c',
    AUTRE: '#6b7280',
  };
  return colors[cropType] || '#6b7280';
}

type DashboardQueryResult = {
  dashboard?: any;
};

// ============================================================
// PAGE
// ============================================================

export default function StatsPage() {
  const [timeRange, setTimeRange] = useState('30d');
  const { data, loading, error, refetch } = useQuery<DashboardQueryResult>(GET_DASHBOARD, {
    fetchPolicy: 'network-only',
  });

  const dashboard = data?.dashboard;

  // Préparation des données
  const productionData = dashboard?.trends?.productionTrend?.map((item: any) => ({
    month: item.period,
    production: item.value,
  })) || [];

  const adoptionData = dashboard?.trends?.adoptionTrend?.map((item: any) => ({
    month: item.period,
    adoption: item.value,
  })) || [];

  const cropDistribution = dashboard?.agriculture?.topCrops?.map((crop: any) => ({
    name: crop.cropType,
    value: crop.totalQuantity,
    color: getCropColor(crop.cropType),
  })) || [];

  const regionalData = dashboard?.regionalDistribution?.map((region: any) => ({
    region: region.region,
    farms: region.farmsCount,
    surface: region.totalSurface,
    production: region.totalSurface * 500,
  })) || [];

  if (loading) {
    return (
      <Layout>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
            <p className="mt-4 text-gray-500">Chargement des statistiques...</p>
          </div>
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
          <p className="text-red-600 mt-1">{error.message}</p>
          <button onClick={() => refetch()} className="mt-4 btn-primary">
            Réessayer
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-6">
        {/* En-tête */}
        <StatsHeader
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
          onRefresh={() => refetch()}
        />

        {/* Cartes de statistiques */}
        <StatsCards data={dashboard?.overview} />

        {/* Graphiques principaux */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <StatsProductionChart data={productionData} />
          </div>
          <StatsCropDistribution data={cropDistribution} />
        </div>

        {/* Graphiques secondaires */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <StatsResilience data={dashboard?.resilience} />
          <StatsAdoptionTrend data={adoptionData} />
        </div>

        {/* Distribution régionale */}
        <StatsRegionalDistribution data={regionalData} />

        {/* Indicateurs de performance */}
        <StatsPerformance
          data={{
            totalUsers: dashboard?.overview?.totalUsers || 0,
            adoptionRate: dashboard?.resilience?.adoptionRate || 0,
            irrigationCoverage: dashboard?.agriculture?.irrigationCoverage || 0,
            averageYield: dashboard?.agriculture?.averageYield || 0,
          }}
        />

        {/* Dernière mise à jour */}
        <div className="text-right text-xs text-gray-400">
          Dernière mise à jour: {dashboard?.lastUpdated ? new Date(dashboard.lastUpdated).toLocaleString() : 'N/A'}
        </div>
      </div>
    </Layout>
  );
}