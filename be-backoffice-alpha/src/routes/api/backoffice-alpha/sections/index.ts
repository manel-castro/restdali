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
  "/sections",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const existingSections = await prisma.section.findMany({
      where: {},
      include: {
        Page: true,
        Fields: true,
      },
    });

    return res.status(201).send(existingSections);
  }
);

router.post(
  "/sections",
  [
    check("name", "name is needed").isString(),
    check("translations", "translations is needed").isArray(),
    check("translations.*", "translations is needed").isString(),
    check("component", "component is needed").isString(),
  ],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { name, translations, component } = req.body;

    // const role = req.currentUser!.role;

    const existingSection = await prisma.section.findFirst({
      where: {
        name,
      },
    });

    if (existingSection) {
      return next(new BadRequestError("Project already exists"));
    }

    const section = await prisma.section.create({
      data: {
        name,
        translations,
        component,
      },
    });

    return res.status(201).send();
  }
);

router.patch(
  "/sections/:id",
  [param("id", "Is badly formatted").isString()],

  [
    check("name", "name is needed").optional(),
    check("component", "component is needed").optional(),
    check("project", "project is needed").optional(),
    check("sections", "sections is needed").optional(),
    check("projectId", "projectId is needed").optional(),
    check("sectionsOrder", "sectionsOrder is needed").optional(),
    check("translations", "translations is needed").optional(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { name, component, fields, page, pageNameId, translations } =
      req.body;
    const { id } = req.params;

    const existingSection = await prisma.section.findFirst({
      where: {
        id,
      },
      include: {
        Fields: true,
        Page: true,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("Project doesn't exist"));
    }

    await prisma.section.update({
      where: {
        id,
      },
      data: {
        name: name || existingSection.name,
        Fields: fields || existingSection.Fields,
        Page: page || existingSection.Page,
        translations: translations || existingSection.translations,
        component: component || existingSection.component,
      },
    });

    return res.status(204).send();
  }
);

router.delete(
  "/sections/:id",
  [param("id", "Is badly formatted").isString()],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const existingSection = await prisma.section.findFirst({
      where: {
        id,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("Project doesn't exist"));
    }
    await prisma.section.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  }
);

export const connectFieldsInSectionPrisma = async ({
  fieldIds,
  fieldsOrder,
  sectionId,
}: {
  fieldIds: string[];
  fieldsOrder: string[];
  sectionId: string;
}) => {
  for (const fieldId of fieldIds) {
    await prisma.section.update({
      where: {
        id: sectionId,
      },
      data: {
        Fields: { connect: { id: fieldId } },
      },
    });
  }
  await prisma.section.update({
    where: {
      id: sectionId,
    },
    data: {
      fieldsOrder,
    },
  });
};

router.patch(
  "/sections/:id/addFields",
  [param("id", "Is badly formatted").isString()],

  [
    check("fieldIds", "fieldIds is needed").isArray(),
    check("fieldIds.*", "fieldIds is needed").isString(),
    check("fieldsOrder", "fieldsOrder is needed").isArray(),
    check("fieldsOrder.*", "fieldsOrder is needed").isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { fieldIds, fieldsOrder } = req.body;
    const { id } = req.params;

    const existingSection = await prisma.section.findFirst({
      where: {
        id,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("Section doesn't exist"));
    }

    for (const fieldId of fieldIds) {
      const existingPage = await prisma.field.findFirst({
        where: {
          id: fieldId,
        },
      });
      if (!existingPage) {
        return next(new BadRequestError(" doesn't exist"));
      }
    }

    connectFieldsInSectionPrisma({
      sectionId: id,
      fieldIds,
      fieldsOrder,
    });

    return res.status(204).send();
  }
);

router.patch(
  "/sections/:id/deleteFields",
  [param("id", "Is badly formatted").isString()],

  [
    check("fieldIds", "fieldIds is needed").isArray(),
    check("fieldIds.*", "fieldIds is needed").isString(),
    check("fieldsOrder", "fieldsOrder is needed").isArray(),
    check("fieldsOrder.*", "fieldsOrder is needed").isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { fieldIds, fieldsOrder } = req.body;
    const { id } = req.params;

    const existingProject = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return next(new BadRequestError("Project doesn't exist"));
    }

    for (const fieldId of fieldIds) {
      const existingPage = await prisma.field.findFirst({
        where: {
          id: fieldId,
        },
      });
      if (!existingPage) {
        return next(new BadRequestError("Project doesn't exist"));
      }
    }
    for (const fieldId of fieldIds) {
      await prisma.section.update({
        where: {
          id,
        },
        data: {
          Fields: { disconnect: { id: fieldId } },
        },
      });
    }
    await prisma.section.update({
      where: {
        id,
      },
      data: {
        fieldsOrder,
      },
    });
    return res.status(204).send();
  }
);

export { router as SectionsRouter };
