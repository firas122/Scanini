import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput {
    
    @Field()
    @IsNotEmpty()
    firstName: string;

    @Field()
    @IsNotEmpty()
    password: string;
    
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field({nullable:true})

    age: number;



   
}