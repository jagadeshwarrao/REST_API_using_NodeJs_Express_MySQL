module.exports = app => {
  const products = require("../controllers/product.controller.js");

  
  app.post("/products", products.create);

  
  app.get("/products", products.findAll);

  app.put("/products/:ProductID", products.update);

};