import { Req, UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CurrentUser } from "../auth/current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { GetUserArgs } from "./dto/args/get-user.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { userType } from "./users.type";
import { User } from "./models/user.entity";
import { UsersService } from "./users.service";
import { Request } from "express";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => userType)
    getUser(@Args() getUserArgs: GetUserArgs) {
        return this.usersService.getUser(getUserArgs);
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
        @Args('createUserData') createUserData: CreateUserInput,
    ) 
    {
        return this.usersService.createUser(createUserData);
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
    cleartrack( @Args('_id') _id: string)
    {
        return this.usersService.cleartrack(_id);
    }

    @Mutation(() => Boolean)
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput){
        return this.usersService.deleteUser(deleteUserData);
    }

   zz
}