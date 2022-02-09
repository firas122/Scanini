import { forwardRef, Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { GoogleStrategy } from './strategies/google.strategy'
import { UsersService } from "../users/users.service";
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from "../users/models/user.entity";
import { UsersModule } from 'src/users/users.module';

@Module({
  imports:[TypeOrmModule.forFeature([User]),forwardRef(() => UsersModule)],
  controllers: [AuthController],
  providers: [AuthService, GoogleStrategy,UsersService],
  
  
})
export class AuthModule {}

