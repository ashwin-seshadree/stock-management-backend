const express = require("express");
const app = express();
const inventoryController = require("../../controllers/inventory-controller");
const { InventoryValidator } = require("../../middlewares/validators/request-validators");

app.post("/", InventoryValidator['validateAddInventoryItem'], inventoryController['addInventory'])
app.get("/", inventoryController['getAllInventoryItems']);

module.exports = app;