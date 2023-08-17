require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cookieSession = require("cookie-session");
import { errorHandler } from "./middlewares/error-handler";
import { CurrentUserRouter } from "./routes/current-user";
import { SigninRouter } from "./routes/signin";
import { SignupRouter } from "./routes/signup";

import * as redis from "redis";
import { VerifyAuthClusterRouter } from "./cluster-routes";
import { AppDataSource } from "./data-source";
import { createDatabase } from "typeorm-extension";
import { ProjectsRouter } from "./routes/projects";

export const redisClient = redis.createClient({
  url: "redis://redis",
  password: "123456",
});

const start = async () => {
  /**
   * Environment variables verification
   */
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be defined");
  }
  if (!process.env.PORT) {
    throw new Error("PORT must be defined");
  }
  if (!process.env.DATABASE_URL) {
    throw new Error("DATABASE_URL must be defined");
  }
  if (!process.env.ADMIN_SIGNUP_KEY) {
    throw new Error("ADMIN_SIGNUP_KEY must be defined");
  }
  if (!process.env.SUPER_ADMIN_SIGNUP_KEY) {
    throw new Error("SUPER_ADMIN_SIGNUP_KEY must be defined");
  }
  if (!process.env.USER_SIGNUP_KEY) {
    throw new Error("USER_SIGNUP_KEY must be defined");
  }

  /**
   * TYPEORM
   */

  await AppDataSource.initialize()
    .then(async (DataSource) => {
      await createDatabase({ ifNotExist: true });

      await DataSource.synchronize();
      console.log("Typeorm connected to postgres...");
    })
    .catch((error) => console.log("!error connecting typeorm: ", error));

  /**
   * API REST
   */

  const app = express();

  app.use(express.json());
  app.use(
    cookieSession({
      signed: false,
      secure: false && process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS // TODO: enable this
    })
  );

  app.use(cors());

  /**
   * CLIENT ROUTES
   */

  app.use(SignupRouter);
  app.use(SigninRouter);
  app.use(CurrentUserRouter);
  app.use(ProjectsRouter);

  /**
   * CLUSTER ROUTES
   */
  app.use(VerifyAuthClusterRouter);

  app.use(errorHandler);

  const PORT = process.env.PORT || 9001;
  app.listen(PORT, function () {
    console.log("CORS-enabled web server listening on port: " + PORT);
  });
};
start();
