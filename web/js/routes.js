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

        .when('/messages/:id', {
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

        .when('/register', {
            templateUrl: 'views/register.html',
            controller: 'RegisterController'
        })

        .when('/login', {
            templateUrl: 'views/login.html',
            controller: 'LoginController'
        })

        .when('/logged-out', {
            templateUrl: 'views/bye.html',
            controller: 'ByeController'
        })

        .when('/page-not-found', {
            templateUrl: 'views/404.html',
            controller: 'MiscController'
        })

        ;

    $locationProvider.html5Mode(true);

}]);
