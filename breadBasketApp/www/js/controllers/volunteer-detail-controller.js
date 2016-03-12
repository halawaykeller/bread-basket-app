app.controller("VolDetailController", ["$scope", "$stateParams", "VolunteerService", function($scope, $stateParams, VolunteerService) {

	VolunteerService.all().then(function(result){
		if(result.data.status === 200) {
			$scope.volunteers = result.data.data;
		} else {
			$scope.alerts[0] = {type: "danger", msg: result.data.message};
		}
	});

}]);