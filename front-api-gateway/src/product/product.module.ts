import { HttpModule, HttpService } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductService } from './product.service';

@Module({
    imports: [HttpModule],
    providers: [
        {
            provide: "PRODUCT_HTTP_CLIENT",
            useFactory: (httpService: HttpService, configService: ConfigService) => {
                const axiosInstance = httpService.axiosRef;
                axiosInstance.defaults.timeout = 5000;
                axiosInstance.defaults.baseURL = configService.get<string>('PRODUCT_API_URL');
                axiosInstance.defaults.maxRedirects = 5;
                return axiosInstance;
            },
            inject: [HttpService, ConfigService],
        },
        ProductService,
        ConfigService
    ],
    exports: [ProductService, "PRODUCT_HTTP_CLIENT"],
})
export class ProductModule {}
