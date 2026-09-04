import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class ForgotPasswordResponse {
  @Field()
  message!: string;
}