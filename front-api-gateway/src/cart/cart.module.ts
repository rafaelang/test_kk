import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { CartService } from './cart.service';
import { HttpService } from '@nestjs/axios/dist/http.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { HttpModule } from '@nestjs/axios/dist/http.module';
import axios from 'axios';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    ClientsModule.registerAsync([
      {
        name: 'CART_BROKER_SERVICE',
        imports: [ConfigModule],
        useFactory: async (configService: ConfigService) => ({
          transport: Transport.KAFKA,
          options: {
            client: {
              brokers: [configService.get<string>('CART_KAFKA_BROKERS', '')],
              clientId: configService.get<string>('CART_BROKER_CLIENT_ID', 'cart-service'),
            },
            consumer: {
              groupId: configService.get<string>('CART_BROKER_CONSUMER_GROUP', 'cart-service-group'),
            },
            producer: {
              allowAutoTopicCreation: true,
            },
          },
        }),
        inject: [ConfigService],
      },
    ]),
  ],
  providers: [
    {
      provide: 'CART_HTTP_CLIENT',
      useFactory: (configService: ConfigService) => {
        const axiosInstance = axios.create({
          timeout: 500,
          maxRedirects: 5,
        });
        axiosInstance.defaults.baseURL = configService.get<string>('CART_API_URL');
        return axiosInstance;
      },
      inject: [ConfigService],
    },
    CartService,
    ConfigService,
  ],
  exports: [CartService, 'CART_HTTP_CLIENT', ClientsModule],
})
export class CartModule {}
