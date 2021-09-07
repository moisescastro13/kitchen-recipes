import {
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { SignInDto, SignUpDto } from '../dto';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly _authService: AuthService) {}

  @Post('/signup')
  @UsePipes(ValidationPipe)
  signUp(@Body() signUpDto: SignUpDto): Promise<void> {
    return this._authService.signUp(signUpDto);
  }

  @Post('/signin')
  @UsePipes(ValidationPipe)
  signIn(@Body() signInDto: SignInDto): Promise<{ token: string }> {
    return this._authService.signIn(signInDto);
  }
}
