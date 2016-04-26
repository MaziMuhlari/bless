angular.module('MessageService', []).factory('Message', ['$http', function($http) {
    return {
        send : function(data) {
            return $http.post('/api/message/send', data);
        },
        fetch : function(data) {
            return $http.post('/api/employees', data);
        }
    }
}]);
