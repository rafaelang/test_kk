import { Inject, Injectable } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices/client/client-kafka';
import { firstValueFrom } from 'rxjs';
import { CartOperationDto } from './dtos/cart-operation.dto';

@Injectable()
export class CartService {
  private readonly baseURL: string;
  private readonly topicCartUpdate = 'update_cart';

  constructor(
    @Inject('CART_HTTP_CLIENT')
    private readonly httpService: any,

    @Inject('CART_BROKER_SERVICE')
    private readonly brokerService: ClientKafka,
  ) {}

  async onModuleInit() {
    const requestPatterns = [this.topicCartUpdate];
    requestPatterns.forEach((pattern) =>
      this.brokerService.subscribeToResponseOf(pattern),
    );
    await this.brokerService.connect();
  }

  async getCartByUserId(userId: number) {
    const response = await this.httpService.get(`/cart/${userId}`);
    return response.data;
  }

  async addItem(
    userId: number,
    shoppingCartId: number,
    item: CartOperationDto,
  ) {
    if (item.operation !== 'ADD') {
      throw new Error(`Invalid operation for addItem: ${item.operation}`);
    }
    return this.updateItem(userId, shoppingCartId, item);
  }

  async removeItem(
    userId: number,
    shoppingCartId: number,
    item: CartOperationDto,
  ) {
    if (item.operation !== 'REMOVE') {
      throw new Error(`Invalid operation for removeItem: ${item.operation}`);
    }
    return this.updateItem(userId, shoppingCartId, item);
  }

  async updateItem(
    userId: number,
    shoppingCartId: number,
    item: CartOperationDto,
  ) {
    const responseObservable = this.brokerService.send(this.topicCartUpdate, {
      userId,
      shoppingCartId,
      item,
    });
    const response = await firstValueFrom(responseObservable);
    return response.data;
  }
}
