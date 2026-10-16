import 'reflect-metadata';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as express from 'express';
import * as path from 'path';
import { AppModule } from './app.module';
import { ENV } from './config/env';

async function bootstrap() {
  const logger = new Logger('Bootstrap');
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    logger: ['error', 'warn', 'log'],
  });

  app.setGlobalPrefix('api');
  app.enableCors({ origin: ENV.corsOrigins, credentials: true });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const adminDir = path.join(__dirname, '..', 'public', 'admin');
  const rootPublicDir = path.join(__dirname, '..', '..', 'public');
  app.use('/admin', express.static(adminDir));
  app.use('/videos', express.static(path.join(rootPublicDir, 'videos')));
  app.use('/video-thumbs', express.static(path.join(rootPublicDir, 'video-thumbs')));

  const instance = app.getHttpAdapter().getInstance();
  instance.use((req: any, res: any, next: any) => {
    if (req.method === 'GET' && req.path === '/') return res.redirect('/admin');
    if (req.method === 'GET' && req.path.startsWith('/admin')) {
      return res.sendFile(path.join(adminDir, 'index.html'));
    }
    next();
  });

  await app.listen(ENV.port, '0.0.0.0');
  logger.log(`API ready    -> http://localhost:${ENV.port}/api`);
  logger.log(`Admin panel  -> http://localhost:${ENV.port}/admin`);
}

bootstrap();
