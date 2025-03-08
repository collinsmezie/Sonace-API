import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { logger } from './middlewares/logger.middleware';
import { ValidationPipe } from '@nestjs/common';
// import { loadConfig } from 'aws-ssm';


async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const config = await loadConfig();
  // console.log("Config from AWS", config);
    // Enable global validation pipe
    app.useGlobalPipes(new ValidationPipe({
      transform: true, // Automatically transform the payload to DTO types
      whitelist: true, // Strip properties that are not in the DTO
      forbidNonWhitelisted: true, // Throw error if non-whitelisted properties are present
    }));
  // app.use(logger);
  await app.listen(process.env.PORT ?? 4000);
}
bootstrap();
