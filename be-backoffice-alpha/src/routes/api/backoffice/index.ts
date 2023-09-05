import { FieldsRouter } from "./fields";
import { FieldValuesRouter } from "./fieldsValues";
import { GeneralConfigRouter } from "./generalConfig";
import { PagesRouter } from "./pages";
import { ProjectsRouter } from "./projects";
import { SectionsRouter } from "./sections";

const express = require("express");

const router = express.Router();

/**
 * {mergeParams:true}
 * https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
 */

router.use("/backoffice-alpha", ProjectsRouter);
router.use("/backoffice-alpha", PagesRouter);
router.use("/backoffice-alpha", SectionsRouter);
router.use("/backoffice-alpha", FieldsRouter);
router.use("/backoffice-alpha", FieldValuesRouter);
router.use("/backoffice-alpha", GeneralConfigRouter);

export { router as BackofficeRouter };
