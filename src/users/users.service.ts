import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, getMongoRepository } from "typeorm";
import { v4 as uuidv4 } from 'uuid';
import { CreateUserInput } from "./dto/input/create-user.input";
import { DeleteUserInput } from "./dto/input/delete-user.input";
import { UpdateUserInput } from "./dto/input/update-user.input";
import { User } from "./models/user.entity";
import * as bcrypt from 'bcrypt'
import { JwtService } from "@nestjs/jwt";
import { JwtPayload } from "./jwt-payload.interface";

@Injectable()
export class UsersService {
    constructor(

        @InjectRepository(User) private userRepository: Repository<User>,
        private jwtService:JwtService, 
    ) { }

    async createUser(createUserData: CreateUserInput): Promise<User> {
        const { email, age, firstName } = createUserData 
        const password = await bcrypt.hash(createUserData.password, await bcrypt.genSalt())
        const scantrack = []
        const cards=[[]]
        const payload : JwtPayload = {email};const accessToken : string =  this.jwtService.sign(payload);
        const user = this.userRepository.create({ userId: uuidv4(), email, age, firstName, password,  accessToken,scantrack,cards });
        if (user){return (await this.userRepository.save(user));}
        else
        {throw new UnauthorizedException('please check credentials')}
    }
    

    async loguser(email:string,password:string): Promise<User> {
        const user =  await this.userRepository.findOne({email})
        if (user && (await bcrypt.compare(password,user.password))) 
            {const payload : JwtPayload = {email};const accessToken : string =  this.jwtService.sign(payload);user.accessToken=accessToken;return(await this.userRepository.save(user));}
            else
            {throw new UnauthorizedException('please check credentials')}
    }

    async updateUser(updateUserData: UpdateUserInput): Promise<User> {
        const user = await getMongoRepository(User).findOne(updateUserData._id);
        user.age = updateUserData.age;
        return this.userRepository.save(user);
    }

    async cleartrack(_id: string): Promise<User> {
        const user = await getMongoRepository(User).findOne(_id);

        user.scantrack = [""];
        return this.userRepository.save(user); 
    }

    async updatetrack(cod: string, email: string): Promise<User> {
        const user = await getMongoRepository(User).findOne({email});
        user.scantrack.unshift(cod)
        return this.userRepository.save(user);
    }

    async updatecards(card: string,cardname: string ,email: string): Promise<User> {
        const user = await getMongoRepository(User).findOne({email});
        user.cards.unshift([card,cardname])
        return this.userRepository.save(user);
    }

    async getUser(email:string): Promise<User> { 
        return this.userRepository.findOne({ email }); 
    }

    async getUserByEmail(email: string): Promise<User> {

        return this.userRepository.findOne({ email });
    }

    async getUsers(): Promise<User[]> {
        return this.userRepository.find();
    }

    async deleteUser(deleteUserData: DeleteUserInput): Promise<boolean> {
        const user = await getMongoRepository(User).findOne(deleteUserData._id);

        this.userRepository.delete(user);
        return true;
    }


}