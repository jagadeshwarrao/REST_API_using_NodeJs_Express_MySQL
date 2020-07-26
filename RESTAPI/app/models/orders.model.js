
const sql = require("./db.js");


const Orders = function(orders) {
  this.OrderID = orders.OrderID;
  this.EmployeeID = orders.EmployeeID;
  this.OrderDate = orders.OrderDate;
  this.RequiredDate = orders.RequiredDate;
  this.ShippedDate = orders.ShippedDate;
  this.ShipVia = orders.ShipVia;
  this.Freight = orders.Freight;
  this.ShipName = orders.ShipName;
  this.ShipAddress = orders.ShipAddress;
  this.ShipCity = orders.ShipCity;
  this.ShipRegion = orders.ShipRegion;
  this.ShipPostalCode = orders.ShipPostalCode;
  this.ShipCountry = orders.ShipCountry;
};


Orders.findById = (customerId, result) => {
  sql.query(`SELECT * FROM orders WHERE CustomerId = '${customerId}'`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer order history: ", res);
      result(null, res);
      return;
    }


    result({ kind: "not_found" }, null);
  });
};

module.exports = Orders;