import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@InputType()
export class CreateUserInput {
    
    @Field()
    @IsNotEmpty()
    firstName: string;
    
    @Field()
    @IsNotEmpty()
    @IsEmail()
    email: string;

    @Field()

    age: number;

   
}