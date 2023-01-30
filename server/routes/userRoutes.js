const express = require('express');
const router = express.Router();

const {loginSchema} = require('../models/loginSchema');
const {schema} = require('../models/signUpSchema');

const validateBody = require('../middlewares/validateBody');
const verifyEmailLogin = require('../middlewares/verifyEmailLog');
const hashPassword = require('../middlewares/hashPassword');
const checkForExistingUser = require('../middlewares/checkForExistingUser');

const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');


router.post("/login", validateBody(loginSchema), verifyEmailLogin, logInController.login);

router.post('/signup', validateBody(schema), checkForExistingUser, hashPassword,  signUpController.signup);


module.exports = router;