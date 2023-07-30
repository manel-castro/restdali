import { NextFunction, Request, Response } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../../../middlewares/validate-request";
import { prisma } from "../../../../prismaclient";
const express = require("express");

const router = express.Router();

router.get(
  "/sections",
  [
    // param("sectionName", "Is badly formatted")
    //   .isString()
    //   .isIn(Object.values(Section)),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    // const { sectionName } = req.params;

    const form = await prisma.section.findMany({
      where: {},
    });

    return res.send(form);
  }
);
// router.get(
//   "/forms/:formId",
//   [param("formId", "formId needed").isString()],
//   validateRequest,
//   async function (req: Request, res: Response, next: NextFunction) {
//     const { formId } = req.params;

//     const form = await prisma.contactForm.findMany({
//       where: {
//         id: formId,
//       },
//     });

//     return res.send(form);
//   }
// );

// router.post(
//   "/forms",
//   [
//     body("title", "formId needed").isString(),
//     body("content", "formId needed").isString(),
//   ],
//   validateRequest,
//   async function (req: Request, res: Response, next: NextFunction) {
//     const { title, content } = req.body;

//     const form = await prisma.contactForm.create({
//       data: {
//         title,
//         content,
//       },
//     });

//     return res.send(form);
//   }
// );
export { router as GetFormsRouter };
