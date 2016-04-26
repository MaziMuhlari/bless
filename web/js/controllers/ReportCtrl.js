angular.module('ReportCtrl', []).controller('ReportController', function($scope, $routeParams, $http, $window) {
  $scope.title = "blesser.co | report";

  $scope.logOut = function(){
    User.logout()
    .success(function(data){
      window.location.reload("/logged-out");
    })
    .error(function(data){

    });
  };
});
