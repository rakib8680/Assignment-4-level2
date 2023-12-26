import httpStatus from 'http-status';
import AppError from '../errors/appError';
import { TRole } from '../modules/user/user.interface';
import catchAsync from '../utils/catchAsync';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...roles: TRole[]) => {
  return catchAsync(async (req, res, next) => {
    // check if there is a token
    const token = req.headers.authorization;
    if (!token) {
      throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
    }

    // check if the token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { _id, role, iat } = decoded;

    //    check if the user is exist
    const user = await User.findById(_id);
    if (!user) {
      throw new AppError(httpStatus.NOT_FOUND, 'The user is not found !');
    }

     // if the user role is not matched
     if (roles && !roles.includes(role)) {
        throw new AppError(httpStatus.UNAUTHORIZED, 'You are not authorized !');
      }

    console.log(user);


    next();
  });
};

export default auth;
