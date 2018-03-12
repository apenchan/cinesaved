var express = require("express");
var app = module.exports = express();
var mongoose = require("mongoose");
var passport = require('./models/passport');
var bodyParser = require('body-parser');
var mainRoute = require('./routes/mainRoute');
var authRoute = require('./routes/authRoute');
var User = require('./models/userModel.js');
var port = process.env.PORT || 3000;

var db = process.env.MONGODB_URI || "mongodb://localhost/anguflix";
mongoose.connect(db);

var Movie = require('./models/movieModel');

app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/node_modules'));
app.use(express.static('node_modules'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

var moviesController = require('./routes/mainRoute');
app.use('/movies', moviesController)

// app.use('/movies', mainRoute);
app.use('/auth', authRoute);

// app.post('/register', function (req, res){
// 	User.create(req.body, function(err, user){
// 		if (err) {
// 			console.log(err)
// 			res.status(500).end();
// 		}
//     res.send(true);
//     console.log("helllllooooo")
// 	});
// });

// app.post('/login', 
// passport.authenticate('local', { failureRedirect: '/login' }),
// function(req, res) {
//   res.redirect('/');
//   res.send("logged in")
// });

app.get('/movie/:id/movie', function (req, res) {
  console.log('user id: ' + req.params.id);
  User.findById(req.params.id, function (err, user) {
    if (err) {
      console.log('err', err)
    } else {
      res.send(user);
      console.log(user)
    }
  })
})

app.put('/movie/:id/movie', function (req, res) {
  var movie = new Movie(req.body)
  User.findById(req.params.id, function (err, user) {
    user.savedMovies.push(movie)
    user.save(function (err, user) {
      if (err) {
        console.log(err)
      } else {
        res.send(user)
      }
    })
  })
})

app.post('/movie/:id/movie', function(req, res){
 User.findById(req.params.id).then(function(user){
   console.log(req.body)
   var newMovie = new Movie(req.body[0])
   user.savedMovies.push(newMovie)
   console.log("this is the movie im adding!")
   console.log(newMovie);
   user.save(function(err, user){
     if(err){
       console.log(err)
     } else {
       res.send(newMovie);
     }
   })
 })
})

app.delete('/movie/:id/movie/:movieId', function(req, res){
  console.log('---------------movie to delete---------------------------')
  console.log(req.params.id);
  console.log(req.params.movieId);
  console.log('---------------movie to delete-------------------------')
  

  User.findByIdAndUpdate(req.params.id, {$pull: {"savedMovies":{_id: req.params.movieId}}}, function(err, user){
    if(err){
      console.log(err)
    } else {
      res.send(user)
    }
  })
})

// app.delete('/movie/:id/movie/:movieId', function (req, res) {
//   User.findById(req.params.id, function (err, user) {
//     if (err) {
//       return next(err)
//     } else if (!user) {
//       return res.send("This is not a proper user")
//     } else {
//       var movieToDelete = user.savedMovies.id(req.params.movieId)
//       if (movieToDelete) {
//         movieToDelete.remove()
//         user.save(function (err, user) {
//           if (err) {
//             return next(err)
//           } else {
//             res.send(user)
//           }
//         });
//       } else {
//         return res.send("Error with removing the movie from the saved array")
//       }
//     }
//   });
// });

// app.all('*', function(req, res) {
//   res.sendFile(__dirname + "/public/index.html")
// });

app.all('[^.]+', function (req, res, next) {
  res.sendFile(__dirname + "/public/index.html")
});

module.exports = app

app.listen(port);
console.log("======================");
console.log("Listening on angularflix " + port);
console.log("======================");