"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthRouter = void 0;
const current_user_1 = require("../../middlewares/current-user");
const require_auth_1 = require("../../middlewares/require-auth");
const get_forms_1 = require("./get_forms");
const express = require("express");
const router = express.Router();
exports.AuthRouter = router;
/**
 * {mergeParams:true}
 * https://stackoverflow.com/questions/25260818/rest-with-express-js-nested-router
 */
router.use(current_user_1.currentUser);
router.use(require_auth_1.requireAuth);
router.use("/get-form", get_forms_1.GetFormsRouter);
