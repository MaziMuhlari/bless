angular.module('ConversationService', []).factory('Conversation', ['$http', function($http) {
    return {
        start : function(data) {
            return $http.post('/api/conversation?creator=' + data.creator + "&recepient=" + data.recepient);
        }
    }
}]);
