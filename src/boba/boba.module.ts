import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Boba } from './boba.entity';
import { GqlAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BobaResolver } from './boba.resolver';
import { BobaService } from './boba.service';
import { JwtService, JwtModule } from '@nestjs/jwt';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Boba])],
  providers: [
    // {
    //   provide: APP_GUARD,
    //   useClass: GqlAuthGuard,
    // },
    BobaService,
    BobaResolver,
  ],
  exports: [BobaService],
})
export class BobaModule {}
