import dotenv from "dotenv";
dotenv.config();

const userName = process.env.USERNAME || "";
const password = process.env.PASSWORD || "";
const mongo_url = `mongodb+srv://${userName}:${password}@cluster0.dvu3d.mongodb.net/?retryWrites=true&w=majority`;

const server_port = process.env.PORT ? +process.env.PORT : 3200;

export const config = {
  mongo: {
    url: mongo_url,
  },
  server: {
    port: server_port,
  },
};