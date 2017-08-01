(function() {
  'use strict';

  angular
    .module('app.notes').controller('NotesController', NotesController);

    NotesController.$inject = ['$scope', '$document', '$timeout', 'localStorageService', 'uuid'];

    function NotesController($scope, $document, $timeout, localStorageService, uuid) {

        $scope.localStorageSupported = localStorageService.supportsStorage();

        if($scope.localStorageSupported) {
            $scope.notes = localStorageService.getNotes() || [];
            $scope.currentNote = $scope.notes[0] || {};

            $scope.edited = false;
            $scope.showModal = false;

            $scope.preSaveNote = function() {
                if(!$scope.currentNote.title) {
                  $scope.showModal = true;
                  $timeout(function() {
                      var field = $document[0].getElemenyById;
                  });
                }
            }
        }
    }


})();
