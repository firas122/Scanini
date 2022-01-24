import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { product } from './product/product.entity';
import { ProductModule } from './product/product.module';
import { CategoryModule } from './category/category.module';
import { category } from './category/category.entity';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { User } from "src/users/models/user.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/scanow',
      port: 27017,
      synchronize: true,
      useUnifiedTopology: true,
      entities:[product,category,User]
          }),
    GraphQLModule.forRoot({
      autoSchemaFile : true
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    CategoryModule
  ],
})
export class AppModule {}