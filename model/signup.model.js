"use strick";

var mongoose = require('mongoose');
var sha1 = require('sha1');
var bcrypt = require('bcrypt-nodejs');
var validator = require('../utiliti/validator');
var Schema = mongoose.Schema;

var User = new Schema({
	userid:{
		type: Number,
		unique: true
	},
	firstName:{
		type:String,
		required: true,
		trim: true,
		validator:[validator.isName, 'Invalid First Name']
	},
	lastName:{
		type:String,
		required: true,
		trim: true,
		validator:[validator.isName, 'Invalid Last Name']
	},
	full_name:{
		type:String,
		trim:true
	},
	email:{
		type:String,
		required: true,
		trim: true,
		lowercase: true,
		unique : true,
		validator:[validator.isEmail, 'Invalid First Name']
	},
	password:{
		type:Number,
		required:true
	},
	salt:{
		type:String
	},
	ph_number:{
		type:Number,
		required:true
	},
	gender:{
		type:String,
		required:true
	},
	address:{
		type:String,
		trim: true,

	},
	country:{
		type:String,
		required:true
	},
	roll:{
		type:String,
		required:true
	},
	sdate_ts:{
		type:Date,
		required:true
	},
	last_update_ts:{
		type:Date,
		default:Date.now
	},
	status:{
		type:String,
		uppercase:true,
		default:'INACTIVE',
		enum:['INACTIVE','ACTIVE','SUSPENDED']
	}
});

User.pre('save',function(next){
	var doc = this;
	var salt = bcrypt.genSaltSync(10);

	if (!doc.isModified('last_update_ts'))
		doc.last_update_ts = Date.now();

	// encrypt password before save
	if (doc.isModified('password')){
		doc.salt = salt;
		doc.password = sha1(doc.password+salt);
	}

	// full name from first name and lastname
	if (doc.isModified('firstName') || doc.isModified('lastName')){
		doc.full_name = doc.firstName +" "+doc.lastName;
	}

	next();
});

User.methods.verifyPassword = function(password) {
  return this.password === sha1(password+this.salt);
}

module.exports = mongoose.model('User',User);
