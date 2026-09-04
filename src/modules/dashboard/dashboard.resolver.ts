// src/modules/dashboard/dashboard.resolver.ts
import { Resolver, Query, Args } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardFiltersInput } from './dto/dashboard-filters.input';
import { DashboardResponse } from './dto/dashboard-response.dto';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver()
@UseGuards(GqlAuthGuard)
export class DashboardResolver {
  constructor(private readonly dashboardService: DashboardService) {}

  @Query(() => DashboardResponse) // ✅ Type explicite
  async dashboard(
    @Args('filters', { nullable: true }) filters: DashboardFiltersInput,
    @CurrentUser() user: User,
  ): Promise<DashboardResponse> {
    console.log(`📊 [DashboardResolver] Dashboard demandé par: ${user.email}`);
    return this.dashboardService.getDashboard(filters);
  }
}