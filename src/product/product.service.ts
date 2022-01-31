import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { product } from "./product.entity";
import {v4 as uuid} from 'uuid';
import { CreateProductInput } from "./input/CreateProduct.input";
import { UpdateProductInput } from "./input/UpdateProduct.input";
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
        const {name,description,country,restrictedcountries} = createProductInput
        const product = this.productRepository.create(
            {id: uuid(),name,description,country,restrictedcountries,createdAt : Date()}
        );
        return this.productRepository.save(product);
    } 

    async updateProduct(UpdateProductInput:UpdateProductInput): Promise<product>{
        const id =  UpdateProductInput._id
        const product =  await this.productRepository.findOne({ id });
        product.name = UpdateProductInput.name;
        product.description = UpdateProductInput.description;
        product.restrictedcountries = UpdateProductInput.restrictedcountries;
        return this.productRepository.save(product);
    }  

    async deleteProduct(id : string): Promise<boolean> {
        const user =  await this.productRepository.findOne({ id });
        this.productRepository.delete(user);
        return true;
    }
}

