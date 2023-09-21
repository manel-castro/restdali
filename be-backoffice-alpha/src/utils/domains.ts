import { Request } from "express";

export const getDomain = (req: Request) => {
  console.log("domain: ", req.hostname);

  return req.hostname;
};
