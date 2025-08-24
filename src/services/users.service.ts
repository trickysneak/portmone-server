import { User } from '../models/User.js';

export const UsersService = {
  me(userId: string) {
    return User.findById(userId).lean();
  }
};
