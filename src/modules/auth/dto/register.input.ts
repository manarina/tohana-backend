// src/modules/auth/dto/register.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, MaxLength, IsIn, IsOptional } from 'class-validator';
import { Regions } from '../../../common/constants/regions.enum';

@InputType()
export class RegisterInput {
  @Field()
  @IsEmail({}, { message: 'Veuillez fournir un email valide' })
  email!: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Le mot de passe doit contenir au moins 8 caractères' })
  @MaxLength(50, { message: 'Le mot de passe ne peut pas dépasser 50 caractères' })
  password!: string;

  @Field()
  @IsString()
  @MinLength(2, { message: 'Le nom doit contenir au moins 2 caractères' })
  @MaxLength(50, { message: 'Le nom ne peut pas dépasser 50 caractères' })
  name!: string;

  
}