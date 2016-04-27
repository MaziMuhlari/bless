angular.module('ProfileCtrl', []).controller('ProfileController', function($scope, $routeParams, $http, $window, User) {

  $scope.title = "blesser.co | profile";
  $scope.user = {};

  $scope.init = {
    app: function() {
      $http.get('/api/security/loggin-in')
      .success(function(data){
        if(data){
          $scope.init.user();
        }else{
          window.location.reload('logged-out');
        }
      })
      .error(function(data){
        window.location.reload('logged-out');
      });
    },
    user: function() {
      nanobar.go(40);
      User.details()
      .success(function(data){
        if(data.logged_in){
          $scope.user = data;
          nanobar.go(100);
        }else{
          nanobar.go(100);
        }
      })
      .error(function(data){
        nanobar.go(100);
      });
    }
  };

  $scope.click = {
    updateUser: function() {
      nanobar.go(40);
      User.update($scope.user)
      .success(function(data){
        if(data){
          $scope.user = data;
          nanobar.go(100);
        }else{
          nanobar.go(100);
        }
      })
      .error(function(data){
        nanobar.go(100);
      });
    }
  };

  $scope.init.app();

  $scope.logOut = function(){
    User.logout()
    .success(function(data){
      window.location.reload("/logged-out");
    })
    .error(function(data){

    });
  };


});
