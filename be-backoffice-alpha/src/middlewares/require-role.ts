import { Request, Response, NextFunction } from "express";
import { NotAuthorizedError } from "../errors/not-authorized-error";
import { ERoleLevel } from "../types/enums";

/**
 * This middleware requires the following middlewares to be previously assigned:
 * - require-auth.ts
 * - current-user.ts
 */
export const requireIsSuperAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.currentUser || req.currentUser.role !== ERoleLevel.SUPERADMIN) {
    return next(new NotAuthorizedError());
  }
  next();
};

export const requireIsAtLeastAdmin = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (
    !req.currentUser ||
    (req.currentUser!.role !== ERoleLevel.SUPERADMIN &&
      req.currentUser!.role !== ERoleLevel.ADMIN)
  ) {
    return next(new NotAuthorizedError());
  }
  next();
};
