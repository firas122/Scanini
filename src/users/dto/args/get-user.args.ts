import { ArgsType, Field } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUserArgs {
    @Field({ nullable: true })
    
    _id: string;

    @Field({ nullable: true })
    @IsEmail()
    email: string;
}