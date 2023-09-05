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
  "/pages",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const existingPages = await prisma.page.findMany({
      where: {},
      include: {
        projects: true,
        sections: true,
      },
    });

    return res.status(201).send(existingPages);
  }
);

router.post(
  "/pages",
  [
    check("name", "name is needed").isString(),
    check("translations", "translations is needed").isArray(),
    check("translations.*", "translations is needed").isString(),
  ],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { name, translations } = req.body;

    const existingPage = await prisma.page.findFirst({
      where: {
        name,
      },
    });

    if (existingPage) {
      return next(new BadRequestError("Project already exists"));
    }

    const page = await prisma.page.create({
      data: {
        name,
        translations,
      },
    });

    return res.status(201).send();
  }
);

router.patch(
  "/pages/:id",
  [param("id", "Is badly formatted").isString()],

  [
    check("name", "name is needed").optional(),
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
    const { name, projects, sections, sectionsOrder, translations } = req.body;
    const { id } = req.params;

    const existingPage = await prisma.page.findFirst({
      where: {
        id,
      },
      include: {
        projects: true,
        sections: true,
      },
    });

    if (!existingPage) {
      return next(new BadRequestError("Project doesn't exist"));
    }

    await prisma.page.update({
      where: {
        id,
      },
      data: {
        name: name || existingPage.name,
        projects: projects || existingPage.projects,
        sections: sections || existingPage.sections,
        sectionsOrder: sectionsOrder || existingPage.sectionsOrder,
        translations: translations || existingPage.translations,
      },
    });

    return res.status(204).send();
  }
);

router.delete(
  "/pages/:id",
  [param("id", "Is badly formatted").isString()],
  validateRequest,
  currentUser,
  requireIsSuperAdmin,
  async function (req: Request, res: Response, next: NextFunction) {
    const { id } = req.params;

    const existingPage = await prisma.page.findFirst({
      where: {
        id,
      },
    });

    if (!existingPage) {
      return next(new BadRequestError("Project doesn't exist"));
    }
    await prisma.page.delete({
      where: {
        id,
      },
    });

    return res.status(204).send();
  }
);

export { router as PagesRouter };
