import {
  Controller,
  Get,
  Req,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import MongooseClassSerializerInterceptor from 'src/interceptors/mongoose-class-serializer.interceptor';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RequestWithUser } from '../auth/types/request-with-user';
import { User } from './schemas/user.schema';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  @UseInterceptors(MongooseClassSerializerInterceptor(User))
  @Get('/me')
  getCurrentUser(@Req() request: RequestWithUser) {
    return request.user;
  }
}
