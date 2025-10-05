import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
import { ProductDto } from './dtos/product.dto';

@Injectable()
export class ProductService {
    constructor(@InjectRepository(Product) private productRepository: Repository<Product>) { }

    async findAll(): Promise<Product[]> {
        return this.productRepository.find();
    }

    async createOrUpdate(data: ProductDto): Promise<Product> {
        const product = this.productRepository.create(data);
        return this.productRepository.save(product);
    }
}