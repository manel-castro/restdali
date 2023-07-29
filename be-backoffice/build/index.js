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
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const error_handler_1 = require("./middlewares/error-handler");
const auth_1 = require("./routes/auth/");
const public_1 = require("./routes/public");
const nats_wrapper_1 = require("./nats-wrapper");
/**
 * RABBIT MQ
 */
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield nats_wrapper_1.natsWrapper.connect("paginas", "lasñdf", "http://localhost:4222");
    }
    catch (e) {
        console.log(e);
    }
}))();
const app = express();
app.use(express.json());
app.use((0, cookie_session_1.default)({
    //this is to set req.session
    signed: false,
    secure: process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS
}));
app.use(cors());
app.use("/auth", auth_1.AuthRouter);
app.use("/public", public_1.PublicRouter);
app.use(error_handler_1.errorHandler);
const PORT = process.env.PORT || 9000;
app.listen(PORT, function () {
    console.log("CORS-enabled web server listening on port " + PORT);
});
