import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const Getuser = createParamDecorator(
  (key, request: ExecutionContext) => {
    const req = request.switchToHttp().getRequest();
    return key ? req.user[key] : req.user;
  },
);
