// src/modules/email/email.service.ts
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';
import { Transporter } from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter: Transporter | undefined;
  private readonly logger = new Logger(EmailService.name);

  constructor(private configService: ConfigService) {
    this.initializeTransporter();
  }

  /**
   * Initialiser le transporteur SMTP
   */
  private initializeTransporter(): void {
    // Récupérer les variables d'environnement
    const host = this.configService.get('SMTP_HOST');
    const port = this.configService.get('SMTP_PORT');
    const user = this.configService.get('SMTP_USER');
    const pass = this.configService.get('SMTP_PASSWORD');

    // Vérifier que les variables sont définies
    if (!host || !user || !pass) {
      this.logger.warn('⚠️ Variables SMTP non configurées, utilisation d\'Ethereal par défaut');
      this.initializeEtherealDefault();
      return;
    }

    this.logger.log(`📧 Configuration SMTP: ${host}:${port}`);

    this.transporter = nodemailer.createTransport({
      host: host,
      port: parseInt(port || '587'),
      secure: false, // true pour le port 465
      auth: {
        user: user,
        pass: pass,
      },
      tls: {
        rejectUnauthorized: false, // Pour éviter les erreurs SSL
      },
    });

    // Vérifier la connexion
    this.verifyConnection();
  }

  /**
   * Initialiser Ethereal par défaut (en cas d'erreur)
   */
  private async initializeEtherealDefault(): Promise<void> {
    try {
      this.logger.log('🔧 Création d\'un compte Ethereal automatique...');
      const testAccount = await nodemailer.createTestAccount();

      this.transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });

      this.logger.log('✅ Compte Ethereal créé automatiquement');
      this.logger.log(`📧 Email: ${testAccount.user}`);
      this.logger.log(`🔑 Password: ${testAccount.pass}`);
      console.log('🔑 ETIHEREAL CREDENTIALS:');
      console.log(`📧 ${testAccount.user}`);
      console.log(`🔑 ${testAccount.pass}`);
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`❌ Erreur de création du compte Ethereal: ${message}`);
    }
  }

  /**
   * Vérifier la connexion SMTP
   */
  private async verifyConnection(): Promise<void> {
    try {
      if (!this.transporter) {
        throw new Error('Transporteur SMTP non initialisé');
      }
      await this.transporter.verify();
      this.logger.log('✅ Connexion SMTP établie avec succès');
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`❌ Erreur de connexion SMTP: ${message}`);
      this.logger.log('🔄 Tentative de reconnexion avec Ethereal...');
      await this.initializeEtherealDefault();
    }
  }

  /**
   * Envoyer un email de réinitialisation de mot de passe
   */
  async sendResetPasswordEmail(email: string, token: string, name: string): Promise<void> {
    const frontendUrl = this.configService.get('FRONTEND_URL', 'http://localhost:3001');
    const resetLink = `${frontendUrl}/reset-password?token=${token}`;

    const mailOptions = {
      from: this.configService.get('SMTP_FROM', 'noreply@tohana.mg'),
      to: email,
      subject: '🔐 Réinitialisation de votre mot de passe - Tohana',
      html: this.getResetPasswordHtml(name, resetLink),
      text: this.getResetPasswordText(name, resetLink),
    };

    try {
      if (!this.transporter) {
        throw new Error('Transporteur SMTP non initialisé');
      }
      const info = await this.transporter.sendMail(mailOptions);
      this.logger.log(`📧 Email envoyé à ${email}`);
      
      const previewUrl = nodemailer.getTestMessageUrl(info);
      if (previewUrl) {
        this.logger.log(`🔗 Voir l'email en ligne: ${previewUrl}`);
        console.log('\n🔗 VISUALISER L\'EMAIL ICI :', previewUrl, '\n');
      } else {
        // Si pas de preview (pour les vrais SMTP), afficher un message
        this.logger.log('📧 Email envoyé avec succès (pas de preview disponible)');
      }
    } catch (error) {
      const message = error instanceof Error ? error.message : String(error);
      this.logger.error(`❌ Erreur lors de l'envoi de l'email: ${message}`);
      
      // En cas d'erreur, essayer de recréer la connexion
      await this.initializeEtherealDefault();
      
      // Réessayer l'envoi
      try {
        if (!this.transporter) {
          throw new Error('Transporteur SMTP non initialisé');
        }
        const info = await this.transporter.sendMail(mailOptions);
        const previewUrl = nodemailer.getTestMessageUrl(info);
        if (previewUrl) {
          console.log('\n🔗 VISUALISER L\'EMAIL ICI :', previewUrl, '\n');
        }
      } catch (retryError) {
        throw new Error('Erreur lors de l\'envoi de l\'email après réessai');
      }
    }
  }

  /**
   * HTML de l'email de réinitialisation
   */
  private getResetPasswordHtml(name: string, resetLink: string): string {
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #2d6a4f; color: white; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
          .content { background: #f8f9fa; padding: 30px; border-radius: 0 0 8px 8px; }
          .button { display: inline-block; background: #2d6a4f; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; margin: 20px 0; }
          .button:hover { background: #1b4332; }
          .footer { text-align: center; margin-top: 30px; color: #6c757d; font-size: 12px; }
          .token { background: #e9ecef; padding: 10px; border-radius: 4px; font-family: monospace; font-size: 14px; text-align: center; word-break: break-all; }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🌾 Tohana</h1>
          <p>Observatoire de la Résilience Agricole</p>
        </div>
        <div class="content">
          <h2>Bonjour ${name} 👋</h2>
          <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
          <p>Cliquez sur le bouton ci-dessous :</p>
          <div style="text-align: center;">
            <a href="${resetLink}" class="button">Réinitialiser mon mot de passe</a>
          </div>
          <p>Ou copiez ce lien :</p>
          <p class="token">${resetLink}</p>
          <p><strong>⚠️ Ce lien expire dans 24 heures.</strong></p>
          <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Tohana</p>
        </div>
      </body>
      </html>
    `;
  }

  /**
   * Texte de l'email de réinitialisation
   */
  private getResetPasswordText(name: string, resetLink: string): string {
    return `
Bonjour ${name},

Vous avez demandé la réinitialisation de votre mot de passe.

Cliquez sur le lien suivant :
${resetLink}

Ce lien expire dans 24 heures.

---
Tohana - Observatoire de la Résilience Agricole
${new Date().getFullYear()}
    `;
  }
}