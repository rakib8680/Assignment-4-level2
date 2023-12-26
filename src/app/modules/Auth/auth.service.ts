import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginUser } from './auth.interface';
import httpStatus from 'http-status';
import jwt from 'jsonwebtoken';
import config from '../../config';

const loginUser = async (payload: TLoginUser) => {
  // checking if the user is exist
  const user = await User.isUserExists(payload.username);
  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'This user is not found !');
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
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string,{
    expiresIn : '5d'
  })



  return {
    user,
    accessToken,
  };
};

export const authServices = {
  loginUser,
};
