import { Req, UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { GetUserArgs } from "./dto/args/get-user.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { userType } from "./users.type";
import { User } from "./models/user.entity";
import { UsersService } from "./users.service";
import { CurrentUser } from "./get-user.decorator";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => userType)
    @UseGuards(GqlAuthGuard)
    getUser(@CurrentUser() user: User,@Args('email') email:string) {
        console.log(user)
        return this.usersService.getUser(email);
    }

    @Query(returns => [userType])
	getUsers(){
        return this.usersService.getUsers();
    }

    @Query(returns => userType)
	getUserByEmail(@Args('email') email: string,){
        return this.usersService.getUserByEmail(email);
    }

    @Mutation(returns => userType)
    createUser(
        @Args('createUserData') createUserData: CreateUserInput,) 
    {
        return this.usersService.createUser(createUserData);
    }

    @Mutation(() => userType)
    loguser(@Args('email') email: string,@Args('password') password: string) 
    {
        return this.usersService.loguser(email,password);
    }

    @Mutation(returns => String)
    @UseGuards(GqlAuthGuard)
    test(@Req() req) 
    {
        const a = "success"
        return a;
        
    }


    @Mutation(() => userType)
    updateUser(
        @Args('updateUserData') updateUserData: UpdateUserInput){
        return this.usersService.updateUser(updateUserData);
    }

    @Mutation(() => userType)
    updatetrack( @Args('cod') cod: string ,@Args('_id') _id: string)
    {
        return this.usersService.updatetrack(cod,_id);
    }

    @Mutation(() => userType)
    updatecards( @Args('cod') card: string ,@Args('_id') _id: string)
    {
        return this.usersService.updatecards(card,_id);
    }

    @Mutation(() => userType)
    cleartrack( @Args('_id') _id: string)
    {
        return this.usersService.cleartrack(_id);
    }

    @Mutation(() => Boolean)
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput){
        return this.usersService.deleteUser(deleteUserData);
    }
    
}