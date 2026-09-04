// src/modules/auth/auth.service.ts
import {
  Injectable,
  UnauthorizedException,
  ConflictException,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as crypto from 'crypto';
import { UsersService } from '../users/users.service';
import { EmailService } from '../email/email.service';
import { LoginInput } from './dto/login.input';
import { RegisterInput } from './dto/register.input';
import { AuthResponse } from './dto/auth-response.dto';
import { RefreshTokenInput } from './dto/refresh-token.input';
import { ChangePasswordInput } from './dto/change-password.input';
import { ForgotPasswordInput } from './dto/forgot-password.input';
import { ResetPasswordInput } from './dto/reset-password.input';
import { VerifyResetTokenInput } from './dto/verify-reset-token.input';
import { JwtPayload, JwtRefreshPayload } from './interfaces/jwt-payload.interface';
import { User } from '../users/entities/user.entity';
import { PasswordReset } from './entities/password-reset.entity';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    private emailService: EmailService, // ✅ Injection du service email
    @InjectRepository(PasswordReset)
    private passwordResetRepository: Repository<PasswordReset>,
  ) {}

  // ============ MÉTHODES EXISTANTES ============

  async validateUser(email: string, password: string): Promise<any> {
    console.log('🔍 [validateUser] ===== DÉBUT VALIDATION =====');
    console.log('🔍 [validateUser] Email:', email);
    console.log('🔍 [validateUser] Mot de passe reçu:', password);
    console.log('🔍 [validateUser] Longueur du mot de passe:', password.length);
    
    const user = await this.usersService.findByEmail(email);
    
    if (!user) {
      console.log('❌ [validateUser] Utilisateur non trouvé');
      return null;
    }
    
    console.log('✅ [validateUser] Utilisateur trouvé:', user.email);
    console.log('📝 [validateUser] Hash stocké COMPLET:', user.password);
    console.log('📝 [validateUser] Longueur du hash:', user.password.length);
    console.log('📝 [validateUser] Hash commence par $argon2id$?', user.password.startsWith('$argon2id$'));
    
    try {
      const isPasswordValid = await argon2.verify(user.password, password);
      console.log('✅ [validateUser] Résultat argon2.verify():', isPasswordValid);
      
      if (isPasswordValid) {
        const { password, ...result } = user;
        console.log('✅ [validateUser] Validation réussie !');
        console.log('🔍 [validateUser] ===== FIN VALIDATION =====');
        return result;
      }
    } catch (error) {
      console.error(
        '❌ [validateUser] Erreur argon2.verify():',
        error instanceof Error ? error.message : error,
      );
      console.log('💡 [validateUser] Le hash n\'est pas un hash argon2 valide');
    }
    
    console.log('❌ [validateUser] Mot de passe invalide');
    console.log('🔍 [validateUser] ===== FIN VALIDATION =====');
    return null;
  }

  async login(loginInput: LoginInput): Promise<AuthResponse> {
    console.log('🔐 [login] Tentative de connexion pour:', loginInput.email);
    
    const user = await this.validateUser(loginInput.email, loginInput.password);
    
    if (!user) {
      console.log('❌ [login] Échec de validation');
      throw new UnauthorizedException('Email ou mot de passe incorrect');
    }

    if (!user.isActive) {
      console.log('❌ [login] Compte désactivé');
      throw new UnauthorizedException('Compte désactivé');
    }

    console.log('✅ [login] Connexion réussie pour:', user.email);
    return this.generateTokens(user);
  }

  async register(registerInput: RegisterInput): Promise<AuthResponse> {
    console.log('📝 [register] Tentative d\'inscription:', registerInput.email);
    
    const existingUser = await this.usersService.findByEmail(registerInput.email);
    if (existingUser) {
      console.log('❌ [register] Email déjà utilisé');
      throw new ConflictException('Cet email est déjà utilisé');
    }

    const user = await this.usersService.create({
      email: registerInput.email,
      password: registerInput.password,
      name: registerInput.name,
    });

    console.log('✅ [register] Utilisateur créé avec succès:', user.email);
    console.log('👤 [register] Rôle attribué:', user.role);
    
    return this.generateTokens(user);
  }

  async refreshToken(refreshTokenInput: RefreshTokenInput): Promise<AuthResponse> {
    try {
      const payload = this.jwtService.verify<JwtRefreshPayload>(
        refreshTokenInput.refreshToken,
        { secret: this.configService.get('jwt.refreshSecret') },
      );

      if (!payload.isRefreshToken) {
        throw new UnauthorizedException('Token invalide');
      }

      const user = await this.usersService.findOne(payload.sub);
      if (!user || !user.isActive) {
        throw new UnauthorizedException('Utilisateur non trouvé ou inactif');
      }

      return this.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException('Token invalide ou expiré');
    }
  }

  async changePassword(
    userId: number,
    changePasswordInput: ChangePasswordInput,
  ): Promise<boolean> {
    const { currentPassword, newPassword, confirmPassword } = changePasswordInput;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Les mots de passe ne correspondent pas');
    }

    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('Utilisateur non trouvé');
    }

    try {
      const isPasswordValid = await argon2.verify(user.password, currentPassword);
      if (!isPasswordValid) {
        throw new UnauthorizedException('Mot de passe actuel incorrect');
      }
    } catch (error) {
      console.error(
        '❌ [changePassword] Erreur argon2.verify():',
        error instanceof Error ? error.message : error,
      );
      throw new UnauthorizedException('Erreur lors de la vérification du mot de passe');
    }

    const hashedPassword = await argon2.hash(newPassword, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    await this.usersService.updatePassword(userId, hashedPassword);
    return true;
  }

  // ============ NOUVELLES MÉTHODES ============

  /**
   * 🔐 Mot de passe oublié - Envoi d'un email de réinitialisation
   */
  async forgotPassword(forgotPasswordInput: ForgotPasswordInput): Promise<{ message: string }> {
    console.log('📧 [forgotPassword] Demande pour:', forgotPasswordInput.email);

    const user = await this.usersService.findByEmail(forgotPasswordInput.email);
    
    // Ne pas révéler si l'email existe ou non (sécurité)
    if (!user) {
      console.log('⚠️ [forgotPassword] Email non trouvé:', forgotPasswordInput.email);
      return {
        message: 'Si cet email existe, un lien de réinitialisation vous a été envoyé.',
      };
    }

    // Supprimer les anciens tokens non utilisés
    await this.passwordResetRepository.delete({
      email: forgotPasswordInput.email,
      isUsed: false,
    });

    // Générer un token sécurisé
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date();
    expiresAt.setHours(expiresAt.getHours() + 24); // Expire dans 24h

    // Sauvegarder le token
    const passwordReset = this.passwordResetRepository.create({
      token,
      email: user.email,
      userId: user.id,
      expiresAt,
      isUsed: false,
    });

    await this.passwordResetRepository.save(passwordReset);
    console.log('✅ [forgotPassword] Token généré pour:', user.email);

    // ✅ Envoyer l'email via le service Email
    await this.emailService.sendResetPasswordEmail(user.email, token, user.name);

    return {
      message: 'Si cet email existe, un lien de réinitialisation vous a été envoyé.',
    };
  }

  /**
   * 🔐 Vérifier si un token de réinitialisation est valide
   */
  async verifyResetToken(verifyResetTokenInput: VerifyResetTokenInput): Promise<{ isValid: boolean }> {
    console.log('🔍 [verifyResetToken] Vérification du token');

    const reset = await this.passwordResetRepository.findOne({
      where: { token: verifyResetTokenInput.token },
      relations: ['user'],
    });

    if (!reset) {
      return { isValid: false };
    }

    if (reset.isUsed) {
      return { isValid: false };
    }

    if (new Date() > reset.expiresAt) {
      return { isValid: false };
    }

    return { isValid: true };
  }

  /**
   * 🔐 Réinitialiser le mot de passe avec un token
   */
  async resetPassword(resetPasswordInput: ResetPasswordInput): Promise<{ message: string }> {
    console.log('🔑 [resetPassword] Tentative de réinitialisation');

    const { token, newPassword, confirmPassword } = resetPasswordInput;

    if (newPassword !== confirmPassword) {
      throw new BadRequestException('Les mots de passe ne correspondent pas');
    }

    // Vérifier le token
    const reset = await this.passwordResetRepository.findOne({
      where: { token },
      relations: ['user'],
    });

    if (!reset) {
      throw new BadRequestException('Token invalide');
    }

    if (reset.isUsed) {
      throw new BadRequestException('Ce token a déjà été utilisé');
    }

    if (new Date() > reset.expiresAt) {
      throw new BadRequestException('Ce token a expiré');
    }

    // Hasher le nouveau mot de passe avec argon2
    const hashedPassword = await argon2.hash(newPassword, {
      type: argon2.argon2id,
      memoryCost: 2 ** 16,
      timeCost: 3,
      parallelism: 1,
    });

    // Mettre à jour le mot de passe
    if (reset.userId === undefined) {
      throw new BadRequestException('Utilisateur associé au token introuvable');
    }

    await this.usersService.updatePassword(reset.userId, hashedPassword);

    // Marquer le token comme utilisé
    reset.isUsed = true;
    await this.passwordResetRepository.save(reset);

    console.log('✅ [resetPassword] Mot de passe réinitialisé avec succès pour:', reset.email);

    return {
      message: 'Votre mot de passe a été réinitialisé avec succès.',
    };
  }

  // ============ MÉTHODE PRIVÉE ============

  private generateTokens(user: User): AuthResponse {
    const payload: JwtPayload = {
      sub: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = this.jwtService.sign(payload);
    const refreshToken = this.jwtService.sign(
      { ...payload, isRefreshToken: true },
      { secret: this.configService.get('jwt.refreshSecret') },
    );

    return {
      accessToken,
      refreshToken,
      tokenType: 'Bearer',
      expiresIn: 3600 * 24 * 7,
      user,
    };
  }
}