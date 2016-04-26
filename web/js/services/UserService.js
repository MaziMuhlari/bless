angular.module('UserService', []).factory('User', ['$http', function($http) {
    return {
        login : function(data) {
            return $http.get('/api/user/login', data);
        },
        register : function(data) {
            return $http.post('/api/user/register', data);
        }
    }
}]);
