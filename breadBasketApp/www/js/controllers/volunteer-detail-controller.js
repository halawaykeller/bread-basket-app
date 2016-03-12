app.controller("VolDetailController", ["$scope", "$stateParams", "VolunteerService", function($scope, $stateParams, VolunteerService) {

	var volId = $stateParams.volId;
	VolunteerService.fetchId(volId).then(function(result){
		if(result.data.status === 200) {
			$scope.volunteer = result.data.data;
		} else {
			$scope.alerts[0] = {type: "danger", msg: result.data.message};
		}
	});

}]);