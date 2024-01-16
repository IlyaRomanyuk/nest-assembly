import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { UsersService } from '../../users/users.service';
import { TokenPayload } from '../interfaces/tokenPayload.interface';
import { config } from '../../../config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: config.keys.jwtAccessTokenSecret,
    });
  }

  async validate(payload: TokenPayload) {
    const { userId, ...authInfo } = payload;

    const user = await this.userService.getById(userId);

    if (!user) {
      throw new UnauthorizedException();
    }

    return [user, authInfo];
  }
}
