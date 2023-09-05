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
exports.FieldsRouter = void 0;
const express_validator_1 = require("express-validator");
const validate_request_1 = require("../../../../middlewares/validate-request");
const prismaclient_1 = require("../../../../prismaclient");
const bad_request_error_1 = require("../../../../errors/bad-request-error");
const enums_1 = require("../../../../types/enums");
const require_role_1 = require("../../../../middlewares/require-role");
const express = require("express");
const router = express.Router();
exports.FieldsRouter = router;
router.patch("/fields/:id", [(0, express_validator_1.param)("id", "Is badly formatted").isString()], [
    (0, express_validator_1.check)("fieldLabel", "initialField fieldLabel is needed").optional(),
    (0, express_validator_1.check)("fieldValue", "initialField fieldValue is needed").optional(),
], validate_request_1.validateRequest, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { fieldType, fieldValue, fieldLabel, lang } = req.body;
        const { id } = req.params;
        const role = req.currentUser.role;
        const existingField = yield prismaclient_1.prisma.field.findFirst({
            where: {
                id,
            },
        });
        if (!existingField) {
            return next(new bad_request_error_1.BadRequestError("Field doesn't exist"));
        }
        yield prismaclient_1.prisma.field.update({
            where: {
                id,
            },
            data: {
                fieldValue: role === enums_1.ERoleLevel.SUPERADMIN || role === enums_1.ERoleLevel.ADMIN
                    ? fieldValue
                    : undefined,
                fieldLabel: role === enums_1.ERoleLevel.SUPERADMIN ? fieldLabel : undefined,
            },
        });
        return res.status(204).send();
    });
});
router.delete("/fields/:id", [(0, express_validator_1.param)("id", "Is badly formatted").isString()], validate_request_1.validateRequest, require_role_1.requireIsSuperAdmin, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        const { id } = req.params;
        const existingField = yield prismaclient_1.prisma.field.findFirst({
            where: {
                id,
            },
        });
        if (!existingField) {
            return next(new bad_request_error_1.BadRequestError("Field doesn't exist"));
        }
        yield prismaclient_1.prisma.field.delete({
            where: {
                id,
            },
        });
        return res.status(204).send();
    });
});
