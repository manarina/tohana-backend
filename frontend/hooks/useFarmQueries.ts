// hooks/useFarmQueries.ts
import { useQuery } from '@apollo/client/react';
import {
  GET_FARMS,
  GET_ALL_FARMS,
  GET_FARM,
  GET_FARMS_BY_REGION,
  GET_FARMS_BY_PROGRAM,
  GET_BENEFICIARY_FARMS,
  GET_FARMS_COUNT,
  GET_FARM_STATS,
  GET_FARMS_PAGINATED,
} from '@/lib/graphql/queries/farms.queries';

// ============================================
// TYPES
// ============================================

interface Farm {
  id: number;
  name: string;
  description?: string;
  region: string;
  district: string;
  commune: string;
  village: string;
  fokontany?: string;
  gpsLatitude?: string;
  gpsLongitude?: string;
  totalSurface: number;
  phoneNumber?: string;
  farmerGroup?: string;
  isBeneficiary: boolean;
  programAffiliation?: string;
  notes?: string;
  createdAt: string;
  updatedAt?: string;
  user?: {
    id: number;
    name: string;
    email: string;
    role?: string;
  };
}

interface FarmsResponse {
  farms: Farm[];
}

interface AllFarmsResponse {
  allFarms: Farm[];
}

interface FarmResponse {
  farm: Farm;
}

interface FarmsByRegionResponse {
  farmsByRegion: Farm[];
}

interface FarmsByProgramResponse {
  farmsByProgram: Farm[];
}

interface BeneficiaryFarmsResponse {
  beneficiaryFarms: Farm[];
}

interface FarmsCountResponse {
  farmsCount: number;
}

interface FarmStatsResponse {
  farmStats: {
    totalFarms: number;
    totalSurface: number;
    averageSurface: number;
    beneficiaryCount: number;
    beneficiaryRate: number;
  };
}

interface FarmsPaginatedResponse {
  farmsPaginated: {
    data: Farm[];
    total: number;
    page: number;
    totalPages: number;
  };
}

// ============================================
// HOOKS
// ============================================

export function useFarms(filters?: any) {
  const { data, loading, error, refetch } = useQuery<FarmsResponse>(GET_FARMS, {
    variables: { filters },
    fetchPolicy: 'network-only',
  });

  return {
    farms: data?.farms || [],
    loading,
    error,
    refetch,
  };
}

export function useAllFarms() {
  const { data, loading, error, refetch } = useQuery<AllFarmsResponse>(GET_ALL_FARMS);

  return {
    farms: data?.allFarms || [],
    loading,
    error,
    refetch,
  };
}

export function useFarm(id: number) {
  const { data, loading, error, refetch } = useQuery<FarmResponse>(GET_FARM, {
    variables: { id },
    skip: !id,
  });

  return {
    farm: data?.farm || null,
    loading,
    error,
    refetch,
  };
}

export function useFarmsByRegion(region: string) {
  const { data, loading, error } = useQuery<FarmsByRegionResponse>(GET_FARMS_BY_REGION, {
    variables: { region },
    skip: !region,
  });

  return {
    farms: data?.farmsByRegion || [],
    loading,
    error,
  };
}

export function useFarmsByProgram(program: string) {
  const { data, loading, error } = useQuery<FarmsByProgramResponse>(GET_FARMS_BY_PROGRAM, {
    variables: { program },
    skip: !program,
  });

  return {
    farms: data?.farmsByProgram || [],
    loading,
    error,
  };
}

export function useBeneficiaryFarms() {
  const { data, loading, error } = useQuery<BeneficiaryFarmsResponse>(
    GET_BENEFICIARY_FARMS,
  );

  return {
    farms: data?.beneficiaryFarms || [],
    loading,
    error,
  };
}

export function useFarmsCount() {
  const { data, loading, error, refetch } = useQuery<FarmsCountResponse>(GET_FARMS_COUNT);

  return {
    count: data?.farmsCount || 0,
    loading,
    error,
    refetch,
  };
}

export function useFarmStats(region?: string) {
  const { data, loading, error, refetch } = useQuery<FarmStatsResponse>(GET_FARM_STATS, {
    variables: { region },
  });

  return {
    stats: data?.farmStats || {
      totalFarms: 0,
      totalSurface: 0,
      averageSurface: 0,
      beneficiaryCount: 0,
      beneficiaryRate: 0,
    },
    loading,
    error,
    refetch,
  };
}

export function useFarmsPaginated(page: number = 1, limit: number = 10) {
  const { data, loading, error, refetch } = useQuery<FarmsPaginatedResponse>(GET_FARMS_PAGINATED, {
    variables: { page, limit },
  });

  return {
    data: data?.farmsPaginated?.data || [],
    total: data?.farmsPaginated?.total || 0,
    page: data?.farmsPaginated?.page || 1,
    totalPages: data?.farmsPaginated?.totalPages || 0,
    loading,
    error,
    refetch,
  };
}