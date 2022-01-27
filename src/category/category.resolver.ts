import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateCategoryInput } from "./category.input";
import { categoryService } from "./category.service";
import { categoryType } from "./category.type";
import{productTocategoryInput} from "./input/productTocategory.input"

@Resolver(of => categoryType)
export class categoryResolver{

    constructor(
        private categoryService: categoryService
    ){}
	@Query(returns => categoryType)
	category(@Args('id') id : string,
    ){
        return this.categoryService.getcategory(id);
        
    }

    @Query(returns => [categoryType])
	categories(){
        return this.categoryService.getcategories();
    }


    @Mutation(returns => categoryType)
    createcategory(
        @Args('CreateCategoryInput') CreateCategoryInput: CreateCategoryInput,
    )
    {
        return this.categoryService.createCategory(CreateCategoryInput)
    } 
    
    @Mutation(returns => categoryType)
    productTocategory(
        @Args('productTocategoryInput') productTocategoryInput:productTocategoryInput,
    ){
        
        return this.categoryService.productTocategory(productTocategoryInput)
    }
    
	}
