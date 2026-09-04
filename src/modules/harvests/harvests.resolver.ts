// src/modules/harvests/harvests.resolver.ts
import { Resolver, Query, Mutation, Args, Int, ObjectType, Field, Float } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { HarvestsService } from './harvests.service';
import { Harvest } from './entities/harvest.entity';
import { CreateHarvestInput } from './dto/create-harvest.input';
import { UpdateHarvestInput } from './dto/update-harvest.input';
import { HarvestFiltersInput } from './dto/harvest-filters.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Harvest)
@UseGuards(GqlAuthGuard)
export class HarvestsResolver {
  constructor(private readonly harvestsService: HarvestsService) {}

  // ============================================
  // 📋 QUERIES
  // ============================================

  @Query(() => [Harvest])
  async harvests(
    @Args('filters', { nullable: true }) filters: HarvestFiltersInput,
    @CurrentUser() user: User,
  ): Promise<Harvest[]> {
    console.log('📋 [HarvestsResolver] Récupération des récoltes');
    return this.harvestsService.findAll(filters, user);
  }

  @Query(() => Harvest)
  async harvest(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<Harvest> {
    console.log(`🔍 [HarvestsResolver] Recherche récolte ID: ${id}`);
    return this.harvestsService.findOne(id, user);
  }

  @Query(() => [Harvest])
  async harvestsByPlot(
    @Args('plotId', { type: () => Int }) plotId: number,
    @CurrentUser() user: User,
  ): Promise<Harvest[]> {
    console.log(`📍 [HarvestsResolver] Récoltes de la parcelle ID: ${plotId}`);
    return this.harvestsService.getHarvestsByPlot(plotId, user);
  }

  @Query(() => HarvestStats)
  async harvestStats(
    @Args('farmId', { nullable: true }) farmId: number,
  ): Promise<any> {
    console.log('📊 [HarvestsResolver] Statistiques des récoltes');
    return this.harvestsService.getStats(farmId);
  }

  // ============================================
  // ✏️ MUTATIONS
  // ============================================

  @Mutation(() => Harvest)
  async createHarvest(
    @Args('input') createHarvestInput: CreateHarvestInput,
    @CurrentUser() user: User,
  ): Promise<Harvest> {
    console.log(`📝 [HarvestsResolver] Création d'une récolte par: ${user.email}`);
    return this.harvestsService.create(createHarvestInput, user);
  }

  @Mutation(() => Harvest)
  async updateHarvest(
    @Args('input') updateHarvestInput: UpdateHarvestInput,
    @CurrentUser() user: User,
  ): Promise<Harvest> {
    console.log(`✏️ [HarvestsResolver] Mise à jour récolte ID: ${updateHarvestInput.id}`);
    return this.harvestsService.update(updateHarvestInput.id, updateHarvestInput, user);
  }

  @Mutation(() => Boolean)
  async deleteHarvest(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    console.log(`🗑️ [HarvestsResolver] Suppression récolte ID: ${id}`);
    return this.harvestsService.remove(id, user);
  }
}

// ============================================
// 📦 TYPES DE RÉPONSE - CORRIGÉS
// ============================================

@ObjectType()
export class SeasonStat {
  @Field()
  season!: string;

  @Field(() => Int)
  count!: number;

  @Field(() => Float)
  totalQuantity!: number;

  @Field(() => Float)
  totalRevenue!: number;
}

@ObjectType()
export class TopCrop {
  @Field()
  crop!: string;

  @Field(() => Int)
  count!: number;

  @Field(() => Float)
  totalQuantity!: number;
}

@ObjectType()
export class HarvestStats {
  @Field(() => Int)
  totalHarvests!: number;

  @Field(() => Float)
  totalQuantity!: number;

  @Field(() => Float)
  averageYield!: number;

  @Field(() => Float)
  totalRevenue!: number;

  @Field(() => [SeasonStat]) // ✅ Tableau, pas un objet unique
  seasonStats!: SeasonStat[];

  @Field(() => [TopCrop])
  topCrops!: TopCrop[];
}