(function() {
  'use strict';

   angular.module('app.user')
          .controller('UserCardController', UserCardController);

    UserCardController.$inject = ['randomUser', 'userAuth'];

    function UserCardController(randomUser, userAuth) {
      var vm = this;
      console.warn(vm);

      vm.getRandomUser = getRandomUser;

      vm.login = login;
      vm.logout = logout;

      function getRandomUser() {
        randomUser.getUser().then(function success(response) {
          vm.randomUser = response.data;
        });
      }

      function login() {
          userAuth.login(vm.username, vm.password).then(function success(response) {
            vm.user = response.data.user;
          }, handleError);
      }

      function logout() {
        userAuth.logout();
        vm.user = null;
      }

      function handleError(response) {
        alert('Error: '+response.data);
      }
    }


})();
