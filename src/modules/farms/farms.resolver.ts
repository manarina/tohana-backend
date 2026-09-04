// src/modules/farms/farms.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { FarmsService } from './farms.service';
import { Farm } from './entities/farm.entity';
import { CreateFarmInput } from './dto/create-farm.input';
import { UpdateFarmInput } from './dto/update-farm.input';
import { FarmFiltersInput } from './dto/farm-filters.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';
import { RolesGuard } from '../auth/guards/roles.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { Roles } from '../../common/constants/roles.enum';
import { Regions } from '../../common/constants/regions.enum';

@Resolver(() => Farm)
@UseGuards(GqlAuthGuard)
export class FarmsResolver {
  constructor(private readonly farmsService: FarmsService) {}

  // ============================================
  // 📋 QUERIES
  // ============================================

  /**
   * Récupérer toutes les exploitations (sans filtre)
   */
  @Query(() => [Farm])
  async allFarms(
    @CurrentUser() user: User,
  ): Promise<Farm[]> {
    console.log('📋 [FarmsResolver] Récupération de toutes les exploitations (sans filtre)');
    return this.farmsService.findAllWithoutFilters(user);
  }

  /**
   * Récupérer toutes les exploitations avec filtres
   */
  @Query(() => [Farm])
  async farms(
    @Args('filters', { nullable: true }) filters: FarmFiltersInput,
    @CurrentUser() user: User,
  ): Promise<Farm[]> {
    console.log('📋 [FarmsResolver] Récupération des exploitations avec filtres');
    return this.farmsService.findAll(filters, user);
  }

  /**
   * Récupérer une exploitation par ID
   */
  @Query(() => Farm)
  async farm(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<Farm> {
    console.log(`🔍 [FarmsResolver] Recherche exploitation ID: ${id}`);
    return this.farmsService.findOne(id, user);
  }

  /**
   * Récupérer les exploitations par région
   */
  @Query(() => [Farm])
  async farmsByRegion(
    @Args('region') region: Regions,
    @CurrentUser() user: User,
  ): Promise<Farm[]> {
    console.log(`📍 [FarmsResolver] Recherche exploitations en région: ${region}`);
    return this.farmsService.findByRegion(region, user);
  }

  /**
   * Récupérer les exploitations par programme
   */
  @Query(() => [Farm])
  async farmsByProgram(
    @Args('program') program: string,
    @CurrentUser() user: User,
  ): Promise<Farm[]> {
    console.log(`📋 [FarmsResolver] Recherche exploitations du programme: ${program}`);
    return this.farmsService.findByProgram(program, user);
  }

  /**
   * Récupérer les exploitations bénéficiaires
   */
  @Query(() => [Farm])
  async beneficiaryFarms(
    @CurrentUser() user: User,
  ): Promise<Farm[]> {
    console.log('🌟 [FarmsResolver] Recherche des exploitations bénéficiaires');
    return this.farmsService.findBeneficiaries(user);
  }

  /**
   * Compter le nombre total d'exploitations
   */
  @Query(() => Int)
  async farmsCount(
    @CurrentUser() user: User,
  ): Promise<number> {
    console.log('🔢 [FarmsResolver] Comptage des exploitations');
    return this.farmsService.countAll(user);
  }

  /**
   * Statistiques des exploitations
   */
  @Query(() => FarmStats)
  async farmStats(
    @Args('region', { nullable: true }) region: string,
  ): Promise<any> {
    console.log(`📊 [FarmsResolver] Statistiques pour la région: ${region || 'Toutes'}`);
    return this.farmsService.getStats(region);
  }

  /**
   * Récupérer les exploitations avec pagination
   */
  @Query(() => FarmPagination)
  async farmsPaginated(
    @Args('page', { type: () => Int, defaultValue: 1 }) page: number,
    @Args('limit', { type: () => Int, defaultValue: 10 }) limit: number,
    @CurrentUser() user: User,
  ): Promise<{ data: Farm[]; total: number; page: number; totalPages: number }> {
    console.log(`📄 [FarmsResolver] Pagination - Page: ${page}, Limite: ${limit}`);
    return this.farmsService.findWithPagination(page, limit, user);
  }

  // ============================================
  // ✏️ MUTATIONS
  // ============================================

  /**
   * Créer une exploitation
   */
  @Mutation(() => Farm)
  async createFarm(
    @Args('input') createFarmInput: CreateFarmInput,
    @CurrentUser() user: User,
  ): Promise<Farm> {
    console.log(`📝 [FarmsResolver] Création d'une exploitation par: ${user.email}`);
    createFarmInput.userId = user.id;
    return this.farmsService.create(createFarmInput);
  }

  /**
   * Mettre à jour une exploitation
   */
  @Mutation(() => Farm)
  async updateFarm(
    @Args('input') updateFarmInput: UpdateFarmInput,
    @CurrentUser() user: User,
  ): Promise<Farm> {
    console.log(`✏️ [FarmsResolver] Mise à jour exploitation ID: ${updateFarmInput.id}`);
    return this.farmsService.update(updateFarmInput.id, updateFarmInput, user);
  }

  /**
   * Supprimer une exploitation
   */
  @Mutation(() => Boolean)
  async deleteFarm(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    console.log(`🗑️ [FarmsResolver] Suppression exploitation ID: ${id}`);
    return this.farmsService.remove(id, user);
  }

  /**
   * Supprimer toutes les exploitations (Admin uniquement)
   */
  @Mutation(() => DeleteAllResponse)
  @HasRoles(Roles.ADMIN)
  @UseGuards(RolesGuard)
  async deleteAllFarms(
    @CurrentUser() user: User,
  ): Promise<{ message: string; count: number }> {
    console.log(`🗑️ [FarmsResolver] Suppression de toutes les exploitations par: ${user.email}`);
    return this.farmsService.removeAll(user);
  }
}

// ============================================
// 📦 TYPES DE RÉPONSE
// ============================================

import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class FarmStats {
  @Field(() => Int)
  totalFarms!: number;

  @Field(() => Float)
  totalSurface!: number;

  @Field(() => Float)
  averageSurface!: number;

  @Field(() => Int)
  beneficiaryCount!: number;

  @Field(() => Float)
  beneficiaryRate!: number;
}

@ObjectType()
export class FarmPagination {
  @Field(() => [Farm])
  data!: Farm[];

  @Field(() => Int)
  total!: number;

  @Field(() => Int)
  page!: number;

  @Field(() => Int)
  totalPages!: number;
}

@ObjectType()
export class DeleteAllResponse {
  @Field()
  message!: string;

  @Field(() => Int)
  count!: number;
}