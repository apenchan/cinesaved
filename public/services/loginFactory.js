app.factory('loginFactory', function ($http, $window, $rootScope) {
  var userLogin = function(newUser){
    return $http.post('/register', newUser)
    .then(function(response){
      console.log(response.data)
      return response.data
    })
  }
  return{
    userLogin: userLogin
  }
})
