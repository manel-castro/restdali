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
exports.GetFormsRouter = void 0;
const validate_request_1 = require("../../../middlewares/validate-request");
const prismaclient_1 = require("../../../prismaclient");
const express = require("express");
const router = express.Router();
exports.GetFormsRouter = router;
router.get("/", [
// param("sectionName", "Is badly formatted")
//   .isString()
//   .isIn(Object.values(Section)),
], validate_request_1.validateRequest, function (req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        // const { sectionName } = req.params;
        const heroSection = yield prismaclient_1.prisma.contactForm.findMany({
            where: {},
        });
        return res.send(heroSection);
    });
});
