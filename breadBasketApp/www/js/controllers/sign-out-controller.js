app.controller("SignoutController", ["$scope", "$state", "SignoutService", "$window", function($scope, $state, SignoutService, $window){

	$scope.signOut = function() {
		SignoutService.signout();
		$state.go('tab.login');
	}
}]);