import { Field, ID, ObjectType } from "@nestjs/graphql"



@ObjectType('langsType')
export class langsType {
 
    @Field(type => String)
	fr: string

    @Field(type => String)
	en: string

    @Field(type => String)
	ar: string


}