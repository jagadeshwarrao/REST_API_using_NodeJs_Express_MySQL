const Customer = require("../models/customer.model.js");


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
          message: "Content can not be empty!"
        });
      }
    
      
      const customer = new Customer({
        CompanyName: req.body.CompanyName,
        ContactName: req.body.CompanyName,
        ContactTitle: req.body.ContactTitle,
        Address: req.body.Address,
        City: req.body.City,
        Region: req.body.Region,
        PostalCode: req.body.PostalCode,
        Country: req.body.Country,
        Phone: req.body.Phone,
        Fax: req.body.Fax

      });
    
      
      Customer.create(customer, (err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while creating the Customer."
          });
        else res.send(data);
      });
  
};

exports.findAll = (req, res) => {
    Customer.getAll((err, data) => {
        if (err)
          res.status(500).send({
            message:
              err.message || "Some error occurred while retrieving customers."
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
  
    Customer.updateById(
      req.params.CustomerID,
      new Customer(req.body),
      (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer with id ${req.params.CustomerID}.`
            });
          } else {
            res.status(500).send({
              message: "Error updating Customer with id " + req.params.CustomerID
            });
          }
        } else res.send(data);
      }
    );
  };