import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { DocumentBuilder } from '@nestjs/swagger/dist/document-builder';
import { SwaggerModule } from '@nestjs/swagger/dist/swagger-module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';


async function bootstrapBroker() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  const brokers = configService.get<string>('KAFKA_BROKERS', 'localhost:9094').split(',');
  const groupId = configService.get<string>('KAFKA_GROUP_ID', 'cart-service-group');

  const kafkaApp = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          brokers,
          allowAutoTopicCreation: true,
        },
        consumer: {
          groupId,
          allowAutoTopicCreation: true,
        },
        producer: {
          allowAutoTopicCreation: true,
        },
      },
    }
  );
  await kafkaApp.listen();
}

async function bootstrapRestApi() {
  const app = await NestFactory.create(AppModule);

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Cart Microservice')
    .setDescription('The Cart Microservice Operational API')
    .setVersion('1.0')
    .addTag('cart')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  
  const configService = app.get(ConfigService);
  const port = configService.get<number>('CART_API_PORT', 3002);

  await app.listen(port);
}

async function bootstrap() {
  //await 
  bootstrapBroker();
  await bootstrapRestApi();
}

bootstrap();
