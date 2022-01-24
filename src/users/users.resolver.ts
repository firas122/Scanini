import { UseGuards } from "@nestjs/common";
import { Resolver, Query, Args, Mutation } from "@nestjs/graphql";
import { CurrentUser } from "../auth/current-user.decorator";
import { GqlAuthGuard } from "../auth/guards/gql-auth.guard";
import { GetUserArgs } from "./dto/args/get-user.args";
import { GetUsersArgs } from "./dto/args/get-users.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { userType } from "./users.type";
import { User } from "./models/user.entity";
import { UsersService } from "./users.service";

@Resolver(() => User)
export class UsersResolver {
    constructor(private readonly usersService: UsersService) {}

    @Query(() => userType)
    @UseGuards(GqlAuthGuard)
    getUser(@CurrentUser() user: User,  @Args() getUserArgs: GetUserArgs) {
        return this.usersService.getUser(getUserArgs);
    }

    @Query(returns => [userType])
	getUsers(){
        return this.usersService.getUsers();
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

    @Mutation(() => Boolean)
    deleteUser(@Args('deleteUserData') deleteUserData: DeleteUserInput){
        return this.usersService.deleteUser(deleteUserData);
    }
}