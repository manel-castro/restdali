import { NextFunction, Request, Response } from "express";
import { body, check, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { BadRequestError } from "../../../../errors/bad-request-error";
import { requireIsSuperAdmin } from "../../../../middlewares/require-role";
import { currentUser } from "../../../../middlewares/current-user";
import { getDomain } from "../../../../utils/domains";
getDomain;

const express = require("express");

const router = express.Router();

router.get(
  "/backoffice-page/projects",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const domain = getDomain(req);
    console.log("DOMAIN: ", domain);

    const projects = await prisma.project.findMany({
      where: {},
      select: {
        id: true,
        name: true,
      },
    });

    return res.status(200).send(projects);
  }
);

export { router as BackofficePageRouter };
