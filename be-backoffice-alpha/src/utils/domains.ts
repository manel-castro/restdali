import { Request } from "express";

export const getDomain = (req: Request) => {
  console.log("domain: ", req.get("origin"));

  return req.hostname;
};
