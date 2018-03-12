var User = require('./userModel.js');
var LocalStrategy = require('passport-local').Strategy;
const passport = require('passport')
const bcrypt = require('bcrypt')
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var JwtOpts = {};

var util = require("util");
JwtOpts.jwtFromRequest = function(req) {
  var token = null;
  if (req && req.cookies) {
      token = req.cookies['jwt_token'];
  }
  return token;
};

JwtOpts.secretOrKey = process.env.JWT_SECRET || "1234";


passport.use(new JwtStrategy(JwtOpts, function(jwt_payload, done) {
    console.log( "JWT PAYLOAD" + util.inspect(jwt_payload));

    User.findOne({username: jwt_payload._doc.username}, function(err, user) {

        if (err) {
            return done(err, false);
        }

        if (user) {
            console.log("user is " + user.username)
            done(null, user);
        } else {
            done(null, false);
        }
    });
}));

passport.use( new LocalStrategy(
  function(username, password, done ) {
    console.log('I got this')
    User.findOne({ username: username}, function( err, dbUser ) {
      console.log(username)
      console.log(dbUser)
      if (err) { 
        return done(err); }
      if (!dbUser) {
        return done(null, false);
      }
      if (!dbUser.verifyPassword(password)) {
        return done(null, false);
      }

      return done(null, dbUser);
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(user, done) {
  done(null, user);
});


module.exports = passport;





// var passport = require('passport');
// var FacebookStrategy = require('passport-facebook').Strategy;
// var jwt = require('jsonwebtoken');
// var User = require('./userModel.js');
// var config = require('../config.js');

// passport.use(new FacebookStrategy({
//   clientID: config.clientID,
//   clientSecret: config.clientSecret,
//   callbackURL: "http://localhost:3000/auth/facebook/callback/",
//   profileFields: ['email', 'displayName']
// },
// function(accessToken, refreshToken, profile, done) {
//   User.findOne({ 'socialId': profile.id }, function(err, user) {
//     if (err) {
//       return done(err);
//     }
//     //If no user was found, create a new user with details from the facebook profile
//     if (!user) {
//       user = new User({
//         socialId: profile.id,
//         name: profile.displayName,
//         email: profile.emails ? profile.emails[0].value : "",
//         provider: 'facebook',
//         loginCount: 0
//       });
//     } else {
//       //else, a user exists so let's add one to their login count
//       user.loginCount++;
//     }
//     //finally let's save, make a token and call "done"
//     user.save(function(err, newUser) {
//       if (err) {
//         return done(err);
//       } else {
//         var token = jwt.sign({
//           id: newUser.id,
//           name: newUser.name,
//         }, config.SECRET_KEY || process.env.SECRET_KEY, { expiresIn: "7d" });
//         return done(null, { id: newUser.id, token: token, name: newUser.name });
//       }
//     });
//   });
// }

// ));

// passport.serializeUser(function(user, done) {
//   done(null, user);
// });

// passport.deserializeUser(function(user, done) {
//     done(null, user);
//   });

// module.exports = passport;