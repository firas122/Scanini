import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { CreateCategoryInput } from "./input/category.input";
import { categoryService } from "./category.service";
import { categoryType } from "./category.type";

@Resolver(() => categoryType)
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
}
