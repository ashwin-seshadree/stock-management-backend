const express = require('express');
const app = express();

app.use("/user", require("./sub-routes/user"))
app.use("/auth", require("./sub-routes/auth"));

module.exports = app;