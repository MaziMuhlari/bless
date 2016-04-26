angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $window, User) {

  $scope.title = "blesser.co | home";
  $scope.user = {};

  emojify.setConfig({

    emojify_tag_type : 'div',           // Only run emojify.js on this element
    only_crawl_id    : null,            // Use to restrict where emojify.js applies
    img_dir          : '/img/emoji',  // Directory for emoji images
    ignored_tags     : {                // Ignore the following tags
        'SCRIPT'  : 1,
        'TEXTAREA': 1,
        'A'       : 1,
        'PRE'     : 1,
        'CODE'    : 1
    }
  });
  emojify.run();

  $scope.logOut = function(){
    User.logout()
    .success(function(data){
      window.location.reload("/logged-out");
    })
    .error(function(data){

    });
  };

  User.details()
  .success(function(data){
    if(data.logged_in){
      $scope.isLoggedIn = true;
      $scope.user = data;
    }else{
      $scope.isLoggedIn = false;
    }
  })
  .error(function(data){
    $scope.isLoggedIn = false;
  });

});
