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
exports.SectionFieldsRouter = void 0;
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../../../../../middlewares/validate-request");
const prismaclient_1 = require("../../../../../prismaclient");
const bad_request_error_1 = require("../../../../../errors/bad-request-error");
const enums_1 = require("../../../../../types/enums");
const require_role_1 = require("../../../../../middlewares/require-role");
const require_auth_1 = require("../../../../../middlewares/require-auth");
const express = require("express");
const router = express.Router();
exports.SectionFieldsRouter = router;
router.get("/:sectionId/fields/:lang", [
    (0, express_validator_1.param)("sectionId", "Is badly formatted").isString(),
    (0, express_validator_1.param)("lang", "Is badly formatted").isString(),
], validate_request_1.validateRequest, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sectionId, lang } = req.params;
        console.log("param lang:", lang);
        const fields = yield prismaclient_1.prisma.section.findMany({
            where: {
                id: sectionId,
            },
            include: {
                initialFields: {
                    where: {
                        lang,
                    },
                },
            },
            // select: { initialFields: true },
        });
        return res.send(fields);
    });
});
router.post("/:sectionId/field", [(0, express_validator_1.param)("sectionId", "Is badly formatted").isString()], [
    (0, express_validator_1.check)("fieldId", "initialField fieldId is needed")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("fieldType", "initialField fieldType is needed")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("fieldLabel", "initialField fieldLabel is needed")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.check)("fieldValue", "initialField fieldValue is needed")
        .isString()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("lang", "lang is needed").isString(),
], require_auth_1.requireAuth, validate_request_1.validateRequest, require_role_1.requireIsSuperAdmin, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fieldId, fieldType, fieldValue, fieldLabel, lang } = req.body;
        const { sectionId } = req.params;
        const existingSection = yield prismaclient_1.prisma.section.findFirst({
            where: {
                id: sectionId,
            },
        });
        if (!existingSection) {
            return next(new bad_request_error_1.BadRequestError("Section doesn't exists"));
        }
        const existingField = yield prismaclient_1.prisma.field.findMany({
            where: {
                fieldId,
            },
        });
        if (existingField.length) {
            return next(new bad_request_error_1.BadRequestError("Field already exists"));
        }
        const field = yield prismaclient_1.prisma.field.create({
            data: {
                fieldId,
                fieldLabel,
                fieldType,
                fieldValue,
                lang,
                Section: { connect: { id: sectionId } },
            },
        });
        return res.send(existingSection);
    });
});
router.delete("/:sectionId/field/:fieldId", [
    (0, express_validator_1.param)("sectionId", "Is badly formatted").isString(),
    (0, express_validator_1.param)("id", "Is badly formatted").isString(),
], require_auth_1.requireAuth, validate_request_1.validateRequest, require_role_1.requireIsSuperAdmin, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { sectionId, id } = req.params;
        const existingSection = yield prismaclient_1.prisma.section.findFirst({
            where: {
                id: sectionId,
            },
        });
        if (!existingSection) {
            return next(new bad_request_error_1.BadRequestError("Section doesn't exists"));
        }
        const existingField = yield prismaclient_1.prisma.field.findFirst({
            where: {
                id,
            },
        });
        if (!existingField) {
            return next(new bad_request_error_1.BadRequestError("Field doesn't exist"));
        }
        const field = yield prismaclient_1.prisma.field.delete({
            where: {
                id,
            },
        });
        return res.send(existingSection);
    });
});
router.patch("/:sectionId/fields", [(0, express_validator_1.param)("sectionId", "Is badly formatted").isString()], [
    (0, express_validator_1.check)("fields").isArray(),
    (0, express_validator_1.check)("fields.*.id", "initialField fieldId is needed").isString(),
    (0, express_validator_1.check)("fields.*.fieldLabel", "initialField fieldLabel is needed").isString(),
    (0, express_validator_1.check)("fields.*.fieldValue", "initialField fieldValue is needed").isString(),
    (0, express_validator_1.check)("lang").isString(),
], require_auth_1.requireAuth, validate_request_1.validateRequest, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fields, lang } = req.body;
        const { sectionId } = req.params;
        const role = req.currentUser.role;
        const existingSection = yield prismaclient_1.prisma.section.findFirst({
            where: {
                id: sectionId,
            },
        });
        if (!existingSection) {
            return next(new bad_request_error_1.BadRequestError("Section doesn't exists"));
        }
        for (const field of fields) {
            const { id, fieldValue, fieldLabel } = field;
            const existingField = yield prismaclient_1.prisma.field.findFirst({
                where: {
                    id,
                },
            });
            if (!existingField) {
                return next(new bad_request_error_1.BadRequestError("Field doesn't exist"));
            }
            yield prismaclient_1.prisma.field.update({
                where: { id },
                data: {
                    fieldValue: role === enums_1.ERoleLevel.SUPERADMIN || role === enums_1.ERoleLevel.ADMIN
                        ? fieldValue
                        : undefined,
                    fieldLabel: role === enums_1.ERoleLevel.SUPERADMIN ? fieldLabel : undefined,
                },
            });
        }
        return res.send(existingSection);
    });
});
