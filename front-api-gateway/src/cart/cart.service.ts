import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client/client-kafka';
import { firstValueFrom } from 'rxjs';
import { CartOperationDto } from './dtos/cart-operation.dto';

@Injectable()
export class CartService {
    private readonly baseURL: string;
    private readonly topicCartUpdate = 'update_cart';

    constructor(
        @Inject("CART_HTTP_CLIENT")
        private readonly httpService: any,
        
        @Inject('CART_BROKER_SERVICE')
        private readonly brokerService: ClientKafka,
    ) { }

    async onModuleInit() {
        const requestPatterns = [this.topicCartUpdate];
        requestPatterns.forEach(pattern => this.brokerService.subscribeToResponseOf(pattern));
        await this.brokerService.connect();
    }

    async getCartByUserId(userId: string) {
        const response = await this.httpService.get(`/cart/${userId}`);
        return response.data;
    }

    async addItem(shoppingCartId: string, item: CartOperationDto) {
        const responseObservable = this.brokerService.send(this.topicCartUpdate, { shoppingCartId, item });
        const response = await firstValueFrom(responseObservable);
        return response.data;
    }
}
