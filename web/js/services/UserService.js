angular.module('UserService', []).factory('User', ['$http', function($http) {
    return {
        details : function() {
            return $http.get('/api/user/details');
        },
        logout : function() {
            return $http.get('/log-out');
        }
    }
}]);
