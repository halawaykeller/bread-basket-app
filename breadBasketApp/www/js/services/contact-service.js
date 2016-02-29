/**
 * A service for sign-in
 *
 * @author Tamra Fenstermaker <fenstermaker505@gmail.com>
 * contributing code from ng-abq @author Dylan McDonald
 */

//"signinService refers to what's in the signin-controller.
app.service("ContactService", function($http){
	this.CONTACT_ENDPOINT = "../../php/controllers/contact-form-controller.php";

	this.contact = function(contactData) { //contactData from the contact-form-controller and contact-modal
		return($http.post(this.CONTACT_ENDPOINT, contactData)
			.then(function(reply) {
				return(reply.data);
			}));
	};
});

