var express = require('express');
var router = express.Router();
var scntrl = require('../controller/scntrl');
var auth = require('../middlewares/authenticate').authenticate;

/* GET users listing. */
router.post('/',scntrl.login); //localhost:3000/api/login //{verb -POST}
router.get('/',auth,scntrl.logindata)

module.exports = router;
