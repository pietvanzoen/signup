'use strict';

/* Filters */

angular.module('signupApp.filters', []).

  filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }]).

  filter('success', function() {
    return function(input) {
      return input > 0 ? 'success' : '';
    }
  }).

  filter('percent', function() {
    return function(input) {
      return input*100+'%';
    }
  }).

  filter('btnState', function() {
    return function(input) {
    	if (input > 0) {
    		return 'active btn-success';
    	} else {
        return 'btn-default';
      };
    }
  });
