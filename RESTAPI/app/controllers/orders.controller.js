const Orders = require("../models/orders.model.js");

exports.findOne = (req, res) => {
    Orders.findById(req.params.customerId, (err, data) => {
        if (err) {
          if (err.kind === "not_found") {
            res.status(404).send({
              message: `Not found Customer order history with CustomerID ${req.params.customerId}.`
            });
          } else {
            res.status(500).send({
              message: "Error retrieving Customer order history with CustomerID " + req.params.customerId
            });
          }
        } else res.send(data);
      });
  
};