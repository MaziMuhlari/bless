angular.module('ConversationService', []).factory('Conversation', ['$http', function($http) {
    return {
        start : function(data) {
            return $http.post('/api/conversation?creator=' + data.creator + "&recepient=" + data.recepient);
        },
        list : function(data) {
            return $http.get('/api/conversations?user_id=' + data);
        }
    }
}]);
