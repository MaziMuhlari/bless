angular.module('MessageService', []).factory('Message', ['$http', function($http) {
    return {
        send : function(data, data2, data3) {
            return $http.post('/api/message/send?message=' + data.message + '&conversation_id=' + data2._id + '&composer=' + data3);
        },
        conversation : function(data) {
            return $http.get('/api/messages?conversation_id=' + data._id);
        }
    }
}]);
