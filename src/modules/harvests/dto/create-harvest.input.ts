// src/modules/harvests/dto/create-harvest.input.ts
import { InputType, Field, Float, Int } from '@nestjs/graphql';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsIn,
  Min,
  Max,
} from 'class-validator';
import { Type } from 'class-transformer';

@InputType()
export class CreateHarvestInput {
  @Field()
  @IsString()
  season!: string;

  @Field()
  @IsString()
  harvestDate!: string;

  @Field(() => Float)
  @IsNumber()
  @Min(0.01, { message: 'La quantité doit être positive' })
  quantity!: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  unit?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  quality?: string;

  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  @Min(0)
  salePrice?: number;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  buyer?: string;

  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  notes?: string;

  @Field(() => Int)
  @IsNumber()
  plotId!: number;
}