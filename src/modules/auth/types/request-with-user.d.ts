import { Request } from 'express';
import { User } from 'src/modules/users/schemas/user.schema';

export type RequestWithUser = Request & {
  user: User;
};
