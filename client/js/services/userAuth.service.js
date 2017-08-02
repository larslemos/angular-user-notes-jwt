(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('userAuth', userAuth);

    userAuth.$inject =  ['$http', 'API_URL', 'AuthToken'];

    function userAuth($http, API_URL, AuthToken) {
        return {
          login: login,
          logout: logout
        };

        function login(username, password) {
          return $http.post(API_URL + '/login', {
              username: username,
              password: password
          }).then(function(response) {
            AuthToken.setToken(response.data.token);
              return response
          });
        }

        function logout() {
          AuthToken.setToken();
        }
    }

})();
