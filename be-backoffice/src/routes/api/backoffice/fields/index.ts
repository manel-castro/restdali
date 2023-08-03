import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
const express = require("express");

const router = express.Router();

router.patch(
  "/fields/:fieldId",
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
  "/fields/:fieldId",
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
