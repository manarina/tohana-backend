// src/modules/practices/dto/update-practice.input.ts
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';
import { CreatePracticeInput } from './create-practice.input';
import { IsInt, Min } from 'class-validator';

@InputType()
export class UpdatePracticeInput extends PartialType(CreatePracticeInput) {
  @Field(() => Int)
  @IsInt()
  @Min(1)
  id!: number;
}