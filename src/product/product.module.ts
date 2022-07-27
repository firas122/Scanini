import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from 'src/category/category.entity';
import { CategoryModule } from 'src/category/category.module';

import { product } from './product.entity';
import { productResolver } from './product.resolver';
import { productService } from './product.service';


@Module({
    imports:[
        TypeOrmModule.forFeature([product]), TypeOrmModule.forFeature([category]),forwardRef(() => CategoryModule)
    ],
    providers: [productResolver,productService],
    exports : [productService]

})
export class ProductModule {}