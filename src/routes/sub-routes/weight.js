const express = require('express');
const app = express();
const weightRequestValidator = require('../../middlewares/validators/request-validators.js').WeightRequestValidator;
const weightController = require('../../controllers/weight-controller.js');
const { weightValidator } = require('../../middlewares/existence/validateExistence');

app.post('/', weightRequestValidator['validateAddWeight'], weightValidator['checkWeightExists'], weightController['addWeight'])


module.exports = app;