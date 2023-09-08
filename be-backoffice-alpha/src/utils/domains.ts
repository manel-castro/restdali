import { Request } from "express";

export const getDomain = (req: Request) => req.hostname;
