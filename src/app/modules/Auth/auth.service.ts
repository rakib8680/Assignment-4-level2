import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import config from '../../config';
import { createToken } from './auth.utils';
import { JwtPayload } from 'jsonwebtoken';
import bcrypt from 'bcrypt';

// login user
const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.findOne({ username: payload.username }).select(
    '+password -__v -createdAt -updatedAt',
  );
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found !');
  }

  // checking if the password is correct
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect password !');
  }

  // create jwt token and sent to client
  const jwtPayload = {
    _id: user._id,
    role: user.role as string,
    email: user.email,
  };

  // create access token
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '1d',
  );
  return {
    user,
    accessToken,
  };
};

// change password
const changePassword = async (
  payload: {
    currentPassword: string;
    newPassword: string;
  },
  user: JwtPayload,
) => {
  // checking if the user is exist
  const userFromDB = await User.findById(user._id).select('+password');
  if (!userFromDB) {
    throw new AppError(httpStatus.NOT_FOUND, 'The user is not found !');
  }

  //checking if the Current password is correct
  if (
    !(await User.isPasswordMatched(
      payload?.currentPassword,
      userFromDB?.password,
    ))
  ) {
    throw new AppError(httpStatus.UNAUTHORIZED, 'Incorrect Current password !');
  }

  // check if new and current password are the same
  if (payload.currentPassword === payload.newPassword) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'New password must be different from current password !',
    );
  }

  // hash the new password
  const newHashedPassword = await bcrypt.hash(
    payload.newPassword,
    Number(config.bcrypt_salt_rounds),
  );

  // update the password
  const result = await User.findByIdAndUpdate(
    userFromDB._id,
    {
      password: newHashedPassword,
      passwordChangedAt: new Date(),
    },
    { new: true },
  );
  return result;
};

export const authServices = {
  loginUser,
  changePassword,
};
