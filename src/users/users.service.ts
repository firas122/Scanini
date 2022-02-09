import { forwardRef, Inject, Injectable, Req } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthService } from "src/auth/auth.service";
import { Repository,getMongoRepository, Any } from "typeorm";
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
        @Inject(forwardRef(() => AuthService))
        private AuthService: AuthService,
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
        
        user.age = updateUserData.age;
        return this.userRepository.save(user);
    }

    async getUser(getUserArgs: GetUserArgs): Promise<User> {
        return this.userRepository.findOne(getUserArgs.email);
    }

    async getUserByEmail(email: string): Promise<Boolean> {
        const a = email;
        const result = await getMongoRepository(User).findOne({email})
        if (result)
            return true;
        return false;
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