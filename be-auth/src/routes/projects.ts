import express, { NextFunction, Request, Response } from "express";

import jwt from "jsonwebtoken";

import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

import { Password } from "../services/password";
import { AppDataSource } from "../data-source";
import { Project, User } from "../entities/user.entity";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";

const router = express.Router();

router.post(
  "/api/users/projects/create",
  [
    body("projectName")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Projectname must be between 4 and 20"),
  ],
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectName } = req.body;

    const role = req.currentUser?.role;

    if (role !== "SUPER_ADMIN") {
      return next(new BadRequestError("Invalid user role"));
    }

    const projectRepository = AppDataSource.getRepository(Project);
    const newProject = await projectRepository.create({
      projectName,
    });
    await projectRepository.save(newProject);

    res.status(201).send({ newProject });
  }
);

export { router as ProjectsRouter };
