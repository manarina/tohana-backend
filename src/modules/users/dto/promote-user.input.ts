// src/modules/users/dto/promote-user.input.ts
import { InputType, Field } from '@nestjs/graphql';
import { IsInt, IsIn } from 'class-validator';
import { Roles } from '../../../common/constants/roles.enum';

@InputType()
export class PromoteUserInput {
  @Field()
  @IsInt()
  userId!: number;

  @Field()
  @IsIn(Object.values(Roles))
  role!: Roles;
}