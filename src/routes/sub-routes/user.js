const express = require('express');
const app = express();

const userController = require('../../controllers/user-controller');
const { UserRequestValidator } = require('../../middlewares/validators/request-validators');
const checkExistance = require('../../middlewares/existence/validateExistence');

app.post('/', UserRequestValidator.validateCreateUser, checkExistance.checkUserExists, userController.createUser);

module.exports = app;