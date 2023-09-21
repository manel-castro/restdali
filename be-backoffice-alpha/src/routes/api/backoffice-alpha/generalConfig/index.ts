import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { getDomain } from "../../../../utils/domains";
import { BadRequestError } from "../../../../errors/bad-request-error";

const express = require("express");

const router = express.Router();

router.get(
  "/generalConfig",
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

    const project = await prisma.project.findFirst({
      where: { domain },

      include: {
        generalPageContent: true,
        pages: {
          include: {
            sections: {
              include: {
                fields: {
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

    const generalConfig = {
      project,
    };

    return res.status(200).send(generalConfig);
  }
);

export { router as GeneralConfigRouter };
