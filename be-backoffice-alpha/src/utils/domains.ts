import { Request } from "express";

export const getDomain = (req: Request) => {
  let ip = req.headers["x-forwarded-for"] as string;

  if (typeof ip === "string") {
  } else {
    ip = ip[0];
  }
  console.log("ip: ", `"${ip}"`);

  return ip;
};
