import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt,Strategy } from "passport-jwt";
import { User } from "src/users/models/user.entity";
import { Repository } from "typeorm";
import { JwtPayload } from "../jwt-payload.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(
        @InjectRepository(User) private userRepository: Repository<User>,
    ) {
        super({
            secretOrKey:"agent007",
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload:JwtPayload){
        const {email} = payload;
        const user: User=await this.userRepository.findOne({email});
        if (!user){throw new UnauthorizedException();} return user;
    }
}