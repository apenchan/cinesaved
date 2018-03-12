app.controller('modalController', function($scope, $rootScope, $stateParams, loginFactory){
  $scope.userId ={
    username: "",
    password: ""
  }

  $scope.openModal = function($scope, $rootScope, $modalInstance, $stateParams, window){
    $scope.currentUser = user.username;
      if($stateParams.token) {
        var user={
          name: $stateParams.username,
          id: $stateParams.id,
          token: $stateParams.token
        }
        window.localStorage.setItem("user", JSON.stringify(user));
        $rootScope.currentUser = user.username;
        $rootScope.token = user.token;
        $rootScope.userId = user.id;
        $http.defaults.headers.common.Authorization = 'Bearer ' + user.token;
      }
    }
})