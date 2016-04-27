angular.module('MessagesCtrl', []).controller('MessagesController', function($scope, $routeParams, $cookies, $http, $window, $timeout, Message, Conversation) {
  $scope.title = "blesser.co | messages";

  // Information from cookies about the current user
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

  // Stores all conversation current messages
  $scope.messages = [];

  // The details about the current message
  $scope.message = {
    message: "",
    conversation_id: "",
    from: $scope.me.id(),
    to: $routeParams.id
  }

  // Information about the current conversation
  $scope.conversation = {
    creator: $scope.me.id(),
    recepient: $routeParams.id
  }

  // A list of the users conversations
  $scope.conversations = [];

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
      $scope.click.getConversations();
    },
    sendMessage: function() {
      nanobar.go(40);
      if($scope.message.to && $scope.activeConversation){
        Message.send($scope.message, $scope.activeConversation, $scope.me.id())
        .success(function(data){
          $scope.messages.push(data);
          console.log($scope.messages);
        })
        .error(function(data){

        });
      } else {
        alert("Please select a recepient.");
      }
      nanobar.go(100);
    },
    getMessages: function() {
      nanobar.go(40);
      Message.conversation($scope.activeConversation)
      .success(function(data){
        $scope.messages = data;
      })
      .error(function(data){

      });
      nanobar.go(100);
    },
    getConversations: function() {
      nanobar.go(40);
      Conversation.list($scope.me.id())
      .success(function(data){
        $scope.conversations = data;
      })
      .error(function(data){

      });
      nanobar.go(100);
    },
    startConversation: function() {
      nanobar.go(40);
      if($routeParams.id){
        Conversation.start($scope.conversation)
        .success(function(data){
          $scope.activeConversation = data;
          console.log(data);
          $scope.click.getMessages();
        })
        .error(function(data){

        });
      }
      nanobar.go(100);
    }
  };

  //$scope.click.init();

  $scope.logOut = function(){
    User.logout()
    .success(function(data){
      window.location.reload("/logged-out");
    })
    .error(function(data){

    });
  };

});
