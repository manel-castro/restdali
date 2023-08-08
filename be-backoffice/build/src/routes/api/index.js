"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiRouter = void 0;
const current_user_1 = require("./../../middlewares/current-user");
const backoffice_1 = require("./backoffice");
const express = require("express");
const router = express.Router();
exports.ApiRouter = router;
/**
 * {mergeParams:true}
 * https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
 */
router.use(current_user_1.currentUser);
router.use("/api", backoffice_1.BackofficeRouter);
