import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
