/**
 * A service for sign-up
 *
 * @author Tamra Fenstermaker <fenstermaker505@gmail.com>
 * contributing code from ng-abq @author Dylan McDonald
 */

//"signupService refers to what's in the signup-controller.
app.service("SignupService", function($http) {
	this.SIGNUP_ENDPOINT = "/php/controllers/sign-up-controller.php";//this is the php sign-up-controller
	this.GET_ENDPOINT = "/php/controllers/landing-controller.php/";

	this.signup = function(signupData) { //signupData from the signup-controller and signup-modal
		return ($http.get(this.GET_ENDPOINT))
				.then(function() {
					return ($http.post("/php/controllers/sign-up-controller.php", signupData)
							.then(function(reply) {
								return (reply.data);
							}));
		});
	};
});

