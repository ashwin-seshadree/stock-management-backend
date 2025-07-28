const express = require('express');
const app = express();

const authRequestValidator = require('../../middlewares/validators/request-validators').AuthRequestValidator;
const authController = require('../../controllers/auth-controller');

app.post('/login', authRequestValidator.validateLoginUser, authController.loginUser);

module.exports = app;