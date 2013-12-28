angular.module('App', []);

angular.module('App')
.controller('AppCtrl', ['$scope', 'lexiconService', function ($scope, lexiconService) {
	$scope.letters = '';
	$scope.words = [];
	$scope.onChange = function () {
		console.log('changed');
		lexiconService.getWords($scope.letters, function (words) {
			$scope.$apply(function () {
				$scope.words = words;
			});
		});
	};
}]);