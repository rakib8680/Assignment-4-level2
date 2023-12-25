export type TRole = 'admin' | 'user';

export type TUser = {
  username: string;
  email: string;
  password: string;
  role: TRole;
};
