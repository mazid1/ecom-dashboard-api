import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async getByUsername(username: string) {
    const user = this.userModel.findOne({ username });
    if (!user) {
      throw new NotFoundException('User with this username does not exist');
    }
    return user;
  }

  async create(userDto: CreateUserDto) {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }
}
