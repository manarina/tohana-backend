// src/modules/users/users.resolver.ts
import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { PromoteUserInput } from './dto/promote-user.input';
import { GqlAuthGuard } from '../auth/guards/gql-auth.guard';
import { HasRoles } from '../auth/decorators/roles.decorator';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../../common/constants/roles.enum';
import { CurrentUser } from '../auth/decorators/current-user.decorator';
import { Public } from '../auth/decorators/public.decorator';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Récupère tous les utilisateurs (Admin uniquement)
   */
  @Query(() => [User])
  @HasRoles(Roles.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async users(): Promise<User[]> {
    console.log('📋 [UsersResolver] Récupération de tous les utilisateurs');
    return this.usersService.findAll();
  }

  /**
   * Récupère le profil de l'utilisateur connecté
   */
  @Query(() => User)
  @UseGuards(GqlAuthGuard)
  async me(@CurrentUser() user: User): Promise<User> {
    console.log('👤 [UsersResolver] Profil demandé pour:', user.email);
    return user;
  }

  /**
   * Récupère un utilisateur par ID (Admin uniquement)
   */
  @Query(() => User)
  @HasRoles(Roles.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async user(@Args('id', { type: () => Int }) id: number): Promise<User> {
    console.log('🔍 [UsersResolver] Recherche utilisateur ID:', id);
    return this.usersService.findOne(id);
  }

  /**
   * Crée un nouvel utilisateur (Public)
   * Le rôle est attribué automatiquement
   */
  @Mutation(() => User)
  @Public()
  async createUser(@Args('input') createUserInput: CreateUserInput): Promise<User> {
    console.log('📝 [UsersResolver] Création d\'un nouvel utilisateur');
    return this.usersService.create(createUserInput);
  }

  /**
   * Promouvoir un utilisateur (Admin uniquement)
   */
  @Mutation(() => User)
  @HasRoles(Roles.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async promoteUser(@Args('input') promoteUserInput: PromoteUserInput): Promise<User> {
    console.log('⬆️ [UsersResolver] Promotion d\'utilisateur');
    return this.usersService.promoteUser(promoteUserInput);
  }

  /**
   * Supprime un utilisateur (Admin uniquement)
   */
  @Mutation(() => Boolean)
  @HasRoles(Roles.ADMIN)
  @UseGuards(GqlAuthGuard, RolesGuard)
  async deleteUser(@Args('id', { type: () => Int }) id: number): Promise<boolean> {
    console.log('🗑️ [UsersResolver] Suppression utilisateur ID:', id);
    return this.usersService.remove(id);
  }
}