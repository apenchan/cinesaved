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
var passport = require('../models/passport.js');
var User = require('../models/userModel.js');
var jwt = require('jsonwebtoken');

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

//Start passport
router.use(passport.initialize());


router.post('/login', passport.authenticate('local', { session: false }), function(req, res, next) {
	console.log('••••••••••••••••••••••');
	console.log('LOG IN AS ' + req.user.username );
	console.log('••••••••••••••••••••••');

  // Maybe don't sign with entire user
	var token = jwt.sign({user: req.user.username}, process.env.JWT_SECRET ||"1234", {expiresIn: '20h'});

	var user = req.user.username
	console.log(token);
	console.log('this is the user :' + user)
	res.json({ token: token });


});

module.exports = router;