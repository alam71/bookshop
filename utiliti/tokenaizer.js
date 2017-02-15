var jwt = require('jsonwebtoken');

var token_expire_time = 60*60*24 // 1 day
var screct_key = "s6574654lajideweyopoiqweorclvkcxv";

exports.verifyToken = function(token, callback){
	jwt.verify(token, screct_key, callback);
}
exports.genToken = function(data){
	var opts = { expiresIn: token_expire_time };
	var token = jwt.sign(data, screct_key, opts);
	return token;
}