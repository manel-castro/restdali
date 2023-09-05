"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requireIsAtLeastAdmin = exports.requireIsSuperAdmin = void 0;
const not_authorized_error_1 = require("../errors/not-authorized-error");
const enums_1 = require("../types/enums");
/**
 * This middleware requires the following middlewares to be previously assigned:
 * - require-auth.ts
 * - current-user.ts
 */
const requireIsSuperAdmin = (req, res, next) => {
    if (req.currentUser.role !== enums_1.ERoleLevel.SUPERADMIN) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    next();
};
exports.requireIsSuperAdmin = requireIsSuperAdmin;
const requireIsAtLeastAdmin = (req, res, next) => {
    if (req.currentUser.role !== enums_1.ERoleLevel.SUPERADMIN &&
        req.currentUser.role !== enums_1.ERoleLevel.ADMIN) {
        return next(new not_authorized_error_1.NotAuthorizedError());
    }
    next();
};
exports.requireIsAtLeastAdmin = requireIsAtLeastAdmin;
