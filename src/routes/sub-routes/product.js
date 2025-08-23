const express = require('express');
const app = express();
const productController = require('../../controllers/product-controller');
const { ProductRequestValidator } = require('../../middlewares/validators/request-validators');
const { productValidator } = require('../../middlewares/existence/validateExistence');

app.post("/", ProductRequestValidator['validateCreateProduct'], productValidator['checkProductExists'], productController['createProduct']);
app.get("/", productController['getAllProducts']);
app.put("/:id", ProductRequestValidator['validateUpdateProduct'], productController['updateProduct']);
app.delete("/:id", productController['deleteProduct']);

module.exports = app;