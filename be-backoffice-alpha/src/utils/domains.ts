import { Request } from "express";

export const getDomain = (req: Request) => {
  console.log("domain: ", req.get("origin"));
  console.log("req.connection.remoteAddress: ", req.connection.remoteAddress);
  console.log(
    "req.headers['x-forwarded-for']: ",
    req.headers["x-forwarded-for"]
  );
  console.log("req.ip: ", req.ip);
  console.log("req.ips: ", req.ips);

  return req.hostname;
};
