app.controller("ClaimDetailsController", ["$scope", "$stateParams", "ListingService", "OrganizationService", function($scope, $stateParams, ListingService, OrganizationService) {

	$scope.listing = {};
	$scope.organization = {};

	//populate the necessary fields in scope
	var listingId = $stateParams.listingId;
	ListingService.fetchId(listingId).then(function(result){
		if(result.data.status === 200) {
			$scope.listing = result.data.data;
			OrganizationService.fetchId($scope.listing.listingClaimedBy).then(function(result){
				if(result.data.status === 200) {
					$scope.organization = result.data.data;
				} else {
					$scope.alerts[0] = {type: "danger", msg: result.data.message};
				}
			});
		} else {
			$scope.alerts[0] = {type: "danger", msg: result.data.message};
		}
	});
}]);