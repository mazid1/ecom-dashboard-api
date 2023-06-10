import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { EnvironmentVariables } from 'src/config/environment-variables';
import { UsersService } from 'src/modules/users/users.service';
import { TokenPayload } from '../types/token-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  private readonly logger = new Logger(JwtStrategy.name);

  constructor(
    private readonly configService: ConfigService<EnvironmentVariables>,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: Request) => {
          return request?.cookies?.Authentication;
        },
      ]),
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_ACCESS_TOKEN_SECRET'),
    });
  }

  async validate({ userId }: TokenPayload) {
    try {
      const user = await this.userService.findById(userId);
      if (!user) {
        throw new UnauthorizedException();
      }
      return user;
    } catch (error) {
      this.logger.log(error);
      throw new UnauthorizedException();
    }
  }
}
