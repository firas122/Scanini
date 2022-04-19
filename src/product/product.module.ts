import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from 'src/category/category.entity';

import { product } from './product.entity';
import { productResolver } from './product.resolver';
import { productService } from './product.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([product]), TypeOrmModule.forFeature([category])
    ],
    providers: [productResolver,productService]
})
export class ProductModule {}