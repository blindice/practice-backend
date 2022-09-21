import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from 'src/dto/loginDto';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject('UserService') private userSvc: UserService,
    private jwtSvc: JwtService,
  ) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userSvc.getByUsername(username);

    if (user && user.password === pass) {
      const { password, ...details } = user;

      return details;
    }

    return null;
  }

  async login(user: LoginDto) {
    const payload = { username: user.username, sub: user.fld_id };

    return {
      access_token: await this.jwtSvc.signAsync(payload),
    };
  }
}
