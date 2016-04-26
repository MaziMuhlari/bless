angular.module('ByeCtrl', []).controller('ByeController', function($scope, $http, $window, User) {
  $scope.title = "bless.er | bye";

  User.logout()
  .success(function(data){

  })
  .error(function(data){

  });
});
