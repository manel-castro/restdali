import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../../middlewares/validate-request";
import { prisma } from "../../../../../prismaclient";

import { BadRequestError } from "../../../../../errors/bad-request-error";
import { ERoleLevel } from "../../../../../types/enums";
import { requireIsSuperAdmin } from "../../../../../middlewares/require-role";
import { requireAuth } from "../../../../../middlewares/require-auth";
const express = require("express");

const router = express.Router();

router.get(
  "/:sectionId/fields/:lang",
  [
    param("sectionId", "Is badly formatted").isString(),
    param("lang", "Is badly formatted").isString(),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { sectionId, lang } = req.params;

    console.log("HAPPENED");

    const domain = req.get("host");
    console.log("Domain: ", domain);

    console.log("param lang:", lang);

    const fields = await prisma.section.findMany({
      where: {
        id: sectionId,
        project: domain,
      },
      include: {
        initialFields: {
          where: {
            lang,
          },
        },
      },
      // select: { initialFields: true },
    });

    return res.send(fields);
  }
);

router.post(
  "/:sectionId/field",

  [param("sectionId", "Is badly formatted").isString()],
  [
    check("fieldId", "initialField fieldId is needed")
      .isString()
      .not()
      .isEmpty(),
    check("fieldType", "initialField fieldType is needed")
      .isString()
      .not()
      .isEmpty(),
    check("fieldLabel", "initialField fieldLabel is needed")
      .isString()
      .not()
      .isEmpty(),
    check("fieldValue", "initialField fieldValue is needed")
      .isString()
      .not()
      .isEmpty(),
    body("lang", "lang is needed").isString(),
  ],
  requireAuth,
  validateRequest,
  requireIsSuperAdmin,
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

    // const existingField = await prisma.field.findMany({
    //   where: {
    //     ,
    //   },
    // });
    // if (existingField.length) {
    //   return next(new BadRequestError("Field already exists"));
    // }

    const field = await prisma.field.create({
      data: {
        fieldId,
        fieldLabel,
        fieldType,
        fieldValue,
        lang,
        Section: { connect: { id: sectionId } },
      },
    });

    return res.send(field);
  }
);

router.delete(
  "/:sectionId/field/:fieldId",
  [
    param("sectionId", "Is badly formatted").isString(),
    param("id", "Is badly formatted").isString(),
  ],
  requireAuth,
  validateRequest,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { sectionId, id } = req.params;

    const existingSection = await prisma.section.findFirst({
      where: {
        id: sectionId,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("Section doesn't exists"));
    }

    const existingField = await prisma.field.findFirst({
      where: {
        id,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("Field doesn't exist"));
    }
    const field = await prisma.field.delete({
      where: {
        id,
      },
    });

    return res.send(existingSection);
  }
);

router.patch(
  "/:sectionId/fields",
  [param("sectionId", "Is badly formatted").isString()],
  [
    check("fields").isArray(),
    check("fields.*.id", "initialField fieldId is needed").isString(),
    check("fields.*.fieldId", "initialField fieldId is needed").isString(),
    check(
      "fields.*.fieldLabel",
      "initialField fieldLabel is needed"
    ).isString(),
    check(
      "fields.*.fieldValue",
      "initialField fieldValue is needed"
    ).isString(),
    check("lang").isString(),
  ],
  requireAuth,
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { fields, lang } = req.body;
    const { sectionId } = req.params;

    const role = req.currentUser!.role;

    const existingSection = await prisma.section.findFirst({
      where: {
        id: sectionId,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("Section doesn't exists"));
    }

    for (const field of fields) {
      const { id, fieldValue, fieldLabel, fieldId } = field as {
        id: string;
        fieldValue: string;
        fieldLabel: string;
        fieldId: string;
      };
      const existingField = await prisma.field.findFirst({
        where: {
          id,
        },
      });

      if (!existingField) {
        return next(new BadRequestError("Field doesn't exist"));
      }
      await prisma.field.update({
        where: { id },
        data: {
          fieldValue:
            role === ERoleLevel.SUPERADMIN || role === ERoleLevel.ADMIN
              ? fieldValue
              : undefined,
          fieldId: role === ERoleLevel.SUPERADMIN ? fieldId : undefined,
          fieldLabel: role === ERoleLevel.SUPERADMIN ? fieldLabel : undefined,
        },
      });
    }

    return res.send(existingSection);
  }
);

export { router as SectionFieldsRouter };
