const express = require('express');

const router = express.Router();

const userController = require('../controllers/users_controller');

router.get('/profile', userController.profile);

router.get('/sign-in', userController.signIn);

router.get('/sign-up', userController.signUp);

module.exports = router;