// src/modules/dashboard/dashboard.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DashboardResolver } from './dashboard.resolver';
import { DashboardService } from './dashboard.service';
import { Farm } from '../farms/entities/farm.entity';
import { Plot } from '../plots/entities/plot.entity';
import { ClimatePractice } from '../practices/entities/climate-practice.entity';
import { Harvest } from '../harvests/entities/harvest.entity';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Farm, Plot, ClimatePractice, Harvest, User]),
  ],
  providers: [DashboardResolver, DashboardService],
  exports: [DashboardService],
})
export class DashboardModule {}