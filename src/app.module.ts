import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Boba } from './boba/boba.entity';
import { BobaModule } from './boba/boba.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/user.entity';
import { UsersModule } from './users/users.module';
import { config } from './config';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        type: configService.get('DB_TYPE'),
        url: configService.get('DB_URL'),
        synchronize: true,
        useUnifiedTopology: true,
        entities: [Boba, User],
      }),
      inject: [ConfigService],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
      context: ({ req }) => ({ headers: req.headers }),
    }),
    UsersModule,
    AuthModule,
    BobaModule,
  ],
})
export class AppModule {}
