// src/modules/plots/plots.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PlotsResolver } from './plots.resolver';
import { PlotsService } from './plots.service';
import { Plot } from './entities/plot.entity';
import { Farm } from '../farms/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Plot, Farm])],
  providers: [PlotsResolver, PlotsService],
  exports: [PlotsService],
})
export class PlotsModule {}