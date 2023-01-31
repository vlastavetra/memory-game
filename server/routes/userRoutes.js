const express = require('express');
const router = express.Router();

const {loginSchema} = require('../models/loginSchema');
const {schema} = require('../models/signUpSchema');

const validateUserId = require('../middlewares/validateUserId');
const verifyToken = require('../middlewares/verifyToken');
const validateBody = require('../middlewares/validateBody');
const verifyEmailLogin = require('../middlewares/verifyEmailLog');
const hashPassword = require('../middlewares/hashPassword');
const checkForExistingUser = require('../middlewares/checkForExistingUser');
const userController = require('../controllers/userController');

const signUpController = require('../controllers/signUpController');
const logInController = require('../controllers/logInController');


router.post("/login", validateBody(loginSchema), verifyEmailLogin, logInController.login);

router.post('/signup', validateBody(schema), checkForExistingUser, hashPassword,  signUpController.signup);

router.get("/:id", verifyToken, validateUserId, userController.getUser);


module.exports = router;