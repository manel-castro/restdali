require("dotenv").config();
const express = require("express");
var cors = require("cors");
import cookieSession from "cookie-session";
import { errorHandler } from "./middlewares/error-handler";

import * as redis from "redis";
import { ApiRouter } from "./routes/api";

export const redisClient = redis.createClient({
  url: "redis://redis",
  password: "123456",
});

const start = async () => {
  /**
   * Environment variables verification
   */
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined in deployment yaml file!");
  }

  const app = express();

  app.use(express.json());
  app.use(
    cookieSession({
      //this is to set req.session
      signed: false,
      secure: process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS
    })
  );

  app.use(cors());

  app.use(ApiRouter);

  app.use(errorHandler);

  const PORT = process.env.PORT || 9000;
  app.listen(PORT, function () {
    console.log("CORS-enabled web server listening on port " + PORT);
  });
};

start();
