
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


    $scope.claimListing = function(){
        //get current organization ID
        var listing = $scope.listing;
        GetCurrentService.fetchOrgCurrent()
           .then(function(result) {
               if(result.data.status === 200) {
                   //$scope.alerts[0] = {type: "success", msg: result.data.message};
                   //set the organization ID in the listing claimed by field
                   listing.listingClaimedBy = result.data.data.orgId;
                   ListingService.update(listing.listingId, listing)
                      .then(function(result) {
                          if(result.data.status === 200) {
                              //$scope.alerts[0] = {type: "success", msg: "Listing Claimed"};
                          } else {
                              //$scope.alerts[0] = {type: "danger", msg: result.data.message};
                          }
                      });
               } else {
                   $scope.alerts[0] = {type: "danger", msg: result.data.message};
               }
               ////update angulars copy for dynamic table updates
               //$scope.listing[$scope.index] = listing;
               //$scope.index = null;
           });
    };

}]);
