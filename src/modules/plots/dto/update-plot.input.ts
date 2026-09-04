// src/modules/plots/dto/update-plot.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePlotInput } from './create-plot.input';
import { IsInt, Min } from 'class-validator';

@InputType()
export class UpdatePlotInput extends PartialType(CreatePlotInput) {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id!: number;
}