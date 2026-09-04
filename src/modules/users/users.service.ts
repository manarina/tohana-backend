// src/modules/users/users.service.ts
import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as argon2 from 'argon2'; // ✅ Utiliser argon2
import { User } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { PromoteUserInput } from './dto/promote-user.input';
import { Roles } from '../../common/constants/roles.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    console.log('🔍 [UsersService] Recherche email:', email);
    const user = await this.userRepository.findOne({ 
      where: { email: email.toLowerCase() } 
    });
    console.log('📊 [UsersService] Résultat:', user ? 'Trouvé' : 'Non trouvé');
    return user;
  }

  async getUsersCount(): Promise<number> {
    return this.userRepository.count();
  }

  private async assignRole(): Promise<Roles> {
    const count = await this.getUsersCount();
    console.log('👤 [UsersService] Nombre d\'utilisateurs:', count);
    if (count === 0) {
      console.log('✅ [UsersService] Premier utilisateur → ADMIN');
      return Roles.ADMIN;
    }
    console.log('✅ [UsersService] Utilisateur suivant → VIEWER');
    return Roles.VIEWER;
  }

  async create(createUserInput: CreateUserInput): Promise<User> {
    console.log('📝 [UsersService] Création utilisateur:', createUserInput.email);
    
    const email = createUserInput.email.toLowerCase();
    
    const existingUser = await this.findByEmail(email);
    if (existingUser) {
      console.log('❌ [UsersService] Email déjà utilisé');
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const role = await this.assignRole();

    // ✅ Utiliser argon2 (le meilleur algorithme)
    try {
      const hashedPassword = await argon2.hash(createUserInput.password, {
        type: argon2.argon2id, // Le plus sécurisé
        memoryCost: 2 ** 16, // 64 MB
        timeCost: 3,
        parallelism: 1,
      });
      
      console.log('🔑 [UsersService] Hash argon2 généré avec succès');
      console.log('📝 [UsersService] Hash (début):', hashedPassword.substring(0, 40) + '...');
      console.log('📝 [UsersService] Longueur du hash:', hashedPassword.length);

      const user = this.userRepository.create({
        ...createUserInput,
        email: email,
        password: hashedPassword,
        role: role,
      });

      const savedUser = await this.userRepository.save(user);
      console.log('✅ [UsersService] Utilisateur créé avec succès:', savedUser.email);
      
      return savedUser;
    } catch (error) {
      console.error('❌ [UsersService] Erreur argon2.hash():', error);
      throw new Error('Erreur lors du hachage du mot de passe');
    }
  }

  async promoteUser(promoteUserInput: PromoteUserInput): Promise<User> {
    const user = await this.findOne(promoteUserInput.userId);
    
    if (!Object.values(Roles).includes(promoteUserInput.role)) {
      throw new Error('Rôle invalide');
    }

    user.role = promoteUserInput.role;
    console.log('⬆️ [UsersService] Utilisateur promu:', user.email, '→', user.role);
    return this.userRepository.save(user);
  }

  async updatePassword(id: number, hashedPassword: string): Promise<User> {
    const user = await this.findOne(id);
    user.password = hashedPassword;
    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<boolean> {
    const result = await this.userRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Utilisateur avec l'ID ${id} non trouvé`);
    }
    console.log('🗑️ [UsersService] Utilisateur supprimé:', id);
    return true;
  }
}