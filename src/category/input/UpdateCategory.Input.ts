import { InputType,Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MinLength} from 'class-validator';

@InputType()
export class UpdateCategoryInput{
    @Field(type => ID)
    @IsNotEmpty()
    _id: string;

    @MinLength(1)
    @Field()
    @IsOptional()
    name :string;

    @MinLength(1)
    @Field({ nullable: true })
    @IsOptional()
    description :string;


}