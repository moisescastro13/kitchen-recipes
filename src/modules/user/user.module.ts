import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from '../auth/auth.module';
import { UserService } from './services/user.service';
import { UserController } from './controllers/user.controller';
import { UserRepository } from './user.repository';
import { RoleRepository } from '../role/role.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRepository, RoleRepository]),
    AuthModule,
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
