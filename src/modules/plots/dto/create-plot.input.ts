// src/modules/plots/dto/create-plot.input.ts
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsDate,
  IsIn,
  IsNotEmpty,
  Min,
  Max,
} from 'class-validator';
import { CropTypes } from '../../../common/constants/crops.enum';

@InputType()
export class CreatePlotInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Le nom de la parcelle est requis' })
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  @Field()
  @IsIn(Object.values(CropTypes), { message: 'Veuillez sélectionner un type de culture valide' })
  cropType!: CropTypes;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  cropVariety?: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.01, { message: 'La surface doit être d\'au moins 0.01 hectare' })
  @Max(10000, { message: 'La surface ne peut pas dépasser 10000 hectares' })
  surface!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  plantingDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  harvestDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  irrigationType?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  soilType?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(90)
  slope?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  expectedYield?: number;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  actualYield?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsDate()
  soilTestDate?: Date;

  @Field({ nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  @Max(14)
  soilPH?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => Int)
  @IsNumber()
  farmId!: number;
}