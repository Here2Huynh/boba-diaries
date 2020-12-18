import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { UserGuard } from './auth/auth.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  const jwtService = app.get(JwtService);

  app.useGlobalGuards(new UserGuard(configService, jwtService));

  await app.listen(port);
}
bootstrap();
