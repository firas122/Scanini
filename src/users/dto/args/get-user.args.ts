import { ArgsType, Field } from "@nestjs/graphql";
import { IsNotEmpty } from "class-validator";

@ArgsType()
export class GetUserArgs {
    @Field()
    @IsNotEmpty()
    _id: string;

    @Field()
    email: string;
}