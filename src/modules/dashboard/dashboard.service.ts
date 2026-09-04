// src/modules/dashboard/dashboard.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Between } from 'typeorm';
import { DashboardFiltersInput } from './dto/dashboard-filters.input';
import { Farm } from '../farms/entities/farm.entity';
import { Plot } from '../plots/entities/plot.entity';
import { ClimatePractice } from '../practices/entities/climate-practice.entity';
import { Harvest } from '../harvests/entities/harvest.entity';
import { User } from '../users/entities/user.entity';
import { Regions } from '../../common/constants/regions.enum';

@Injectable()
export class DashboardService {
  private readonly logger = new Logger(DashboardService.name);

  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
    @InjectRepository(Plot)
    private plotRepository: Repository<Plot>,
    @InjectRepository(ClimatePractice)
    private practiceRepository: Repository<ClimatePractice>,
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  // ============================================
  // 📊 GET DASHBOARD
  // ============================================

  async getDashboard(filters?: DashboardFiltersInput): Promise<any> {
    this.logger.log('📊 Génération du dashboard');

    const where = this.buildWhereClause(filters);

    // Exécuter toutes les requêtes en parallèle
    const [
      overview,
      agriculture,
      resilience,
      trends,
      regionalDistribution,
    ] = await Promise.all([
      this.getOverview(where),
      this.getAgricultureStats(where),
      this.getResilienceStats(where),
      this.getTrends(where),
      this.getRegionalDistribution(filters?.region as Regions), // ✅ Cast explicite
    ]);

    return {
      overview,
      agriculture,
      resilience,
      trends,
      regionalDistribution,
      lastUpdated: new Date(),
    };
  }

  // ============================================
  // 📊 OVERVIEW
  // ============================================

  private async getOverview(where: any): Promise<any> {
    // Farms
    const farms = await this.farmRepository.find({ where });
    const totalFarms = farms.length;
    const totalSurface = farms.reduce((sum, f) => sum + Number(f.totalSurface), 0);

    // Plots
    const plots = await this.plotRepository.find({ where: { farmId: where.farmId ? Between(where.farmId, where.farmId) : undefined } });
    const totalPlots = plots.length;

    // Harvests
    const harvests = await this.harvestRepository.find({ where });
    const totalHarvests = harvests.length;
    const totalProduction = harvests.reduce((sum, h) => sum + Number(h.quantity), 0);

    // Practices
    const practices = await this.practiceRepository.find({ where });
    const totalPractices = practices.length;
    const farmsWithPractices = new Set(practices.map(p => p.farmId)).size;
    const practiceAdoptionRate = totalFarms > 0 ? (farmsWithPractices / totalFarms) * 100 : 0;

    // Users
    const users = await this.userRepository.find();
    const totalUsers = users.length;
    const womenFarmers = farms.filter(f => f.farmerGroup === 'FEMME').length;

    return {
      totalFarms,
      totalPlots,
      totalSurface: Number(totalSurface.toFixed(2)),
      totalHarvests,
      totalProduction: Number(totalProduction.toFixed(2)),
      totalPractices,
      practiceAdoptionRate: Number(practiceAdoptionRate.toFixed(2)),
      totalUsers,
      womenFarmers,
    };
  }

  // ============================================
  // 🌾 AGRICULTURE
  // ============================================

  private async getAgricultureStats(where: any): Promise<any> {
    // Récupérer les récoltes avec les parcelles
    const harvests = await this.harvestRepository.find({
      where,
      relations: ['plot'],
    });

    // Statistiques par culture
    const cropMap = harvests.reduce((acc, h) => {
      if (h.plot && h.plot.cropType) {
        const crop = h.plot.cropType;
        if (!acc[crop]) {
          acc[crop] = { totalQuantity: 0, totalSurface: 0, count: 0 };
        }
        acc[crop].totalQuantity += Number(h.quantity);
        acc[crop].totalSurface += Number(h.plot.surface);
        acc[crop].count += 1;
      }
      return acc;
    }, {} as Record<string, { totalQuantity: number; totalSurface: number; count: number }>);

    const topCrops = Object.entries(cropMap)
      .map(([cropType, stats]) => ({
        cropType,
        totalQuantity: Number(stats.totalQuantity.toFixed(2)),
        totalSurface: Number(stats.totalSurface.toFixed(2)),
        averageYield: stats.count > 0 ? Number((stats.totalQuantity / stats.totalSurface).toFixed(2)) : 0,
      }))
      .sort((a, b) => b.totalQuantity - a.totalQuantity)
      .slice(0, 10);

    const totalProduction = harvests.reduce((sum, h) => sum + Number(h.quantity), 0);

    // Calculer la couverture d'irrigation
    const plots = await this.plotRepository.find({ where });
    const irrigatedPlots = plots.filter(p => p.irrigationType && p.irrigationType !== 'PLUIE');
    const irrigationCoverage = plots.length > 0 ? (irrigatedPlots.length / plots.length) * 100 : 0;

    return {
      topCrops,
      totalProduction: Number(totalProduction.toFixed(2)),
      averageYield: harvests.length > 0 ? Number((totalProduction / harvests.length).toFixed(2)) : 0,
      irrigationCoverage: Number(irrigationCoverage.toFixed(2)),
    };
  }

