
app.controller("ListingViewController", ["$scope", "$stateParams", "ListingService", function($scope, $stateParams, ListingService) {

    ListingService.all().then(function(result){
        if(result.data.status === 200) {
            $scope.listings = result.data.data;
        } else {
            $scope.alerts[0] = {type: "danger", msg: result.data.message};
        }
    });

}]);

