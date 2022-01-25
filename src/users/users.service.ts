import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository,getMongoRepository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { GetUserArgs } from "./dto/args/get-user.args";
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "./models/user.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ){}
  

    async createUser(createUserData: CreateUserInput): Promise<User>{
        const {email,age} = createUserData
        const user = this.userRepository.create(
        
            {userId: uuidv4(),email,age}
        );
        
        return  this.userRepository.save(user);
    }

    async updateUser(updateUserData: UpdateUserInput): Promise<User> {
        const user =  await getMongoRepository(User).findOne( updateUserData._id );
        
        user.isSubscribed = updateUserData.isSubscribed;
        user.age = updateUserData.age;
        return this.userRepository.save(user);
    }

    async getUser(getUserArgs: GetUserArgs): Promise<User> {
        return this.userRepository.findOne(getUserArgs._id);
    }

    async getUserByEmail(email: string): Promise<User> {
        return this.userRepository.findOne(email);
    }

    async getUsers(): Promise<User[]>{
        return this.userRepository.find();
    }

    async deleteUser(deleteUserData: DeleteUserInput): Promise<boolean> {
        const user =  await getMongoRepository(User).findOne( deleteUserData._id );
        
        this.userRepository.delete(user);
        return true;
    }
}