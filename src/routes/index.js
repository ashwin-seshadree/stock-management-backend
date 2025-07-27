const express = require('express');
const app = express();

app.use("/user", require("./sub-routes/user"))

module.exports = app;