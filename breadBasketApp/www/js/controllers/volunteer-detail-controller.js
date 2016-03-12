app.controller('VolDetailController', function($scope, $stateParams, VolunteerService) {


		$scope.volunteer = VolunteerService.fetchId($stateParams.volId);
});