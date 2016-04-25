angular.module('MainCtrl', []).controller('MainController', function($scope, $http, $window) {
  $scope.joinDialogue = false;
  $scope.isLoggedIn = false;
  $scope.openJoinDialogue = function(){
    $scope.joinDialogue = true;
  }
  $scope.closeJoinDialogue = function(){
    $scope.joinDialogue = false;
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
});
