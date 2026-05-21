import { Controller, Get, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AuthGuard } from '../auth/auth.guard';
import { DashboardAnalytics } from '@the-software-guys/types';

@Controller('admin')
@UseGuards(AuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('analytics')
  async getAnalytics(): Promise<DashboardAnalytics> {
    return this.adminService.getAnalytics();
  }
}
