(function() {
  'use strict';

  angular.module('app.notes').directive('modal', modal);

  function modal() {
      return {
          restrict: 'E',
          templateUrl: 'templates/modal.html'
      }
  }

})();
