angular.module('ReportService', []).factory('Report', ['$http', function($http) {
    return {
        create : function(data) {
            return $http.get('/api/employees/' + data);
        }
    }
}]);
