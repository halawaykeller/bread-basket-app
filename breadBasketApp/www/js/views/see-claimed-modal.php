<div class="modal-header">
	<h3 class="modal-title">Details</h3>
</div>
<div class="modal-body">
	<h4>Organization</h4>
	<span>{{ organization.orgName }}</span>
	<h4>Location</h4>
	<span>{{ organization.orgAddress1 }}</span> <span>{{ organization.orgCity }} </span> <span>{{ organization.orgState }}</span> <span>{{ organization.orgZip }}</span>
	<h4>Contact Phone</h4>
	<span>{{ organization.orgPhone }}</span>
</div>
<div class="modal-footer">
	<button class="btn btn-info" type="button" ng-click="ok()">OK</button>
</div>