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

    @Field({ nullable: true })
    lastName: string

    @Field({ nullable: true })
	age: number

    @Field({ nullable: true })
    picture: string

    @Field({ nullable: true })
	isSubscribed: boolean

    @Field({ nullable: true })
	password: string

    @Field({ nullable: true })
	accessToken: string

    @Field(() => [String])
	scantrack: string[]

    @Field(() => [[String]])
	cards: string[][]
}