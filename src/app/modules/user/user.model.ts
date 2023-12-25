import { Schema, model } from 'mongoose';
import { TUser } from './user.interface';
import { USER_ROLES } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userSchema = new Schema<TUser>(
  {
    username: {
      type: String,
      required: [true, 'username is required'],
      unique: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'email is required'],
      unique: true,
    },
    password: {
      type: String,
      required: [true, 'password is required'],
      select: 0,
    },
    role: {
      type: String,
      enum: {
        values: USER_ROLES,
        message: '{VALUE} is not a valid role',
      },
      default: 'user',
    },
  },
  {
    timestamps: true,
  },
);

// hashed password before saving
userSchema.pre('save', async function (next) {
  // eslint-disable-next-line @typescript-eslint/no-this-alias
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_rounds),
  );
  next();
});

// Remove password field when converting to JSON
userSchema.set('toJSON', {
  transform: function (doc, ret) {
    delete ret.password;
    return ret;
  },
});

export const User = model<TUser>('User', userSchema);
