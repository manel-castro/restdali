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
  "/projects",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const existingProjects = await prisma.project.findMany({
      where: {},
      include: {
        paginas: {
          include: {
            sections: {
              include: {
                Fields: true,
              },
            },
          },
        },
      },
    });

    return res.status(201).send(existingProjects);
  }
);

router.post(
  "/projects",
  [
    check("name", "name is needed").isString(),
    check("domain", "domain is needed").isString(),
    check("paginasOrder", "paginasOrder is needed").isArray(),
    check("paginasOrder.*", "paginasOrder is needed").isString(),
    check("favicon", "favicon is needed").isString(),
    check("pageTitle", "pageTitle is needed").isString(),
    check(
      "languagesForTranslation",
      "languagesForTranslation is needed"
    ).isArray(),
    check(
      "languagesForTranslation.*",
      "languagesForTranslation is needed"
    ).isString(),
  ],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const {
      name,
      domain,
      paginasOrder,
      favicon,
      pageTitle,
      languagesForTranslation,
    } = req.body;

    // const role = req.currentUser!.role;

    const existingProject = await prisma.project.findFirst({
      where: {
        OR: [
          {
            name,
          },
          {
            domain,
          },
        ],
      },
    });

    if (existingProject) {
      return next(new BadRequestError("Project already exists"));
    }

    await prisma.project.create({
      data: {
        name,
        domain,
        paginasOrder,
        languagesForTranslation,
        generalPageContent: {
          create: {
            favicon,
            pageTitle,
          },
        },
      },
    });

    return res.status(201).send();
  }
);

router.patch(
  "/projects/:id",
  [param("id", "Is badly formatted").isString()],

  [
    check("name", "name is needed").optional(),
    check("domain", "domain is needed").optional(),
    check("favicon", "favicon is needed").optional(),
    check("paginasOrder", "paginasOrder is needed").optional().isArray(),
    check("paginasOrder.*", "paginasOrder is needed").isString(),
    check("pageTitle", "pageTitle is needed").optional(),
    check("languagesForTranslation", "languagesForTranslation is needed")
      .optional()
      .isArray(),
    check("languagesForTranslation.*", "languagesForTranslation is needed")
      .optional()
      .isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { name, domain, favicon, pageTitle, paginasOrder } = req.body;
    const { id } = req.params;

    const existingProject = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return next(new BadRequestError("Project doesn't exist"));
    }

    const newData = {
      name: name || existingProject.name,
      domain: domain || existingProject.domain,
      paginasOrder: paginasOrder || existingProject.paginasOrder,
    };

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        ...newData,
        generalPageContent: {
          update: {
            favicon,
            pageTitle,
          },
        },
      },
    });

    return res.status(204).send();
  }
);

router.delete(
  "/projects/:id",
  [param("id", "Is badly formatted").isString()],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const existingProject = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return next(new BadRequestError("Project doesn't exist"));
    }
    await prisma.project.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  }
);

router.patch(
  "/projects/:id/setPages",
  [param("id", "Is badly formatted").isString()],

  [
    check("favicon", "favicon is needed").optional().isString(),
    check("pageTitle", "pageTitle is needed").optional().isString(),
    check("pageIds", "pageIds is needed").optional().isArray(),
    check("pageIds.*", "pageIds is needed").isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { pageIds, favicon, pageTitle } = req.body;
    const { id } = req.params;

    const existingProject = await prisma.project.findFirst({
      where: {
        id,
      },
    });

    if (!existingProject) {
      return next(new BadRequestError("Project doesn't exist"));
    }

    for (const pageId of pageIds) {
      const existingPage = await prisma.page.findFirst({
        where: {
          id: pageId,
        },
      });
      if (!existingPage) {
        return next(new BadRequestError("Project doesn't exist"));
      }
    }

    await prisma.project.update({
      where: {
        id,
      },
      data: {
        generalPageContent: {
          update: {
            favicon,
            pageTitle,
          },
        },
      },
    });

    return res.status(204).send();
  }
);

export { router as ProjectsRouter };
