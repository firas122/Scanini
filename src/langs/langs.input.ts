import { InputType,Field } from '@nestjs/graphql';
import {IsDateString, MinLength} from 'class-validator';

@InputType()
export class langsInput{
    
    @Field(()=>String)
    fr :string;
    
    
    @Field(()=>String)
    en :string;

    @Field(()=>String)
    ar :string;
}