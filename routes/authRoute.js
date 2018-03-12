// var express = require('express');
// var router = express.Router();
// var passport = require('../models/passport');
// var User = require('../models/userModel');
// var Movie = require("../models/movieModel");

// router.get('/facebook', passport.authenticate('facebook', { scope: 'email' })
// );

// router.get('/facebook/callback',
// passport.authenticate('facebook', { 
// failureRedirect: '/login' }),function(req, res) {
//   console.log(req.user);
//     res.redirect('/authorization?token=' + req.user.token + "&name=" + req.user.name + '&id=' + req.user.id);
// });

// module.exports = router;

//without facebook
var express = require ('express');
var router = express.Router();
// var mongoose = require('mongoose');
var passport = require('../models/passport.js');
var User = require('../models/userModel.js');
var jwt = require('jsonwebtoken');

//Start passport
router.use(passport.initialize());

router.get('/test', function(req, res){
	res.send('at test')
	console.log("i get to test")
})

router.post('/register', function (req, res) {
  User.create(req.body, function (err, user) {
    if (err) {
      console.log(err)
      res.status(500).end();
    }
    console.log(user);
    res.send(user.username);
  });
});

router.post('/login', passport.authenticate('local', { session: false }), function(req, res, next) {
	console.log('CAN YOU HEAR ME??');
  console.log('==========================');
	console.log('req.body: ' + req.user.username);
  // console.log('USER:' + req.user.email);
	console.log('==========================');

	var token = jwt.sign({user: req.user.username}, process.env.JWT_SECRET, {
		expiresIn: 1400
	});

	var userId = req.user._id;
	console.log('userId: ' + userId);

	console.log(token);
	res.json({ 
		token: token, 
		userId: userId
	});
});


module.exports = router;