import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { plainToClass } from 'class-transformer';

import { AuthRepository } from '../auth.repository';
import { LoggedInDto, SignInDto, SignUpDto } from '../dto';
import { IjwtPayload } from '../intefaces';
import { RoleType } from '../../../shared/enums';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(AuthRepository)
    private readonly _authRepositoy: AuthRepository,
    private readonly _jwtService: JwtService,
  ) {}

  async signUp(signupDto: SignUpDto): Promise<void> {
    const { username, email } = signupDto;
    const userExist = await this._authRepositoy.findOne({
      where: [{ username }, { email }],
    });
    if (userExist)
      throw new ConflictException('username or email already exists');

    return this._authRepositoy.signUp(signupDto);
  }

  async signIn(signinDto: SignInDto): Promise<LoggedInDto> {
    const { username, password } = signinDto;

    const userExist = await this._authRepositoy.findOne({
      where: { username },
    });

    if (!userExist) throw new NotFoundException('user does not exist');

    const isMatch = compare(password, userExist.password);

    if (!isMatch) throw new UnauthorizedException('invalid credentials');

    const payload: IjwtPayload = {
      id: userExist.id,
      username: userExist.username,
      email: userExist.email,
      roles: userExist.roles.map(role => role.name as RoleType),
    };
    const token = this._jwtService.sign(payload);
    return plainToClass(LoggedInDto, { token, user: userExist });
  }
}
