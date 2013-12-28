angular.module('App', []);

angular.module('App')
.controller('AppCtrl', ['$scope', 'lexiconService', function ($scope, lexiconService) {
  $scope.letters = '';
  $scope.bigWords = [];
  $scope.mediumWords = [];
  $scope.smallWords = [];
  $scope.onChange = function () {
    console.log('changed');
    lexiconService.getWords($scope.letters, function (words) {
      var bigWords = _.filter(words, function (word) { return word.length > 6; });
      var mediumWords = _.filter(words, function (word) { return word.length <= 6 && word.length > 3; });
      var smallWords = _.filter(words, function (word) { return word.length <= 3; });
      $scope.$apply(function () {
        $scope.bigWords = bigWords;
        $scope.mediumWords = mediumWords;
        $scope.smallWords = smallWords;
      });
    });
  };
}]);