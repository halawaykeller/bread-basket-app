/**
 * A service for sign-in
 *
 * @author Tamra Fenstermaker <fenstermaker505@gmail.com>
 * contributing code from ng-abq @author Dylan McDonald
 */

//"signinService refers to what's in the signin-controller. 
app.service("SigninService", function($http){
	//this.SIGNIN_ENDPOINT = "/php/controllers/sign-in-controller.php";
	this.GET_ENDPOINT = "/php/api/organization/";

	this.signin = function(signinData) { //signinData from the signin-controller and signin-modal
		//get request for the sole purpose of obtaining a cookie
		//this is TOTALLY a hack, and it's terrible and wrong and we shouldn't do it
		return($http.get(this.GET_ENDPOINT))
				.then(function (){
					console.log("got something");
					return($http.post("/php/controllers/sign-in-controller.php", signinData)
							.then(function(reply) {
								return(reply.data);
							}));

				});
	};
});

