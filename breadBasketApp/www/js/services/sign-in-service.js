/**
 * A service for sign-in
 *
 * @author Tamra Fenstermaker <fenstermaker505@gmail.com>
 * contributing code from ng-abq @author Dylan McDonald
 */

//"signinService refers to what's in the signin-controller. 
app.service("SigninService", function($http){
	var SIGNIN_ENDPOINT = "/php/controllers/sign-in-controller.php";
	var GET_ENDPOINT = "/php/controllers/landing-controller.php";

	this.signin = function(signinData) { //signinData from the signin-controller and signin-modal
		//make request to the landing controller to get the xsrf token
		return($http.get(GET_ENDPOINT))
				.then(function (data){
					console.log(data);
					return($http.post(SIGNIN_ENDPOINT, signinData)
							.then(function(reply) {
								return(reply.data);
							}));

				});
	};
});

