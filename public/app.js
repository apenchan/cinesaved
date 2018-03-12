var app = angular.module("anguFlix", ['ui.router', 'ui.bootstrap']);

app.config(function($stateProvider, $urlRouterProvider, $locationProvider) {
  $locationProvider.html5Mode(true);
  $stateProvider
  .state('home', {
    url:'/',
    controller: 'allMoviesCtrl'
  })
  // .state('auth', {
  //   controller: 'modalController'
  // })
  .state('profile', {
    url: '/profile/:id',
    controller: 'profileCtrl',
    templateUrl: '/templates/profile.html',
    params: {
      profileParam: null,
      // name: $stateParams.name,
    }
  })
});

// app.run(['$rootScope',function($rootScope, $state) {
//   $rootScope.$state = $state;
//   var user = JSON.parse(localStorage.getItem("user"));
//   if (user) {
//     $rootScope.userId = user.id;
//     $rootScope.currentUser = user.name;
//     $rootScope.token = user.token;
//   }
//   return this.currentUser;
// }]);