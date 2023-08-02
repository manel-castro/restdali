import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
const express = require("express");

const router = express.Router();

router.get(
  "/sections",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    // const { sectionName } = req.params;
    const lang = (req.query.lang || "es") as string;

    const form = await prisma.section.findMany({
      where: { lang },
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
    const lang = (req.query.lang || "es") as string;
    const { id } = req.params;

    const form = await prisma.section.findMany({
      where: {
        id,
        lang,
      },
    });

    return res.send(form);
  }
);

router.post(
  "/section",
  [
    body("title", "title needed").isString(),
    body("lang", "lang is needed").isString(),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { title, lang } = req.body;
    const existingSection = await prisma.section.findMany({
      where: {
        title,
        lang,
      },
    });

    if (existingSection.length) {
      return next(new BadRequestError("Section already exists"));
    }

    const form = await prisma.section.create({
      data: {
        title,
        lang,
      },
    });

    return res.send(form);
  }
);

export { router as SectionsRouter };
