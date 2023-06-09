import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @HttpCode(200)
  @UseGuards(AuthGuard('local'))
  @Post('login')
  async logIn(@Req() request: Request, @Res() response: Response) {
    const { user } = request;
    console.log(user);
    // const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    // response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }
}
