import { Module } from '@nestjs/common';
import { ShowcasesService } from './showcases.service';
import { ShowcasesController } from './showcases.controller';

@Module({
  providers: [ShowcasesService],
  controllers: [ShowcasesController],
})
export class ShowcasesModule {}
