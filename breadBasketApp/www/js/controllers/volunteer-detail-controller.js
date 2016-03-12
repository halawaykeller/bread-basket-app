app.controller("VolDetailController", function($scope, $stateParams, VolunteerService) {


		$scope.volunteers = VolunteerService.fetchId($stateParams.volId);
});