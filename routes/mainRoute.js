var express = require("express");
var router= express();
var router = express.Router();
var Movie = require("../models/movieModel");
var User = require('../models/userModel');
var passport = require('../models/passport.js');

router.post('/register', function (req, res){
	User.create(req.body, function(err, user){
		if (err) {
			console.log(err)
			res.status(500).end();
		}
    res.send(true);
    console.log("helllllooooo")
	});
});

// router.use(passport.authenticate('jwt', { session: false }));

// //Route w/ JWT token 
// router.use(passport.authenticate('jwt', { session: false }));

router.get("/", function(req, res){
  Movie.find(function(err, movie){
    if(err){
      console.log(err);
    } else {
      res.send(movie)
    }
  })
})

router.get('/:id', function(req, res){
  User.findById(req.params.id, function(err, user){
    if(err){
      console.log("This may not be a good route", err)
    } else {
      res.send(user)
    }
  })
})


module.exports = router;