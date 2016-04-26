angular.module('UserService', []).factory('User', ['$http', function($http) {
    return {
        details : function() {
            return $http.get('/api/user');
        },
        update : function(data) {
            return $http.post('/api/user/' + data._id, data);
        },
        blessers : function(take, skip) {
            return $http.get('/api/user/blessers?take=' + take + '&skip=' + skip);
        },
        logout : function() {
            return $http.get('/log-out');
        }
    }
}]);
