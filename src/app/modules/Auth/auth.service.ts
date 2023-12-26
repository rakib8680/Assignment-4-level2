import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import config from '../../config';
import { createToken } from './auth.utils';

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
    '5d',
  );
  return {
    user,
    accessToken,
  };
};

// change password
const changePassword = async (payload: {
  currentPassword: string;
  newPassword: string;
}) => {

  

};

export const authServices = {
  loginUser,
  changePassword,
};
