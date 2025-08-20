const express = require('express');
const app = express();

// app.use(require('../middlewares/authenticate/auth').authenticate);
app.use(require('../middlewares/validators/common-validator.js').validateBody);

app.use("/weight", require("./sub-routes/weight.js"));
app.use("/user", require("./sub-routes/user"))
app.use("/auth", require("./sub-routes/auth"));
app.use("/product", require("./sub-routes/product"));
app.use("/inventory", require("./sub-routes/inventory"));
app.use("/purchase", require("./sub-routes/purchase"));

module.exports = app;