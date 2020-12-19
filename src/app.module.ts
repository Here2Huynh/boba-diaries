import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql/dist';
import { BobaModule } from './boba/boba.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { Boba } from './boba/boba.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
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
    BobaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
