(function () {
	'use strict';

	angular.module('golfApp', [
			"ui.router",
			"map",
			"newGame",
			"overview",
			"ngMaterial",
			"ngAnimate"
		])

		.config(["$stateProvider", "$urlRouterProvider",
			function ($stateProvider, $urlRouterProvider) {
				// define all app states (pages)
				$stateProvider
					.state("home", {
						url: "/home",
						templateUrl: "templates/home.html"
					})
					.state("list", {
						url: "/list?listIndex",
						templateUrl: "templates/list.html",
						controller: "itemsController as ic"
					})
					.state("about", {
						url: "/about",
						templateUrl: "templates/about.html"
					})
					.state("archived", {
						url: "/archived",
						templateUrl: "templates/archived.html",
						//controller: "itemsController as ic"
					});

				// if none of the above states are matched, use this as the fallback
				$urlRouterProvider.otherwise("/about");
			}]);

}());
