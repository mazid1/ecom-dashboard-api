import { Request } from 'express';
import { UserDocument } from 'src/modules/users/schemas/user.schema';

export type RequestWithUser = Request & {
  user: UserDocument;
};
