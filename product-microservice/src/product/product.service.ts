import { firstValueFrom } from 'rxjs';
import { Injectable } from '@nestjs/common';
import { PaginationParamsDto, ProductDto } from './dtos/product.dto';
import { InjectModel } from '@nestjs/mongoose/dist/common/mongoose.decorators';
import { Product } from './schemas/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(@InjectModel(Product.name) private productModel: Model<Product>) {}

    async findByProductId(productId: number): Promise<Product | null> {
        console.log('Finding product by productId:', productId);
        return await this.productModel.findOne({ productId }).exec();
    }

    async findById(id: string): Promise<Product | null> {
        return this.productModel.findById(id).exec();
    }

    async findAll(limit=10, offset=0): Promise<any> {
        const [results, total] = await Promise.all([
            this.productModel.find().skip(offset).limit(limit).exec(),
            this.productModel.countDocuments().exec(),
        ]);
        return {
            results: results,
            total,
            totalPages: Math.ceil(total / limit),
        };
    }

    async createOrUpdate(data: ProductDto): Promise<Product> {
        const createdProduct = new this.productModel(data);
        return createdProduct.save();
    }
}