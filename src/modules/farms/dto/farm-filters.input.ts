// src/modules/farms/dto/farm-filters.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, IsBoolean, Min } from 'class-validator';

@InputType()
export class FarmFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  // ✅ Utiliser String sans Regions
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
  commune?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  village?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  userId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isBeneficiary?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  programAffiliation?: string;

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