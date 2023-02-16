"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const userName = process.env.USERNAME || "";
const password = process.env.PASSWORD || "";
const mongo_url = `mongodb+srv://${userName}:${password}@cluster0.dvu3d.mongodb.net/?retryWrites=true&w=majority`;
const server_port = process.env.PORT ? +process.env.PORT : 3200;
exports.config = {
    mongo: {
        url: mongo_url,
    },
    server: {
        port: server_port,
    },
};
