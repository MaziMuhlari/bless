angular.module('MessageService', []).factory('User', ['$http', function($http) {
    return {
        send : function(data) {
            return $http.get('/api/employees/' + data);
        },
        fetch : function(data) {
            return $http.post('/api/employees', data);
        }
    }
}]);
