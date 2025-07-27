const express = require('express');
const app = express();

const userController = require('../../controllers/user-controller');
const { UserRequestValidator } = require('../../middlewares/validators/request-validators');

app.post('/', UserRequestValidator.validateCreateUser, userController.createUser);
module.exports = app;