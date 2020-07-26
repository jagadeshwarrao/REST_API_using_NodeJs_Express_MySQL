const sql = require("./db.js");


const Product = function(product) {
  this.ProductName = product.ProductName;
  this.SupplierID = product.SupplierID;
  this.CategoryID = product.CategoryID;
  this.QuantityPerUnit = product.QuantityPerUnit;
  this.UnitPrice = product.UnitPrice;
  this.UnitsInStock = product.UnitsInStock;
  this.UnitsOnOrder = product.UnitsOnOrder;
  this.ReorderLevel = product.ReorderLevel;
  this.Discontinued = product.Discontinued;
};

Product.create = (newProduct, result) => {
  sql.query("INSERT INTO products SET ?", newProduct, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created product: ", { ProductID: res.insertId, ...newProduct });
    result(null, { ProductID: res.insertId, ...newProduct });
  });
};
Product.getAll = result => {
  sql.query("SELECT * FROM products", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("products: ", res);
    result(null, res);
  });
};

Product.updateById = (ProductID, product, result) => {
  sql.query(
    "UPDATE products SET ProductName = ?, SupplierID = ?, CategoryID = ?, QuantityPerUnit = ?, UnitPrice = ?, UnitsInStock = ?, UnitsOnOrder = ?, ReorderLevel = ?, Discontinued = ? WHERE ProductID = ?",
    [product.ProductName, product.SupplierID, product.CategoryID, product.QuantityPerUnit, product.UnitPrice, product.UnitsInStock, product.UnitsOnOrder, product.ReorderLevel, product.Discontinued, ProductID],
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

      console.log("updated product: ", { ProductID: ProductID, ...product });
      result(null, { ProductID: ProductID, ...product });
    }
  );
};

module.exports = Product;