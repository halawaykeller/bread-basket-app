app.controller("SignupController", ["$scope", "$ionicLoading", "$uibModal", "$window", "$state", "AlertService", "SignupService", function($scope, $ionicLoading, $uibModal, $window, $state, AlertService, SignupService) {
	//$scope.signupData = {};
	$scope.alerts = [];

	//$scope.openSignupModal = function () {
	//	var signupModalInstance = $uibModal.open({
	//		templateUrl: "../../js/views/signup-modal.php",
	//		controller: "SignupModal",
	//		resolve: {
	//			signupData: function () {
	//				return($scope.signupData);
	//			}
	//		}
	//	});
	//	signupModalInstance.result.then(function (signupData) {
		$scope.submitSignupData = function(data) {
			//$ionicLoading.show();
			$scope.signupData = data;
			SignupService.signup(data)
					.then(function(reply) {
						if(reply.status === 200) {
							AlertService.addAlert({type: "success", msg: reply.message});
							$state.go("tab.dashboard");
						} else {
							AlertService.addAlert({type: "danger", msg: reply.message});
						}
					});
		};
}]);