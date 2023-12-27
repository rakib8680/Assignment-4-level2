/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';

export type TRole = 'admin' | 'user';

export type TUser = {
  username: string;
  email: string;
  password: string;
  passwordChangedAt?: Date;
  role?: TRole;
};

export interface userModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
  isJWTIssuedBeforePasswordChanged(
    passwordChangedTime: Date,
    jwtIssuedTime: number,
  ): boolean;
}
