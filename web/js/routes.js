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

        .when('/advertising', {
            templateUrl: 'views/advertising.html',
            controller: 'AdvertisingController'
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

        ;

    $locationProvider.html5Mode(true);

}]);
