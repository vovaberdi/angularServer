"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = require("../Models/user");
const dotenv_1 = __importDefault(require("dotenv"));
const error_1 = __importDefault(require("../Models/error"));
dotenv_1.default.config();
const register = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const user = request.body;
    const Admin = (_a = process.env.ADMINS) === null || _a === void 0 ? void 0 : _a.includes(user.email);
    user.role = Admin ? user_1.Role.ADMIN : user_1.Role.COSTUMER;
    const newUser = new user_1.UserModel(yield Object.assign({ _id: new mongoose_1.default.Types.ObjectId() }, user));
    return newUser
        .save()
        .then((user) => response.status(201).json(user))
        .catch((err) => next(err));
});
const login = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const user = request.body;
    return user_1.UserModel.findOne({ email: user.email, password: user.password })
        .then((user) => {
        if (user)
            response.status(200).json(user);
        else
            throw new error_1.default(401, "something went wrong !");
    })
        .catch((err) => next(err));
});
const getUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.params.id;
    return user_1.UserModel.findOne({ id_number: userId })
        .then((user) => {
        if (user)
            response.status(200).json(user);
        else
            throw new error_1.default(401, "user not found");
    })
        .catch((err) => next(err));
});
const checkUserId = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const id_number = request.params.id;
    return user_1.UserModel.findOne({ id_number })
        .then((user) => {
        if (user)
            throw new error_1.default(401, "already exist");
        else
            response.status(200).json({ message: "user not found" });
    })
        .catch((err) => next(err));
});
const checkUserEmail = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const email = request.params.email;
    return user_1.UserModel.findOne({ email })
        .then((user) => {
        if (user)
            throw new error_1.default(401, "Email is already exist");
        else
            response.status(200).json({ message: "user not found" });
    })
        .catch((err) => next(err));
});
const getAllUsers = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    return user_1.UserModel.find()
        .then((users) => users
        ? response.status(200).json(users)
        : response.status(200).json({ message: "not found" }))
        .catch((err) => next(err));
});
const updateUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.params.id;
    return user_1.UserModel.findOne({ id_number: userId })
        .then((user) => {
        if (user) {
            user.set(request.body);
            return user
                .save()
                .then((user) => response.status(201).json(user))
                .catch((err) => next(err));
        }
        else {
            response.status(404).json({ message: "not found" });
        }
    })
        .catch((err) => next(err));
});
const deleteUser = (request, response, next) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = request.params.id;
    return user_1.UserModel.deleteOne({ id_number: userId })
        .then((user) => user
        ? response.status(201).json({ message: "deleted" })
        : response.status(404).json({ message: "not found" }))
        .catch((err) => next(err));
});
exports.default = {
    checkUserId,
    checkUserEmail,
    getUser,
    getAllUsers,
    register,
    login,
    updateUser,
    deleteUser,
};
