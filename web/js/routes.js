angular.module('Routes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

    $routeProvider

        .when('/', {
            templateUrl: 'views/home.html',
            controller: 'MainController'
        })

        .when('/about', {
            templateUrl: 'views/about.html',
            controller: 'AboutController'
        })

        .when('/contact', {
            templateUrl: 'views/contact.html',
            controller: 'ContactController'
        })

        .when('/cookies', {
            templateUrl: 'views/cookies.html',
            controller: 'CookiesController'
        })

        .when('/messages', {
            templateUrl: 'views/messages.html',
            controller: 'MessagesController'
        })

        .when('/privacy', {
            templateUrl: 'views/privacy.html',
            controller: 'PrivacyController'
        })

        .when('/terms', {
            templateUrl: 'views/terms.html',
            controller: 'TermsController'
        })

        .when('/profile', {
            templateUrl: 'views/profile.html',
            controller: 'ProfileController'
        })

        .when('/report', {
            templateUrl: 'views/report.html',
            controller: 'ReportController'
        })

        .when('/get-blessed', {
            templateUrl: 'views/join.html',
            controller: 'JoinController'
        })

        .when('/logged-out', {
            templateUrl: 'views/bye.html',
            controller: 'ByeController'
        })

        ;

    $locationProvider.html5Mode(true);

}]);
