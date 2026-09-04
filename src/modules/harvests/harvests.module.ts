// src/modules/harvests/harvests.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HarvestsResolver } from './harvests.resolver';
import { HarvestsService } from './harvests.service';
import { Harvest } from './entities/harvest.entity';
import { Plot } from '../plots/entities/plot.entity';
import { Farm } from '../farms/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Harvest, Plot, Farm])],
  providers: [HarvestsResolver, HarvestsService],
  exports: [HarvestsService],
})
export class HarvestsModule {}