"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.natsWrapper = void 0;
const node_nats_streaming_1 = __importDefault(require("node-nats-streaming"));
class NatsWrapper {
    connect(clusterId, clientId, url) {
        this._client = node_nats_streaming_1.default.connect(clientId, clientId, { url });
        return new Promise((res, rej) => {
            this._client.on("connect", () => {
                console.log("Connected to NATS");
                res();
            });
            this._client.on("error", () => {
                console.log("Connected to NATS");
                rej();
            });
        });
    }
}
exports.natsWrapper = new NatsWrapper();
