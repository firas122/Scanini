import { Field, ID, ObjectType } from "@nestjs/graphql"
import { productType } from "src/product/product.type"


@ObjectType('categoryType')
export class categoryType {
    @Field(type => ID)
	id: string

    @Field()
	name: string

    @Field()
	description: string

    @Field()
	createdAt: string

    @Field({ nullable: true })
	updatedAt: string

    @Field({ nullable: true })
	deletedAt: string  
    
    @Field(()=> [productType],{ nullable: true })
	products: string[]

}