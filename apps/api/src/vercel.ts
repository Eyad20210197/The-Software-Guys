import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import serverless from 'serverless-http';

const expressApp = express();

let cachedHandler: any;

async function bootstrap() {
  if (cachedHandler) {
    return cachedHandler;
  }
  const app = await NestFactory.create(
    AppModule,
    new ExpressAdapter(expressApp),
  );

  // Enable global API prefixing
  app.setGlobalPrefix('api/v1');

  // Enforce rigid request validations (STRIDE & Tampering mitigation)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Enable CORS for frontend requests
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  await app.init();
  cachedHandler = serverless(expressApp);
  return cachedHandler;
}

export const handler = async (event: any, context: any) => {
  const serverlessHandler = await bootstrap();
  return serverlessHandler(event, context);
};
