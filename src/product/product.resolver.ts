import { forwardRef, Inject } from "@nestjs/common";
import { Args, Mutation, Query, Resolver } from "@nestjs/graphql";
import { categoryService } from "src/category/category.service";
import { CreateProductInput } from "./input/CreateProduct.input";
import { UpdateProductInput } from "./input/UpdateProduct.input";
import { productService } from "./product.service";
import { productType } from "./product.type";

@Resolver(of => productType)
export class productResolver{

    constructor(
        private productService: productService,
    ){}


	@Query(returns => productType)
	product(@Args('id') id : string,
    ){
        return this.productService.getProduct(id);
        
    }

    @Query(returns => productType)
	productbycode(@Args('barCode') barCode : string,
    ){
        return this.productService.getProductbycode(barCode);
        
    }

    @Query(returns => [productType])
	async products(){
        return this.productService.getProducts();
    }

    @Query(returns => [productType])
	async Productsbycat(@Args('catid') catid : string,){
        return this.productService.Productsbycat(catid);
    }




    @Mutation(returns => productType)
    createproduct(
        @Args('createProductInput') CreateProductInput: CreateProductInput,
    )
    {
        return this.productService.createProduct(CreateProductInput);
    }
    @Mutation(returns => productType)
    updateproduct(
        @Args('UpdateProductInput') UpdateProductInput: UpdateProductInput,
    )
    {
        return this.productService.updateProduct(UpdateProductInput);
    }      
	}
