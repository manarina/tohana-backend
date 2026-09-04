// src/modules/harvests/dto/update-harvest.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreateHarvestInput } from './create-harvest.input';
import { IsInt, Min } from 'class-validator';

@InputType()
export class UpdateHarvestInput extends PartialType(CreateHarvestInput) {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id!: number;
}