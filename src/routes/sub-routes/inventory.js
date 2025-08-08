const express = require("express");
const app = express();
const inventoryController = require("../../controllers/inventory-controller");
const { InventoryRequestValidator } = require("../../middlewares/validators/request-validators");
const { inventoryValidator } = require("../../middlewares/existence/validateExistence");

app.post("/", InventoryRequestValidator['validateAddInventoryItem'], inventoryValidator['checkInventoryItemExists'], inventoryController['addInventory'])
app.get("/", inventoryController['getAllInventoryItems']);

module.exports = app;