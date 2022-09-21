import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(@Inject('AuthService') private svc: AuthService) {
    super();
  }

  async validate(username: string, password: string) {
    const user = await this.svc.validateUser(username, password);

    if (!user) throw new HttpException('Invalid Account', HttpStatus.NOT_FOUND);

    return user;
  }
}
