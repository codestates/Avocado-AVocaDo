const express = require('express');
const router = express.Router();

const { userController } = require('../controller');

// * POST /user/signin
router.post('/signin', userController.signin.post);

// * POST /user/signout
router.post('/signout', userController.signout.post);

// * POST /user/signup
router.post('/signup', userController.signup.post);

module.exports = router;
