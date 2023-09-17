import { NextFunction, Request, Response } from "express";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";

import { getDomain } from "../../../../utils/domains";

const express = require("express");

const router = express.Router();

router.get(
  "/generalConfig",
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const domain = getDomain(req);
    console.log("DOMAIN: ", domain);

    const project = await prisma.project.findFirst({
      where: { domain },

      include: {
        generalPageContent: true,
        paginas: {
          include: {
            sections: {
              include: {
                Fields: {
                  include: {
                    valuesByProject: true,
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
