import { Document, model, Schema } from "mongoose";

export enum Role {
  ADMIN = 1,
  COSTUMER = 2,
  GUEST = 3,
}

export interface IUser {
  id_number: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  city: string;
  street: string;
  role: Role;
}

export interface IUserModel extends Document, IUser {}

const UserSchema: Schema = new Schema<IUser>(
  {
    id_number: {
      type: Number,
      required: [true, "missing account number"],
      minLength: [4, "number too short"],
      maxLength: [12, "number too long"],
      trim: true,
      unique: true,
    },
    first_name: {
      type: String,
      required: [true, "missing name"],
      minLength: [2, "name too short"],
      maxLength: [15, "name too long"],
    },
    last_name: {
      type: String,
      required: [true, "missing last name"],
      minLength: [2, "last name too short"],
      maxLength: [12, "last name too long"],
    },
    email: {
      type: String,
      required: [true, "missing email"],
      minLength: [6, "email too short"],
      maxLength: [50, "email too long"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "missing password"],
      minLength: [6, "password too short"],
      maxLength: [12, "password too long"],
    },
    city: {
      type: String,
      required: [true, "missing city"],
      minLength: [2, "city too short"],
      maxLength: [25, "city too long"],
    },
    street: {
      type: String,
      required: [true, "missing street"],
      minLength: [2, "street too short"],
      maxLength: [25, "street too long"],
    },
    role: {
      type: Number,
      required: [true, "missing role"],
      length: [1],
    },
  },
  {
    versionKey: false,
  }
);

export const UserModel = model<IUserModel>(
  "users", // name of document collection
  UserSchema
);