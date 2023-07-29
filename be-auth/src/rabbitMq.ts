import nats from "node-nats-streaming";
import amqp from "amqplib/callback_api";
let ch: amqp.Channel;
export let QUEUE_NAME = "technical";

const createRabbitMqConnection = (): Promise<amqp.Channel> =>
  new Promise((res, rej) => {
    const stan = nats.connect("pages", "abc", {
      url: "http://localhost:4222",
    });
    if (ch) return res(ch);
    amqp.connect(`amqp://rabbitmq`, (err, connection) => {
      if (err) {
        throw err;
      }
      connection.createChannel((err, channel) => {
        if (err) {
          throw err;
        }

        channel.assertQueue(
          QUEUE_NAME
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

const sendMessage = async (message: string, queueName = QUEUE_NAME) => {
  const channel = await createRabbitMqConnection();

  channel.sendToQueue(queueName, Buffer.from(message));
};

const consume = async (
  messageCallback: (message: Buffer) => void,
  queueName = QUEUE_NAME
) => {
  const channel = await createRabbitMqConnection();

  return channel.consume(queueName, (message) => {
    if (!message) return;
    console.log("Received message: ", message.content.toString());
    messageCallback(message.content);
    channel.ack(message);
  });
};

export { createRabbitMqConnection, sendMessage, consume };
