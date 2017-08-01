(function() {
    'use strict';

    var app = angular.module('app', ['ui.router']);

    app.constant('API_URL', 'http://localhost:7203/api');

    app.config(['$stateProvider', '$urlRouterProvider', '$logProvider', configRoutes]);

    function configRoutes($stateProvider, $urlRouterProvider, $logProvider) {
      $logProvider.debugEnabled(true);

      $stateProvider
        .state('random-user', {
          url: '/random-user',
          templateUrl: 'templates/random-user.html',
          controller: 'UserCardController',
          controllerAs: 'vm'
        });
    }


})();
