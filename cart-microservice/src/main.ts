import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cart Microservice')
    .setDescription('The Cart Microservice Operational API')
    .setVersion('1.0')
    .addTag('cart')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('CART_API_PORT', 3002);

  await app.listen(port);
}
bootstrap();
