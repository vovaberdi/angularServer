"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.Role = void 0;
const mongoose_1 = require("mongoose");
var Role;
(function (Role) {
    Role[Role["ADMIN"] = 1] = "ADMIN";
    Role[Role["COSTUMER"] = 2] = "COSTUMER";
    Role[Role["GUEST"] = 3] = "GUEST";
})(Role = exports.Role || (exports.Role = {}));
const UserSchema = new mongoose_1.Schema({
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
}, {
    versionKey: false,
});
exports.UserModel = (0, mongoose_1.model)("users", // name of document collection
UserSchema);
