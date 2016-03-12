
app.controller("ListingViewController", ["$scope", "$stateParams", "ListingService", "OrganizationService", "ListingTypeService", "GetCurrentService", function($scope, $stateParams, ListingService, OrganizationService, ListingTypeService, GetCurrentService) {

    $scope.listing = {};
    $scope.organization = {};
    $scope.listingType = {};
    //populate the necessary fields in scope
    var listingId = $stateParams.listingId;
    ListingService.fetchId(listingId).then(function(result){
        if(result.data.status === 200) {
            $scope.listing = result.data.data;
            OrganizationService.fetchId($scope.listing.orgId).then(function(result){
                if(result.data.status === 200) {
                    $scope.organization = result.data.data;
                } else {
                    $scope.alerts[0] = {type: "danger", msg: result.data.message};
                }
            });
            ListingTypeService.fetch($scope.listing.listingTypeId).then(function(result){
               if(result.data.status === 200) {
                   $scope.listingType = result.data.data;
               } else {
                   $scope.alerts[0] = {type: "danger", msg: result.data.message};
               }
            });
        } else {
            $scope.alerts[0] = {type: "danger", msg: result.data.message};
        }
    });

}]);
