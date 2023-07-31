import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";
import { HERO } from "./sections_structures/hero";
import { TABS } from "./sections_structures/tabs";
import { BadRequestError } from "../../../../errors/bad-request-error";
import { NotAuthorizedError } from "../../../../errors/not-authorized-error";
const express = require("express");

const router = express.Router();

const sectionsData = [HERO, TABS];

router.get(
  "/sections",
  // [
  //   param("sectionName", "Is badly formatted")
  //     .isString()
  //     .isIn(Object.values(Section)),
  // ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    // const { sectionName } = req.params;
    const lang = (req.query.lang || "es") as string;

    const form = await prisma.section.findMany({
      where: { lang },
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
    body("initialFields").isArray({ min: 1 }),
    check("initialFields.*.fieldId", "initialField fieldId is needed")
      .not()
      .isEmpty(),
    check("initialFields.*.fieldType", "initialField fieldType is needed")
      .not()
      .isEmpty(),
    check("initialFields.*.fieldLabel", "initialField fieldLabel is needed")
      .not()
      .isEmpty(),
    check("initialFields.*.fieldValue", "initialField fieldValue is needed")
      .not()
      .isEmpty(),
    body("lang", "lang is needed").isString(),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { title, initialFields, lang } = req.body;
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
        initialFields,
        lang,
      },
    });

    return res.send(form);
  }
);
router.patch(
  "/section/:id",
  [
    param("id").isString(),
    body("initialFields").isArray({ min: 1 }),
    check("initialFields.*.fieldId", "initialField fieldId is needed")
      .not()
      .isEmpty(),
    check("initialFields.*.fieldType", "initialField fieldType is needed")
      .not()
      .isEmpty(),
    check("initialFields.*.fieldLabel", "initialField fieldLabel is needed")
      .not()
      .isEmpty(),
    check("initialFields.*.fieldValue", "initialField fieldValue is needed")
      .not()
      .isEmpty(),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { initialFields } = req.body;
    console.log("id:", id);

    const form = await prisma.section.update({
      where: { id },
      data: {
        initialFields,
      },
    });

    return res.send(form);
  }
);
export { router as GetFormsRouter };
