# Order Book Documentation

## Overview

The Simple Order Book is a JavaScript class designed to manage the submission and matching of buy and sell orders in a simplified trading system. It provides basic functionalities for maintaining an order book and matching orders based on their side (buy or sell) and price.

## Usage

### Prerequisites

1. **Node.js and npm:** Ensure that Node.js and npm are installed on your machine.
2. **Grenache Setup:** Ensure that Grenache DHT is gloabally installed.
   ```bash
   npm i -g grenache-grape
   ```

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/AYU97/data-fetch-script.git
   ```

2. Navigate to the project directory:

   ```bash
   cd data-fetch-script
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Running the Script

To start two grape server:

```bash
grape --dp 20001 --aph 30001 --bn '127.0.0.1:20002'
grape --dp 20002 --aph 40001 --bn '127.0.0.1:20001'
```

To start the server:

```bash
npm run server
```

To start the client:

```bash
npm run client
```

### Notes

I have added mutliple comments in the order book to make it more easy to understand.

### Assumptions

- Order is always an array. Even if it is a single order, I am converting it into an array for consistency
- Each order has properties including **side** (buy or sell), **price**, and **quantity**.
- The order book matches orders based on their side and price.
- When matching orders, the quantity to match is calculated as the minimum of the quantities of the existing and new orders.
- Fully matched existing orders are removed from the order book.
- The order book maintains the order of orders as they are submitted.

### Improvements

- enhancing the order matching algorithm to support more complex matching criteria, like limit orders, market orders
- Could be in the form of adding **validation** checks on orders
- error handling could be improved in terms of any edge conditions that may come during order submission or matching
