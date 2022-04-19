import { InputType,Field, ID } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional, MinLength} from 'class-validator';

@InputType()
export class UpdateProductInput{
    @Field(type => ID)
    @IsNotEmpty()
    _id: string;

    @MinLength(1)
    @Field({ nullable: true })
    @IsOptional()
    name :string;

    @MinLength(1)
    @Field({ nullable: true })
    @IsOptional()
    description :string;

    @MinLength(1)
    @Field({ nullable: true })
    @IsOptional()
    country :string;

    @Field({ nullable: true })
    @IsOptional()
    manufacter :string;

    @Field(() => [String],{ nullable: true })
    @IsOptional()
    restrictedcountries :string[];

    @Field({ nullable: true })
    @IsOptional()
    pictureURL :string;

    @Field({ nullable: true })
    @IsOptional()
    barCode :string;

    @Field({ nullable: true })
    @IsOptional()
    categoryId :string;





}