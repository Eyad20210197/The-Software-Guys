import { Module } from '@nestjs/common';
import { SeoService } from './seo.service';
import { SeoController } from './seo.controller';
import { DbModule } from '../db/db.module';

@Module({
  imports: [DbModule],
  providers: [SeoService],
  controllers: [SeoController],
})
export class SeoModule {}
