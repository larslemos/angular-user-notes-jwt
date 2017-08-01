(function() {
  'use strict';

  angular
    .module('app')
    .factory('randomUser', randomUser);

    randomUser.$inject = ['$http', 'API_URL'];

    function randomUser($http, API_URL) {

      return {
          getUser: getUser
      };

      function getUser() {
        $http.get(API_URL+'/random-user' );
      }

    }

})();
