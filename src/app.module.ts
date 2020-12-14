import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql/dist';
import { BobaModule } from './boba/boba.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Boba } from './boba/boba.entity';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb;//localhost/boba',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [Boba, User],
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
