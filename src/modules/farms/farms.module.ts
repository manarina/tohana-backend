// src/modules/farms/farms.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FarmsResolver } from './farms.resolver';
import { FarmsService } from './farms.service';
import { Farm } from './entities/farm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Farm])],
  providers: [FarmsResolver, FarmsService],
  exports: [FarmsService],
})
export class FarmsModule {}