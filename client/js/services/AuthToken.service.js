(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('AuthToken',AuthToken);

    AuthToken.$inject = ['$window'];

    function AuthToken($window) {
      var store = $window.localStorage;
      console.info(store);
      var key = 'auth-token';

      return {
        getToken: getToken,
        setToken: setToken
      };

      function getToken() {
        return store.getItem(key);
      }

      function setToken(token) {
          if(token) {
            store.setItem(key, token);
          } else {
            store.removeItem(key);
          }
      }
    }

})();
