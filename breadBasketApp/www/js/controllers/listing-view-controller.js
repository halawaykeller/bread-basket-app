
app.controller("ListingController", ["$scope", "$stateParams", "ListingService", "GetCurrentService", "OrganizationService", "ListingTypeService", "VolunteerService", "Pusher", function($scope, $stateParams, ListingService, GetCurrentService, OrganizationService, ListingTypeService, VolunteerService, Pusher) {

    ListingService.all().then(function(result){
        if(result.data.status === 200) {
            $scope.listings = result.data.data;
        } else {
            $scope.alerts[0] = {type: "danger", msg: result.data.message};
        }
    });

}]);

