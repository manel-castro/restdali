"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.BackofficeRouter = void 0;
const fields_1 = require("./fields");
const sections_1 = require("./sections");
const express = require("express");
const router = express.Router();
exports.BackofficeRouter = router;
/**
 * {mergeParams:true}
 * https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
 */
router.use("/backoffice", sections_1.SectionsRouter);
router.use("/backoffice", fields_1.FieldsRouter);
