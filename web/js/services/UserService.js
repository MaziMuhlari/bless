angular.module('UserService', []).factory('User', ['$http', function($http) {
    return {
        login : function(data) {
            return $http.get('/api/employees/' + data);
        },
        register : function(data) {
            return $http.post('/api/employees', data);
        },
        subscribe : function(data) {
            return $http.post('/api/employees', data);
        },
        report : function(data) {
            return $http.post('/api/employees', data);
        }
    }
}]);
