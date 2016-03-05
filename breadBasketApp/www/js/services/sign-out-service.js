app.service("SignoutService", function($http) {
	this.SIGNOUT_ENDPOINT = "https://breadbasketapp.com/php/controllers/sign-out-controller.php";

	this.signout = function() {
		return ($http.get(this.SIGNOUT_ENDPOINT));
	}
});
