import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
import {
  requireIsAtLeastAdmin,
  requireIsSuperAdmin,
} from "../../../../middlewares/require-role";
import { currentUser } from "../../../../middlewares/current-user";
import { getDomain } from "../../../../utils/domains";
const express = require("express");

const router = express.Router();

router.get(
  "/projects/ids",
  validateRequest,
  requireIsAtLeastAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const existingProjectIds = await prisma.project.findMany({
      where: {},
      select: { id: true, name: true },
    });

    res.send(existingProjectIds);
  }
);

router.get(
  "/projects/:projectId",
  [param("projectId", "Is badly formatted").isString()],

  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { projectId } = req.params;

    const existingProjects = await prisma.project.findFirst({
      where: { id: projectId },
      include: {
        paginas: {
          include: {
            sections: {
              include: {
                Fields: {
                  include: {
                    valuesByProject: {
                      where: { projectId: projectId },
                    },
                  },
                },
              },
            },
          },
        },
      },
    });

    return res.status(201).send(existingProjects);
  }
);

router.get(
  "/projects",

  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const domain = getDomain(req);
    console.log("DOMAIN: ", domain);

    const existingProjectId = await prisma.project.findFirst({
      where: { domain },
      select: { id: true },
    });

    if (!existingProjectId) {
      return next(new BadRequestError("Domain not related with any project"));
    }

    const existingProjects = await prisma.project.findFirst({
      where: { domain },
      include: {
        paginas: {
          include: {
            sections: {
              include: {
                Fields: {
                  include: {
                    valuesByProject: {
                      where: { projectId: existingProjectId?.id },
                    },
                  },
                },
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
    check("layout", "layout is needed").isString(),
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
      layout,
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
        layout,
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

router.post(
  "/projects/metadata",
  [check("id", "id is needed").isString()],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { id } = req.body;
    const project = await prisma.project.findFirst({
      where: {
        id: id,
      },
      select: {
        name: true,
        generalPageContent: true,
      },
    });

    if (!project) {
      return next(new BadRequestError("Project doesn't exist"));
    }

    const projectMetadata: { [key: string]: string } = {
      name: project.name,
      favicon: project.generalPageContent.favicon,
      pageTitle: project.generalPageContent.pageTitle,
    };

    const projectMetadataInputs = Object.keys(projectMetadata).map((key) => {
      const value = projectMetadata[key];
      return {
        fieldName: key,
        label: key,
        currentValue: value,
      };
    });

    res.status(200).send(projectMetadataInputs);
  }
);

router.patch(
  "/projects/:id",
  [param("id", "id is needed").isString()],
  [
    check("name", "name is needed").optional(),
    check("domain", "domain is needed").optional(),
    check("layout", "layout is needed").optional(),
    check("favicon", "favicon is needed").optional(),
    check("pageTitle", "pageTitle is needed").optional(),
    check("paginasOrder", "paginasOrder is needed").optional().isArray(),
    check("paginasOrder.*", "paginasOrder is needed").isString(),
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
    const { id } = req.params;
    const {
      name,
      domain,
      layout,
      favicon,
      pageTitle,
      paginasOrder,
      languagesForTranslation,
    } = req.body;
    // const { id } = req.params;

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
      layout: layout || existingProject.layout,
      paginasOrder: paginasOrder || existingProject.paginasOrder,
      languagesForTranslation:
        languagesForTranslation || existingProject.languagesForTranslation,
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
  "/projects/:id/addPages",
  [param("id", "Is badly formatted").isString()],

  [
    check("pageIds", "pageIds is needed").isArray(),
    check("pageIds.*", "pageIds is needed").isString(),
    check("pageOrderIds", "pageOrderIds is needed").isArray(),
    check("pageOrderIds.*", "pageOrderIds is needed").isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { pageIds, pageOrderIds } = req.body;
    const { id } = req.params;

    console.log("pageIds: ", pageIds);

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
    for (const pageId of pageIds) {
      await prisma.project.update({
        where: {
          id,
        },
        data: {
          paginas: { connect: { id: pageId } },
        },
      });
    }
    await prisma.project.update({
      where: {
        id,
      },
      data: {
        paginasOrder: pageOrderIds,
      },
    });
    return res.status(204).send();
  }
);

router.patch(
  "/projects/:id/deletePages",
  [param("id", "Is badly formatted").isString()],

  [
    check("pageIds", "pageIds is needed").isArray(),
    check("pageIds.*", "pageIds is needed").isString(),
    check("pageOrderIds", "pageOrderIds is needed").isArray(),
    check("pageOrderIds.*", "pageOrderIds is needed").isString(),
  ],

  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { pageIds, pageOrderIds } = req.body;
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
    for (const pageId of pageIds) {
      await prisma.project.update({
        where: {
          id,
        },
        data: {
          paginas: { disconnect: { id: pageId } },
          paginasOrder: pageOrderIds,
        },
      });
    }
    return res.status(204).send();
  }
);

export { router as ProjectsRouter };
