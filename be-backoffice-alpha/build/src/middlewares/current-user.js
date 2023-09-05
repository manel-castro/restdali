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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.currentUser = void 0;
const axios_1 = __importDefault(require("axios"));
const currentUser = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // if (!req.session?.jwt) {
    //   return next();
    // }
    var _a;
    if (!((_a = req.headers) === null || _a === void 0 ? void 0 : _a.authorization)) {
        return next();
    }
    const jwt = req.headers.authorization;
    console.log("jwt: ", jwt);
    // console.log("currentUser");
    const auth = yield axios_1.default
        .post("http://be-auth-srv:9001/cluster-api/users/verify-auth", { jwt }
    // { jwt: req.session?.jwt }
    )
        .then((data) => data.data)
        .catch((err) => console.log("ERROR current user: ", err));
    req.currentUser = auth === null || auth === void 0 ? void 0 : auth.currentUser;
    next();
});
exports.currentUser = currentUser;
