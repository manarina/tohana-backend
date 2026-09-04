// src/modules/harvests/harvests.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between } from 'typeorm';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestInput } from './dto/create-harvest.input';
import { UpdateHarvestInput } from './dto/update-harvest.input';
import { HarvestFiltersInput } from './dto/harvest-filters.input';
import { Plot } from '../plots/entities/plot.entity';
import { Farm } from '../farms/entities/farm.entity';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../common/constants/roles.enum';

@Injectable()
export class HarvestsService {
  constructor(
    @InjectRepository(Harvest)
    private harvestRepository: Repository<Harvest>,
    @InjectRepository(Plot)
    private plotRepository: Repository<Plot>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  // ============================================
  // 📋 READ - Récupérer toutes les récoltes
  // ============================================

  async findAll(filters?: HarvestFiltersInput, user?: User): Promise<Harvest[]> {
    const where: FindOptionsWhere<Harvest> = {};

    if (filters) {
      if (filters.season) where.season = filters.season;
      if (filters.plotId) where.plotId = filters.plotId;
      if (filters.quality) where.quality = filters.quality;
      if (filters.minQuantity !== undefined || filters.maxQuantity !== undefined) {
        const min = filters.minQuantity || 0;
        const max = filters.maxQuantity || 1000000;
        where.quantity = Between(min, max);
      }

      if (filters.startDate && filters.endDate) {
        const start = new Date(filters.startDate);
        const end = new Date(filters.endDate);
        where.harvestDate = Between(start, end);
      }

      if (filters.searchTerm) {
        return this.harvestRepository
          .createQueryBuilder('harvest')
          .leftJoinAndSelect('harvest.plot', 'plot')
          .leftJoinAndSelect('plot.farm', 'farm')
          .leftJoinAndSelect('farm.user', 'user')
          .where('harvest.season ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('harvest.buyer ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('harvest.quality ILIKE :search', { search: `%${filters.searchTerm}%` })
          .skip(filters.offset || 0)
          .take(filters.limit || 100)
          .getMany();
      }
    }

    if (user && user.role !== Roles.ADMIN) {
      const farms = await this.farmRepository.find({
        where: { userId: user.id },
        select: ['id'],
      });
      const farmIds = farms.map(f => f.id);
      if (farmIds.length > 0) {
        const plots = await this.plotRepository.find({
          where: { farmId: Between(Math.min(...farmIds), Math.max(...farmIds)) },
          select: ['id'],
        });
        const plotIds = plots.map(p => p.id);
        if (plotIds.length > 0) {
          where.plotId = Between(Math.min(...plotIds), Math.max(...plotIds));
        } else {
          return [];
        }
      } else {
        return [];
      }
    }

    return this.harvestRepository.find({
      where,
      relations: ['plot', 'plot.farm', 'plot.farm.user'],
      skip: filters?.offset || 0,
      take: filters?.limit || 100,
      order: { harvestDate: 'DESC' },
    });
  }

  // ============================================
  // 🔍 READ - Récupérer une récolte par ID
  // ============================================

  async findOne(id: number, user?: User): Promise<Harvest> {
    const harvest = await this.harvestRepository.findOne({
      where: { id },
      relations: ['plot', 'plot.farm', 'plot.farm.user'],
    });

    if (!harvest) {
      throw new NotFoundException(`Récolte avec l'ID ${id} non trouvée`);
    }

    if (user && user.role !== Roles.ADMIN && harvest.plot.farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette récolte');
    }

    return harvest;
  }

  // ============================================
  // 📝 CREATE - Créer une récolte
  // ============================================

  async create(createHarvestInput: CreateHarvestInput, user?: User): Promise<Harvest> {
    const plot = await this.plotRepository.findOne({
      where: { id: createHarvestInput.plotId },
      relations: ['farm', 'farm.user'],
    });

    if (!plot) {
      throw new NotFoundException(`Parcelle avec l'ID ${createHarvestInput.plotId} non trouvée`);
    }

    if (user && user.role !== Roles.ADMIN && plot.farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette parcelle');
    }

    const quantity = createHarvestInput.quantity;
    const surface = Number(plot.surface);
    const salePrice = createHarvestInput.salePrice || 0;

    const yieldPerHectare = surface > 0 ? quantity / surface : 0;
    const totalRevenue = salePrice > 0 ? quantity * salePrice : 0;

    const harvestData = {
      ...createHarvestInput,
      harvestDate: new Date(createHarvestInput.harvestDate),
      yieldPerHectare,
      totalRevenue,
    };

    const harvest = this.harvestRepository.create(harvestData);
    const savedHarvest = await this.harvestRepository.save(harvest);

    await this.plotRepository.update(plot.id, {
      actualYield: yieldPerHectare,
    });

    const result = await this.harvestRepository.findOne({
      where: { id: savedHarvest.id },
      relations: ['plot', 'plot.farm', 'plot.farm.user'],
    });

    if (!result) {
      throw new Error('Harvest not found after creation');
    }

    return result;
  }

  // ============================================
  // ✏️ UPDATE - Mettre à jour une récolte
  // ============================================

  async update(id: number, updateHarvestInput: UpdateHarvestInput, user?: User): Promise<Harvest> {
    const harvest = await this.findOne(id, user);

    const { id: _, ...updateData } = updateHarvestInput as Partial<Harvest>;

    if (updateData.quantity || updateData.salePrice) {
      const plot = await this.plotRepository.findOne({
        where: { id: harvest.plotId },
      });

      if (!plot) {
        throw new Error('Plot not found for harvest');
      }

      const quantity = updateData.quantity || harvest.quantity;
      const surface = Number(plot.surface);
      const salePrice = updateData.salePrice !== undefined ? updateData.salePrice : harvest.salePrice;

      updateData.yieldPerHectare = surface > 0 ? quantity / surface : 0;
      updateData.totalRevenue = salePrice > 0 ? quantity * salePrice : 0;
    }

    if (updateData.harvestDate) {
      updateData.harvestDate = new Date(updateData.harvestDate) as any;
    }

    Object.assign(harvest, updateData);
    const updatedHarvest = await this.harvestRepository.save(harvest);

    if (updateData.quantity) {
      await this.plotRepository.update(harvest.plotId, {
        actualYield: updatedHarvest.yieldPerHectare,
      });
    }

    return (await this.harvestRepository.findOne({
      where: { id: updatedHarvest.id },
      relations: ['plot', 'plot.farm', 'plot.farm.user'],
    }))!;
  }

  // ============================================
  // 🗑️ DELETE - Supprimer une récolte
  // ============================================

  async remove(id: number, user?: User): Promise<boolean> {
    const harvest = await this.findOne(id, user);
    const result = await this.harvestRepository.delete(harvest.id);

    if (result.affected === 0) {
      throw new NotFoundException(`Récolte avec l'ID ${id} non trouvée`);
    }

    return true;
  }

  // ============================================
  // 📊 STATISTIQUES - CORRIGÉ
  // ============================================
  // src/modules/harvests/harvests.service.ts
// Remplacer la méthode getStats par celle-ci :

async getStats(farmId?: number): Promise<any> {
  const where: FindOptionsWhere<Harvest> = {};

  if (farmId) {
    const plots = await this.plotRepository.find({
      where: { farmId },
      select: ['id'],
    });
    const plotIds = plots.map(p => p.id);
    if (plotIds.length > 0) {
      where.plotId = Between(Math.min(...plotIds), Math.max(...plotIds));
    } else {
      // ✅ Retourner des valeurs par défaut
      return {
        totalHarvests: 0,
        totalQuantity: 0,
        averageYield: 0,
        totalRevenue: 0,
        seasonStats: [], // ✅ Tableau vide au lieu d'objet
        topCrops: [],
      };
    }
  }

  // ✅ Charger les relations
  const harvests = await this.harvestRepository.find({
    where,
    relations: ['plot'],
  });

  const totalHarvests = harvests.length;
  const totalQuantity = harvests.reduce((sum, h) => sum + Number(h.quantity), 0);
  const totalRevenue = harvests.reduce((sum, h) => sum + Number(h.totalRevenue || 0), 0);

  // ✅ Statistiques par saison - sous forme de tableau
  const seasonMap = harvests.reduce((acc, h) => {
    const season = h.season || 'NON_SPECIFIE';
    if (!acc[season]) {
      acc[season] = { count: 0, totalQuantity: 0, totalRevenue: 0 };
    }
    acc[season].count += 1;
    acc[season].totalQuantity += Number(h.quantity);
    acc[season].totalRevenue += Number(h.totalRevenue || 0);
    return acc;
  }, {} as Record<string, { count: number; totalQuantity: number; totalRevenue: number }>);

  // ✅ Convertir en tableau pour GraphQL
  const seasonStats = Object.entries(seasonMap).map(([season, stats]) => ({
    season,
    count: stats.count,
    totalQuantity: Number(stats.totalQuantity.toFixed(2)),
    totalRevenue: Number(stats.totalRevenue.toFixed(2)),
  }));

  // ✅ Top 5 des cultures
  const cropStats = harvests.reduce((acc, h) => {
    if (h.plot && h.plot.cropType) {
      const crop = h.plot.cropType;
      if (!acc[crop]) {
        acc[crop] = { count: 0, totalQuantity: 0 };
      }
      acc[crop].count += 1;
      acc[crop].totalQuantity += Number(h.quantity);
    }
    return acc;
  }, {} as Record<string, { count: number; totalQuantity: number }>);

  const topCrops = Object.entries(cropStats)
    .map(([crop, stats]) => ({ crop, ...stats }))
    .sort((a, b) => b.totalQuantity - a.totalQuantity)
    .slice(0, 5);

  return {
    totalHarvests,
    totalQuantity: Number(totalQuantity.toFixed(2)),
    averageYield: totalHarvests > 0 ? Number((totalQuantity / totalHarvests).toFixed(2)) : 0,
    totalRevenue: Number(totalRevenue.toFixed(2)),
    seasonStats, // ✅ Tableau
    topCrops,
  };
}

  async getHarvestsByPlot(plotId: number, user?: User): Promise<Harvest[]> {
    const plot = await this.plotRepository.findOne({
      where: { id: plotId },
      relations: ['farm', 'farm.user'],
    });

    if (!plot) {
      throw new NotFoundException(`Parcelle avec l'ID ${plotId} non trouvée`);
    }

    if (user && user.role !== Roles.ADMIN && plot.farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette parcelle');
    }

    return this.harvestRepository.find({
      where: { plotId },
      relations: ['plot', 'plot.farm', 'plot.farm.user'],
      order: { harvestDate: 'DESC' },
    });
  }
}