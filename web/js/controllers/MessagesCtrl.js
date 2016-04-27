angular.module('MessagesCtrl', []).controller('MessagesController', function($scope, $routeParams, $cookies, $http, $window, Message, Conversation) {
  $scope.title = "blesser.co | messages";

  // Information from cookies about the current user
  $scope.me = {
    id: $cookies.get('_id').substring(3, $cookies.get('_id').length - 1)
  };

  // Stores all conversation current messages
  $scope.messages = [];

  // The details about the current message
  $scope.message = {
    message: "",
    conversation_id: "",
    from: $scope.me.id,
    to: $routeParams.id
  }

  // Information about the current conversation
  $scope.conversation = {
    creator: $scope.me.id,
    recepient: $routeParams.id
  }

  // Details about the currently selected conversation
  $scope.activeConversation = {};

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
    init: function() {
      $scope.click.startConversation();
    },
    sendMessage: function() {
      if($scope.message.to && $scope.activeConversation){
        Message.send($scope.message, $scope.activeConversation, $scope.me.id)
        .success(function(data){
          $scope.messages.push(data);
        })
        .error(function(data){

        });
      } else {
        alert("Please select a recepient.");
      }
    },
    getMessages: function() {
      Message.conversation($scope.activeConversation)
      .success(function(data){
        $scope.messages = data;
      })
      .error(function(data){

      });
    },
    startConversation: function() {
      if($routeParams.id){
        Conversation.start($scope.conversation)
        .success(function(data){
          $scope.activeConversation = data;
          $scope.click.getMessages();
        })
        .error(function(data){

        });
      }
    }
  };

  $scope.click.init();

  $scope.logOut = function(){
    User.logout()
    .success(function(data){
      window.location.reload("/logged-out");
    })
    .error(function(data){

    });
  };

});
