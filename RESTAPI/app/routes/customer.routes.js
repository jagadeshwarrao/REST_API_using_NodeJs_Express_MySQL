module.exports = app => {
  const customers = require("../controllers/customer.controller.js");

  
  app.post("/customers", customers.create);

  
  app.get("/customers", customers.findAll);

  app.put("/customers/:CustomerID", customers.update);
};