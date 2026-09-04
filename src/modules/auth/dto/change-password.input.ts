import { InputType, Field } from '@nestjs/graphql';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';

@InputType()
export class ChangePasswordInput {
  @Field()
  @IsString()
  @IsNotEmpty()
  currentPassword!: string;

  @Field()
  @IsString()
  @MinLength(8, { message: 'Le nouveau mot de passe doit contenir au moins 8 caractères' })
  newPassword!: string;

  @Field()  
  @IsString()
  @MinLength(8)
  confirmPassword!: string;
}