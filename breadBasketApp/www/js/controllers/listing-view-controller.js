
app.controller("ListingViewController", ["$scope", "$stateParams", "ListingService", function($scope, $stateParams, ListingService) {

    var listingId = $stateParams.listingId;
    ListingService.fetchId(listingId).then(function(result){
        if(result.data.status === 200) {
            $scope.listing = result.data.data;
        } else {
            $scope.alerts[0] = {type: "danger", msg: result.data.message};
        }
    });

}]);
