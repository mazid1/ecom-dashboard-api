import { Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async findByUsername(username: string) {
    const user = await this.userModel.findOne({ username }).exec();
    if (!user) {
      throw new NotFoundException(
        `User with username #${username} does not exist`,
      );
    }
    return user;
  }

  async findById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User with id #${id} does not exist`);
    }
    return user;
  }

  async create(userDto: CreateUserDto) {
    const newUser = new this.userModel(userDto);
    return newUser.save();
  }

  async setCurrentRefreshToken(refreshToken: string, userId: string) {
    const refreshTokenHash = await bcrypt.hash(refreshToken, 10);
    await this.userModel
      .findByIdAndUpdate(
        userId,
        {
          refreshTokenHash,
        },
        { new: true },
      )
      .exec();
  }

  async removeRefreshToken(userId: string) {
    return this.userModel
      .findByIdAndUpdate(
        userId,
        {
          refreshTokenHash: null,
        },
        { new: true },
      )
      .exec();
  }

  async getUserIfRefreshTokenMatches(refreshToken: string, userId: string) {
    const user = await this.findById(userId);

    const isRefreshTokenMatching = await bcrypt.compare(
      refreshToken,
      user.refreshTokenHash,
    );

    if (isRefreshTokenMatching) {
      return user;
    }

    return null;
  }
}
