import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
import { ERoleLevel } from "../../../../types/enums";
import { requireIsSuperAdmin } from "../../../../middlewares/require-role";
const express = require("express");

const router = express.Router();

router.patch(
  "/fields/:id",
  [param("id", "Is badly formatted").isString()],
  [
    check("fieldLabel", "initialField fieldLabel is needed").optional(),
    check("fieldValue", "initialField fieldValue is needed").optional(),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { fieldType, fieldValue, fieldLabel, lang } = req.body;
    const { id } = req.params;

    const role = req.currentUser!.role;

    const existingField = await prisma.field.findFirst({
      where: {
        id,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("Field doesn't exist"));
    }
    await prisma.field.update({
      where: {
        id,
      },
      data: {
        fieldValue:
          role === ERoleLevel.SUPERADMIN || role === ERoleLevel.ADMIN
            ? fieldValue
            : undefined,
        fieldLabel: role === ERoleLevel.SUPERADMIN ? fieldLabel : undefined,
      },
    });

    return res.status(204).send();
  }
);

router.delete(
  "/fields/:id",
  [param("id", "Is badly formatted").isString()],
  validateRequest,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const existingField = await prisma.field.findFirst({
      where: {
        id,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("Field doesn't exist"));
    }
    await prisma.field.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  }
);

export { router as FieldsRouter };
