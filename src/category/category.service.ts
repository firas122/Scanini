import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { category } from "./category.entity";
import {v4 as uuid} from 'uuid';
import { CreateCategoryInput } from "./input/category.input";
import { productTocategoryInput } from "./input/productTocategory.input";
import { UpdateCategoryInput } from "./input/UpdateCategory.Input";
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
        const category = this.categoryRepository.create(
           {id :uuid(),name,description}
        );
        return this.categoryRepository.save(category);
    } 

    async updateCategory(UpdateCategoryInput:UpdateCategoryInput): Promise<category>{
        const id = UpdateCategoryInput._id
        const category  =  await this.categoryRepository.findOne({ id });
        category.name = UpdateCategoryInput.name;
        category.description = UpdateCategoryInput.description;
        return this.categoryRepository.save(category);
    }

    async deletecategory(id : string): Promise<boolean> {
        const category =  await this.categoryRepository.findOne({ id });
        this.categoryRepository.delete(category);
        return true;
    }

    async productTocategory(productTocategoryInput:productTocategoryInput): Promise<category>
    {const {categoryId,productIds} = productTocategoryInput
    const category= await this.categoryRepository.findOne({id :categoryId})
    const a =[...productIds, ...category.products];
    return this.categoryRepository.save(category);

}    
}

