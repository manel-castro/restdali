import { currentUser } from "../../../middlewares/current-user";
import { requireAuth } from "../../../middlewares/require-auth";
import { GetFormsRouter } from "./sections";

const express = require("express");

const router = express.Router();

/**
 * {mergeParams:true}
 * https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
 */
router.use(currentUser);
router.use(requireAuth);
router.use("/backoffice", GetFormsRouter);

export { router as BackofficeRouter };
