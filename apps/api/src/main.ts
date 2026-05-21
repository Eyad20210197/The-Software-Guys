import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable global API prefixing
  app.setGlobalPrefix('api/v1');

  // Enforce rigid request validations (STRIDE & Tampering mitigation)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,         // strip non-whitelisted properties from input object
      transform: true,         // auto-transform payloads to match DTO instance types
      forbidNonWhitelisted: true, // reject requests containing non-whitelisted parameters
    }),
  );

  // Enable CORS for frontend requests
  app.enableCors({
    origin: process.env.FRONTEND_URL || '*',
    credentials: true,
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`[The Software Guys API] Running monolithic backend on: http://localhost:${port}/api/v1`);
}
bootstrap();
