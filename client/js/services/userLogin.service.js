(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('userLogin', userLogin);

    userLogin.$inject =  ['$http', 'API_URL'];

    function userLogin($http, API_URL) {
        return {
          login: login
        };

        function login(username, password) {
          return $http.post(API_URL + '/login', {
              username: username,
              password: password
          });
        }
    }

})();
