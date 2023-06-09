import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  @Exclude()
  password: string;

  @Prop({ nullable: true })
  @Exclude()
  public refreshTokenHash?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
