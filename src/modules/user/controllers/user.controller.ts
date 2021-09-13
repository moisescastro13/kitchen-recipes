import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { UpdateUserDto } from '../dto';
import { ReadUserDto } from '../dto';
import { UserService } from '../services/user.service';
import { Roles } from '../../role/decorators/role.decorator';
import { RoleGuard } from '../../role/guards/role.guard';
import { RoleType } from '../../../shared/enums';

//@UseGuards(AuthGuard('jwt'))
@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  //@Roles(RoleType.ROOT, RoleType.ADMIN)
  //@UseGuards(RoleGuard)
  @Get()
  getAll(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }

  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<ReadUserDto> {
    return this._userService.getOne(id);
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: Partial<UpdateUserDto>,
  ): Promise<ReadUserDto> {
    return this._userService.update(id, user);
  }

  @Roles(RoleType.ROOT, RoleType.ADMIN)
  @UseGuards(RoleGuard)
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this._userService.delete(id);
  }

  //@Roles(RoleType.ROOT)
  //@UseGuards(RoleGuard)
  @Post('setRole/:userId/:roleId')
  setRoleToUser(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
  ) {
    return this._userService.setRoleToUser(roleId, userId);
  }
}
