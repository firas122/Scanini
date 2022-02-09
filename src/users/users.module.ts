import { forwardRef, Module } from "@nestjs/common";
import { UsersResolver } from "./users.resolver";
import { UsersService } from "./users.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "./models/user.entity";
import { AuthModule } from "src/auth/auth.module";
import { AuthService } from "src/auth/auth.service";

@Module({
    imports:[TypeOrmModule.forFeature([User]),forwardRef(() => AuthModule)
],
    providers: [UsersResolver, UsersService,AuthService],
    exports: [UsersService]
})
export class UsersModule {}