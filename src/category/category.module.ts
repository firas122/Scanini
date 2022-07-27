import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from 'src/product/product.module';
import { category } from './category.entity';
import { categoryResolver } from './category.resolver';
import { categoryService } from './category.service';

@Module({
  imports:[TypeOrmModule.forFeature([category]),forwardRef(() => ProductModule)
],
  providers: [categoryService,categoryResolver],
  exports:[categoryService]

})
export class CategoryModule {}