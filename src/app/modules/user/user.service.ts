import { TUser } from './user.interface';
import { User } from './user.model';

const registerUser = async (payload: TUser) => {
  const user = await User.create(payload);
  return user;
};

export const userServices = {
  registerUser,
};
