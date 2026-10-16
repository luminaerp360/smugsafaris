import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { JwtService } from '@nestjs/jwt';
import { Admin, AdminDocument } from './admin.schema';
import { ChangePasswordDto, LoginDto } from './dto/auth.dto';
import { hashPassword, verifyPassword } from '../common/crypto';
import { ENV } from '../config/env';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(Admin.name) private readonly adminModel: Model<AdminDocument>,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto) {
    const admin = await this.adminModel.findOne({ email: dto.email.toLowerCase().trim() });
    if (!admin || !verifyPassword(dto.password, admin.passwordHash)) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = { sub: admin.id, email: admin.email, name: admin.name };
    return {
      accessToken: await this.jwtService.signAsync(payload),
      user: { id: admin.id, email: admin.email, name: admin.name },
    };
  }

  async me(adminId: string) {
    const admin = await this.adminModel.findById(adminId).select('email name createdAt');
    if (!admin) throw new UnauthorizedException('Account not found');
    return { id: admin.id, email: admin.email, name: admin.name };
  }

  async changePassword(adminId: string, dto: ChangePasswordDto) {
    const admin = await this.adminModel.findById(adminId);
    if (!admin || !verifyPassword(dto.currentPassword, admin.passwordHash)) {
      throw new UnauthorizedException('Current password is incorrect');
    }
    admin.passwordHash = hashPassword(dto.newPassword);
    await admin.save();
    return { success: true };
  }

  async ensureAdminExists(): Promise<void> {
    const existing = await this.adminModel.findOne({ email: ENV.adminEmail });
    if (existing) return;
    await this.adminModel.create({
      email: ENV.adminEmail,
      name: ENV.adminName,
      passwordHash: hashPassword(ENV.adminPassword),
    });
  }
}
