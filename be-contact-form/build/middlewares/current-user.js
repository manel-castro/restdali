"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const rabbitMq_1 = require("../rabbitMq");
const currentUser = (req, res, next) => {
    var _a;
    console.log("currentUser");
    if (!((_a = req.session) === null || _a === void 0 ? void 0 : _a.jwt)) {
        return next();
    }
    // try {
    //   const payload = jwt.verify(
    //     req.session.jwt,
    //     process.env.JWT_KEY!
    //   ) as UserPayload;
    //   req.currentUser = payload;
    // } catch (e) {}
    (0, rabbitMq_1.consume)("current-user", (buffMess, channel) => {
        const message = buffMess.toString();
        try {
            const payload = JSON.parse(message);
            req.currentUser = payload;
            channel.cancel("current-user");
            next();
        }
        catch (error) { }
    });
    (0, rabbitMq_1.sendMessage)(JSON.stringify({ jwt: req.session.jwt }));
};
exports.currentUser = currentUser;
