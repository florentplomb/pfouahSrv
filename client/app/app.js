'use strict';

angular.module('transmedApp', [
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'ngDialog',
  'LocalStorageModule'
])

.filter('toArray', function(){
    return function(obj) {
        var result = [];
        angular.forEach(obj, function(val, key) {
            result.push(val);
            
        });
        return result;
    };
})

  .constant('TwitterUrl', 'https://api.twitter.com/1.1/')
  // .constant('ApiUrl', 'http://pfouah2015.herokuapp.com/')
  .constant('ApiUrl', 'http://pfouah2015.herokuapp.com/')

  .config(function (localStorageServiceProvider) {
    localStorageServiceProvider
      .setPrefix('pfouah')
      .setStorageType('localStorage')
      .setNotify(true, true);
  })

  .config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];
  }])

  .config(['$resourceProvider',function($resourceProvider) {
    $resourceProvider.defaults.stripTrailingSlashes = false;
  }])

  .config(function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
    $httpProvider.interceptors.push('authInterceptor');
  })

  .factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
    return {
      // Add authorization token to headers
      request: function (config) {
        config.headers = config.headers || {};
        if ($cookieStore.get('token')) {
          config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
        }
        return config;
      },

      // Intercept 401s and redirect you to login
      responseError: function(response) {
        if(response.status === 401) {
          $location.path('/login');
          // remove any stale tokens
          $cookieStore.remove('token');
          return $q.reject(response);
        }
        else {
          return $q.reject(response);
        }
      }
    };
  })

  /*.run(function ($rootScope, $location, Auth) {
    // Redirect to login if route requires auth and you're not logged in
    $rootScope.$on('$stateChangeStart', function (event, next) {
      Auth.isLoggedInAsync(function(loggedIn) {
        if (next.authenticate && !loggedIn) {
          $location.path('/login');
        }
      });
    });
  })*/

  ;