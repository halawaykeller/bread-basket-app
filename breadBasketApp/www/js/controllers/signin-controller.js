app.controller("SigninController", ["$scope", "$uibModal", "$window", "$state", "AlertService", "SigninService", "GetCurrentService", function($scope, $uibModal, $window, $state, AlertService, SigninService, GetCurrentService) {
	//$scope.signinData = {};
	$scope.alerts = [];

	$scope.submitSigninData = function(data)  {
			console.log(data);
			$scope.signinData = data;
			SigninService.signin(data)
				.then(function(result) {
					if(result.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.message};
						//three potential cases here: receiving volunteer, receiving admin, giving admin
						//Receiving volunteer redirects to the listing page, the other two go to their respective landing pages
						GetCurrentService.fetchVolCurrent()
							.then(function(result) {
								if(result.data.status === 200) {
									if(result.data.data.volIsAdmin === true) {
										GetCurrentService.fetchOrgCurrent()
											.then(function(result) {
												if(result.data.status === 200) {
													if(result.data.data.orgType === "G") {
														//giving admin
														$window.location.assign("/foozy")
													} else if(result.data.data.orgType === "R") {
														//receiving admin
														$state.go('tab.dashboard');
													}
												} else {
													$scope.alerts[0] = {type: "danger", msg: result.message};
												}
											});
									} else {
										//receiving volunteer
										$window.location.assign("/renly")
									}
								} else {
									$scope.alerts[0] = {type: "danger", msg: result.message};
								}
							});

					} else {
						$scope.alerts[0] = {type: "danger", msg: result.message};
						$scope.openSigninFailModal();
					}
				});
		}, function() {
			$scope.signinData = {};
		};

	$scope.openSigninFailModal = function() {
		var SignInFailInstance = $uibModal.open({
			templateUrl: "../../js/views/signin-fail-modal.php",
			controller: "SigninFailModal"
		});
	}
}]);