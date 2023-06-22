const express = require('express');
const controller = require('../controllers/authenticationController');
const validator = require('../middlewares/validations/validationMW');
const authenticatedValidation = require("../middlewares/validations/authenticatedValidation");
const uploadMW = require('../middlewares/uploadMW');
const router = express.Router();


router.post('/login', authenticatedValidation.signinValidation, validator, controller.login);

router.post('/register', uploadMW, authenticatedValidation.registerValidation, validator, controller.register);


module.exports = router;