var mongoose = require('mongoose');
var movieSchema = require("./movieModel.js").schema;


var UserSchema = new mongoose.Schema({
  username: '',
  password: '',
  firstName: '',
  lastName: '', 
  savedMovies: [movieSchema]
});

var User = mongoose.model("User", UserSchema);

module.exports = User;