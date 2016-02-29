app.constant("LISTING_ENDPOINT", "../../php/api/listing/");
app.service("ListingService", function($http,LISTING_ENDPOINT) {
	//INTERNAL FUNCTION FOR HOLDING THE URL
	function getUrl() {
		return(LISTING_ENDPOINT);
	}

	//internal function for tracking the id for the URL
	function getUrlForId(listingId) {
			return(getUrl() + listingId);
	}

	//getting all
	this.all = function() {
		return($http.get(getUrl()));
	};

	//get by id
	this.fetchId = function(listingId) {
		return($http.get(getUrlForId(listingId)));
	};

	//get by organization; orgId
	this.fetchByOrgId = function(orgId) {
		return($http.get(getUrl() + "?organization=" + orgId));
	};

	//get by Listing Parent Id; listing
	this.fetchByParentId = function(listingParentId) {
		return($http.get(getUrl() + "?listingParentId=" + listingParentId));
	};

	//get by Listing post Time; listingPostTime
	this.fetchByPostTime = function(listingPostTime) {
		return($http.get(getUrl() + "?listingPostTime=" + listingPostTime));
	};

	//get by Listing Type Id;
	this.fetchByTypeId = function(listingTypeId) {
		return($http.get(getUrl() + "?listingTypeId=" + listingTypeId));
	};

	//post
	this.create = function(listing) {
		return($http.post(getUrl(), listing));
	};

	//put
	this.update = function(listingId, listing){
		return($http.put(getUrlForId(listingId), listing));
	};

	//delete
	this.destroy = function(listingId) {
		return($http.delete(getUrlForId(listingId)));
	};
});
