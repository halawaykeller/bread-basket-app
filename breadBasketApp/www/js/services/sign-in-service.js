/**
 * A service for sign-in
 *
 * @author Tamra Fenstermaker <fenstermaker505@gmail.com>
 * contributing code from ng-abq @author Dylan McDonald
 */

//"signinService refers to what's in the signin-controller. 
app.service("SigninService", function($http){
	//this.SIGNIN_ENDPOINT = "/php/controllers/sign-in-controller.php";
	this.GET_ENDPOINT = "/php/controllers/landing-controller.php/";

	this.signin = function(signinData) { //signinData from the signin-controller and signin-modal
		//make request to the landing controller to get the xsrf token
		return($http.get(this.GET_ENDPOINT))
				.then(function (){
					return($http.post("/php/controllers/sign-in-controller.php", signinData)
							.then(function(reply) {
								return(reply.data);
							}));

				});
	};
});

