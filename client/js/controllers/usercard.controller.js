(function() {
  'use strict';

   angular.module('app.user')
          .controller('UserCardController', UserCardController);

    UserCardController.$inject = ['randomUser', 'userLogin'];

    function UserCardController(randomUser, userLogin) {
      var vm = this;

      vm.getRandomUser = getRandomUser;

      vm.login = login;

      function getRandomUser() {
        randomUser.getUser().then(function success(response) {
          vm.randomUser = response.data;
        });
      }

      function login(username, password) {
          userLogin.login(username, password).then(function success(response) {
            vm.user = response.data;
          }, handleError);
      }

      function handleError(response) {
        alert('Error: '+response.data);
      }
    }


})();
