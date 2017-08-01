(function() {
    'use strict';

    angular.module('app.notes').factory('localStorageService', localStorageService);

    localStorageService.$inject = ['$window'];

    function localStorageService($window) {
        return {
          supportsStorage: function () {
              return angular.fromJson($window.localStorage.getItem('notes'));
          },
          saveNotes: function (notes) {
              $window.localStorage.setItem('notes', angular.toJson(notes));
          }
        };
    }

})();
