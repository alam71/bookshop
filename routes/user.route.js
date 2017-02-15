var express = require('express');
var router = express.Router();
var scntrl = require('../controller/scntrl');

/* GET users listing. */
router.post('/', scntrl.postScntrl); //http://localhost:3000/api/signup
router.get('/', scntrl.getScntrl); //http://localhost:3000/api/signup


module.exports = router;