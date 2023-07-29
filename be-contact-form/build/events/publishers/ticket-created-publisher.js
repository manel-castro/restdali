"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthVerifyPublisher = void 0;
const common_1 = require("@paginas/common");
class AuthVerifyPublisher extends common_1.Publisher {
    constructor() {
        super(...arguments);
        this.subject = common_1.Subjects.AuthVerify;
    }
}
exports.AuthVerifyPublisher = AuthVerifyPublisher;
