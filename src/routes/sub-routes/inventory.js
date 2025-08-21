const express = require("express");
const app = express();
const inventoryController = require("../../controllers/inventory-controller");

app.get("/", inventoryController['getAllInventoryItems']);

module.exports = app;