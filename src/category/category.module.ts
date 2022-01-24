import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { category } from './category.entity';
import { categoryResolver } from './category.resolver';
import { categoryService } from './category.service';

@Module({
  imports:[TypeOrmModule.forFeature([category]),
],
  providers: [categoryService,categoryResolver]
})
export class CategoryModule {}
