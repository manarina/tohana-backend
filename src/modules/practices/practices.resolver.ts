// src/modules/practices/practices.resolver.ts
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
import { PracticesService } from './practices.service';
import { ClimatePractice } from './entities/climate-practice.entity';
import { CreatePracticeInput } from './dto/create-practice.input';
import { UpdatePracticeInput } from './dto/update-practice.input';
import { PracticeFiltersInput } from './dto/practice-filters.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver(() => ClimatePractice)
@UseGuards(GqlAuthGuard)
export class PracticesResolver {
  constructor(private readonly practicesService: PracticesService) {}

  // ============================================
  // 📋 QUERIES
  // ============================================

  @Query(() => [ClimatePractice])
  async practices(
    @Args('filters', { nullable: true }) filters: PracticeFiltersInput,
    @CurrentUser() user: User,
  ): Promise<ClimatePractice[]> {
    console.log('📋 [PracticesResolver] Récupération des pratiques');
    return this.practicesService.findAll(filters, user);
  }

  @Query(() => ClimatePractice)
  async practice(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<ClimatePractice> {
    console.log(`🔍 [PracticesResolver] Recherche pratique ID: ${id}`);
    return this.practicesService.findOne(id, user);
  }

  @Query(() => [ClimatePractice])
  async practicesByFarm(
    @Args('farmId', { type: () => Int }) farmId: number,
    @CurrentUser() user: User,
  ): Promise<ClimatePractice[]> {
    console.log(`📍 [PracticesResolver] Pratiques de l'exploitation ID: ${farmId}`);
    return this.practicesService.getPracticesByFarm(farmId, user);
  }

  @Query(() => PracticeStats)
  async practiceStats(
    @Args('farmId', { nullable: true }) farmId: number,
  ): Promise<any> {
    console.log('📊 [PracticesResolver] Statistiques des pratiques');
    return this.practicesService.getStats(farmId);
  }

  // ============================================
  // ✏️ MUTATIONS
  // ============================================

  @Mutation(() => ClimatePractice)
  async createPractice(
    @Args('input') createPracticeInput: CreatePracticeInput,
    @CurrentUser() user: User,
  ): Promise<ClimatePractice> {
    console.log(`📝 [PracticesResolver] Création d'une pratique par: ${user.email}`);
    return this.practicesService.create(createPracticeInput, user);
  }

  @Mutation(() => ClimatePractice)
  async updatePractice(
    @Args('input') updatePracticeInput: UpdatePracticeInput,
    @CurrentUser() user: User,
  ): Promise<ClimatePractice> {
    console.log(`✏️ [PracticesResolver] Mise à jour pratique ID: ${updatePracticeInput.id}`);
    return this.practicesService.update(updatePracticeInput.id, updatePracticeInput, user);
  }

  @Mutation(() => Boolean)
  async deletePractice(
    @Args('id', { type: () => Int }) id: number,
    @CurrentUser() user: User,
  ): Promise<boolean> {
    console.log(`🗑️ [PracticesResolver] Suppression pratique ID: ${id}`);
    return this.practicesService.remove(id, user);
  }
}

// ============================================
// 📦 TYPES DE RÉPONSE (Déclarés dans le bon ordre)
// ============================================

@ObjectType()
export class BenefitStats {
  @Field(() => Int)
  ameliorationSol!: number;

  @Field(() => Int)
  augmentationRendement!: number;

  @Field(() => Int)
  reductionErosion!: number;

  @Field(() => Int)
  economieEau!: number;

  @Field(() => Int)
  reductionIntrants!: number;

  @Field(() => Int)
  diversificationRevenus!: number;

  @Field(() => Int)
  meilleureAdaptation!: number;

  @Field(() => Int)
  autre!: number;
}

@ObjectType()
export class PracticeStatItem {
  @Field()
  practiceType!: string;

  @Field(() => Int)
  count!: number;

  @Field(() => Float)
  totalSurface!: number;

  @Field(() => Float)
  averageYieldImprovement!: number;
}

@ObjectType()
export class PracticeStats {
  @Field(() => Int)
  totalPractices!: number;

  @Field(() => Float)
  totalSurface!: number;

  @Field(() => Float)
  averageSurface!: number;

  @Field(() => [PracticeStatItem])
  practiceStats!: PracticeStatItem[];

  @Field(() => BenefitStats)
  benefitStats!: BenefitStats;

  @Field(() => Float)
  stillPracticedRate!: number;
}