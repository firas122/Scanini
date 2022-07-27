import { Args, Mutation, Parent, Query, ResolveField, Resolver } from "@nestjs/graphql";
import { CreateCategoryInput } from "./input/category.input";
import { categoryService } from "./category.service";
import { categoryType } from "./category.type";
import { Get, HttpStatus, Post, Res } from "@nestjs/common";
import { productTocategoryInput } from "./input/productTocategory.input";
import { productService } from "src/product/product.service";
import { category } from "./category.entity";

@Resolver(() => categoryType)
export class categoryResolver{

    constructor(
        private categoryService: categoryService,
        private productService:productService
    ){}
    
	@Query(returns => categoryType)
	category(@Args('id') id : string,)
    {
        return this.categoryService.getcategory(id);
        
    }
    
    @Query(returns => [categoryType])
	categories(){
        return this.categoryService.getcategories();
    }

    @Query(returns => [categoryType])
	categoryTree(){
        return this.categoryService.getCategoryTree();
    }

    @Mutation(returns => categoryType)
	SubCategory(@Args('CreateCategoryInput') CreateCategoryInput: CreateCategoryInput ,@Args('parentID') parentID: string){
        return this.categoryService.createSubCategory(CreateCategoryInput,parentID);
    }


    @Mutation(returns => categoryType)
    createcategory(
        @Args('CreateCategoryInput') CreateCategoryInput: CreateCategoryInput,
    )
    {
        return this.categoryService.createCategory(CreateCategoryInput)
    }

    @Mutation(returns => categoryType)
    productstocategory(
        @Args('productTocategoryInput') productTocategoryInput: productTocategoryInput,
    )
    {
        return this.categoryService.productTocategory(productTocategoryInput)
    }

    @ResolveField()

    async products(@Parent() category:category){
        return(this.productService.getmanyProducts(category.products));
    }

    @ResolveField()

    async parent(@Parent() category:category){
        return(this.categoryService.getcategory(category.parent.id));
        
    }


}
