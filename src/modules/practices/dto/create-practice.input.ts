// src/modules/practices/dto/create-practice.input.ts
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsIn,
  Min,
  Max,
  IsBoolean,
  IsDate,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PracticeTypes, PerceivedBenefits, KnowledgeSources } from '../../../common/constants/practices.enum';

@InputType()
export class CreatePracticeInput {
  // ===== Champs obligatoires =====

  @Field()
  @IsIn(Object.values(PracticeTypes), { message: 'Veuillez sélectionner un type de pratique valide' })
  practiceType!: PracticeTypes;

  @Field(() => Float)
  @IsNumber()
  @Min(0.01, { message: 'La surface doit être d\'au moins 0.01 hectare' })
  @Max(10000, { message: 'La surface ne peut pas dépasser 10000 hectares' })
  surface!: number;

  @Field()
  @IsDate()
  @Type(() => Date)
  adoptionDate!: Date;

  @Field(() => Int)
  @IsNumber()
  farmId!: number;

  // ===== Champs optionnels =====

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  specificTechnique?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(Object.values(PerceivedBenefits))
  perceivedBenefit?: PerceivedBenefits;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(1000)
  yieldImprovement?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsIn(Object.values(KnowledgeSources))
  sourceOfKnowledge?: KnowledgeSources;

  @Field({ nullable: true })
  @IsOptional()
  @IsBoolean()
  isStillPracticed?: boolean;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  challenges?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(5)
  satisfactionRating?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  recommendation?: string;
}