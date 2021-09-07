import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { UpdateUserDto } from '../dto';
import { ReadUserDto } from '../dto';
import { UserService } from '../services/user.service';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}
  @Get()
  getAll(): Promise<ReadUserDto[]> {
    return this._userService.getAll();
  }
  @Get(':id')
  getOne(@Param('id', ParseIntPipe) id: number): Promise<ReadUserDto> {
    return this._userService.getOne(id);
  }
  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() user: UpdateUserDto,
  ): Promise<ReadUserDto> {
    return this._userService.update(id, user);
  }
  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number): Promise<boolean> {
    return this._userService.delete(id);
  }
  @Post(':roleId/:userId')
  addRoleToUser(
    @Param('id', ParseIntPipe) roleId: number,
    @Param('id', ParseIntPipe) userId: number,
  ) {
    return this._userService.addRoleToUser(roleId, userId);
  }
}
