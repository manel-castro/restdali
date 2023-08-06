import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserPayload } from "../types/jwt";

// 192 Augment Type Definitions. Min 2:45
declare global {
  namespace Express {
    interface Request {
      currentUser?: UserPayload;
    }
  }
}

export const currentUser = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  /**
   * TOKEN BASED AUTH
   */

  console.log("req.headers.authorization: ", req.headers.authorization);
  if (!req.headers?.authorization) {
    return next();
  }

  try {
    const payload = jwt.verify(
      req.headers.authorization,
      process.env.JWT_KEY!
    ) as UserPayload;
    console.log("authorizing token payload: ", payload);

    req.currentUser = payload;
  } catch (e) {
    console.log("error authorizing token: ", e);
  }

  /**
   * COOKIE BASED AUTH
   */
  // if (!req.session?.jwt) {
  //   return next();
  // }

  // try {
  //   const payload = jwt.verify(
  //     req.session.jwt,
  //     process.env.JWT_KEY!
  //   ) as UserPayload;
  //   req.currentUser = payload;
  // } catch (e) {}

  next();
};
