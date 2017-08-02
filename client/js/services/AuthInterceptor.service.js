(function() {
  'use strict';

  angular
    .module('app.user')
    .factory('AuthInterceptor', AuthInterceptor);

    AuthInterceptor.$inject = ['AuthToken'];

    function AuthInterceptor(AuthToken) {
        return {
            request: addToken
        };
        function addToken(config) {
            var token = AuthToken.getToken();
              console.warn(config);
              if(token) {
                  config.headers = config.headers || {};
                  config.headers.Authorization = 'Bearer ' + token;
              }
              return config;
        }
    }


})();
