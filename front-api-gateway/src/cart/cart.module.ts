import { HttpModule } from '@nestjs/axios/dist/http.module';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config/dist/config.module';
import { ConfigService } from '@nestjs/config/dist/config.service';
import { CartService } from './cart.service';
import { HttpService } from '@nestjs/axios/dist/http.service';

@Module({
    imports: [
        HttpModule.register({
            timeout: 5000,
            maxRedirects: 5,
        }),
    ],
    providers: [
        {
            provide: "CART_HTTP_CLIENT",
            useFactory: (httpService: HttpService, configService: ConfigService) => {
                const axiosInstance = httpService.axiosRef;
                axiosInstance.defaults.timeout = 500;
                axiosInstance.defaults.baseURL = configService.get<string>('CART_API_URL');
                axiosInstance.defaults.maxRedirects = 5;
                return axiosInstance;
            },
            inject: [HttpService, ConfigService],
        },
        CartService,
        ConfigService
    ],
    exports: [CartService, "CART_HTTP_CLIENT"],
})
export class CartModule {}
