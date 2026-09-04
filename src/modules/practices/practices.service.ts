// src/modules/practices/practices.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Between } from 'typeorm';
import { ClimatePractice } from './entities/climate-practice.entity';
import { CreatePracticeInput } from './dto/create-practice.input';
import { UpdatePracticeInput } from './dto/update-practice.input';
import { PracticeFiltersInput } from './dto/practice-filters.input';
import { Farm } from '../farms/entities/farm.entity';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../common/constants/roles.enum';
import { PerceivedBenefits } from '../../common/constants/practices.enum';

@Injectable()
export class PracticesService {
  constructor(
    @InjectRepository(ClimatePractice)
    private practiceRepository: Repository<ClimatePractice>,
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  // ============================================
  // 📋 READ - Récupérer toutes les pratiques
  // ============================================

  async findAll(filters?: PracticeFiltersInput, user?: User): Promise<ClimatePractice[]> {
    const where: FindOptionsWhere<ClimatePractice> = {};

    if (filters) {
      if (filters.practiceType) where.practiceType = filters.practiceType as any;
      if (filters.farmId) where.farmId = filters.farmId;
      if (filters.perceivedBenefit) where.perceivedBenefit = filters.perceivedBenefit as any;
      if (filters.isStillPracticed !== undefined) where.isStillPracticed = filters.isStillPracticed;
      if (filters.sourceOfKnowledge) where.sourceOfKnowledge = filters.sourceOfKnowledge as any;
      if (filters.minSurface !== undefined || filters.maxSurface !== undefined) {
        const min = filters.minSurface || 0;
        const max = filters.maxSurface || 10000;
        where.surface = Between(min, max);
      }

      if (filters.searchTerm) {
        return this.practiceRepository
          .createQueryBuilder('practice')
          .leftJoinAndSelect('practice.farm', 'farm')
          .leftJoinAndSelect('farm.user', 'user')
          .where('practice.practiceType ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('practice.specificTechnique ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('practice.description ILIKE :search', { search: `%${filters.searchTerm}%` })
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
        where.farmId = Between(Math.min(...farmIds), Math.max(...farmIds));
      } else {
        return [];
      }
    }

    return this.practiceRepository.find({
      where,
      relations: ['farm', 'farm.user'],
      skip: filters?.offset || 0,
      take: filters?.limit || 100,
      order: { adoptionDate: 'DESC' },
    });
  }

  // ============================================
  // 🔍 READ - Récupérer une pratique par ID
  // ============================================

  async findOne(id: number, user?: User): Promise<ClimatePractice> {
    const practice = await this.practiceRepository.findOne({
      where: { id },
      relations: ['farm', 'farm.user'],
    });

    if (!practice) {
      throw new NotFoundException(`Pratique avec l'ID ${id} non trouvée`);
    }

    if (user && user.role !== Roles.ADMIN && practice.farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette pratique');
    }

    return practice;
  }

  // ============================================
  // 📝 CREATE - Créer une pratique
  // ============================================

  async create(createPracticeInput: CreatePracticeInput, user?: User): Promise<ClimatePractice> {
    const farm = await this.farmRepository.findOne({
      where: { id: createPracticeInput.farmId },
      relations: ['user'],
    });

    if (!farm) {
      throw new NotFoundException(`Exploitation avec l'ID ${createPracticeInput.farmId} non trouvée`);
    }

    if (user && user.role !== Roles.ADMIN && farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette exploitation');
    }

    // ✅ La date est déjà un objet Date grâce à class-transformer
    const practice = this.practiceRepository.create(createPracticeInput);
    const savedPractice = await this.practiceRepository.save(practice);

    return (await this.practiceRepository.findOne({
      where: { id: savedPractice.id },
      relations: ['farm', 'farm.user'],
    }))!;
  }

  // ============================================
  // ✏️ UPDATE - Mettre à jour une pratique
  // ============================================

  async update(id: number, updatePracticeInput: UpdatePracticeInput, user?: User): Promise<ClimatePractice> {
    const practice = await this.findOne(id, user);

    const { id: _, ...updateData } = updatePracticeInput;

    // ✅ La date est déjà un objet Date si fournie
    Object.assign(practice, updateData);
    const updatedPractice = await this.practiceRepository.save(practice);

    return (await this.practiceRepository.findOne({
      where: { id: updatedPractice.id },
      relations: ['farm', 'farm.user'],
    }))!;
  }

  // ============================================
  // 🗑️ DELETE - Supprimer une pratique
  // ============================================

  async remove(id: number, user?: User): Promise<boolean> {
    const practice = await this.findOne(id, user);
    const result = await this.practiceRepository.delete(practice.id);

    if (result.affected === 0) {
      throw new NotFoundException(`Pratique avec l'ID ${id} non trouvée`);
    }

    return true;
  }

  // ============================================
  // 📊 STATISTIQUES
  // ============================================

  async getStats(farmId?: number): Promise<any> {
    const where: FindOptionsWhere<ClimatePractice> = {};
    if (farmId) where.farmId = farmId;

    const practices = await this.practiceRepository.find({ where });
    const totalPractices = practices.length;
    const totalSurface = practices.reduce((sum, p) => sum + Number(p.surface), 0);

    // Statistiques par type de pratique
    const typeStats = practices.reduce((acc, p) => {
      const type = p.practiceType;
      if (!acc[type]) {
        acc[type] = { count: 0, totalSurface: 0, totalYieldImprovement: 0 };
      }
      acc[type].count += 1;
      acc[type].totalSurface += Number(p.surface);
      if (p.yieldImprovement) {
        acc[type].totalYieldImprovement += Number(p.yieldImprovement);
      }
      return acc;
    }, {} as Record<string, { count: number; totalSurface: number; totalYieldImprovement: number }>);

    const practiceStats = Object.entries(typeStats).map(([practiceType, stats]) => ({
      practiceType,
      count: stats.count,
      totalSurface: Number(stats.totalSurface.toFixed(2)),
      averageYieldImprovement: stats.count > 0 ? Number((stats.totalYieldImprovement / stats.count).toFixed(2)) : 0,
    }));

    // Statistiques par bénéfice
    const benefitMap = practices.reduce((acc, p) => {
      if (p.perceivedBenefit) {
        const benefit = p.perceivedBenefit;
        if (!acc[benefit]) acc[benefit] = 0;
        acc[benefit] += 1;
      }
      return acc;
    }, {} as Record<string, number>);

    const benefitStats = {
      ameliorationSol: benefitMap[PerceivedBenefits.AMELIORATION_SOL] || 0,
      augmentationRendement: benefitMap[PerceivedBenefits.AUGMENTATION_RENDEMENT] || 0,
      reductionErosion: benefitMap[PerceivedBenefits.REDUCTION_EROSION] || 0,
      economieEau: benefitMap[PerceivedBenefits.ECONOMIE_EAU] || 0,
      reductionIntrants: benefitMap[PerceivedBenefits.REDUCTION_INTRANTS] || 0,
      diversificationRevenus: benefitMap[PerceivedBenefits.DIVERSIFICATION_REVENUS] || 0,
      meilleureAdaptation: benefitMap[PerceivedBenefits.MEILLEURE_ADAPTATION] || 0,
      autre: benefitMap[PerceivedBenefits.AUTRE] || 0,
    };

    // Taux d'adoption continue
    const stillPracticed = practices.filter(p => p.isStillPracticed).length;

    return {
      totalPractices,
      totalSurface: Number(totalSurface.toFixed(2)),
      averageSurface: totalPractices > 0 ? Number((totalSurface / totalPractices).toFixed(2)) : 0,
      practiceStats,
      benefitStats,
      stillPracticedRate: totalPractices > 0 ? Number(((stillPracticed / totalPractices) * 100).toFixed(2)) : 0,
    };
  }

  async getPracticesByFarm(farmId: number, user?: User): Promise<ClimatePractice[]> {
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

    return this.practiceRepository.find({
      where: { farmId },
      relations: ['farm', 'farm.user'],
      order: { adoptionDate: 'DESC' },
    });
  }
}