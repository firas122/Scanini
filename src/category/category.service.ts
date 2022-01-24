import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { category } from "./category.entity";
import {v4 as uuid} from 'uuid';
import { CreateCategoryInput } from "./category.input";
import { productTocategoryInput } from "./productTocategory.input";
@Injectable()
export class categoryService{
    constructor(
        @InjectRepository(category) private categoryRepository: Repository<category>,
    ){}


    async getcategory(id : string): Promise<category>{
        return this.categoryRepository.findOne({ id });
    }

    
    async getcategories(): Promise<category[]>{
        return this.categoryRepository.find();
    }


    async createCategory(CreateCategoryInput:CreateCategoryInput ): Promise<category>{
        const {name,description} = CreateCategoryInput
        const products = CreateCategoryInput.productIds
        const category = this.categoryRepository.create(
            {id: uuid(),name,description,products}
        );
        return this.categoryRepository.save(category);
    } 

    async productTocategory(productTocategoryInput:productTocategoryInput): Promise<category>
    {const {categoryId,productIds} = productTocategoryInput
    const category= await this.categoryRepository.findOne({id :categoryId})
    
    const a =[...productIds, ...category.products];
    const result = new Set(a)
    category.products = [...result]
    
    return this.categoryRepository.save(category);

}    
}

