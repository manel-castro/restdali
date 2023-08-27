import express, { NextFunction, Request, Response } from "express";

import { body } from "express-validator";
import { BadRequestError } from "../errors/bad-request-error";
import { validateRequest } from "../middlewares/validate-request";

import { AppDataSource } from "../data-source";
import { Project } from "../entities/user.entity";
import { currentUser } from "../middlewares/current-user";
import { requireAuth } from "../middlewares/require-auth";
import { ERoleLevel } from "../types/enums";

const router = express.Router();

router.post(
  "/api/users/projects",
  [
    body("projectName")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Projectname must be between 4 and 20"),
    body("domain")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Domain must be between 4 and 20"),
  ],
  currentUser,
  requireAuth,
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { projectName, domain } = req.body;

    const role = req.currentUser?.role;

    if (role !== "SUPER_ADMIN") {
      return next(new BadRequestError("Invalid user role"));
    }

    const projectRepository = AppDataSource.getRepository(Project);
    const newProject = projectRepository.create({
      projectName,
      domain,
    });
    await projectRepository.save(newProject);

    res.status(201).send({ newProject });
  }
);

router.get(
  "/api/users/projects",

  currentUser,
  requireAuth,

  async (req: Request, res: Response, next: NextFunction) => {
    const role = req.currentUser?.role;

    if (role !== ERoleLevel.SUPERADMIN && role !== ERoleLevel.ADMIN) {
      return next(new BadRequestError("Invalid user role"));
    }

    const projectRepository = AppDataSource.getRepository(Project);
    const projects = await projectRepository.find({});

    res.status(201).send({ projects });
  }
);

export { router as ProjectsRouter };
