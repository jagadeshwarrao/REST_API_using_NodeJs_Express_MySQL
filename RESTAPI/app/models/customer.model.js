const sql = require("./db.js");


const Customer = function(customer) {
  this.CompanyName = customer.CompanyName;
  this.ContactName = customer.ContactName;
  this.ContactTitle = customer.ContactTitle;
  this.Address = customer.Address;
  this.City = customer.City;
  this.Region = customer.Region;
  this.PostalCode = customer.PostalCode;
  this.Country = customer.Country;
  this.Phone = customer.Phone;
  this.Fax = customer.Fax;
};

Customer.create = (newCustomer, result) => {
  sql.query("INSERT INTO customers SET ?", newCustomer, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created customer: ", { CustomerID: res.insertId, ...newCustomer });
    result(null, { CustomerID: res.insertId, ...newCustomer });
  });
};

Customer.getAll = result => {
    sql.query("SELECT * FROM customers", (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }
  
      console.log("customers: ", res);
      result(null, res);
    });
  };
  
  Customer.updateById = (CustomerID, customer, result) => {
    sql.query(
      "UPDATE customers SET CompanyName = ?, ContactName = ?, ContactTitle = ?, Address = ?, City = ?, Region = ?,PostalCode = ?, Country = ?, Phone = ?, Fax = ? WHERE CustomerID = ?",
      [customer.CompanyName, customer.ContactName, customer.ContactTitle, customer.Address, customer.City, customer.Region, customer.PostalCode, customer.Country, customer.Phone, customer.Fax, CustomerID],
      (err, res) => {
        if (err) {
          console.log("error: ", err);
          result(null, err);
          return;
        }
  
        if (res.affectedRows == 0) {
          
          result({ kind: "not_found" }, null);
          return;
        }
  
        console.log("updated customer: ", { CustomerID: CustomerID, ...customer });
        result(null, { CustomerID: CustomerID, ...customer });
      }
    );
  };

module.exports = Customer;