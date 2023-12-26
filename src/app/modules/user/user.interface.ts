/* eslint-disable no-unused-vars */
import { Model,  } from 'mongoose';

export type TRole = 'admin' | 'user';

export type TUser = {
  username: string;
  email: string;
  password: string;
  role?: TRole;
};

// #todo
export interface userModel extends Model<TUser> {
  isUserExists(id: string): Promise<TUser>;
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
