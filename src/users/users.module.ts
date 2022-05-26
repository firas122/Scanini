import { forwardRef, Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./models/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";
import { PassportModule } from "@nestjs/passport";
import { JwtModule } from "@nestjs/jwt";
import { JwtStrategy } from "./strategies/jwt.strategy";

@Module({
    imports:[TypeOrmModule.forFeature([User]),forwardRef(() => AuthModule),
    PassportModule.register({defaultStrategy:"jwt"}),
    JwtModule.register({
        secret:"agent007",
        signOptions:{expiresIn:3600},
    }),
],
    providers: [UsersResolver, UsersService,AuthService,JwtStrategy],
    exports: [UsersService,JwtStrategy,PassportModule],
})
export class UsersModule {}