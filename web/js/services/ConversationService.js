angular.module('ConversationService', []).factory('User', ['$http', function($http) {
    return {
        start : function(data) {
            return $http.get('/api/employees/' + data);
        },
        fetch : function(data) {
            return $http.get('/api/employees/' + data);
        }
    }
}]);
