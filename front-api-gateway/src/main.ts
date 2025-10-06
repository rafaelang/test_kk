import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('API Gateway')
    .setDescription('The API Gateway Front Services')
    .setVersion('1.0')
    .addTag('Front API Gateway')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'JWT',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup('docs', app, document);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('FRONT_API_PORT', 3000);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  await app.listen(port);
}
bootstrap();
