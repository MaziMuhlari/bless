angular.module('UserService', []).factory('User', ['$http', function($http) {
    return {
        details : function() {
            return $http.get('/api/user/details');
        },
        blessers : function() {
            return $http.get('/api/user/blessers');
        },
        logout : function() {
            return $http.get('/log-out');
        }
    }
}]);
