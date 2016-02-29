app.controller("VolunteerController", ["$scope", "$uibModal", "VolunteerService", "AlertService", function($scope, $uibModal, VolunteerService, AlertService) {
	$scope.editedVolunteer = {};
	$scope.index = null;
	$scope.alerts = [];
	$scope.volunteers = [];

	/**
	 * START METHOD: CREATE/POST
	 * opens new volutneer modal and adds sends volunteer to the volunteer API
	 */
	$scope.openVolunteerModal = function() {
		var VolunteerModalInstance = $uibModal.open({
			templateUrl: "../../js/views/newvolunteer-modal.php",
			controller: "VolunteerModal",
			resolve: {
				volunteer: function() {
					return ($scope.volunteers);
				}
			}
		});
		VolunteerModalInstance.result.then(function(volunteer) {

			VolunteerService.create(volunteer)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.data.message};
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
			//push the new volunteer into the array to update live
			$scope.volunteers.push(volunteer);
		});
	};

	/**
	 * START METHOD UPDATE/PUT
	 * opens edit volunteer modal and sends updated volunteer to the volunteer API
	 */

	$scope.openEditVolunteerModal = function() {
		var EditVolunteerModalInstance = $uibModal.open({
			templateUrl: "../../js/views/editvolunteer-modal.php",
			controller: "EditVolunteerModal",
			resolve: {
				editedVolunteer: function() {
					return ($scope.editedVolunteer);
				}
			}
		});
		EditVolunteerModalInstance.result.then(function(volunteer) {
			//need to set a volPassword here, so that the set password in the validation controller doesn't break
			volunteer.volPassword = null;
			//send the update request to the database
			VolunteerService.update(volunteer.volId, volunteer)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.data.message};
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
			//update angulars copy for dynamic table updates
			$scope.volunteers[$scope.index] = volunteer;
			$scope.index = null;
		});
	};

	$scope.setEditedVolunteer = function(volunteer, index) {
		//set the edited volunteer in the scope, and set the index for updating the array
		$scope.editedVolunteer = angular.copy(volunteer);
		$scope.index = index;
		$scope.openEditVolunteerModal();
	};


	/**
	 * START METHOD(S): FETCH/GET
	 * fufills the promise from retrieving all the volunteers from the volunteer API
	 */
	$scope.getVolunteers = function() {
		VolunteerService.all()
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.volunteers = result.data.data;
				} else {
					$scope.alerts[0] = {type: "danger", msg: result.data.message};
				}
			});
	};

	// load the array on first view
	if($scope.volunteers.length === 0) {
		$scope.volunteers = $scope.getVolunteers();
	}

	/**
	 * fufills the promise from retrieving the volunteers BY ID  from the volunteer API
	 */
	$scope.getVolunteersById = function() {
		VolunteerService.fetchId()
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.volunteers = result.data.data;
				} else {
					$scope.alerts[0] = {type: "danger", msg: result.data.message};
				}
			});
	};

	/**
	 * fufills the promise from retrieving the volunteers BY EMAIL from the volunteer API
	 */
	$scope.getVolunteersByEmail = function() {
		VolunteerService.fetchEmail()
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.volunteers = result.data.data;
				} else {
					$scope.alerts[0] = {type: "danger", msg: result.data.message};
				}
			});
	};

	/**
	 * fufills the promise from retrieving the volunteers BY ADMIN from the volunteer API
	 */
	$scope.getVolunteersByIsAdmin = function() {
		VolunteerService.fetchAdmin()
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.volunteers = result.data.data;
				} else {
					$scope.alerts[0] = {type: "danger", msg: result.data.message};
				}
			});
	};

	/**
	 * fufills the promise from retrieving the volunteers BY PHONE from the volunteer API
	 */
	$scope.getVolunteersByPhone = function() {
		VolunteerService.fetchPhone()
			.then(function(result) {
				if(result.data.status === 200) {
					$scope.volunteers = result.data.data;
				} else {
					$scope.alerts[0] = {type: "danger", msg: result.data.message};
				}
			});
	};


	/**
	 * STARTS METHOD: DELETE/DESTROY
	 * deletes a volunteer and sends it to the volunteer API if the user confirms deletion
	 *
	 * @param volId the volunteer id to delete
	 */
	$scope.deleteVolunteer = function(volId, index) {
		//create a modal instance to prompt the user if she/he is sure they want to delete the misquote
		var message = "Are you sure you want to delete this volunteer?";

		var modalHtml = '<div class="modal-body">' + message + '</div><div class="modal-footer"><button class="btn btn-primary" ng-click="yes()">Yes</button><button class="btn btn-warning" ng-click="no()">No</button></div>';

		var modalInstance = $uibModal.open({
			template: modalHtml,
			controller: ModalInstanceCtrl
		});

		//if the user clicked yes, delete the volunteer
		modalInstance.result.then(function() {
			VolunteerService.destroy(volId)
				.then(function(result) {
					if(result.data.status === 200) {
						$scope.alerts[0] = {type: "success", msg: result.data.message};
					} else {
						$scope.alerts[0] = {type: "danger", msg: result.data.message};
					}
				});
			//remove the current listing from array
			$scope.volunteers.splice(index, 1);
		});
	};

}]);

// embedded modal instance controller to create deletion prompt
var ModalInstanceCtrl = function($scope, $uibModalInstance) {
	$scope.yes = function() {
		$uibModalInstance.close();
	};

	$scope.no = function() {
		$uibModalInstance.dismiss('cancel');
	};
};