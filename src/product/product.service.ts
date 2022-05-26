import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { product } from "./product.entity";
import {v4 as uuid} from 'uuid';
import { CreateProductInput } from "./input/CreateProduct.input";
import { UpdateProductInput } from "./input/UpdateProduct.input";
import { category } from "src/category/category.entity";
@Injectable()
export class productService{
    constructor(
        @InjectRepository(product) private productRepository: Repository<product>,
        @InjectRepository(category) private categoryRepository: Repository<category>,
        

        
    ){}

    async getProduct(id : string): Promise<product>{
        return this.productRepository.findOne({ id });
    }

    async getProductbycode(barCode : string): Promise<product>{
        return this.productRepository.findOne({barCode});
    }

    async getProducts(): Promise<product[]>{
        return this.productRepository.find();
    }

    async Productsbycat(catid:string): Promise<product[]>{
        return this.productRepository.find({relations: ['category'],loadRelationIds:true,});
    }

    async createProduct(createProductInput:CreateProductInput): Promise<product>{
        const {name,description,country,restrictedcountries,manufacter,pictureURL} = createProductInput
        const cat = await this.categoryRepository.findOne(createProductInput.categoryId)
        const product = this.productRepository.create(
            {id: uuid(),name,description,country,restrictedcountries,createdAt : Date(),manufacter,pictureURL}
        );
        product.category=cat
        return this.productRepository.save(product);
    } 

    async updateProduct(UpdateProductInput:UpdateProductInput): Promise<product>{
        const id =  UpdateProductInput._id
        const product =  await this.productRepository.findOne({ id });

        if (UpdateProductInput.name)
            product.name = UpdateProductInput.name;
        
        if (UpdateProductInput.barCode)
            product.barCode = UpdateProductInput.barCode;

        if (UpdateProductInput.country) 
            product.country = UpdateProductInput.country;

        if (UpdateProductInput.pictureURL)
            product.pictureURL = UpdateProductInput.pictureURL;
        
        if (UpdateProductInput.manufacter)
            product.manufacter = UpdateProductInput.manufacter;

        
        return this.productRepository.save(product);
    }  

    async deleteProduct(id : string): Promise<boolean> {
        const user =  await this.productRepository.findOne({ id });
        this.productRepository.delete(user);
        return true;
    }
}

