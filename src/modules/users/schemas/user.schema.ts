import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Exclude, Transform } from 'class-transformer';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({
  timestamps: true,
})
export class User {
  @Exclude()
  @Transform(({ value }) => value.toString())
  _id: string;

  @Prop({ required: true, unique: true })
  username: string;

  @Prop({ required: true })
  @Exclude()
  passwordHash: string;

  @Prop({ nullable: true })
  @Exclude()
  refreshTokenHash?: string;

  @Prop({ required: true })
  firstName: string;

  @Prop()
  lastName: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  address: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
