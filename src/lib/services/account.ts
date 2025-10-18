import { User } from '../types/user';

// Serviços de gerenciamento de conta
export class AccountService {
  static async updateProfile(userId: string, profileData: {
    name: string;
    email: string;
    phone?: string;
    birthDate?: string;
    gender?: string;
  }): Promise<User> {
    // Simular delay de API
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular atualização
    console.log('Perfil atualizado:', profileData);
    
    // Retornar usuário atualizado (mock)
    return {
      id: userId,
      ...profileData,
      plan: 'premium',
      status: 'active',
      emailVerified: true,
      phoneVerified: false,
      twoFactorEnabled: false,
      createdAt: new Date(),
    } as User;
  }

  static async changePassword(userId: string, currentPassword: string, newPassword: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Simular validação de senha atual
    if (currentPassword !== 'senha123') {
      throw new Error('Senha atual incorreta');
    }
    
    // Simular mudança de senha
    console.log('Senha alterada com sucesso para usuário:', userId);
  }

  static async enableTwoFactor(userId: string): Promise<{ qrCode: string; backupCodes: string[] }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular geração de QR code e códigos de backup
    return {
      qrCode: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg==',
      backupCodes: [
        '123456789',
        '987654321',
        '456789123',
        '789123456',
        '321654987',
        '654987321',
        '147258369',
        '369258147',
      ],
    };
  }

  static async disableTwoFactor(userId: string, code: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Simular validação do código
    if (code !== '123456') {
      throw new Error('Código de verificação inválido');
    }
    
    console.log('2FA desabilitado para usuário:', userId);
  }

  static async verifyEmail(userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Email de verificação enviado para usuário:', userId);
  }

  static async verifyPhone(userId: string, phoneNumber: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('SMS de verificação enviado para:', phoneNumber);
  }

  static async confirmPhoneVerification(userId: string, code: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    if (code !== '123456') {
      throw new Error('Código de verificação inválido');
    }
    
    console.log('Telefone verificado para usuário:', userId);
  }

  static async cancelSubscription(userId: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 800));
    console.log('Assinatura cancelada para usuário:', userId);
  }

  static async deleteAccount(userId: string, password: string): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Simular validação de senha
    if (password !== 'senha123') {
      throw new Error('Senha incorreta');
    }
    
    console.log('Conta excluída para usuário:', userId);
  }

  static async exportData(userId: string): Promise<Blob> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Simular exportação de dados
    const userData = {
      id: userId,
      name: 'Maria Silva',
      email: 'maria@email.com',
      createdAt: new Date().toISOString(),
      profile: {
        phone: '+55 11 99999-9999',
        birthDate: '1990-05-15',
        gender: 'Feminino',
      },
      subscription: {
        plan: 'premium',
        status: 'active',
      },
      workouts: [],
      nutrition: [],
      progress: [],
    };
    
    const dataStr = JSON.stringify(userData, null, 2);
    return new Blob([dataStr], { type: 'application/json' });
  }
}