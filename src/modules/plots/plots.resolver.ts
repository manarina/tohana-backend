// src/modules/plots/plots.resolver.ts
import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  ObjectType,
  Field,
  Float,
} from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { PlotsService } from './plots.service';
import { Plot } from './entities/plot.entity';
import { CreatePlotInput } from './dto/create-plot.input';
import { UpdatePlotInput } from './dto/update-plot.input';
import { PlotFiltersInput } from './dto/plot-filters.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => Plot)
@UseGuards(GqlAuthGuard)
export class PlotsResolver {
  constructor(private readonly plotsService: PlotsService) {}

  // ============================================
  // 📋 QUERIES
  // ============================================

  @Query(() => [Plot])
  async plots(
    @Args('filters', { nullable: true }) filters: PlotFiltersInput,
    @CurrentUser() user: User,
  ): Promise<Plot[]> {
    console.log('📋 [PlotsResolver] Récupération des parcelles');
    return this.plotsService.findAll(filters, user);
  }

  @Query(() => Plot)
  async plot(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<Plot> {
    console.log(`🔍 [PlotsResolver] Recherche parcelle ID: ${id}`);
    return this.plotsService.findOne(id, user);
  }

  @Query(() => [Plot])
  async plotsByFarm(
    @Args('farmId', { type: () => Int }) farmId: number,
    @CurrentUser() user: User,
  ): Promise<Plot[]> {
    console.log(`📍 [PlotsResolver] Parcelles de l'exploitation ID: ${farmId}`);
    return this.plotsService.getPlotsByFarm(farmId, user);
  }

  @Query(() => PlotStats)
  async plotStats(
    @Args('farmId', { nullable: true }) farmId: number,
  ): Promise<any> {
    console.log(`📊 [PlotsResolver] Statistiques des parcelles`);
    return this.plotsService.getStats(farmId);
  }

  // ============================================
  // ✏️ MUTATIONS
  // ============================================

  @Mutation(() => Plot)
  async createPlot(
    @Args('input') createPlotInput: CreatePlotInput,
    @CurrentUser() user: User,
  ): Promise<Plot> {
    console.log(`📝 [PlotsResolver] Création d'une parcelle par: ${user.email}`);
    return this.plotsService.create(createPlotInput, user);
  }

  @Mutation(() => Plot)
  async updatePlot(
    @Args('input') updatePlotInput: UpdatePlotInput,
    @CurrentUser() user: User,
  ): Promise<Plot> {
    console.log(`✏️ [PlotsResolver] Mise à jour parcelle ID: ${updatePlotInput.id}`);
    return this.plotsService.update(updatePlotInput.id, updatePlotInput, user);
  }

  @Mutation(() => Boolean)
  async deletePlot(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    console.log(`🗑️ [PlotsResolver] Suppression parcelle ID: ${id}`);
    return this.plotsService.remove(id, user);
  }
}

// ============================================
// 📦 TYPES DE RÉPONSE
// ============================================

@ObjectType()
export class CropStat {
  @Field(() => Int)
  count!: number;

  @Field(() => Float)
  totalSurface!: number;

  @Field(() => Float)
  averageYield!: number;
}

@ObjectType()
export class PlotStats {
  @Field(() => Int)
  totalPlots!: number;

  @Field(() => Float)
  totalSurface!: number;

  @Field(() => Float)
  averageSurface!: number;

  @Field(() => [CropStatItem])
  cropStats!: CropStatItem[];
}

@ObjectType()
export class CropStatItem {
  @Field()
  cropType!: string;

  @Field(() => Int)
  count!: number;

  @Field(() => Float)
  totalSurface!: number;

  @Field(() => Float)
  averageYield!: number;
}