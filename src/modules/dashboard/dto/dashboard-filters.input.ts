// src/modules/dashboard/dto/dashboard-filters.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';
import { Regions } from '../../../common/constants/regions.enum';

@InputType()
export class DashboardFiltersInput {
  // ✅ Utiliser String au lieu de Regions pour éviter les problèmes d'enum
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  region?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  district?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  year?: string;
}