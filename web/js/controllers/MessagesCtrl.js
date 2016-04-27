angular.module('MessagesCtrl', []).controller('MessagesController', function($scope, $routeParams, $cookies, $http, $window, Message) {
  $scope.title = "blesser.co | messages";

  $scope.me = {
    id: $cookies.get('_id').substring(3, $cookies.get('_id').length - 1)
  };

  $scope.messages = [];
  $scope.message = {
    message: "",
    from: "",
    to: $routeParams.id
  }

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

  $scope.click = {
    sendMessage: function() {
      $scope.message.from = $scope.me.id;
      if($scope.message.to){
        Message.send($scope.message)
        .success(function(data){
          $scope.messages.push(data);
        })
        .error(function(data){

        });
      } else {
        alert("Please select a recepient.");
      }
    },
    conversation: function() {
      $scope.message.from = $scope.me.id;
      alert(JSON.stringify($scope.message));
      Message.conversation($scope.message)
      .success(function(data){
        $scope.messages.push.apply($scope.messages, data);
      })
      .error(function(data){

      });
    }
  };

  $scope.click.conversation();

  $scope.logOut = function(){
    User.logout()
    .success(function(data){
      window.location.reload("/logged-out");
    })
    .error(function(data){

    });
  };

});
