import{InputType,Field,ID} from '@nestjs/graphql';
import { IsUUID } from 'class-validator';

@InputType()

export class productTocategoryInput{

    @Field(type => ID)
    categoryId:string;
    @IsUUID("4", {each:true})
    @Field(type => [ID])
    productIds:string[];
} 