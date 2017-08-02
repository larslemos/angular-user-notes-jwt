(function() {
    'use strict';

    var app = angular.module('app', [
      'ui.router',

      'app.notes',
      'app.user'
    ]);

    app.constant('API_URL', 'http://localhost:7203/api');

    app.config(['$stateProvider', '$urlRouterProvider', '$logProvider', '$httpProvider', configRoutes]);

    function configRoutes($stateProvider, $urlRouterProvider, $logProvider, $httpProvider) {
      $logProvider.debugEnabled(true);
      $httpProvider.interceptors.push('AuthInterceptor');

      $stateProvider
        .state('user', {
          url: '/random-user',
          templateUrl: 'templates/random-user.html',
          controller: 'UserCardController',
          controllerAs: 'vm'
        });
    }


})();
