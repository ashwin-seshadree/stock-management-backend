const express = require("express");
const app = express();
const { PurchaseRequestValidator } = require('../../middlewares/validators/request-validators');
const { purchaseValidator } = require('../../middlewares/existence/validateExistence');
const purchaseController = require('../../controllers/purchase-controller.js');

app.post("/", PurchaseRequestValidator['validateAddPurchase'], purchaseValidator['checkPurchaseExists'], purchaseController['addPurchase']);

module.exports = app;