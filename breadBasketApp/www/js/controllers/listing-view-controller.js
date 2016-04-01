app.controller("ListingViewController", ["$scope", "$stateParams", "ListingService", "OrganizationService", "ListingTypeService", "GetCurrentService", "Pusher", function($scope, $stateParams, ListingService, OrganizationService, ListingTypeService, GetCurrentService, Pusher) {

    var orgCurrent = {};

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

    GetCurrentService.fetchOrgCurrent().then(function(result){
        if(result.data.status === 200) {
            orgCurrent = result.data.data;
        }
    });

    $scope.returnCurrentOrgId = function() {
        return orgCurrent.orgId;
    };

    $scope.returnCurrentOrgType = function() {
        return orgCurrent.orgType;
    };


    $scope.claimListing = function(){
        //get current organization ID
        var listing = $scope.listing;
        listing.listingClaimedBy = orgCurrent.orgId;
        ListingService.update(listing.listingId, listing)
           .then(function(result) { //need some form of positive feedback here, since alerts don't work
               if(result.data.status === 200) {
                   //$scope.alerts[0] = {type: "success", msg: "Listing Claimed"};
               } else {
                   //$scope.alerts[0] = {type: "danger", msg: result.data.message};
               }
           });
    };

    $scope.unclaimListing = function() {
        var listing = $scope.listing;//make sure angular's copy is being updated
        listing.listingClaimedBy = null;
        ListingService.update(listing.listingId, listing)
           .then(function(result){
               //nothing for now; need user feedback here
           });
    };

    /**
     * START PUSHER METHODS
     */

        //subscribe to the update channel; this will update the listings
    Pusher.subscribe("listing", "update", function(listing){
       if($scope.listing.listingId === listing.listingId) {
           $scope.listing = listing;
       }
    });

    //when the window is closed/reloaded, gracefully close the channel
    $scope.$on("$destroy", function() {
        Pusher.unsubscribe("listings");
    });


}]);
