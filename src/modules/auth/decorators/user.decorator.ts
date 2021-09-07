import { createParamDecorator } from '@nestjs/common';
import { UserDto } from '../../user/dto';

export const Getuser = createParamDecorator((key, req): UserDto => {
  return req.user;
});
