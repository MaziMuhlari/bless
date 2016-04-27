angular.module('MainCtrl', []).controller('MainController', function($scope, $cookies, $routeParams, $http, $window, User, Conversation) {

  $scope.title = "blesser.co | home";
  $scope.user = {};
  $scope.blessers = [];
  $scope.take = 10;
  $scope.skip = 0;
  $scope.searchbar = "";

  // Count of the unread messages
  $scope.unreadMessages = 0;

  $scope.me = {
    id: function(){
      if($cookies.get('_id')){
        var value = $cookies.get('_id').substring(3, $cookies.get('_id').length - 1);
        return value;
      }else{
        return 0;
      }
    }
  };

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

  $scope.init = {
    user: function() {
      User.details()
      .success(function(data){
        if(data.logged_in){
          $scope.user = data;
        }else{

        }
      })
      .error(function(data){

      });
    },
    getUnreadMessageCount: function() {
      Conversation.unread($scope.me.id())
      .success(function(data){
        $scope.unreadMessages = data;
      })
      .error(function(data){

      });
    }
  };

  $scope.click = {
    more: function() {
      nanobar.go(40);
      User.blessers($scope.take, $scope.skip)
      .success(function(data){
        if(data){
          $scope.blessers.push.apply($scope.blessers, data);
          $scope.skip += data.length;
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

  $scope.init.user();
  $scope.click.more();
  $scope.init.getUnreadMessageCount();

  $scope.logOut = function(){
    User.logout()
    .success(function(data){
      window.location.reload("/logged-out");
    })
    .error(function(data){

    });
  };

});
