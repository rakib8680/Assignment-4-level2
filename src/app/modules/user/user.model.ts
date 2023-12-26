/* eslint-disable @typescript-eslint/no-this-alias */
import { Schema, model } from 'mongoose';
import { TUser, userModel } from './user.interface';
import bcrypt from 'bcrypt';
import config from '../../config';
import { roles } from './user.constant';

const userSchema = new Schema<TUser, userModel>(
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
        values: roles,
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

// check if the user is exist
userSchema.statics.isUserExists = async function (username: string) {
  return await User.findOne({ username }).select(
    '+password -__v -createdAt -updatedAt',
  );
};

// check if the password is matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const User = model<TUser, userModel>('User', userSchema);