  // ============================================
  // 🌱 RESILIENCE
  // ============================================

  private async getResilienceStats(where: any): Promise<any> {
    const practices = await this.practiceRepository.find({ where });

    const totalPractices = practices.length;

    // Calculer le taux d'adoption
    const farmsWithPractices = new Set(practices.map(p => p.farmId)).size;
    const totalFarms = await this.farmRepository.count({ where });
    const adoptionRate = totalFarms > 0 ? (farmsWithPractices / totalFarms) * 100 : 0;

    // Amélioration moyenne des rendements
    const yields = practices
      .filter(p => p.yieldImprovement)
      .map(p => Number(p.yieldImprovement));
    const averageYieldImprovement = yields.length > 0
      ? yields.reduce((a, b) => a + b, 0) / yields.length
      : 0;

    // Taux de pratique continue
    const stillPracticed = practices.filter(p => p.isStillPracticed).length;
    const stillPracticedRate = totalPractices > 0 ? (stillPracticed / totalPractices) * 100 : 0;

    // Top 5 pratiques
    const practiceCount = practices.reduce((acc, p) => {
      acc[p.practiceType] = (acc[p.practiceType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topPractices = Object.entries(practiceCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([type]) => type);

    return {
      totalPractices,
      adoptionRate: Number(adoptionRate.toFixed(2)),
      averageYieldImprovement: Number(averageYieldImprovement.toFixed(2)),
      stillPracticedRate: Number(stillPracticedRate.toFixed(2)),
      topPractices,
    };
  }

  // ============================================
  // 📈 TRENDS
  // ============================================

  private async getTrends(where: any): Promise<any> {
    // Production trend (par mois)
    const harvests = await this.harvestRepository.find({
      where,
      order: { harvestDate: 'ASC' },
    });

    const productionMap = harvests.reduce((acc, h) => {
      const date = new Date(h.harvestDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!acc[key]) acc[key] = 0;
      acc[key] += Number(h.quantity);
      return acc;
    }, {} as Record<string, number>);

    const productionTrend = Object.entries(productionMap)
      .map(([period, value]) => ({
        period,
        value: Number(value.toFixed(2)),
      }))
      .slice(-12);

    // Adoption trend (pratiques par mois)
    const practices = await this.practiceRepository.find({
      where,
      order: { adoptionDate: 'ASC' },
    });

    const adoptionMap = practices.reduce((acc, p) => {
      const date = new Date(p.adoptionDate);
      const key = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
      if (!acc[key]) acc[key] = 0;
      acc[key] += 1;
      return acc;
    }, {} as Record<string, number>);

    const adoptionTrend = Object.entries(adoptionMap)
      .map(([period, value]) => ({
        period,
        value,
      }))
      .slice(-12);

    return {
      productionTrend,
      adoptionTrend,
    };
  }

  // ============================================
  // 🌍 REGIONAL DISTRIBUTION - CORRIGÉE
  // ============================================

  private async getRegionalDistribution(regionFilter?: Regions): Promise<any> {
    const where: any = {};
    if (regionFilter) {
      where.region = regionFilter;
    }
    const farms = await this.farmRepository.find({ where });

    const regionMap = farms.reduce((acc, f) => {
      const region = f.region;
      if (!acc[region]) {
        acc[region] = { farmsCount: 0, totalSurface: 0 };
      }
      acc[region].farmsCount += 1;
      acc[region].totalSurface += Number(f.totalSurface);
      return acc;
    }, {} as Record<string, { farmsCount: number; totalSurface: number }>);

    return Object.entries(regionMap)
      .map(([region, data]) => ({
        region,
        farmsCount: data.farmsCount,
        totalSurface: Number(data.totalSurface.toFixed(2)),
      }))
      .sort((a, b) => b.farmsCount - a.farmsCount);
  }

  // ============================================
  // 🔧 HELPERS
  // ============================================

  private buildWhereClause(filters?: DashboardFiltersInput): any {
    const where: any = {};

    if (filters?.region) {
      where.region = filters.region;
    }

    if (filters?.district) {
      where.district = filters.district;
    }

    if (filters?.year) {
      const year = parseInt(filters.year);
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31);
      where.harvestDate = Between(startDate, endDate);
    }

    return where;
  }
}