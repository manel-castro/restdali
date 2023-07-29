import express, { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";
import { prisma } from "../prismaclient";
import { Password } from "../services/password";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, adminKey } = req.body;

    if (adminKey !== process.env.ADMIN_SIGNUP_KEY) {
      return next(new BadRequestError("Provide a vaild admin key"));
    }

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) {
      return next(new BadRequestError("Email in use"));
    }

    const hashedPassword = await Password.toHash(password);

    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
      // select: { email: true, id: true },
    });

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
      },
      process.env.JWT_KEY!
    );

    // Store it on the session object
    req.session = { jwt: userJwt }; // redefine this obj because type definitions

    res.status(201).send({ email: user.email });
  }
);

export { router as SignupRouter };
