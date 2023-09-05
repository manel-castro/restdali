"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.redisClient = void 0;
require("dotenv").config();
const express = require("express");
var cors = require("cors");
const cookie_session_1 = __importDefault(require("cookie-session"));
const error_handler_1 = require("./middlewares/error-handler");
const redis = __importStar(require("redis"));
const api_1 = require("./routes/api");
exports.redisClient = redis.createClient({
    url: "redis://redis",
    password: "123456",
});
const start = () => __awaiter(void 0, void 0, void 0, function* () {
    /**
     * Environment variables verification
     */
    if (!process.env.JWT_KEY) {
        throw new Error("JWT_KEY must be defined in deployment yaml file");
    }
    const app = express();
    app.use(express.json());
    app.use((0, cookie_session_1.default)({
        //this is to set req.session
        signed: false,
        secure: process.env.NODE_ENV !== "test", // test run in plain HTTP, not HTTPS
    }));
    app.use(cors());
    app.use(api_1.ApiRouter);
    app.use(error_handler_1.errorHandler);
    const PORT = process.env.PORT || 9000;
    app.listen(PORT, function () {
        console.log("CORS-enabled web server listening on port " + PORT);
    });
});
start();
