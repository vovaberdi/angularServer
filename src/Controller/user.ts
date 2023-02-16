import { Request, Response, NextFunction } from "express";
import mongoose from "mongoose";
import { UserModel, Role } from "../Models/user";
import dotenv from "dotenv";
import Error from "../Models/error";
dotenv.config();

const register = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body;
  const Admin = process.env.ADMINS?.includes(user.email);
  user.role = Admin ? Role.ADMIN : Role.COSTUMER;
  const newUser = new UserModel(
    await {
      _id: new mongoose.Types.ObjectId(),
      ...user,
    }
  );
  return newUser
    .save()
    .then((user) => response.status(201).json(user))
    .catch((err) => next(err));
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const user = request.body;
  return UserModel.findOne({ email: user.email, password: user.password })
    .then((user) => {
      if (user) response.status(200).json(user);
      else throw new Error(401, "something went wrong !");
    })
    .catch((err) => next(err));
};

const getUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.id;
  return UserModel.findOne({ id_number: userId })
    .then((user) => {
      if (user) response.status(200).json(user);
      else throw new Error(401, "user not found");
    })
    .catch((err) => next(err));
};
const checkUserId = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const id_number = request.params.id;
  return UserModel.findOne({ id_number })
    .then((user) => {
      if (user) throw new Error(401, "already exist");
      else response.status(200).json({ message: "user not found" });
    })
    .catch((err) => next(err));
};
const checkUserEmail = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const email = request.params.email;
  return UserModel.findOne({ email })
    .then((user) => {
      if (user) throw new Error(401, "Email is already exist");
      else response.status(200).json({ message: "user not found" });
    })
    .catch((err) => next(err));
};

const getAllUsers = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  return UserModel.find()
    .then((users) =>
      users
        ? response.status(200).json(users)
        : response.status(200).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

const updateUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.id;
  return UserModel.findOne({ id_number: userId })
    .then((user) => {
      if (user) {
        user.set(request.body);
        return user
          .save()
          .then((user) => response.status(201).json(user))
          .catch((err) => next(err));
      } else {
        response.status(404).json({ message: "not found" });
      }
    })
    .catch((err) => next(err));
};

const deleteUser = async (
  request: Request,
  response: Response,
  next: NextFunction
) => {
  const userId = request.params.id;
  return UserModel.deleteOne({ id_number: userId })
    .then((user) =>
      user
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" })
    )
    .catch((err) => next(err));
};

export default {
  checkUserId,
  checkUserEmail,
  getUser,
  getAllUsers,
  register,
  login,
  updateUser,
  deleteUser,
};
