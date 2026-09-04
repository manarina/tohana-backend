// src/modules/auth/auth.resolver.ts
import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthResponse } from './dto/auth-response.dto';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { ForgotPasswordInput } from './dto/forgot-password.input'; // ✅ Ajouter
import { ResetPasswordInput } from './dto/reset-password.input'; // ✅ Ajouter
import { VerifyResetTokenInput } from './dto/verify-reset-token.input'; // ✅ Ajouter
import { ForgotPasswordResponse } from './dto/forgot-password-response.dto'; // ✅ Ajouter
import { ResetPasswordResponse } from './dto/reset-password-response.dto'; // ✅ Ajouter
import { VerifyResetTokenResponse } from './dto/verify-reset-token-response.dto'; // ✅ Ajouter
import { GqlAuthGuard } from './guards/gql-auth.guard';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  // ============ MUTATIONS ============

  @Mutation(() => AuthResponse)
  async login(@Args('input') loginInput: LoginInput): Promise<AuthResponse> {
    return this.authService.login(loginInput);
  }

  @Mutation(() => AuthResponse)
  async register(@Args('input') registerInput: RegisterInput): Promise<AuthResponse> {
    return this.authService.register(registerInput);
  }

  @Mutation(() => AuthResponse)
  async refreshToken(
    @Args('input') refreshTokenInput: RefreshTokenInput,
  ): Promise<AuthResponse> {
    return this.authService.refreshToken(refreshTokenInput);
  }

  @Mutation(() => Boolean)
  @UseGuards(GqlAuthGuard)
  async changePassword(
    @CurrentUser() user: User,
    @Args('input') changePasswordInput: ChangePasswordInput,
  ): Promise<boolean> {
    return this.authService.changePassword(user.id, changePasswordInput);
  }

  // ✅ NOUVELLES MUTATIONS
  @Mutation(() => ForgotPasswordResponse)
  async forgotPassword(
    @Args('input') forgotPasswordInput: ForgotPasswordInput,
  ): Promise<{ message: string }> {
    return this.authService.forgotPassword(forgotPasswordInput);
  }

  @Mutation(() => ResetPasswordResponse)
  async resetPassword(
    @Args('input') resetPasswordInput: ResetPasswordInput,
  ): Promise<{ message: string }> {
    return this.authService.resetPassword(resetPasswordInput);
  }

  // ============ QUERIES ============

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async profile(@CurrentUser() user: User): Promise<User> {
    console.log('👤 [profile] Profil demandé pour:', user.email);
    return user;
  }

  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    console.log('👤 [me] Profil demandé pour:', user.email);
    return user;
  }

  @Query(() => Boolean)
  async healthCheck(): Promise<boolean> {
    return true;
  }

  // ✅ NOUVELLE QUERY
  @Query(() => VerifyResetTokenResponse)
  async verifyResetToken(
    @Args('input') verifyResetTokenInput: VerifyResetTokenInput,
  ): Promise<{ isValid: boolean }> {
    return this.authService.verifyResetToken(verifyResetTokenInput);
  }
}