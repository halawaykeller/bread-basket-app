app.controller("VolDetailController", function($scope, VolunteerService) {


		$scope.volunteers = VolunteerService.fetchId();
});