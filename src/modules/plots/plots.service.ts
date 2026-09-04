// src/modules/plots/plots.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between } from 'typeorm';
import { Plot } from './entities/plot.entity';
import { CreatePlotInput } from './dto/create-plot.input';
import { UpdatePlotInput } from './dto/update-plot.input';
import { PlotFiltersInput } from './dto/plot-filters.input';
import { Farm } from '../farms/entities/farm.entity';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../common/constants/roles.enum';

@Injectable()
export class PlotsService {
  constructor(
    @InjectRepository(Plot)
    private plotRepository: Repository<Plot>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  // ============================================
  // 📋 READ - Récupérer toutes les parcelles
  // ============================================

  async findAll(filters?: PlotFiltersInput, user?: User): Promise<Plot[]> {
    const where: FindOptionsWhere<Plot> = {};

    if (filters) {
      if (filters.cropType) where.cropType = filters.cropType as any;
      if (filters.cropVariety) where.cropVariety = filters.cropVariety;
      if (filters.farmId) where.farmId = filters.farmId;
      if (filters.irrigationType) where.irrigationType = filters.irrigationType;
      if (filters.soilType) where.soilType = filters.soilType;
      if (filters.minSurface !== undefined || filters.maxSurface !== undefined) {
        const min = filters.minSurface || 0;
        const max = filters.maxSurface || 10000;
        where.surface = Between(min, max);
      }

      if (filters.searchTerm) {
        return this.plotRepository
          .createQueryBuilder('plot')
          .leftJoinAndSelect('plot.farm', 'farm')
          .leftJoinAndSelect('farm.user', 'user')
          .where('plot.name ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('plot.cropType ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('plot.cropVariety ILIKE :search', { search: `%${filters.searchTerm}%` })
          .skip(filters.offset || 0)
          .take(filters.limit || 100)
          .getMany();
      }
    }

    // Si l'utilisateur n'est pas admin, filtrer par ses exploitations
    let farms: Farm[] = [];
    if (user && user.role !== Roles.ADMIN) {
      farms = await this.farmRepository.find({
        where: { userId: user.id },
        select: ['id'],
      });
      const farmIds = farms.map(f => f.id);
      if (farmIds.length > 0) {
        where.farmId = Between(Math.min(...farmIds), Math.max(...farmIds));
      } else {
        return [];
      }
    }

    return this.plotRepository.find({
      where,
      relations: ['farm', 'farm.user'],
      skip: filters?.offset || 0,
      take: filters?.limit || 100,
      order: { createdAt: 'DESC' },
    });
  }

  // ============================================
  // 🔍 READ - Récupérer une parcelle par ID
  // ============================================

  async findOne(id: number, user?: User): Promise<Plot> {
    const plot = await this.plotRepository.findOne({
      where: { id },
      relations: ['farm', 'farm.user'],
    });

    if (!plot) {
      throw new NotFoundException(`Parcelle avec l'ID ${id} non trouvée`);
    }

    // Vérifier les permissions
    if (user && user.role !== Roles.ADMIN && plot.farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette parcelle');
    }

    return plot;
  }

  // ============================================
  // 📝 CREATE - Créer une parcelle
  // ============================================

  async create(createPlotInput: CreatePlotInput, user?: User): Promise<Plot> {
    // Vérifier que l'exploitation existe
    const farm = await this.farmRepository.findOne({
      where: { id: createPlotInput.farmId },
      relations: ['user'],
    });

    if (!farm) {
      throw new NotFoundException(`Exploitation avec l'ID ${createPlotInput.farmId} non trouvée`);
    }

    // Vérifier les permissions
    if (user && user.role !== Roles.ADMIN && farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette exploitation');
    }

    const plot = this.plotRepository.create(createPlotInput);
    const savedPlot = await this.plotRepository.save(plot);

    return (await this.plotRepository.findOne({
      where: { id: savedPlot.id },
      relations: ['farm', 'farm.user'],
    }))!;
  }

  // ============================================
  // ✏️ UPDATE - Mettre à jour une parcelle
  // ============================================

  async update(id: number, updatePlotInput: UpdatePlotInput, user?: User): Promise<Plot> {
    const plot = await this.findOne(id, user);

    const { id: _, ...updateData } = updatePlotInput;

    Object.assign(plot, updateData);
    const updatedPlot = await this.plotRepository.save(plot);

    return (await this.plotRepository.findOne({
      where: { id: updatedPlot.id },
      relations: ['farm', 'farm.user'],
    }))!;
  }

  // ============================================
  // 🗑️ DELETE - Supprimer une parcelle
  // ============================================

  async remove(id: number, user?: User): Promise<boolean> {
    const plot = await this.findOne(id, user);
    const result = await this.plotRepository.delete(plot.id);

    if (result.affected === 0) {
      throw new NotFoundException(`Parcelle avec l'ID ${id} non trouvée`);
    }

    return true;
  }

  // ============================================
  // 📊 STATISTIQUES
  // ============================================

  async getStats(farmId?: number): Promise<any> {
    const where: FindOptionsWhere<Plot> = {};
    if (farmId) where.farmId = farmId;

    const plots = await this.plotRepository.find({ where });
    const totalPlots = plots.length;
    const totalSurface = plots.reduce((sum, p) => sum + Number(p.surface), 0);

    // Statistiques par culture
    const cropStats = plots.reduce((acc, p) => {
      const crop = p.cropType;
      if (!acc[crop]) {
        acc[crop] = { count: 0, totalSurface: 0, averageYield: 0 };
      }
      acc[crop].count += 1;
      acc[crop].totalSurface += Number(p.surface);
      if (p.actualYield) {
        acc[crop].averageYield += Number(p.actualYield);
      }
      return acc;
    }, {} as Record<string, { count: number; totalSurface: number; averageYield: number }>);

    // Calculer les moyennes
    Object.keys(cropStats).forEach(crop => {
      const stat = cropStats[crop];
      stat.averageYield = stat.averageYield / stat.count;
    });

    return {
      totalPlots,
      totalSurface,
      averageSurface: totalPlots > 0 ? totalSurface / totalPlots : 0,
      cropStats,
    };
  }

  async getPlotsByFarm(farmId: number, user?: User): Promise<Plot[]> {
    // Vérifier l'accès à l'exploitation
    const farm = await this.farmRepository.findOne({
      where: { id: farmId },
      relations: ['user'],
    });

    if (!farm) {
      throw new NotFoundException(`Exploitation avec l'ID ${farmId} non trouvée`);
    }

    if (user && user.role !== Roles.ADMIN && farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette exploitation');
    }

    return this.plotRepository.find({
      where: { farmId },
      relations: ['farm', 'farm.user'],
      order: { createdAt: 'DESC' },
    });
  }
}