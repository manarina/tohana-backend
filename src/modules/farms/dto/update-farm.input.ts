// src/modules/farms/dto/update-farm.input.ts
import { InputType, Field, Int, Float, PartialType } from '@nestjs/graphql';
import { CreateFarmInput } from './create-farm.input';
import { IsInt, Min } from 'class-validator';

@InputType()
export class UpdateFarmInput extends PartialType(CreateFarmInput) {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id!: number;
}