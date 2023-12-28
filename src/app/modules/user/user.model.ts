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
    passwordChangedAt: { type: Date, select: 0 },
    passwordHistory: [
      {
        password: {
          type: String,
          required: true,
        },
        changedAt: {
          type: Date,
          default: Date.now,
        },
      },
    ],
    role: {
      type: String,
      enum: {
        values: roles,
        message: '{VALUE} is not a valid role',
      },
      default: 'user',
    },
    createdAt: {
      type: Date,
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

// check if the password is matched
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

// check if the jwt is issued before password changed
userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
  passwordChangedTimeStamp: Date,
  jwtIssuedTimeStamp: number,
) {
  const passwordChangedTime =
    new Date(passwordChangedTimeStamp).getTime() / 1000;

  return passwordChangedTime > jwtIssuedTimeStamp;
};

export const User = model<TUser, userModel>('User', userSchema);
