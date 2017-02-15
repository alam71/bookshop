
var User = require('../model/signup.model');
var sequence = require('../utiliti/dbHelper').sequenceGenerator('user');
var tokenaizer = require('../utiliti/tokenaizer');


exports.postScntrl = function(req,res,next){

	User.findOne({email:req.body.email.toLowerCase()},function(err,user){
		if(user){
		  return res.json({error:true,message:"This email allready in database"});
		}
		var userObj={
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: req.body.password,
			ph_number: req.body.ph_number,
			gender: req.body.gender,
			address: req.body.address,
			country: req.body.country,
			roll: req.body.roll,
			sdate_ts: Date.now()
		};
		
		sequence.next(function(nextseq){
			userObj.userid = nextseq;
			var user = new User(userObj);

			user.save(function(err){
				if(err){
					console.log(err);
					return res.json({error:true,message:"database save problem"});
				}
				var data = JSON.parse(JSON.stringify(user));
				delete data.salt;
				delete data.password;
				res.status(200).json({error:false,message:"ok",data:data});
			})
		});
		

	});
	
}

exports.getScntrl = function(req,res,next){
	//res.send('paise')
	User.find(function(err,result){
		res.json({error:false,massage:"All User Info",data:result});
	});
}

exports.login = function(req,res,next){
	if(!req.body.email || !req.body.password)
		return res.send('Missing Require Paramiter');

	User.findOne({email:req.body.email}, function(err,user){
		if(err) return next(err);
		if(!user) return res.send("No User Found");
		// if(!user.verifyPassword(req.body.password))
		// 	return res.send("Invalid Password");
		var tokenData ={
			userid: user.userid,
			full_name: user.full_name,
			email: user.email,
			status: user.status,
			roll: user.roll
		}
		var token = tokenaizer.genToken(tokenData);
		res.json({message: "Login successful", data:{token: token}});
	})

}
exports.logindata = function(req,res,next){
	res.send('authantication ok');
}