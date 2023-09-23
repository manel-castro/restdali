import { Request } from "express";
import { UsingJoinTableOnlyOnOneSideAllowedError } from "typeorm";

export const getDomain = (req: Request) => {
  const ip = req.headers["x-forwarded-for"] as string;

  console.log("ip: ", ip);

  return ip;
};
