const express = require('express');
const userController = require('../controllers/user');
const router = express.Router();
const userAuthentication = require('../middlewares/authenticate');

router.post('/user/signup', userController.createUser);
router.post('/', userController.loginUser);


module.exports = router;
