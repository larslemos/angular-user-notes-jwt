(function() {
  'use strict';

   angular.module('app')
          .controller('UserCardController', UserCardController);

    function UserCardController() {
      var vm = this;
      vm.getRandomUser = getRandomUser;



      function getRandomUser() {
        RandomUserFactory.getUser().then(function success() {

        });
      }
    }


})();
