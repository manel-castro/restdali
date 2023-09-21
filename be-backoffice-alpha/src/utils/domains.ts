import { Request } from "express";

export const getDomain = (req: Request) => {
  return req.headers["x-forwarded-for"] as string;
};
