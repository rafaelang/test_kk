import { Injectable } from '@nestjs/common';
import { ProductDto } from './dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async createOrUpdate(data: ProductDto): Promise<Product> {
        const createdProduct = new this.productModel(data);
        return createdProduct.save();
    }
}