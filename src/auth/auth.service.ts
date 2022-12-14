import { Injectable } from '@nestjs/common';
import { InjectRepository } from "@nestjs/typeorm";
import { Repository} from "typeorm";
import { User } from "../users/models/user.entity";
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
  async googleLogin(req) {
    
  }
}






/*import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/models/user.entity';

import { UsersService } from '../users/users.service';
import { jwtSecret } from './constants';

@Injectable()
export class AuthService {
    constructor(
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService,
    ) {}

    async validate(email: string, password: string): Promise<User | null> {
        const user = this.usersService.getUserByEmail(email);

        if (!user) {
            return null;
        }

        const passwordIsValid = password === (await user).password;
        return passwordIsValid ? user : null;
    }

    login(user: User): { access_token: string } {
        const payload = {
            email: user.email,
            sub: user.userId
        }

        return {
            access_token: this.jwtService.sign(payload),
        }
    }

    verify(token: string) {
        const decoded = this.jwtService.verify(token, {
            secret: jwtSecret
        })

        const user = this.usersService.getUserByEmail(decoded.email);

        if (!user) {
            throw new Error('Unable to get the user from decoded token.');
        }

        return user;
    }

    googleLogin(req) {
        if (!req.user) {
          return 'No user from google'
        }
        return {
          message: 'User Info from Google',
          user: req.user
        }
      }

}*/
