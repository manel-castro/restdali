import express, { Request, Response } from "express";
import { currentUser } from "../middlewares/current-user";
import { body } from "express-validator";
import { validateRequest } from "../middlewares/validate-request";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/cluster-api/users/verify-auth",
  [body("jwt").isString()],
  validateRequest,
  (req: Request, res: Response) => {
    console.log("trying to validate");

    const { jwt: token } = req.body;

    try {
      const payload = jwt.verify(token, process.env.JWT_KEY!);
      return res.send({ currentUser: payload || null });
    } catch (e) {
      return res.send({ currentUser: null });
    }
  }
);

export { router as VerifyAuthClusterRouter };
