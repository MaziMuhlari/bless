angular.module('BlesserService', []).factory('User', ['$http', function($http) {
    return {
        list : function(data) {
            return $http.get('/api/employees/' + data);
        },
        report : function(data) {
            return $http.get('/api/employees/' + data);
        }
    }
}]);
