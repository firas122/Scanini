import { Field, ID, ObjectType } from "@nestjs/graphql"



@ObjectType('userType')
export class userType {

    @Field(type => ID)
	userId: string

    @Field()
	email: string

    @Field()
	age: number

    @Field({ nullable: true })
	isSubscribed: boolean

    @Field({ nullable: true })
	password: boolean
}