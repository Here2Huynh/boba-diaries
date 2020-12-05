import { Module } from '@nestjs/common';
import { BobaResolver } from './boba.resolver';
import { BobaService } from './boba.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boba } from './boba.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Boba])],
  providers: [BobaService, BobaResolver],
})
export class BobaModule {}
