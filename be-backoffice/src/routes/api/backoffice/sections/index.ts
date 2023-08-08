import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
import { SectionFieldsRouter } from "./fields";
import { requireAuth } from "../../../../middlewares/require-auth";
const express = require("express");

const router = express.Router();

router.use("/sections", SectionFieldsRouter);

router.get(
  "/sections",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    // const { sectionName } = req.params;
    const lang = req.query?.lang as string | undefined;

    const form = await prisma.section.findMany({
      include: {
        initialFields: {
          where: {
            lang,
          },
        },
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
  [
    body("title", "title needed").isString(),
    body("id", "id needed").isString(),
  ],
  requireAuth,
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { title, id } = req.body;
    const existingSection = await prisma.section.findMany({
      where: {
        id,
      },
    });

    if (existingSection.length) {
      return next(new BadRequestError("Section already exists"));
    }

    const form = await prisma.section.create({
      data: {
        id,
        title,
      },
    });

    return res.send(form);
  }
);

export { router as SectionsRouter };
