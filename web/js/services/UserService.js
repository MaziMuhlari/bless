angular.module('UserService', []).factory('User', ['$http', function($http) {
    return {
        details : function() {
            return $http.get('/api/user');
        },
        update : function(data) {
            return $http.post('/api/user/' + data._id, data);
        },
        blessers : function() {
            return $http.get('/api/user/blessers');
        },
        logout : function() {
            return $http.get('/log-out');
        }
    }
}]);
