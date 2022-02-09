import { InputType,Field } from '@nestjs/graphql';
import {IsDateString, MinLength} from 'class-validator';

@InputType()
export class CreateProductInput{
    @MinLength(1)
    @Field()
    name :string;

    @MinLength(1)
    @Field()
    description :string;

    @Field()
    country :string;

    @Field(() => [String],{nullable:true})
    restrictedcountries :string[];

    @Field({nullable:true})
    pictureURL :string;

    @Field()
    categoryId: string;

}
