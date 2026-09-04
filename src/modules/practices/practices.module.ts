// src/modules/practices/practices.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PracticesResolver } from './practices.resolver';
import { PracticesService } from './practices.service';
import { ClimatePractice } from './entities/climate-practice.entity';
import { Farm } from '../farms/entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClimatePractice, Farm])],
  providers: [PracticesResolver, PracticesService],
  exports: [PracticesService],
})
export class PracticesModule {}