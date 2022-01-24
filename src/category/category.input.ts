import { InputType,Field, ID } from '@nestjs/graphql';
import { MinLength} from 'class-validator';
import { isNullableType } from 'graphql';

@InputType()
export class CreateCategoryInput{
    @MinLength(1)
    @Field()
    name :string;
    
    @MinLength(1)
    @Field()
    description :string;

    @Field(type => [ID],{nullable:true})
    productIds:string[];
}
