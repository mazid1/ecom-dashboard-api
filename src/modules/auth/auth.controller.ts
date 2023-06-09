import {
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { LocalAuthGuard } from './guards/local-auth.guard';

@Controller('auth')
export class AuthController {
  @HttpCode(200)
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async logIn(@Req() request: Request, @Res() response: Response) {
    const { user } = request;
    console.log(user);
    // const cookie = this.authenticationService.getCookieWithJwtToken(user.id);
    // response.setHeader('Set-Cookie', cookie);
    return response.send(user);
  }
}
