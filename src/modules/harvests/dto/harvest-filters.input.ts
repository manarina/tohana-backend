// src/modules/harvests/dto/harvest-filters.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, Min } from 'class-validator';

@InputType()
export class HarvestFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  season?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  plotId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  farmId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  quality?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  minQuantity?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(0)
  maxQuantity?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  startDate?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  endDate?: string;

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