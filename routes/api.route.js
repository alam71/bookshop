var express = require('express');
var router = express.Router();
var signUp = require('./user.route');
var logIn = require('./login.route');

/* GET home page. */
router.use('/signup', signUp); //localhost:3000/api/signup
router.use('/login', logIn); //localhost:3000/api/login

module.exports = router;
