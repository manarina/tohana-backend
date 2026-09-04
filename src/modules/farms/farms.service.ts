// src/modules/farms/farms.service.ts
import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsWhere, Like } from 'typeorm';
import { Farm } from './entities/farm.entity';
import { CreateFarmInput } from './dto/create-farm.input';
import { UpdateFarmInput } from './dto/update-farm.input';
import { FarmFiltersInput } from './dto/farm-filters.input';
import { User } from '../users/entities/user.entity';
import { Roles } from '../../common/constants/roles.enum';
import { Regions } from '../../common/constants/regions.enum';

@Injectable()
export class FarmsService {
  constructor(
    @InjectRepository(Farm)
    private farmRepository: Repository<Farm>,
  ) {}

  // ============================================
  // 📋 READ - Récupérer toutes les exploitations
  // ============================================

  /**
   * Récupérer toutes les exploitations (sans filtre)
   */
  async findAllWithoutFilters(user?: User): Promise<Farm[]> {
    const where: FindOptionsWhere<Farm> = {};

    if (user && user.role !== Roles.ADMIN) {
      where.userId = user.id;
    }

    return this.farmRepository.find({
      where,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Récupérer toutes les exploitations avec filtres
   */
  async findAll(filters?: FarmFiltersInput, user?: User): Promise<Farm[]> {
    const where: FindOptionsWhere<Farm> = {};

    if (user && user.role !== Roles.ADMIN) {
      where.userId = user.id;
    }

    if (filters) {
      if (filters.region) {
        where.region = filters.region as Regions;
      }
      if (filters.district) where.district = filters.district;
      if (filters.commune) where.commune = filters.commune;
      if (filters.village) where.village = filters.village;
      if (filters.userId) where.userId = filters.userId;
      if (filters.isBeneficiary !== undefined) where.isBeneficiary = filters.isBeneficiary;
      if (filters.programAffiliation) where.programAffiliation = filters.programAffiliation;

      if (filters.searchTerm) {
        return this.farmRepository
          .createQueryBuilder('farm')
          .leftJoinAndSelect('farm.user', 'user')
          .where('farm.name ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('farm.village ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('farm.commune ILIKE :search', { search: `%${filters.searchTerm}%` })
          .orWhere('farm.district ILIKE :search', { search: `%${filters.searchTerm}%` })
          .skip(filters.offset || 0)
          .take(filters.limit || 100)
          .getMany();
      }
    }

    return this.farmRepository.find({
      where,
      relations: ['user'],
      skip: filters?.offset || 0,
      take: filters?.limit || 100,
      order: { createdAt: 'DESC' },
    });
  }

  // ============================================
  // 🔍 READ - Récupérer une exploitation par ID
  // ============================================

  /**
   * Récupérer une exploitation par ID
   */
  async findOne(id: number, user?: User): Promise<Farm> {
    const farm = await this.farmRepository.findOne({
      where: { id },
      relations: ['user'],
    });

    if (!farm) {
      throw new NotFoundException(`Exploitation avec l'ID ${id} non trouvée`);
    }

    if (user && user.role !== Roles.ADMIN && farm.userId !== user.id) {
      throw new ForbiddenException('Vous n\'avez pas accès à cette exploitation');
    }

    return farm;
  }

  // ============================================
  // 📝 CREATE - Créer une exploitation
  // ============================================

  /**
   * Créer une nouvelle exploitation
   */
  async create(createFarmInput: CreateFarmInput): Promise<Farm> {
    const farm = this.farmRepository.create(createFarmInput);
    const savedFarm = await this.farmRepository.save(farm);
    
    const farmWithUser = await this.farmRepository.findOne({
      where: { id: savedFarm.id },
      relations: ['user'],
    });

    if (!farmWithUser) {
      throw new NotFoundException(`Exploitation avec l'ID ${savedFarm.id} non trouvée`);
    }

    return farmWithUser;
  }

  // ============================================
  // ✏️ UPDATE - Mettre à jour une exploitation
  // ============================================

  /**
   * Mettre à jour une exploitation
   */
  async update(id: number, updateFarmInput: UpdateFarmInput, user?: User): Promise<Farm> {
    const farm = await this.findOne(id, user);

    const { id: _, ...updateData } = updateFarmInput;

    Object.assign(farm, updateData);
    const updatedFarm = await this.farmRepository.save(farm);
    
    const farmWithUser = await this.farmRepository.findOne({
      where: { id: updatedFarm.id },
      relations: ['user'],
    });

    if (!farmWithUser) {
      throw new NotFoundException(`Exploitation avec l'ID ${updatedFarm.id} non trouvée`);
    }

    return farmWithUser;
  }

  // ============================================
  // 🗑️ DELETE - Supprimer une exploitation
  // ============================================

  /**
   * Supprimer une exploitation
   */
  async remove(id: number, user?: User): Promise<boolean> {
    const farm = await this.findOne(id, user);
    const result = await this.farmRepository.delete(farm.id);

    if (result.affected === 0) {
      throw new NotFoundException(`Exploitation avec l'ID ${id} non trouvée`);
    }

    return true;
  }

  /**
   * Supprimer toutes les exploitations (Admin uniquement)
   */
  async removeAll(user?: User): Promise<{ message: string; count: number }> {
    // ✅ Vérifier que l'utilisateur est admin
    if (!user || user.role !== Roles.ADMIN) {
      throw new ForbiddenException('Seul un administrateur peut supprimer toutes les exploitations');
    }

    const count = await this.farmRepository.count();
    await this.farmRepository.clear();
    
    return {
      message: `Toutes les exploitations (${count}) ont été supprimées avec succès`,
      count,
    };
  }

  // ============================================
  // 📊 STATISTIQUES
  // ============================================

  /**
   * Récupérer les statistiques des exploitations
   */
  async getStats(region?: string): Promise<any> {
    const queryBuilder = this.farmRepository.createQueryBuilder('farm');

    if (region) {
      queryBuilder.where('farm.region = :region', { region });
    }

    const farms = await queryBuilder.getMany();
    const totalFarms = farms.length;
    
    const totalSurface = farms.reduce((sum, f) => {
      const surface = typeof f.totalSurface === 'string' 
        ? parseFloat(f.totalSurface) 
        : f.totalSurface;
      return sum + (surface || 0);
    }, 0);
    
    const beneficiaryCount = farms.filter(f => f.isBeneficiary).length;

    return {
      totalFarms: Number(totalFarms),
      totalSurface: Number(totalSurface.toFixed(2)),
      averageSurface: totalFarms > 0 ? Number((totalSurface / totalFarms).toFixed(2)) : 0,
      beneficiaryCount: Number(beneficiaryCount),
      beneficiaryRate: totalFarms > 0 ? Number(((beneficiaryCount / totalFarms) * 100).toFixed(2)) : 0,
    };
  }

  // ============================================
  // 📋 AUTRES FONCTIONNALITÉS
  // ============================================

  /**
   * Récupérer les exploitations par région
   */
  async findByRegion(region: Regions, user?: User): Promise<Farm[]> {
    const where: FindOptionsWhere<Farm> = { region };

    if (user && user.role !== Roles.ADMIN) {
      where.userId = user.id;
    }

    return this.farmRepository.find({
      where,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Récupérer les exploitations par programme
   */
  async findByProgram(program: string, user?: User): Promise<Farm[]> {
    const where: FindOptionsWhere<Farm> = { programAffiliation: program };

    if (user && user.role !== Roles.ADMIN) {
      where.userId = user.id;
    }

    return this.farmRepository.find({
      where,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Récupérer les exploitations bénéficiaires
   */
  async findBeneficiaries(user?: User): Promise<Farm[]> {
    const where: FindOptionsWhere<Farm> = { isBeneficiary: true };

    if (user && user.role !== Roles.ADMIN) {
      where.userId = user.id;
    }

    return this.farmRepository.find({
      where,
      relations: ['user'],
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Compter le nombre total d'exploitations
   */
  async countAll(user?: User): Promise<number> {
    const where: FindOptionsWhere<Farm> = {};

    if (user && user.role !== Roles.ADMIN) {
      where.userId = user.id;
    }

    return this.farmRepository.count({ where });
  }

  /**
   * Récupérer les exploitations avec pagination simple
   */
  async findWithPagination(page: number = 1, limit: number = 10, user?: User): Promise<{
    data: Farm[];
    total: number;
    page: number;
    totalPages: number;
  }> {
    const where: FindOptionsWhere<Farm> = {};

    if (user && user.role !== Roles.ADMIN) {
      where.userId = user.id;
    }

    const [data, total] = await this.farmRepository.findAndCount({
      where,
      relations: ['user'],
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });

    return {
      data,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    };
  }
}