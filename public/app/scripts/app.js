var app = angular.module('SOSApp', ['ngResource']);

app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $routeProvider.when('/', {templateUrl: '/app/views/home.html', controller: 'HomeCtrl'});
    $routeProvider.when('/404/', {templateUrl: '/app/views/404.html', controller: 'ErrorCtrl'});
    $routeProvider.when('/:slug/', {templateUrl: '/app/views/detail.html', controller: 'DetailCtrl'});
    $routeProvider.otherwise({redirectTo: '/404/'});
}]);