(function() {
  'use strict';

  angular.module('app.notes').directive('enableSaveOnEdit', enableSaveOnEdit);

  enableSaveOnEdit.$inject = ['$document'];

  function enableSaveOnEdit($document) {
      return {
          restrict: 'A',
          link: function(scope, element, attributes) {
              scope.$parent.editor = element[0];

              element[0].addEventListener('input', function() {
                  scope.$apply(function() {
                      scope.$parent.edited = true;
                  });
              });
          }
      };
  }

})();
