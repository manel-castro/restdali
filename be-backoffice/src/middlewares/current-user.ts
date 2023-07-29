import axios from "axios";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";

interface UserPayload {
  id: string;
  email: string;
}

// 192 Augment Type Definitions. Min 2:45
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.session?.jwt) {
    return next();
  }

  // console.log("currentUser");
  const auth = await axios
    .post<{ currentUser: UserPayload }>(
      "http://be-auth-srv:9001/cluster-api/users/verify-auth",
      { jwt: req.session?.jwt }
    )
    .then((data) => data.data)
    .catch((err) => console.log("ERROR current user: ", err));

  req.currentUser = auth?.currentUser;

  next();
};
