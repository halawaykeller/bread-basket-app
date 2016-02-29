/**
 * A service for listingtype
 *
 * @author Tamra Fenstermaker <fenstermaker505@gmail.com>
 * contributing code from Misquote @author Dylan McDonald
 */

app.constant("LISTINGTYPE_ENDPOINT", "../../php/api/listingtype/");
app.service("ListingTypeService", function($http, LISTINGTYPE_ENDPOINT) {

	//internal function for holding the url
	function getUrl() {
		return (LISTINGTYPE_ENDPOINT);
	}

	function getUrlForId(listingTypeId) {
		return(getUrl() + listingTypeId);
	}

	//getAllListingTypes	//getting all
	this.all = function() {
		return ($http.get(getUrl()));
	};

	//getListingTypeById
	this.fetch = function(listingTypeId) {
		return ($http.get(getUrlForId(listingTypeId)));
	};

	//getListingTypeByTypeInfo
	this.fetchListingTypeInfo = function(listingTypeInfo) {
		return($http.get(getUrl() + "?listingTypeInfo" + listingTypeInfo));
	};

	//POST
	this.create = function(listingType) {
		return($http.post(getUrl(), listingType));
	};

	//PUT
	this.update = function(listingTypeId, listingType) {
		return($http.put(getUrl(listingType), listingType));
	};

		//DELETE
	this.destroy = function(listingTypeId) {
		return($http.delete(getUrl(listingTypeId)));
	};
});





