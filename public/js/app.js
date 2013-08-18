var app = angular.module('SOSApp', ['ngResource']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {templateUrl: '/partials/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/404/', {templateUrl: '/partials/404.html', controller: 'ErrorCtrl'});
    $routeProvider.when('/:slug/', {templateUrl: '/partials/detail.html', controller: 'DetailCtrl'});
    $routeProvider.otherwise({redirectTo: '/404/'});
}]);