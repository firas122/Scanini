import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { product } from "./product.entity";
import {v4 as uuid} from 'uuid';
import { CreateProductInput } from "./product.input";
@Injectable()
export class productService{
    constructor(
        @InjectRepository(product) private productRepository: Repository<product>,
    ){}
    async getProduct(id : string): Promise<product>{
        return this.productRepository.findOne({ id });
    }
    async getProducts(): Promise<product[]>{
        return this.productRepository.find();
    }


    async createProduct(createProductInput:CreateProductInput): Promise<product>{
        const {name,createdAt} = createProductInput
        const product = this.productRepository.create(
            {id: uuid(),name,createdAt}
        );
        return this.productRepository.save(product);
    } 
    
}

