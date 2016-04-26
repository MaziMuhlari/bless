angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $http, $window) {
  $scope.title = "blesser.co | profile";

  $scope.logOut = function(){
    User.logout()
    .success(function(data){
      window.location.reload("/logged-out");
    })
    .error(function(data){

    });
  };
});
