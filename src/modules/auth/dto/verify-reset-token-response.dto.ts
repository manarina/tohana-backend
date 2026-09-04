import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class VerifyResetTokenResponse {
  @Field()
  isValid!: boolean;
}