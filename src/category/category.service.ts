import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { getManager, Repository } from "typeorm";
import { category } from "./category.entity";
import {v4 as uuid} from 'uuid';
import { CreateCategoryInput } from "./input/category.input";
import { productTocategoryInput } from "./input/productTocategory.input";
import { UpdateCategoryInput } from "./input/UpdateCategory.Input";
import { productService } from "src/product/product.service";
@Injectable()
export class categoryService{
    constructor(
        @InjectRepository(category) private categoryRepository: Repository<category>,
        @Inject(forwardRef(() => productService))
    private productService: productService,
    ){}


    async getcategory(id : string): Promise<category>{
        if(id)
        return this.categoryRepository.findOne( {id} );
        else
        return null
    }

    
    async getcategories(): Promise<category[]>{
        return this.categoryRepository.find();
    }

    async getCategoryTree(): Promise<category[]>{
        const manager = getManager();
        const trees = await manager.getTreeRepository(category).findTrees();
        return trees;
    }


    async createCategory( CreateCategoryInput:CreateCategoryInput ): Promise<category>{
        const {name,description} = CreateCategoryInput
        const category = this.categoryRepository.create(
           {id :uuid(),name,description}
        );
        return this.categoryRepository.save(category);
    }

    async createSubCategory( CreateCategoryInput:CreateCategoryInput , parentID : string ): Promise<category>{
        const manager = getManager();
        const parent = await this.categoryRepository.findOne( parentID );
        const {name,description} = CreateCategoryInput
        if(parent)
        {const category = this.categoryRepository.create(
           {id :uuid(),name,description,parent}
        );
        return manager.save(category);}
        else {console.log("parent category doesnt exist");return null}
    }

  /*  async getCategoryTree(CreateCategoryInput:CreateCategoryInput , parentID : string ): Promise<category>{
        const manager = getManager();

    }*/

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
    category.products = [...category.products,...productIds]
    return this.categoryRepository.save(category);

}    
}

