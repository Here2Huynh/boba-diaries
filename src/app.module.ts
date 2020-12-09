import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql/dist';
import { BobaModule } from './boba/boba.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boba } from './boba/boba.entity';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb;//localhost/boba',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Boba],
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    BobaModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
