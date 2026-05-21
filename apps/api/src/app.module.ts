import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ThrottlerModule, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { DbModule } from './modules/db/db.module';
import { LeadsModule } from './modules/leads/leads.module';
import { ShowcasesModule } from './modules/showcases/showcases.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 900000, // 15 minutes
        limit: 100,  // max 100 requests per ttl window
      },
    ]),
    DbModule,
    LeadsModule,
    ShowcasesModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
