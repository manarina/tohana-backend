// src/modules/auth/dto/verify-reset-token.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsString } from 'class-validator';

@InputType()
export class VerifyResetTokenInput {
  @Field()
  @IsString()
  token!: string;
}