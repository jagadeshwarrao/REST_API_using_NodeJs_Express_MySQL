module.exports = app => {
  const orders = require("../controllers/orders.controller.js");

  app.get("/orders/:customerId", orders.findOne);
};