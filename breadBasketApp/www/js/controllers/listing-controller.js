app.controller("ListingController", ["$scope", "$uibModal", "ListingService", "AlertService", "GetCurrentService", "OrganizationService", "ListingTypeService", "VolunteerService", "Pusher", function($scope, $uibModal, ListingService, AlertService, GetCurrentService, OrganizationService, ListingTypeService, VolunteerService, Pusher) {
	$scope.editedListing = {};
	$scope.organization = {};
	$scope.listingType = {};
	$scope.volunteer = {};
	$scope.newListing = {listingId: null, listingMemo: "", listingCost: "", listingType: ""};
	$scope.alerts = [];
	$scope.listings = [];


	/**
	 * START METHOD: CREATE/POST
	 * opens new listing modal and adds sends listing to the listing API
	 */

	$scope.openListingModal = function() {
		var ListingModalInstance = $uibModal.open({
			templateUrl: "../../js/views/newlisting-modal.php",
			controller: "ListingModal",
			resolve: {
				listing: function() {
					return ($scope.listings);
				}
			}
		});
		ListingModalInstance.result.then(function(listing) {
			ListingService.create(listing)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.data.message};
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});

		});
	};

	/**
	 * START METHOD UPDATE/PUT
	 * opens edit volunteer modal and sends updated volunteer to the volunteer API
	 */

	$scope.openEditListingModal = function() {
		var EditListingModalInstance = $uibModal.open({
			templateUrl: "../../js/views/editlisting-modal.php",
			controller: "EditListingModal",
			resolve: {
				editedListing: function() {
					return ($scope.editedListing);
				}
			}
		});
		EditListingModalInstance.result.then(function(listing) {
			//send the update request to the database
			ListingService.update(listing.listingId, listing)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.data.message};
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
			////update angulars copy for dynamic table updates
			//$scope.listing[$scope.index] = listing;
			//$scope.index = null;
		});
	};

	/**
	 * Sets the listing to be edited and opens the appropriate modal
	 **/
	$scope.setEditedListing = function(listing, index) {
		//set the edited listing in the scope, and set the index for updating the array
		$scope.editedListing = angular.copy(listing);
		$scope.index = index;
		$scope.openEditListingModal();
	};


	/**
	 * retrieves information about the listing to be claimed and opens the appropriate modal
	 **/
	$scope.setClaimedListing = function(listing, index) {
		//set the claimed listing in the scope, and set the index for updating the array
		$scope.editedListing = angular.copy(listing);
		$scope.index = index;
		//set the organization and the listing type here
		//probably need to account for failed cases
		OrganizationService.fetchId(listing.orgId)
			.then(function(result) {
				$scope.organization = result.data.data;
				ListingTypeService.fetch(listing.listingTypeId)
					.then(function(result) {
						$scope.listingType = result.data.data;
						$scope.openListingDetailModal();
					});

			});
	};

	/**
	 * allows organizations to unclaim their listings
	 */
	$scope.unclaimListing = function(listing, index) {
		//set the claimed listing in the scope, and set the index for updating the array
		$scope.editedListing = angular.copy(listing);
		$scope.index = index;
		//get the current organization
		GetCurrentService.fetchOrgCurrent()
				.then(function(result) {
					//if this was claimed by the logged in user's organization, allow them to unclaim
					if (result.data.data.orgId === listing.listingClaimedBy) {
						OrganizationService.fetchId(listing.orgId)
								.then(function(result) {
									$scope.organization = result.data.data;
									ListingTypeService.fetch(listing.listingTypeId)
											.then(function(result) {
												$scope.listingType = result.data.data;
												$scope.openListingUnclaimModal();
											});

								});
					}

				});

	};

	/**
	 * allows givers to see who has claimed their food
	 */
	$scope.getWhoClaimed = function(listing) {
		$scope.editedListing = angular.copy(listing);
		//get the volunteer and the organization of the claimer here
		OrganizationService.fetchId(listing.listingClaimedBy)
			.then(function(result) {
				$scope.organization = result.data.data;
				$scope.openSeeClaimedModal();
			});
	};

	/**
	 * fulfills the promise from retrieving all the listings from the listing API
	 */
	$scope.getListings = function() {
		ListingService.all()
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.listings = result.data.data;
				} else {
					$scope.alerts[0] = {type: "danger", msg: result.data.message};
				}
			});
	};

	/**
	 * LOADS TABLE ARRAY
	 */
	//load the array on first view
	if($scope.listings.length === 0) {
		$scope.listings = $scope.getListings();
	}

	/**
	 * START METHOD(S): FETCH/GET
	 * fufills the promise from retrieving all the volunteers from the volunteer API
	 */
		//This promise at one point removed the alert box and would break the New Listing drop down
	$scope.getListingsById = function() {
		ListingService.fetchId() //changed to all
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.listings = result.data.data;
				} else {
					$scope.alerts[0] = {type: "danger", msg: result.data.message};
				}
			});
	};

	//fulfills the promise from retrieving the listing by org id
	$scope.getListingsByOrgId = function(orgId, validated) {
		if(validated === true) {
			ListingService.fetchByOrgId(orgId)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.listings = result.data.data;
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
		}
	};

	//fulfills the promise from retrieving the listings by parent id
	$scope.getListingByParentId = function(parentId, validated) {
		if(validated === true) {
			ListingService.fetchParentId(parentId)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.listings = result.data.data;
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
		}
	};

	//fulfills the promise from retrieving the listings by post time
	$scope.getListingByPostTime = function(postTime, validated) {
		if(validated === true) {
			ListingService.fetchPostTime(postTime)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.listings = result.data.data;
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
		}
	};

	//fulfills the promise from retrieving the listings by Type Id
	$scope.getListingByTypeId = function(typeId, validated) {
		if(validated === true) {
			ListingService.fetchTypeId(typeId)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.listings = result.data.data;
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
		}
	};

	/**
	 * FOR: RECEIVER ORGANIZATIONS
	 * opens detail listing modal and allows a VOLUNTEER to update listing as CLAIMED or NOT CLAIMED
	 */
	$scope.openListingDetailModal = function() {
		var ListingDetailModalInstance = $uibModal.open({
			templateUrl: "../../js/views/listing-detailview-modal.php",
			controller: "ListingDetailModal",
			resolve: {
				editedListing: function() {
					return ($scope.editedListing);
				},
				organization: function() {
					return ($scope.organization);
				},
				listingType: function() {
					return ($scope.listingType);
				}
			}
		});
		ListingDetailModalInstance.result.then(function(listing) {
			//get current organization ID
			GetCurrentService.fetchOrgCurrent()
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.data.message};
						//set the organization ID in the listing claimed by field
						listing.listingClaimedBy = result.data.data.orgId;


						ListingService.update(listing.listingId, listing)
							.then(function(result) {
								if(result.data.status === 200) {
									$scope.alerts[0] = {type: "success", msg: "Listing Claimed"};
								} else {
									$scope.alerts[0] = {type: "danger", msg: result.data.message};
								}
							});
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
					////update angulars copy for dynamic table updates
					//$scope.listing[$scope.index] = listing;
					//$scope.index = null;
				});

		});
	};

	/**
	 * allow giver organization to see the details of who claimed their food
	 */
	$scope.openSeeClaimedModal = function() {
		var SeeClaimedModalInstance = $uibModal.open({
			templateUrl: "../../js/views/see-claimed-modal.php",
			controller: "SeeClaimedModal",
			resolve: {
				editedListing: function() {
					return ($scope.editedListing);
				},
				organization: function() {
					return ($scope.organization);
				}
			}
		});
		SeeClaimedModalInstance.result.then(function() {
		});
	};

	/**
	 * allow receiver organizations to review and unclaim listings
	 */
	$scope.openListingUnclaimModal = function() {
		var ListingUnclaimModalInstance = $uibModal.open({
			templateUrl: "../../js/views/listing-unclaim-modal.php",
			controller: "ListingUnclaimModal",
			resolve: {
				editedListing: function() {
					return ($scope.editedListing);
				},
				organization: function() {
					return ($scope.organization);
				},
				listingType: function() {
					return ($scope.listingType);
				}
			}
		});
		ListingUnclaimModalInstance.result.then(function(listing) {
			//set the listing claimed field to null
			listing.listingClaimedBy = null;
			ListingService.update(listing.listingId, listing)
					.then(function(result) {
						if(result.data.status === 200) {
							$scope.alerts[0] = {type: "success", msg: "Listing Unclaimed"};
						} else {
							$scope.alerts[0] = {type: "danger", msg: result.data.message};
						}
					});
		});
	};

	/**
	 * deletes a listing and sends it to the listing API if the user confirms deletion
	 *
	 * @param listingId the listing id of the listing to be deleted
	 */
	$scope.deleteListing = function(listingId, index) {
		//create a modal instance to prompt the user if she/he is sure they want to delete the misquote
		var message = "Are you sure you want to delete this listing?";

		var modalHtml = '<div class="modal-body">' + message + '</div><div class="modal-footer"><button class="btn btn-primary" ng-click="yes()">Yes</button><button class="btn btn-warning" ng-click="no()">No</button></div>';

		var modalInstance = $uibModal.open({
			template: modalHtml,
			controller: ModalInstanceCtrl
		});

		//if the user clicked yes, delete the volunteer
		modalInstance.result.then(function() {
			ListingService.destroy(listingId)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.data.message};
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
			//remove the current listing from array
			$scope.listings.splice(index, 1);
		});
	};

	/**
	 * START PUSHER METHODS
	 */

		//subscribe to the delete channel; this will delete from the listings array on demand
	Pusher.subscribe("listing", "delete", function(listing) {
		for(var i = 0; i < $scope.listings.length; i++) {
			if($scope.listings[i].listingId === listing.listingId) {
				$scope.listings.splice(i, 1);
				break;
			}
		}
	});

	//subscribe to the new channel; this will add to the listings array on demand
	Pusher.subscribe("listing", "new", function(listing) {
		$scope.listings.push(listing);
	});

	//subscribe to the update channel; this will update the listings array on demand
	Pusher.subscribe("listing", "update", function(listing) {
		for(var i = 0; i < $scope.listings.length; i++) {
			if($scope.listings[i].listingId === listing.listingId) {
				$scope.listings[i] = listing;
				break;
			}
		}
	});

	//when the window is closed/reloaded, gracefully close the channel
	$scope.$on("$destroy", function() {
		Pusher.unsubscribe("listings");
	});


}]);

/**
 * EMBEDDED CONTROLLER FOR DELETE METHOD
 * @param $scope
 * @param $uibModalInstance
 * @constructor
 */

//embedded modal instance controller to create deletion prompt
var ModalInstanceCtrl = function($scope, $uibModalInstance) {
	$scope.yes = function() {
		$uibModalInstance.close();
	};

	$scope.no = function() {
		$uibModalInstance.dismiss('cancel');
	};
};