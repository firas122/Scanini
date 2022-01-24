import { Field, ID, ObjectType } from "@nestjs/graphql"


@ObjectType('productType')
export class productType {
    @Field(type => ID)
	id: string

    @Field()
	name: string

    @Field({ nullable: true })
	qrCode: string

    @Field({ nullable: true })
	barCode: string

    @Field({ nullable: true })
	isdeleted: boolean

    @Field({ nullable: true })
	ispublished: boolean

    @Field({ nullable: true })
	country: string

    @Field({ nullable: true })
	restrictedcountries: string

    @Field({ nullable: true })
	pictureURL: string

    @Field()
	createdAt: string

    @Field({ nullable: true })
	updatedAt: string

    @Field({ nullable: true })
	deletedAt: string    
}