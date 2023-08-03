import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
import { SectionFieldsRouter } from "./fields";
const express = require("express");

const router = express.Router();

router.use("/sections", SectionFieldsRouter);

router.get(
  "/sections",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    // const { sectionName } = req.params;

    const form = await prisma.section.findMany({
      include: {
        initialFields: true,
      },
    });

    return res.send(form);
  }
);
router.get(
  "/sections/:id",
  [param("id", "id needed").isString()],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const form = await prisma.section.findMany({
      where: {
        id,
      },
      include: {
        initialFields: true,
      },
    });

    return res.send(form);
  }
);

router.post(
  "/section",
  [body("title", "title needed").isString()],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { title } = req.body;
    const existingSection = await prisma.section.findMany({
      where: {
        title,
      },
    });

    if (existingSection.length) {
      return next(new BadRequestError("Section already exists"));
    }

    const form = await prisma.section.create({
      data: {
        title,
      },
    });

    return res.send(form);
  }
);

export { router as SectionsRouter };
