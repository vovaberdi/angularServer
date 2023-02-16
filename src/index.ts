import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import { config } from "./config";


dotenv.config();

mongoose.Promise = global.Promise;
mongoose.set("strictQuery", false);
mongoose
  .connect(config.mongo.url, {
    retryWrites: true,
    w: "majority",
  })
  .then(() => {
    console.log("connected");
  })
  .catch((err) => console.log(err));

const app: Express = express();
const port = process.env.PORT;

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(port, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${port}`);
});