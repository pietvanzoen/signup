'use strict';

/* Controllers */


function scheduleCtrl($scope, $http, $rootScope) {
    $rootScope.title = 'Signup - Schedule';
    $scope.schedule = [];
    $http.get('json/schedule.json').success(function(data) {
        $scope.schedule = data;
    });

    $scope.total = function(key) {
     var count = 0;
     angular.forEach($scope.schedule.dates, function(date) {
         count += date[key.toString()] ? date[key.toString()] : 0;
     });
     return count;
    };

    $scope.usertotal = function() {
     var count = 0;
     angular.forEach($scope.schedule.dates, function(date) {
         count += date.user ? date.user : 0;
     });
     return count;
    };

}

angular.module('signupApp.controllers', []).
    controller('scheduleCtrl', scheduleCtrl);