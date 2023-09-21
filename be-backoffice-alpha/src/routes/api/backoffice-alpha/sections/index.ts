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
        fields: true,
      },
    });

    return res.status(201).send(existingSections);
  }
);

router.get(
  "/sections/:id",
  [param("id", "id is needed").isString()],

  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const existingSections = await prisma.section.findFirst({
      where: { id },
      include: {
        Page: true,
        fields: true,
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

router.post(
  "/sections/addNew",
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const generalNewSection = {
      name: "new section",
      translations: ["translation"],
      component: "text",
    };

    const section = await prisma.section.create({
      data: generalNewSection,
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
    check("projectId", "projectId is needed").optional(),
    check("fieldsOrder", "fieldsOrder is needed").isArray().optional(),
    check("fieldsOrder.*", "fieldsOrder is needed").isString().optional(),
    check("translations", "translations is needed").optional().isArray(),
    check("translations.*", "translations is needed").optional().isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { name, component, translations } = req.body;
    const { id } = req.params;

    const existingSection = await prisma.section.findFirst({
      where: {
        id,
      },
      include: {
        fields: true,
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
        fields: { connect: { id: fieldId } },
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
          fields: { disconnect: { id: fieldId } },
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

router.patch(
  "/sections/:id/addNewField",
  [param("id", "Is badly formatted").isString()],
  [check("id", "Is badly formatted").isString()],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;
    const { id: fieldId } = req.body;

    const existingSection = await prisma.section.findFirst({
      where: {
        id,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("Section doesn't exist"));
    }

    const existingField = await prisma.field.findFirst({
      where: {
        id: fieldId,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("Field doesn't exist"));
    }

    await prisma.section.update({
      where: {
        id,
      },
      data: {
        fields: { connect: { id: fieldId } },
        fieldsOrder: [...existingSection.fieldsOrder, fieldId],
      },
    });

    return res.status(204).send();
  }
);

router.delete(
  "/sections/:id/deleteField/:fieldId",
  [
    param("id", "Is badly formatted").isString(),
    param("fieldId", "pageId is needed").isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id, fieldId } = req.params;

    const existingSection = await prisma.section.findFirst({
      where: {
        id,
      },
    });

    if (!existingSection) {
      return next(new BadRequestError("Page doesn't exist"));
    }

    const existingField = await prisma.field.findFirst({
      where: {
        id: fieldId,
      },
    });

    if (!existingField) {
      return next(new BadRequestError("Section doesn't exist"));
    }

    await prisma.section.update({
      where: {
        id,
      },
      data: {
        fields: { disconnect: { id: fieldId } },
        fieldsOrder: [
          ...existingSection.fieldsOrder.filter((item) => item !== fieldId),
        ],
      },
    });

    return res.status(204).send();
  }
);

export { router as SectionsRouter };
