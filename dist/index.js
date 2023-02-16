"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
const config_1 = require("./config");
dotenv_1.default.config();
mongoose_1.default.Promise = global.Promise;
mongoose_1.default.set("strictQuery", false);
mongoose_1.default
    .connect(config_1.config.mongo.url, {
    retryWrites: true,
    w: "majority",
})
    .then(() => {
    console.log("connected");
})
    .catch((err) => console.log(err));
const app = (0, express_1.default)();
const port = process.env.PORT;
app.get('/', (req, res) => {
    res.send('Express + TypeScript Server');
});
app.listen(port, () => {
    console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});
