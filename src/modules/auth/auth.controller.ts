import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { RequestWithUser } from './types/request-with-user';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongoose-class-serializer.interceptor';
import { User } from '../users/schemas/user.schema';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { UsersService } from '../users/users.service';
import JwtRefreshGuard from './guards/jwt-refresh.guard';
import { RegisterDto } from './dtos/register.dto';
import { Request } from 'express';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Post('register')
  async register(
    @Body() registrationData: RegisterDto,
    @Req() request: Request,
  ) {
    const user = await this.authService.register(registrationData);

    const accessTokenCookie = this.authService.getCookieWithAccessToken(
      user._id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithRefreshToken(user._id);

    // store refresh token in DB
    await this.usersService.setCurrentRefreshToken(refreshToken, user._id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @UseGuards(LocalAuthGuard)
  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @HttpCode(200)
  @Post('login')
  async logIn(@Req() request: RequestWithUser) {
    const { user } = request;
    const accessTokenCookie = this.authService.getCookieWithAccessToken(
      user._id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithRefreshToken(user._id);

    // store refresh token in DB
    await this.usersService.setCurrentRefreshToken(refreshToken, user._id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  @HttpCode(200)
  async logOut(@Req() request: RequestWithUser) {
    // remove refresh token from DB
    await this.usersService.removeRefreshToken(request.user._id);
    // remove cookies from browser
    request.res.setHeader('Set-Cookie', this.authService.getCookiesForLogOut());
  }

  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @UseGuards(JwtRefreshGuard)
  @Get('refresh')
  refresh(@Req() request: RequestWithUser) {
    const { user } = request;

    const accessTokenCookie = this.authService.getCookieWithAccessToken(
      user._id,
    );
    const { cookie: refreshTokenCookie, token: refreshToken } =
      this.authService.getCookieWithRefreshToken(user._id);

    // replace existing refresh token in DB with the new one, so that it can not be used again
    this.usersService.setCurrentRefreshToken(refreshToken, user._id);

    request.res.setHeader('Set-Cookie', [
      accessTokenCookie,
      refreshTokenCookie,
    ]);
    return user;
  }
}
