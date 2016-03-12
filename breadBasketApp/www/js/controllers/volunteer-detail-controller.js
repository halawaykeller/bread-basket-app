app.controller("VolDetailController", ["$scope", "$stateParams", "VolunteerService", function($scope, $stateParams, VolunteerService) {



	var volId = $stateParams.volId;
	VolunteerService.fetchId(volId).then(function(result){
		if(result.data.status === 200) {
			$scope.volunteer = result.data.data;
		} else {
			$scope.alerts[0] = {type: "danger", msg: result.data.message};
		}
	});

	$scope.submitVolunteer = function() {
		//need to set a volPassword here, so that the set password in the validation controller doesn't break
		volunteer.volPassword = null;
		VolunteerService.update(volunteer.volId, volunteer)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.data.message};
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
	};

}]);