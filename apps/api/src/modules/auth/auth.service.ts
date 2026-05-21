import { Injectable, UnauthorizedException } from '@nestjs/common';
import { DbService } from '../db/db.service';
import * as crypto from 'crypto';

@Injectable()
export class AuthService {
  constructor(private readonly db: DbService) {}

  private hashPassword(password: string): string {
    return crypto.pbkdf2Sync(password, 'salt-software-guys-2026', 1000, 64, 'sha512').toString('hex');
  }

  async login(email: string, password: string) {
    const admin = await this.db.prisma.admin.findUnique({
      where: { email },
    });

    if (!admin) {
      throw new UnauthorizedException('Invalid administrative credentials');
    }

    const hashed = this.hashPassword(password);
    if (admin.passwordHash !== hashed) {
      throw new UnauthorizedException('Invalid administrative credentials');
    }

    // Create session
    const token = crypto.randomBytes(32).toString('hex');
    const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000); // 24 hours

    const session = await this.db.prisma.session.create({
      data: {
        adminId: admin.id,
        token,
        expiresAt,
      },
    });

    return {
      success: true,
      token: session.token,
      admin: {
        id: admin.id,
        email: admin.email,
        name: admin.name,
        role: admin.role,
      },
    };
  }

  async validateToken(token: string) {
    const session = await this.db.prisma.session.findUnique({
      where: { token },
      include: { admin: true },
    });

    if (!session || session.expiresAt < new Date()) {
      if (session) {
        // clean up expired session
        await this.db.prisma.session.delete({ where: { id: session.id } }).catch(() => {});
      }
      return null;
    }

    return session.admin;
  }

  async logout(token: string) {
    await this.db.prisma.session.delete({
      where: { token },
    }).catch(() => {});
    return { success: true };
  }
}
