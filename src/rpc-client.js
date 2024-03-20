const { PeerRPCClient } = require("grenache-nodejs-http");
const Link = require("grenache-nodejs-link");

const link = new Link({
  grape: "http://127.0.0.1:30001",
});
link.start();

const peer = new PeerRPCClient(link, {});
peer.init();

// Adding sample data
const order = [
  { side: "buy", price: 105, quantity: 8 },
  { side: "sell", price: 105, quantity: 4 },
  { side: "buy", price: 110, quantity: 10 },
  { side: "sell", price: 112, quantity: 15 },
  { side: "buy", price: 112, quantity: 20 },
];

peer.request("orderbook_service", order, { timeout: 10000 }, (err, data) => {
  if (err) {
    console.error(err);
    process.exit(-1);
  }
  console.log("Response from server:", data);
});
