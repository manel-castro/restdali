import express, { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

import { Password } from "../services/password";
import { AppDataSource } from "../data-source";
import { User } from "../entities/user.entity";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password must be between 4 and 20"),
    body("adminKey")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Admin Key must be between 4 and 20"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password, adminKey } = req.body;

    if (
      adminKey !== process.env.USER_SIGNUP_KEY &&
      adminKey !== process.env.ADMIN_SIGNUP_KEY &&
      adminKey !== process.env.SUPER_ADMIN_SIGNUP_KEY
    ) {
      return next(new BadRequestError("Provide a valid admin key"));
    }
    const role =
      adminKey === process.env.ADMIN_SIGNUP_KEY
        ? "ADMIN"
        : adminKey !== process.env.SUPER_ADMIN_SIGNUP_KEY
        ? "SUPER_ADMIN"
        : "USER";

    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (existingUser) {
      return next(new BadRequestError("Email in use"));
    }

    const hashedPassword = await Password.toHash(password);

    const user = userRepository.create({
      email,
      password: hashedPassword,
      role,
    });
    await userRepository.save(user);

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: user.id,
        email: user.email,
        role,
      },
      process.env.JWT_KEY!
    );

    // Store it on the session object
    // req.session = { jwt: userJwt }; // redefine this obj because type definitions

    res.status(201).send({ email: user.email, jwt: userJwt });
  }
);

export { router as SignupRouter };
