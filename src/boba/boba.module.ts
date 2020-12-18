import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Boba } from './boba.entity';
import { UserGuard } from '../auth/auth.guard';
import { BobaResolver } from './boba.resolver';
import { BobaService } from './boba.service';
import { JwtService, JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Boba]), JwtService, JwtModule],
  providers: [
    {
      provide: APP_GUARD,
      useClass: UserGuard,
    },
    BobaService,
    BobaResolver,
  ],
  exports: [BobaService],
})
export class BobaModule {}
