// src/modules/plots/dto/plot-filters.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, IsBoolean, Min } from 'class-validator';
import { CropTypes } from '../../../common/constants/crops.enum';

@InputType()
export class PlotFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cropType?: CropTypes;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cropVariety?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  farmId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  irrigationType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  soilType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  hasHarvest?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  minSurface?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxSurface?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  limit?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  offset?: number;
}