var mongoose = require('mongoose');
var movieSchema = require("./movieModel.js").schema;
var bcrypt = require("bcrypt")


var UserSchema = new mongoose.Schema({
  username: '',
  password: '',
  firstName: '',
  lastName: '', 
  savedMovies: [movieSchema]
});

UserSchema.pre('save', function(next) {
	if(this.isModified('password')) {
		this.password = bcrypt.hashSync(this.password, 10);
	}
	next();
});

UserSchema.methods.verifyPassword = function(passwordTry) {
	return bcrypt.compareSync(passwordTry, this.password);
};

var User = mongoose.model("User", UserSchema);

module.exports = User;