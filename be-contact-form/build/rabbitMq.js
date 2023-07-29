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
exports.consume = exports.sendMessage = exports.createRabbitMqConnection = exports.QUEUE_NAME = void 0;
const callback_api_1 = __importDefault(require("amqplib/callback_api"));
let ch;
exports.QUEUE_NAME = "technical";
const createRabbitMqConnection = () => new Promise((res, rej) => {
    if (ch)
        return res(ch);
    callback_api_1.default.connect(`amqp://rabbitmq`, (err, connection) => {
        if (err) {
            throw err;
        }
        connection.createChannel((err, channel) => {
            if (err) {
                throw err;
            }
            channel.assertQueue(exports.QUEUE_NAME
            //   {
            //   durable: false,
            // }
            );
            // channel.sendToQueue(queueName, Buffer.from(message));
            ch = channel;
            return res(ch);
        });
    });
});
exports.createRabbitMqConnection = createRabbitMqConnection;
const sendMessage = (message, queueName = exports.QUEUE_NAME) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield createRabbitMqConnection();
    channel.sendToQueue(queueName, Buffer.from(message));
});
exports.sendMessage = sendMessage;
const consume = (consumerTag, messageCallback, queueName = exports.QUEUE_NAME) => __awaiter(void 0, void 0, void 0, function* () {
    const channel = yield createRabbitMqConnection();
    return channel.consume(queueName, (message) => {
        if (!message)
            return;
        console.log("Received message: ", message.content.toString());
        messageCallback(message.content, channel);
        channel.ack(message);
    }, { consumerTag });
});
exports.consume = consume;
