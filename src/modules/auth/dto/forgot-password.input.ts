// src/modules/auth/dto/forgot-password.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @Field()
  @IsEmail({}, { message: 'Veuillez fournir un email valide' })
  email!: string;
}