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
  "/fields",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const existingFields = await prisma.field.findMany({
      where: {},
      include: {
        Section: true,
      },
    });

    return res.status(201).send(existingFields);
  }
);

router.post(
  "/fields",
  [
    check("name", "name is needed").isString(),
    check("sectionId", "sectionId is needed").isString(),
    check("translationsLabel", "translationsLabel is needed").isArray(),
    check("translationsLabel.*", "translationsLabel is needed").isString(),
  ],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { name, sectionId, translationsLabel, translationsValue } = req.body;

    const existingSection = await prisma.section.findFirst({
      where: {
        id: sectionId,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("sectionId doesn't exist"));
    }

    const existingFieldInThatSection = await prisma.field.findFirst({
      where: {
        Section: {
          some: {
            id: sectionId,
          },
        },
        name,
      },
    });

    if (existingFieldInThatSection) {
      return next(
        new BadRequestError("field name already exists for that section")
      );
    }

    await prisma.field.create({
      data: {
        name,
        translationsLabel,
        Section: {
          connect: {
            id: existingSection.id,
          },
        },
      },
    });

    return res.status(201).send();
  }
);

router.patch(
  "/fields/:id",
  [param("id", "Is badly formatted").isString()],

  [
    check("name", "name is needed").optional(),
    check("pageNameId", "pageNameId is needed").optional(),
    check("Project", "Project is needed").optional(),
    check("projectId", "projectId is needed").optional(),
    check("PageName", "PageName is needed").optional(),
    check("translationsLabel", "translationsLabel is needed").optional(),
    check("translationsValue", "translationsValue is needed").optional(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const {
      name,
      pageNameId,
      Project,
      projectId,
      PageName,
      translationsLabel,
      translationsValue,
    } = req.body;
    const { id } = req.params;

    const existingField = await prisma.field.findFirst({
      where: {
        id,
      },
      include: {
        Section: true,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("field doesn't exist"));
    }

    await prisma.field.update({
      where: {
        id,
      },

      data: {
        name: name || existingField.name,
        translationsLabel: translationsLabel || existingField.translationsLabel,
      },
    });

    return res.status(204).send();
  }
);

router.delete(
  "/fields/:id",
  [param("id", "Is badly formatted").isString()],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const existingField = await prisma.field.findFirst({
      where: {
        id,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("Project doesn't exist"));
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
