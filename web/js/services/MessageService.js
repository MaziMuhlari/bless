angular.module('MessageService', []).factory('Message', ['$http', function($http) {
    return {
        send : function(data) {
            return $http.post('/api/message/send', data);
        },
        conversation : function(data) {
            return $http.get('/api/conversation?from=' + data.from + "&to=" + data.to);
        }
    }
}]);
