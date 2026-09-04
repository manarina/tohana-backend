// src/modules/dashboard/dto/dashboard-response.dto.ts
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';

// ============================================
// 📊 OVERVIEW - Vue d'ensemble
// ============================================

@ObjectType()
export class OverviewStats {
  @Field(() => Int)
  totalFarms!: number;

  @Field(() => Int)
  totalPlots!: number;

  @Field(() => Float)
  totalSurface!: number;

  @Field(() => Int)
  totalHarvests!: number;

  @Field(() => Float)
  totalProduction!: number;

  @Field(() => Int)
  totalPractices!: number;

  @Field(() => Float)
  practiceAdoptionRate!: number;

  @Field(() => Int)
  totalUsers!: number;

  @Field(() => Int)
  womenFarmers!: number;
}

// ============================================
// 🌾 AGRICULTURE
// ============================================

@ObjectType()
export class CropProduction {
  @Field()
  cropType!: string;

  @Field(() => Float)
  totalQuantity!: number;

  @Field(() => Float)
  totalSurface!: number;

  @Field(() => Float)
  averageYield!: number;
}

@ObjectType()
export class AgricultureStats {
  @Field(() => [CropProduction])
  topCrops!: CropProduction[];

  @Field(() => Float)
  totalProduction!: number;

  @Field(() => Float)
  averageYield!: number;

  @Field(() => Float)
  irrigationCoverage!: number;
}

// ============================================
// 🌱 RESILIENCE - Résilience
// ============================================

@ObjectType()
export class ResilienceStats {
  @Field(() => Int)
  totalPractices!: number;

  @Field(() => Float)
  adoptionRate!: number;

  @Field(() => Float)
  averageYieldImprovement!: number;

  @Field(() => Float)
  stillPracticedRate!: number;

  @Field(() => [String])
  topPractices!: string[];
}

// ============================================
// 📈 TRENDS - Tendances
// ============================================

@ObjectType()
export class TrendData {
  @Field()
  period!: string;

  @Field(() => Float)
  value!: number;
}

@ObjectType()
export class TrendsStats {
  @Field(() => [TrendData])
  productionTrend!: TrendData[];

  @Field(() => [TrendData])
  adoptionTrend!: TrendData[];
}

// ============================================
// 🌍 MAP - Données géographiques
// ============================================

@ObjectType()
export class RegionData {
  @Field()
  region!: string;

  @Field(() => Int)
  farmsCount!: number;

  @Field(() => Float)
  totalSurface!: number;
}

// ============================================
// 📊 DASHBOARD COMPLET
// ============================================

@ObjectType()
export class DashboardResponse {
  @Field(() => OverviewStats)
  overview!: OverviewStats;

  @Field(() => AgricultureStats)
  agriculture!: AgricultureStats;

  @Field(() => ResilienceStats)
  resilience!: ResilienceStats;

  @Field(() => TrendsStats)
  trends!: TrendsStats;

  @Field(() => [RegionData])
  regionalDistribution!: RegionData[];

  @Field()
  lastUpdated!: Date;
}