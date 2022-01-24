import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './product.entity';
import { productResolver } from './product.resolver';
import { productService } from './product.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([product])
    ],
    providers: [productResolver,productService]
})
export class ProductModule {}