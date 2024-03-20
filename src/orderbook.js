class OrderBook {
  constructor() {
    this.orders = [];
  }

  submitOrder(order) {
    // Converting single order to array if necessary
    const ordersToProcess = Array.isArray(order) ? order : [order];
    // Process each order
    ordersToProcess.forEach((newOrder) => {
      // Adding the new order to the order book
      this.orders.push(newOrder);
      console.log("Order submitted:", newOrder);
      // Match the new order with existing orders in the order book
      this.matchOrders(newOrder);
    });
  }

  matchOrders(newOrder) {
    console.log("Matching orders for:", newOrder);
    for (let i = 0; i < this.orders.length; i++) {
      const existingOrder = this.orders[i];
      // Check if the existing order and the new order are a fit for matching
      if (
        existingOrder.side !== newOrder.side &&
        existingOrder.price === newOrder.price
      ) {
        // Calculate the quantity to match (minimum of existing and new order quantities)
        // it will take the minium of the two
        const matchedQuantity = Math.min(
          existingOrder.quantity,
          newOrder.quantity
        );

        // Log the matching of orders and the matched quantity
        console.log(
          "Order matched:",
          existingOrder,
          "with",
          newOrder,
          "for quantity",
          matchedQuantity
        );

        //console.log("existingOrder.quantity before:", existingOrder.quantity);
        //console.log("newOrder.quantity before:", newOrder.quantity);

        // Update the quantities of existing and new orders, based on matched quantity
        existingOrder.quantity -= matchedQuantity;
        newOrder.quantity -= matchedQuantity;

        //console.log("existingOrder.quantity after:", existingOrder.quantity);
        //console.log("newOrder.quantity after:", newOrder.quantity);

        // Remove fully matched existing orders from the order book
        if (existingOrder.quantity === 0) {
          console.log(
            "Existing order fully matched and removed:",
            existingOrder
          );
          this.orders.splice(i, 1);
          i--;
        }

        // Stop processing the new order if it has been fully matched
        if (newOrder.quantity === 0) {
          break;
        }
      }
    }

    // Add any remaining quantity of the new order to the order book
    if (newOrder.quantity > 0) {
      this.orders.push(newOrder);
      console.log("Remaining quantity added to order book:", newOrder);
    }
  }
}

module.exports = OrderBook;
