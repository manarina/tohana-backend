// src/modules/farms/dto/create-farm.input.ts
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsBoolean,
  Min,
  Max,
  IsIn,
  IsNotEmpty,
} from 'class-validator';
import { Regions } from '../../../common/constants/regions.enum';

@InputType()
export class CreateFarmInput {
  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Le nom de l\'exploitation est requis' })
  name!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  description?: string;

  // ✅ Utiliser Field() sans type pour String par défaut
  @Field()
  @IsIn(Object.values(Regions), { message: 'Veuillez sélectionner une région valide' })
  region!: Regions;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Le district est requis' })
  district!: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'La commune est requise' })
  commune!: string;

  @Field()
  @IsString()
  @IsNotEmpty({ message: 'Le village est requis' })
  village!: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  fokontany?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  gpsLatitude?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  gpsLongitude?: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0, { message: 'La surface doit être positive' })
  @Max(10000, { message: 'La surface ne peut pas dépasser 10000 hectares' })
  totalSurface!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  farmerGroup?: string;

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
  @IsString()
  notes?: string;

  @Field(() => Int)
  @IsNumber()
  userId!: number;
}