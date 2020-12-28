import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService, ConfigModule } from '@nestjs/config';

import { AuthService } from './auth.service';
import { User } from '../users/user.entity';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { UsersModule } from '../users/users.module';
import { AuthResolver } from './auth.resolver';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: {
            expiresIn: 3600,
          },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User]),
    ConfigModule,
    UsersModule,
  ],
  providers: [AuthService, AuthResolver, JwtStrategy],
  exports: [AuthService, AuthResolver, JwtStrategy, PassportModule],
})
export class AuthModule {}
