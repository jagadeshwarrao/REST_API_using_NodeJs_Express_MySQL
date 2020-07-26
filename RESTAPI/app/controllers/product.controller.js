const Product = require("../models/product.model.js");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      
      const product = new Product({
        ProductName: req.body.ProductName,
        SupplierID: req.body.SupplierID,
        CategoryID: req.body.CategoryID,
        QuantityPerUnit: req.body.QuantityPerUnit,
        UnitPrice: req.body.UnitPrice,
        UnitsInStock: req.body.UnitsInStock,
        UnitsOnOrder: req.body.UnitsOnOrder,
        ReorderLevel: req.body.ReorderLevel,
        Discontinued: req.body.Discontinued
      });
    
      
      Product.create(product, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Product."
          });
        else res.send(data);
      });
  
};


exports.findAll = (req, res) => {
    Product.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving products."
          });
        else res.send(data);
      });
  
};

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      Product.updateById(
        req.params.ProductID,
        new Product(req.body),
        (err, data) => {
          if (err) {
            if (err.kind === "not_found") {
              res.status(404).send({
                message: `Not found Product with id ${req.params.ProductID}.`
              });
            } else {
              res.status(500).send({
                message: "Error updating Product with id " + req.params.ProductID
              });
            }
          } else res.send(data);
        }
      );
  
};