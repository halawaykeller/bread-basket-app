/**
 * A service for sign-up
 *
 * @author Tamra Fenstermaker <fenstermaker505@gmail.com>
 * contributing code from ng-abq @author Dylan McDonald
 */

//"signupService refers to what's in the signup-controller.
app.service("SignupService", function($http) {
	var SIGNUP_ENDPOINT = "https://breadbasketapp.com/php/controllers/sign-up-controller.php";//this is the php sign-up-controller
	var GET_ENDPOINT = "https://breadbasketapp.com/php/controllers/landing-controller.php";

	this.signup = function(signupData) { //signupData from the signup-controller and signup-modal
		return ($http.get(GET_ENDPOINT))
				.then(function() {
					return ($http.post(SIGNUP_ENDPOINT, signupData)
							.then(function(reply) {
								return (reply.data);
							}));
		});
	};
});

