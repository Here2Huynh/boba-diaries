import { Module } from '@nestjs/common';
import { BobaController } from './boba.resolver';
import { BobaService } from './boba.service';

@Module({
  controllers: [BobaController],
  providers: [BobaService],
})
export class BobaModule {}
