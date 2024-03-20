const { PeerRPCServer } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");
const OrderBook = require("./orderbook");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCServer(link, {
  timeout: 300000,
});
peer.init();

const orderBook = new OrderBook();

const port = 1024 + Math.floor(Math.random() * 1000);
const service = peer.transport("server");
service.listen(port);

setInterval(() => {
  link.announce("orderbook_service", service.port, {});
}, 1000);

service.on("request", (rid, key, payload, handler) => {
  console.log("Received order:", payload);
  orderBook.submitOrder(payload);
  handler.reply(null, { status: "success" });
});
