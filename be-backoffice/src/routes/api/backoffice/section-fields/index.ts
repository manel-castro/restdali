import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
const express = require("express");

const router = express.Router();

router.get(
  "/section-fields/:sectionId",
  [param("sectionId", "Is badly formatted").isString()],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { sectionId } = req.params;
    const lang = (req.query.lang || "es") as string;

    const fields = await prisma.section.findMany({
      where: { lang, id: sectionId },
      select: { initialFields: true },
    });

    return res.send(fields);
  }
);

router.post(
  "/section-fields/:sectionId",
  [param("sectionId", "Is badly formatted").isString()],
  [
    check("fieldId", "initialField fieldId is needed").optional(),
    check("fieldType", "initialField fieldType is needed").not().isEmpty(),
    check("fieldLabel", "initialField fieldLabel is needed").not().isEmpty(),
    check("fieldValue", "initialField fieldValue is needed").not().isEmpty(),
    body("lang", "lang is needed").isString(),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { fieldId, fieldType, fieldValue, fieldLabel, lang } = req.body;
    const { sectionId } = req.params;

    const existingSection = await prisma.section.findFirst({
      where: {
        id: sectionId,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("Section doesn't exists"));
    }

    const existingField = await prisma.field.findMany({
      where: {
        fieldId,
        Section: {
          lang,
          id: sectionId,
        },
      },
    });

    if (existingField.length) {
      return next(new BadRequestError("Field already exists"));
    }
    const field = await prisma.field.create({
      data: {
        fieldId,
        fieldLabel,
        fieldType,
        fieldValue,
        Section: { connect: { id: sectionId } },
      },
    });

    return res.send(existingSection);
  }
);

router.patch(
  "/section-fields/:fieldId",
  [param("fieldId", "Is badly formatted").isString()],
  [
    check("fieldType", "initialField fieldType is needed").optional(),
    check("fieldLabel", "initialField fieldLabel is needed").optional(),
    check("fieldValue", "initialField fieldValue is needed").optional(),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { fieldType, fieldValue, fieldLabel, lang } = req.body;
    const { fieldId } = req.params;

    const existingField = await prisma.field.findFirst({
      where: {
        fieldId,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("Field doesn't exist"));
    }
    await prisma.field.update({
      where: {
        fieldId,
      },
      data: {
        fieldLabel,
        fieldType,
        fieldValue,
      },
    });

    return res.status(204).send();
  }
);

router.delete(
  "/section-fields/:fieldId",
  [param("fieldId", "Is badly formatted").isString()],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { fieldId } = req.params;

    const existingField = await prisma.field.findFirst({
      where: {
        fieldId,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("Field doesn't exist"));
    }
    await prisma.field.delete({
      where: {
        fieldId,
      },
    });

    return res.status(204).send();
  }
);

export { router as FieldsRouter };
