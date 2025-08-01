const express = require('express');
const app = express();

const userController = require('../../controllers/user-controller');
const { UserRequestValidator } = require('../../middlewares/validators/request-validators');
const { userValidator } = require('../../middlewares/existence/validateExistence');

app.post('/', UserRequestValidator.validateCreateUser, userValidator.checkUserExists, userController.createUser);

module.exports = app;