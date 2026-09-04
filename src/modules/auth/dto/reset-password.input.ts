// src/modules/auth/dto/reset-password.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @Field()
  @IsString()
  token!: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  @MaxLength(50, { message: 'Le mot de passe ne peut pas dépasser 50 caractères' })
  newPassword!: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'La confirmation doit contenir au moins 8 caractères' })
  confirmPassword!: string;
}