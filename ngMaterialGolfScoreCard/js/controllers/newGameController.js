(function () {
	'use strict';

	angular.module('newGame', [])
		.controller('newGame', newGame);

	newGame.$inject = ['$mdSidenav'];

	function newGame($mdSidenav) {

		// list everything
		var newGame = this;
		newGame.closeMenu = closeMenu;
		newGame.openMenu = openMenu;


		// define functions
		function closeMenu () {
			$mdSidenav('right').close();
		}

		function openMenu () {
			$mdSidenav('right').close();
		}

	}

}());