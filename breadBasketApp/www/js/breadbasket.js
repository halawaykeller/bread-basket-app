var app = angular.module("BreadBasket", ["ionic", "ngMessages", "ngPassword", "ui.bootstrap", "doowb.angular-pusher"])


	.run(function($ionicPlatform) {
		$ionicPlatform.ready(function() {
			if(window.cordova && window.cordova.plugins.Keyboard) {
				// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
				// for form inputs)
				cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

				// Don't remove this line unless you know what you are doing. It stops the viewport
				// from snapping when text inputs are focused. Ionic handles this internally for
				// a much nicer keyboard experience.
				cordova.plugins.Keyboard.disableScroll(true);
			}
			if(window.StatusBar) {
				StatusBar.styleDefault();
			}
		});
	})
	.config(function($stateProvider, $urlRouterProvider){
		$stateProvider
				.state('login', {
					url: '/login',
					templateUrl: 'js/templates/login.html'
				})
				.state('sign-up', {
					url: '/sign-up',
					templateUrl: 'js/templates/sign-up.html',
					controller: 'SignupController'
				})
				.state('tab', {
					url: '/tab',
					abstract: true,
					templateUrl: 'js/templates/tabs.html'
				})
				.state('tab.organization', {
					url: '/organization',
					views: {
						'tab-organization': {
							templateUrl: 'js/templates/tab-organization.html',
							controller: 'OrganizationController'
						}
					}
				})

				.state('tab.org-edit', {
					url: '/organization/:orgId',
					views: {
						'tab-organization': {
							templateUrl: 'js/templates/org-edit.html',
							controller: 'OrganizationController'
						}
					}
				})
				.state('tab.volunteers', {
					url: '/volunteers',
					views: {
						'tab-volunteers': {
							templateUrl: 'js/templates/tab-volunteers.html',
							controller: 'VolunteerController'
						}
					}
				})
				.state('tab.volunteer-detail', {
					url: '/volunteers/:volId',
					views: {
						'tab-volunteers': {
							templateUrl: 'js/templates/volunteer-detail.html',
							controller: 'VolDetailController'
						}
					}
				})

				.state('tab.volunteer-new', {
					url: '/volunteers/volunteer-new',
					views: {
						'tab-volunteers': {
							templateUrl: 'js/templates/volunteer-new.html',
							controller: 'VolunteerController'
						}
					}
				})

				.state('tab.listings', {
					url: '/listings',
					views: {
						'tab-listings': {
							templateUrl: 'js/templates/tab-listings.html',
							controller: 'ListingController'
						}
					}
				})
				.state('tab.tab-listing-view', {
					url: '/listings/:listingId',
					views: {
						'tab-listings': {
							templateUrl: 'js/templates/tab-listing-view.html',
							controller: 'ListingViewController'
						}
					}
				})
				.state('tab.dashboard', {
					url: '/dashboard',
					views: {
						'tab-dashboard': {
							templateUrl: 'js/templates/tab-dashboard.html'
						}
					}
				})
				.state('tab.tab-claim-details', {
					url: '/claim-details/:listingId',
					views: {
						'tab-listings': {
							templateUrl: 'js/templates/tab-claim-details.html',
							controller: 'ClaimDetailsController'
						}
					}
				});

				$urlRouterProvider.otherwise('/login');

	});