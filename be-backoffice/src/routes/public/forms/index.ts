import { NextFunction, Request, Response } from "express";
import { body, param } from "express-validator";
import { validateRequest } from "../../../middlewares/validate-request";
import { prisma } from "../../../prismaclient";
const express = require("express");

const router = express.Router();

router.post(
  "/forms",
  [
    body("title", "formId needed").isString(),
    body("content", "formId needed").isString(),
  ],
  validateRequest,
  async function (req: Request, res: Response, next: NextFunction) {
    const { title, content } = req.body;

    const form = await prisma.contactForm.create({
      data: {
        title,
        content,
      },
    });

    return res.send(form);
  }
);
export { router as PostFormsRouter };
