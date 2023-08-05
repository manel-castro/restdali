import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";

import jwt from "jsonwebtoken";
import { validateRequest } from "../middlewares/validate-request";

import { BadRequestError } from "../errors/bad-request-error";
import { Password } from "../services/password";
import { User } from "../entities/user.entity";
import { AppDataSource } from "../data-source";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    console.log("test");
    const userRepository = AppDataSource.getRepository(User);
    const existingUser = await userRepository.findOne({ where: { email } });

    if (!existingUser) {
      return next(new BadRequestError("Credenciales invalidos"));
    }

    // console.log("existingUser.password: ", typeof existingUser.password);

    const passwordsMatch = await Password.compare(
      existingUser.password,
      password
    );

    if (!passwordsMatch) {
      return next(new BadRequestError("Credenciales invalidos"));
    }

    // Generate JWT
    const userJwt = jwt.sign(
      {
        id: existingUser.id,
        email: existingUser.email,
        role: existingUser.role
      },
      process.env.JWT_KEY!
    );

    // Store it on the session object
    req.session = { jwt: userJwt }; // redefine this obj because type definitions

    res.status(200).send({ email: existingUser.email });
  }
);

export { router as SigninRouter };
