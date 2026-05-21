import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { prisma } from '@the-software-guys/db';

@Injectable()
export class DbService implements OnModuleInit, OnModuleDestroy {
  readonly prisma = prisma;

  async onModuleInit() {
    await this.prisma.$connect();
  }

  async onModuleDestroy() {
    await this.prisma.$disconnect();
  }
}
