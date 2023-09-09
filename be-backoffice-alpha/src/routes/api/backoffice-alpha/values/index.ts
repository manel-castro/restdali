import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
import { requireIsSuperAdmin } from "../../../../middlewares/require-role";
import { currentUser } from "../../../../middlewares/current-user";
const express = require("express");

const router = express.Router();

router.get(
  "/values/:projectId",
  [param("projectId", "projectId Is badly formatted").isString()],

  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;

    const existingValues = await prisma.fieldValueByProject.findMany({
      where: {
        projectId,
      },
    });

    return res.status(201).send(existingValues);
  }
);

router.get(
  "/values/:projectId/:fieldId",
  [
    param("projectId", "projectId Is badly formatted").isString(),
    param("fieldId", "fieldId Is badly formatted").isString(),
  ],

  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { projectId, fieldId } = req.params;

    const existingValues = await prisma.fieldValueByProject.findMany({
      where: {
        projectId,
        fieldId,
      },
    });

    return res.status(201).send(existingValues);
  }
);

router.post(
  "/values/:projectId/:fieldId",
  [
    param("projectId", "projectId Is badly formatted").isString(),
    param("fieldId", "fieldId Is badly formatted").isString(),
  ],
  [
    check("values", "value is needed").isArray(),
    check("values.*", "value is needed").isString(),
  ],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { projectId, fieldId } = req.params;
    const { values } = req.body;

    await prisma.fieldValueByProject.create({
      data: {
        values,
        fieldId,
        projectId,
      },
    });

    return res.status(201).send();
  }
);

router.patch(
  "/values/:id",
  [param("id", "Is badly formatted").isString()],

  [
    check("values", "value is needed").isArray(),
    check("values.*", "value is needed").isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { values } = req.body;
    const { id } = req.params;

    const existingFieldValue = await prisma.fieldValueByProject.findFirst({
      where: {
        id,
      },
      include: {
        Field: true,
        project: true,
      },
    });

    if (!existingFieldValue) {
      return next(new BadRequestError("fieldvalue doesn't exist"));
    }

    await prisma.fieldValueByProject.update({
      where: {
        id,
      },

      data: {
        values: values || existingFieldValue.values,
      },
    });

    return res.status(204).send();
  }
);

router.delete(
  "/values/:id",
  [param("id", "Is badly formatted").isString()],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const existingFieldValue = await prisma.fieldValueByProject.findFirst({
      where: {
        id,
      },
    });

    if (!existingFieldValue) {
      return next(new BadRequestError("Project doesn't exist"));
    }
    await prisma.fieldValueByProject.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  }
);

export { router as ValuesRouter };
