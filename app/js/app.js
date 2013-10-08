'use strict';


// Declare app level module which depends on filters, and services
angular.module('signupApp', ['ngSanitize', 'signupApp.filters', 'signupApp.services', 'signupApp.directives', 'signupApp.controllers']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/schedule', {templateUrl: 'partials/schedule.html', controller: 'scheduleCtrl'});
    $routeProvider.when('/event', {templateUrl: 'partials/event.html', controller: 'eventCtrl'});
    $routeProvider.otherwise({redirectTo: '/schedule'});
  }]);
