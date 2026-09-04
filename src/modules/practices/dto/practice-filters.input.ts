// src/modules/practices/dto/practice-filters.input.ts
import { InputType, Field, Int } from '@nestjs/graphql';
import { IsOptional, IsString, IsInt, IsBoolean, Min } from 'class-validator';
import { PracticeTypes, PerceivedBenefits } from '../../../common/constants/practices.enum';

@InputType()
export class PracticeFiltersInput {
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  searchTerm?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  practiceType?: PracticeTypes;

  @Field({ nullable: true })
  @IsOptional()
  @IsInt()
  @Min(1)
  farmId?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  perceivedBenefit?: PerceivedBenefits;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isStillPracticed?: boolean;

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
  @IsString()
  sourceOfKnowledge?: string;

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