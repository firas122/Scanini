import { InputType,Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MinLength} from 'class-validator';


@InputType()
export class UpdateProductInput{
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


    @Field(() => [String],{ nullable: true })
    @IsOptional()
    restrictedcountries :string[];

    @Field({ nullable: true })
    @IsOptional()
    pictureURL :string;

}