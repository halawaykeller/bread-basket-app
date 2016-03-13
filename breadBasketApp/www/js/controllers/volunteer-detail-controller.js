app.controller("VolDetailController", ["$scope", "$state", "$stateParams", "VolunteerService", function($scope, $state, $stateParams, VolunteerService) {

	var volId = $stateParams.volId;

	VolunteerService.fetchId(volId).then(function(result){
		if(result.data.status === 200) {
			$scope.volunteer = result.data.data;
		} else {
			$scope.alerts[0] = {type: "danger", msg: result.data.message};
		}
	});

	/**
	 * START METHOD UPDATE/PUT
	 * sends updated volunteer to the volunteer API
	 */

	$scope.submitVolunteer = function(volunteer) {

		$scope.volunteer = volunteer;
		volunteer.volPassword = null;

		VolunteerService.update($scope.volunteer.volId, $scope.volunteer)

		.then(function() {
			$state.go('tab.volunteers', {reload: true});

		});

	};

}]);