import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

export const createToken = (
  jwtPayload: { _id: Types.ObjectId; role: string; email: string },
  secret: string,
  expiresIn: string,
) => {
  return jwt.sign(jwtPayload, secret, {
    expiresIn,
  });
};
