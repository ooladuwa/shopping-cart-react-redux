"use strict";

var express = require("express");

var bodyParser = require("body-parser");

var mongoose = require("mongoose");

var shortid = require("shortid");

var app = express();
app.use(bodyParser.json());
mongoose.connect("mongodb+srv://onaje:qyFDxdHNxaXKRMEk@cluster0.3zrr9.mongodb.net/shopping-cart", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});
var Product = mongoose.model("products", new mongoose.Schema({
  _id: {
    type: String,
    "default": shortid.generate
  },
  title: String,
  description: String,
  image: String,
  price: Number,
  availableSizes: [String]
}, {
  timeStamps: true
}));
app.get("/api/products", function _callee(req, res) {
  var products;
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(Product.find({}));

        case 2:
          products = _context.sent;
          res.send(products);

        case 4:
        case "end":
          return _context.stop();
      }
    }
  });
});
app.post("/api/products", function _callee2(req, res) {
  var newProduct, savedProduct;
  return regeneratorRuntime.async(function _callee2$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          newProduct = new Product(req.body);
          _context2.next = 3;
          return regeneratorRuntime.awrap(newProduct.save());

        case 3:
          savedProduct = _context2.sent;
          res.send(savedProduct);

        case 5:
        case "end":
          return _context2.stop();
      }
    }
  });
});
app["delete"]("/api/products/:id", function _callee3(req, res) {
  var deletedProduct;
  return regeneratorRuntime.async(function _callee3$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(Product.findByIdAndDelete(req.params.id));

        case 2:
          deletedProduct = _context3.sent;
          res.send(deletedProduct);

        case 4:
        case "end":
          return _context3.stop();
      }
    }
  });
});
var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log("serve at http://localhost:5000");
});