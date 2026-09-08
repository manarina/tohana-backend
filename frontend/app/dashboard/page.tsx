// app/dashboard/page.tsx
'use client';

import { useQuery } from '@apollo/client/react';
import { GET_DASHBOARD } from '@/lib/graphql/queries/dashboard.queries';
import { OverviewStats } from '@/components/dashboard/OverviewStats';
import { AgricultureStats } from '@/components/dashboard/AgricultureStats';
import { ResilienceStats } from '@/components/dashboard/ResilienceStats';
import { TrendsChart } from '@/components/dashboard/TrendsChart';
import { Card } from '@/components/ui/Card';
import { 
  Loader2, 
  Calendar, 
  LayoutDashboard, 
  MapPin, 
  Sprout,
  TrendingUp,
  Users,
  Droplet,
  Shield,
  BarChart3,
  Leaf
} from 'lucide-react';

export default function DashboardPage() {
  const { data, loading, error } = useQuery<{ dashboard: any }>(GET_DASHBOARD);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-green-600 mx-auto" />
          <p className="mt-4 text-gray-500">Chargement du dashboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6">
        <h3 className="text-red-800 font-medium">Erreur de chargement</h3>
        <p className="text-red-600 mt-1">{error.message}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-4 btn-primary"
        >
          Réessayer
        </button>
      </div>
    );
  }

  const dashboard = data?.dashboard;

  return (
    <div className="space-y-6">
      {/* ========================================================
          EN-TÊTE
      ======================================================== */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-green-100 rounded-xl">
            <LayoutDashboard className="h-6 w-6 text-green-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
            <p className="text-gray-500 mt-0.5">
              Vue d'ensemble de la résilience agricole
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2 sm:mt-0">
          <Calendar className="h-4 w-4 text-gray-400" />
          <span className="text-sm text-gray-500">
            Dernière mise à jour:{' '}
            {new Date(dashboard?.lastUpdated).toLocaleString()}
          </span>
        </div>
      </div>

      {/* ========================================================
          STATISTIQUES GÉNÉRALES
      ======================================================== */}
      <OverviewStats data={dashboard.overview} />

      {/* ========================================================
          AGRICULTURE & RÉSILIENCE
      ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AgricultureStats data={dashboard.agriculture} />
        <ResilienceStats data={dashboard.resilience} />
      </div>

      {/* ========================================================
          TENDANCES
      ======================================================== */}
      <TrendsChart data={dashboard.trends} />

      {/* ========================================================
          DISTRIBUTION RÉGIONALE
      ======================================================== */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-blue-50 rounded-lg">
            <MapPin className="h-5 w-5 text-blue-600" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">
            Distribution régionale
          </h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {dashboard.regionalDistribution.map((region: any) => (
            <div
              key={region.region}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className="h-3 w-3 rounded-full bg-green-500" />
                <span className="font-medium text-gray-700">{region.region}</span>
              </div>
              <div className="text-sm text-gray-600">
                <span className="font-semibold">{region.farmsCount}</span> exploitations
                <span className="mx-2">•</span>
                <span className="font-semibold">{region.totalSurface.toFixed(1)}</span> ha
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* ========================================================
          QUICK ACTIONS / RESSOURCES
      ======================================================== */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-50 rounded-lg">
              <Sprout className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Pratiques</p>
              <p className="text-xs text-gray-400">Résilientes</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-50 rounded-lg">
              <Droplet className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Irrigation</p>
              <p className="text-xs text-gray-400">Gestion de l'eau</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <Shield className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Résilience</p>
              <p className="text-xs text-gray-400">Climatique</p>
            </div>
          </div>
        </div>
        <div className="bg-white rounded-xl shadow-md p-4 hover:shadow-lg transition-shadow">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-50 rounded-lg">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-700">Communauté</p>
              <p className="text-xs text-gray-400">Agricole</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}