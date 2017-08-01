(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('randomUser', randomUser);

    randomUser.$inject = ['$http', 'API_URL'];

    function randomUser($http, API_URL) {

      return {
          getUser: getUser
      };

      function getUser() {
        return $http.get(API_URL+'/random-user')
            .then(getUserComplete)
            .catch(getUserFailed);

            function getUserComplete(data) {
                return data;
            }

            function getUserFailed(error) {
              return error;
            }
      }

    }

})();
