// types/index.ts
export interface User {
  id: number;
  email: string;
  name: string;
  role: 'ADMIN' | 'FIELD_AGENT' | 'COORDINATOR' | 'VIEWER';
  region?: string;
  district?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Farm {
  id: number;
  name: string;
  description?: string;
  region: string;
  district: string;
  commune: string;
  village: string;
  totalSurface: number;
  isBeneficiary: boolean;
  programAffiliation?: string;
  userId: number;
  user: User;
  createdAt: string;
  updatedAt: string;
}

export interface Plot {
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
  farmId: number;
  farm: Farm;
  createdAt: string;
  updatedAt: string;
}

export interface Practice {
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
  challenges?: string;
  satisfactionRating?: number;
  recommendation?: string;
  farmId: number;
  farm: Farm;
  createdAt: string;
  updatedAt: string;
}

export interface Harvest {
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
  plotId: number;
  plot: Plot;
  createdAt: string;
  updatedAt: string;
}

export interface DashboardData {
  overview: {
    totalFarms: number;
    totalPlots: number;
    totalSurface: number;
    totalHarvests: number;
    totalProduction: number;
    totalPractices: number;
    practiceAdoptionRate: number;
    totalUsers: number;
    womenFarmers: number;
  };
  agriculture: {
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
  resilience: {
    totalPractices: number;
    adoptionRate: number;
    averageYieldImprovement: number;
    stillPracticedRate: number;
    topPractices: string[];
  };
  trends: {
    productionTrend: Array<{ period: string; value: number }>;
    adoptionTrend: Array<{ period: string; value: number }>;
  };
  regionalDistribution: Array<{
    region: string;
    farmsCount: number;
    totalSurface: number;
  }>;
  lastUpdated: string;
}