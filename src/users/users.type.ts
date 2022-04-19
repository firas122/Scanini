import { Field, ID, ObjectType } from "@nestjs/graphql"



@ObjectType('userType')
export class userType {

    @Field(type => ID)
	userId: string

    @Field()
	_id: string

    @Field()
	email: string

    @Field()
	firstName: string

    @Field()
    lastName: string;

    @Field()
	age: number

    @Field()
    picture: string;

    @Field({ nullable: true })
	isSubscribed: boolean

    @Field({ nullable: true })
	password: boolean

    @Field()
	accessToken: string

    @Field(() => [String])
	scantrack: string[]
}