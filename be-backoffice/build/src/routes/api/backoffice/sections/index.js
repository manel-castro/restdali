"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SectionsRouter = void 0;
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../../../../middlewares/validate-request");
const prismaclient_1 = require("../../../../prismaclient");
const bad_request_error_1 = require("../../../../errors/bad-request-error");
const fields_1 = require("./fields");
const require_auth_1 = require("../../../../middlewares/require-auth");
const express = require("express");
const router = express.Router();
exports.SectionsRouter = router;
router.use("/sections", fields_1.SectionFieldsRouter);
router.get("/sections", validate_request_1.validateRequest, function (req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        // const { sectionName } = req.params;
        const lang = (_a = req.query) === null || _a === void 0 ? void 0 : _a.lang;
        const form = yield prismaclient_1.prisma.section.findMany({
            include: {
                initialFields: {
                    where: {
                        lang,
                    },
                },
            },
        });
        return res.send(form);
    });
});
router.get("/sections/:id", [(0, express_validator_1.param)("id", "id needed").isString()], validate_request_1.validateRequest, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const form = yield prismaclient_1.prisma.section.findMany({
            where: {
                id,
            },
            include: {
                initialFields: true,
            },
        });
        return res.send(form);
    });
});
router.post("/section", [(0, express_validator_1.body)("title", "title needed").isString()], require_auth_1.requireAuth, validate_request_1.validateRequest, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { title } = req.body;
        const existingSection = yield prismaclient_1.prisma.section.findMany({
            where: {
                title,
            },
        });
        if (existingSection.length) {
            return next(new bad_request_error_1.BadRequestError("Section already exists"));
        }
        const form = yield prismaclient_1.prisma.section.create({
            data: {
                title,
            },
        });
        return res.send(form);
    });
});
